/**
 * Cloudflare Pages Function — POST /api/meditation-script
 * 生成 AI 冥想引导脚本，LLM 回退链：OpenAI GPT-4o-mini → DeepSeek → OpenRouter
 * 降级：所有 LLM 不可用则 503
 */

/* ── 时长映射 ── */
const DURATION_MAP = { short: 180, medium: 300, long: 480 }

/* ── 主题 → 视觉主题 ── */
const TOPIC_THEME_MAP = {
  insomnia: "deepsea", "deep-sleep": "deepsea", "sleep-anxiety": "twilight",
  nightmare: "twilight", "circadian-rhythm": "starry", "sleep-hygiene": "forest",
  anxiety: "forest", workplace_burnout: "twilight", public_speaking: "forest",
  student_exam: "starry", grief_loss: "deepsea", loneliness: "starry",
  self_worth: "forest", mindfulness: "forest", emotional_health: "twilight",
}

/** 推断视觉主题 */
function inferTheme(input) {
  if (input.topicSlug && TOPIC_THEME_MAP[input.topicSlug]) return TOPIC_THEME_MAP[input.topicSlug]
  const e = (input.emotion || "").toLowerCase()
  if (/焦虑|stress|anxious|stressed|不安|紧张/.test(e)) return "forest"
  if (/失眠|insomnia|sleep|tired|疲|困|眠/.test(e)) return "deepsea"
  if (/悲伤|sad|grief|depress|孤独|lonely|loss/.test(e)) return "starry"
  if (/愤怒|angry|frustrat|烦躁|irritat/.test(e)) return "twilight"
  return "forest"
}

/* ── 语言名称映射 ── */
const LOCALE_NAME = {
  zh: "中文", en: "English", ms: "Bahasa Melayu", ja: "日本語",
  ko: "한국어", th: "ภาษาไทย", es: "Español",
}

/** 构建系统提示词 */
function buildPrompt(input) {
  const langName = LOCALE_NAME[input.locale] || "中文"
  const duration = DURATION_MAP[input.duration || "short"]
  const topicHint = input.topicSlug ? `用户选择的主题：${input.topicSlug}。脚本内容应贴合该主题的核心治愈方向。` : ""
  const emotionHint = input.emotion ? `用户当前的描述情绪：${input.emotion}。脚本应匹配此情绪基调。` : ""

  return `[ROLE]
你是 DeepCalm AI 的冥想引导师——一位声音温暖的老朋友。你的任务是生成一段冥想引导脚本。

[CRITICAL: LANGUAGE_LOCK]
必须且只能使用${langName}输出整个脚本。严禁混入其他语言。

[TONE]
- 缓慢、温柔、有呼吸节奏
- 使用自然意象（月光、湖水、森林、微风）
- 每句话都要像在轻声耳语
- 每行末尾可以用"……"延音
- 不用专业术语，不用"你应该"，只用"或许可以……""感受……"

[STRUCTURE]
将总时长 ${duration} 秒划分为以下阶段，按顺序输出：

1. 开场安定（约20%时间）：引导用户找到一个舒适的姿势，闭上眼睛，做三次深呼吸。语气像深夜咖啡馆里坐在对面的朋友。
2. 核心引导（约55%时间）：根据用户情况展开冥想主题。用具体的感官意象引导注意力的流动——如水波、树叶、星光。至少包含3个感官锚点（触觉/温度/听觉/视觉）。
3. 深化停留（约15%时间）：引导进入更深的安静状态。语速更慢，句子更短，留白更多。
4. 温和回归（约10%时间）：引导慢慢回到当下，轻轻动一下手指和脚趾，准备睁开眼睛。

${topicHint}
${emotionHint}

[OUTPUT FORMAT]
你必须输出纯净 JSON，格式如下（不要有任何其他内容）：

{
  "title": "冥想标题（不超过15字，概括本次冥想）",
  "lines": [
    {
      "text": "引导语句……",
      "startAt": 0,
      "breathInstruction": "inhale",
      "durationSec": 12
    }
  ],
  "audioPreset": "relaxation"
}

每条 line 的规则：
- startAt：该行开始的秒数（从0开始递增）
- durationSec：该行持续的秒数（每行8-25秒）
- breathInstruction：inhale(吸气) / hold(屏息) / exhale(呼气) / neutral(中性呼吸，不特别指示) —— 每2-3行至少出现一次呼吸指令，遵循"吸气→屏息→呼气"的自然节奏
- lines 的总条数必须覆盖整个 ${duration} 秒（最后一条的 startAt + durationSec 应接近 ${duration}）
- 开头前3行必须是：第1行吸气 → 第2行屏息 → 第3行呼气，作为起始准备呼吸

audioPreset 可选值：relaxation(放松) / body_scan(身体扫描) / deep_sleep(深度睡眠) / morning_energy(晨间能量)

总行数控制在 8-15 条之间。每行 text 不超过 80 字。`
}

/* ── 成本计算 ── */
const COST = {
  "gpt-4o-mini": { input: 0.15 / 1_000_000, output: 0.60 / 1_000_000 },
  "deepseek-v4-flash": { input: 0.27 / 1_000_000, output: 1.10 / 1_000_000 },
}
function calcCost(model, inTokens, outTokens) {
  const r = COST[model]
  return r ? inTokens * r.input + outTokens * r.output : 0
}

/* ── LLM 三重回退 ── */
async function callLLM(systemPrompt, userText, env) {
  const openAiKey = (env.OPENAI_API_KEY || "").replace(/\uFEFF/g, "").trim()
  const deepSeekKey = (env.DEEPSEEK_API_KEY || "").replace(/\uFEFF/g, "").trim()
  const openRouterKey = (env.OPENROUTER_API_KEY || "").replace(/\uFEFF/g, "").trim()
  const openRouterModel = (env.OPENROUTER_MODEL || "openai/gpt-4o-mini").replace(/\uFEFF/g, "").trim()

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userText },
  ]

  // 1. OpenAI
  if (openAiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${openAiKey}` },
        body: JSON.stringify({ model: "gpt-4o-mini", messages, temperature: 0.8, max_tokens: 2048, response_format: { type: "json_object" } }),
      })
      if (!res.ok) throw new Error(`OpenAI ${res.status}`)
      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const u = data.usage || {}
      return { content, usage: { model: "gpt-4o-mini", inputTokens: u.prompt_tokens || 0, outputTokens: u.completion_tokens || 0, cost: calcCost("gpt-4o-mini", u.prompt_tokens || 0, u.completion_tokens || 0) } }
    } catch (e) { console.error("OpenAI meditation fail:", e.message) }
  }

  // 2. DeepSeek
  if (deepSeekKey) {
    try {
      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${deepSeekKey}` },
        body: JSON.stringify({ model: "deepseek-chat", messages, temperature: 0.8, max_tokens: 2048, response_format: { type: "json_object" } }),
      })
      if (!res.ok) throw new Error(`DeepSeek ${res.status}`)
      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const u = data.usage || {}
      return { content, usage: { model: "deepseek-v4-flash", inputTokens: u.prompt_tokens || 0, outputTokens: u.completion_tokens || 0, cost: calcCost("deepseek-v4-flash", u.prompt_tokens || 0, u.completion_tokens || 0) } }
    } catch (e) { console.error("DeepSeek meditation fail:", e.message) }
  }

  // 3. OpenRouter
  if (openRouterKey) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${openRouterKey}`, "HTTP-Referer": "https://deepcalm-ai.com", "X-Title": "DeepCalm AI" },
        body: JSON.stringify({ model: openRouterModel, messages, temperature: 0.8, max_tokens: 2048, response_format: { type: "json_object" } }),
      })
      if (!res.ok) throw new Error(`OpenRouter ${res.status}`)
      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const u = data.usage || {}
      return { content, usage: { model: String(data.model || openRouterModel), inputTokens: u.prompt_tokens || 0, outputTokens: u.completion_tokens || 0, cost: calcCost("gpt-4o-mini", u.prompt_tokens || 0, u.completion_tokens || 0) } }
    } catch (e) { console.error("OpenRouter meditation fail:", e.message) }
  }

  throw new Error("All LLM backends unavailable")
}

/** 从文本中提取 JSON 对象 */
function tryExtractJson(text) {
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start < 0 || end <= start) return null
  try { return JSON.parse(text.slice(start, end + 1)) } catch { return null }
}

export async function onRequest(context) {
  const { request, env } = context
  if (request.method !== "POST") return new Response("Method Not Allowed", { status: 405 })

  try {
    const input = await request.json()
    const { locale, emotion, topicSlug, duration } = input || {}
    if (!locale) return new Response(JSON.stringify({ error: "locale required" }), { status: 400, headers: { "Content-Type": "application/json" } })

    const prompt = buildPrompt(input)
    const userText = emotion
      ? `请根据我当前的情绪生成一段冥想脚本：${emotion}${topicSlug ? `，并结合主题：${topicSlug}` : ""}`
      : topicSlug
        ? `请根据主题生成一段冥想脚本：${topicSlug}`
        : "请生成一段通用的放松冥想脚本"

    const result = await callLLM(prompt, userText, env)

    let parsed = null
    try { parsed = JSON.parse(result.content) } catch { parsed = tryExtractJson(result.content) }

    if (!parsed || !parsed.lines || !Array.isArray(parsed.lines) || parsed.lines.length < 5) {
      return new Response(JSON.stringify({ error: "Invalid script from LLM", usage: result.usage }), { status: 502, headers: { "Content-Type": "application/json" } })
    }

    const VALID_BREATH = ["inhale", "hold", "exhale", "neutral"]
    const validated = parsed.lines.map((l, i) => ({
      text: typeof l.text === "string" ? l.text : "",
      startAt: typeof l.startAt === "number" ? l.startAt : i * 20,
      durationSec: typeof l.durationSec === "number" ? l.durationSec : 20,
      breathInstruction: VALID_BREATH.includes(l.breathInstruction) ? l.breathInstruction : undefined,
    })).filter(l => l.text.length > 0)

    if (validated.length < 5) {
      return new Response(JSON.stringify({ error: "Too few valid lines", usage: result.usage }), { status: 502, headers: { "Content-Type": "application/json" } })
    }

    const totalSeconds = validated[validated.length - 1].startAt + validated[validated.length - 1].durationSec
    const VALID_AUDIO = ["relaxation", "body_scan", "deep_sleep", "morning_energy"]

    const script = {
      lines: validated,
      visualTheme: inferTheme(input),
      audioPreset: VALID_AUDIO.includes(parsed.audioPreset) ? parsed.audioPreset : "relaxation",
      totalSeconds,
      title: typeof parsed.title === "string" ? parsed.title.slice(0, 30) : "冥想引导",
    }

    return new Response(JSON.stringify({ script, usage: result.usage }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    })
  } catch (err) {
    console.error("Meditation script CF endpoint error:", err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 503, headers: { "Content-Type": "application/json" } })
  }
}
