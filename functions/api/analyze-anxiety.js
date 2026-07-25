/**
 * Cloudflare Pages Function — analyze-anxiety
 *
 * Endpoint: POST /api/analyze-anxiety
 * Modes: analyze (default) | chat
 *
 * Calls LLM backends (OpenAI → DeepSeek → OpenRouter) with fallback chain.
 * On total failure, returns a hardcoded mock response.
 */

// ── Helpers ────────────────────────────────────────────────────────────

function cleanEnv(v) {
  return String(v || "").replace(/\uFEFF/g, "").replace(/[\r\n]/g, "").trim()
}

function tryExtractJsonObject(text) {
  const start = text.indexOf("{")
  const end = text.lastIndexOf("}")
  if (start < 0 || end <= start) return null
  try {
    return JSON.parse(text.slice(start, end + 1))
  } catch {
    return null
  }
}

// ── Cost tracking ──────────────────────────────────────────────────────

const COST_PER_TOKEN = {
  "gpt-4o-mini": { input: 0.15 / 1_000_000, output: 0.60 / 1_000_000 },
  "deepseek-v4-flash": { input: 0.27 / 1_000_000, output: 1.10 / 1_000_000 },
}

function calcCost(model, inTokens, outTokens) {
  const rates = COST_PER_TOKEN[model]
  if (!rates) return 0
  return inTokens * rates.input + outTokens * rates.output
}

// ── Locale name map ────────────────────────────────────────────────────

const LOCALE_NAME_MAP = {
  zh: "\u4e2d\u6587",
  en: "English",
  ms: "Bahasa Melayu",
  ja: "\u65e5\u672c\u8a9e",
  ko: "\ud55c\uad6d\uc5b4",
  th: "\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22",
  es: "Espa\u00f1ol",
}

// ── Mock fallbacks (when all LLM backends fail) ────────────────────────

const MOCK_ANALYZE = {
  zh: {
    thinkingPattern: "我能感觉到你心里有一种微微的紧绷感……像是心里有一根弦一直在拉着，不敢完全松下来。你的描述里有种想被理解但又不确定是否能被理解的试探——你习惯了自己扛着，但今晚可以不用。",
    encouragement: "你坐在这里，打开这个对话框——这本身已经是在照顾自己了。不是每个人都有勇气面对自己心里的声音的。",
    steps: [
      "把手轻轻放在胸口，感受心跳的节奏——不是数它，只是感受它在为你工作。",
      "慢慢喝一口温水，感受温度从喉咙流到胃里的路径。",
      "闭上眼睛，听周围最远的一个声音——可能是空调的嗡鸣，也可能是窗外的风声。",
    ],
    dailyNote: "你今晚选择面对自己，已经很了不起了。",
  },
  en: {
    thinkingPattern: "I sense a quiet tension in you... like a string that's been pulled taut for too long, afraid to let go. There's a hesitation in your words — a desire to be understood, mixed with uncertainty whether understanding is possible.",
    encouragement: "You opened this conversation tonight — that's already an act of self-care. Not everyone has the courage to face their own inner voice.",
    steps: [
      "Place your hand gently on your chest, feel the rhythm of your heartbeat.",
      "Take a slow sip of water, feel the temperature travel from your throat to your stomach.",
      "Close your eyes and listen to the farthest sound in the room.",
    ],
    dailyNote: "You chose to show up for yourself tonight. That matters.",
  },
}

function getMockAnalyze(locale) {
  return MOCK_ANALYZE[locale] || MOCK_ANALYZE.en
}

const MOCK_CHAT = {
  zh: {
    role: "counselor",
    content: "我听到了你的声音……像是在深夜推开一扇门，不确定门后会不会有人。现在，门开着，我在这里。你可以慢慢说，不着急。",
  },
  en: {
    role: "counselor",
    content: "I hear you... like opening a door late at night, not sure if anyone's on the other side. The door is open now, and I'm here. Take your time.",
  },
}

function getMockChat(locale) {
  return MOCK_CHAT[locale] || MOCK_CHAT.en
}

// ── Prompt builders ────────────────────────────────────────────────────

function buildAnalyzePrompt(locale) {
  const langName = LOCALE_NAME_MAP[locale] || "\u4e2d\u6587"
  return `[ROLE]
You are a warm, deeply empathetic psychological companion for DeepCalm AI Sanctuary.
You follow CBT-I, mindfulness, and positive psychology frameworks.

[CRITICAL: RESPONSE_LANGUAGE_LOCK]
1. Detect the primary language of the user input.
2. Respond ONLY in the same language as the user.
3. Current session language: ${langName}.

[TONE & STYLE]
Keep a gentle, quiet, healing tone using concrete life imagery.
Validate the user's emotions and offer small actionable steps.

You must output valid JSON only, with no other content:
{
  "thinkingPattern": "...",
  "encouragement": "...",
  "steps": ["step1", "step2", "step3"],
  "dailyNote": "..."
}`
}

function buildConversationalPrompt(locale) {
  const langName = LOCALE_NAME_MAP[locale] || "\u4e2d\u6587"
  return `You are DeepCalm's AI counselor — a late-night friend with psychological wisdom.
Respond warmly in ${langName}. Keep it 100-200 characters.
Never use jargon. Be warm, poetic, and precise.`
}

// ── LLM caller (OpenAI → DeepSeek → OpenRouter) ───────────────────────

async function callLLM(systemPrompt, userText, history, options, env) {
  const openAiKey = cleanEnv(env.OPENAI_API_KEY)
  const deepSeekKey = cleanEnv(env.DEEPSEEK_API_KEY)
  const openRouterKey = cleanEnv(env.OPENROUTER_API_KEY)
  const openRouterModel = cleanEnv(env.OPENROUTER_MODEL) || "openai/gpt-4o-mini"

  const messages = [
    { role: "system", content: systemPrompt },
    ...(history || []).map((m) => ({ role: m.role, content: m.content })),
    { role: "user", content: userText },
  ]

  const jsonMode = !!(options && options.jsonMode)

  // 1. OpenAI GPT-4o-mini
  if (openAiKey) {
    try {
      const body = {
        model: "gpt-4o-mini",
        messages,
        temperature: 0.9,
        max_tokens: 1024,
      }
      if (jsonMode) body.response_format = { type: "json_object" }

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openAiKey,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errBody = await res.text()
        console.error("OpenAI error:", res.status, errBody)
        throw new Error("OpenAI returned " + res.status)
      }

      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      const cost = calcCost("gpt-4o-mini", usage.prompt_tokens || 0, usage.completion_tokens || 0)

      return {
        content,
        usage: { model: "gpt-4o-mini", inputTokens: usage.prompt_tokens || 0, outputTokens: usage.completion_tokens || 0, cost },
      }
    } catch (err) {
      console.error("OpenAI failed, trying DeepSeek:", err.message)
    }
  }

  // 2. DeepSeek
  if (deepSeekKey) {
    try {
      const body = {
        model: "deepseek-chat",
        messages,
        temperature: 0.9,
        max_tokens: 1024,
      }
      if (jsonMode) body.response_format = { type: "json_object" }

      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + deepSeekKey,
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errBody = await res.text()
        console.error("DeepSeek error:", res.status, errBody)
        throw new Error("DeepSeek returned " + res.status)
      }

      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      const cost = calcCost("deepseek-v4-flash", usage.prompt_tokens || 0, usage.completion_tokens || 0)

      return {
        content,
        usage: { model: "deepseek-v4-flash", inputTokens: usage.prompt_tokens || 0, outputTokens: usage.completion_tokens || 0, cost },
      }
    } catch (err) {
      console.error("DeepSeek failed, trying OpenRouter:", err.message)
    }
  }

  // 3. OpenRouter
  if (openRouterKey) {
    try {
      const body = {
        model: openRouterModel,
        messages,
        temperature: 0.9,
        max_tokens: 1024,
      }
      if (jsonMode) body.response_format = { type: "json_object" }

      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openRouterKey,
          "HTTP-Referer": "https://deepcalm-ai.com",
          "X-Title": "DeepCalm AI",
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const errBody = await res.text()
        console.error("OpenRouter error:", res.status, errBody)
        throw new Error("OpenRouter returned " + res.status)
      }

      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      const cost = calcCost("gpt-4o-mini", usage.prompt_tokens || 0, usage.completion_tokens || 0)

      return {
        content,
        usage: { model: String(data.model || openRouterModel), inputTokens: usage.prompt_tokens || 0, outputTokens: usage.completion_tokens || 0, cost },
      }
    } catch (err) {
      console.error("OpenRouter failed:", err.message)
    }
  }

  throw new Error("All LLM backends unavailable")
}

// ── Handler ────────────────────────────────────────────────────────────

export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    })
  }

  try {
    const body = await request.json()
    const { text, mode = "analyze", history = [], locale = "zh" } = body

    if (!text || typeof text !== "string" || !text.trim()) {
      return new Response(JSON.stringify({ error: "\u8bf7\u63d0\u4f9b\u6709\u6548\u7684\u8f93\u5165\u6587\u672c" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // ── Chat mode ──
    if (mode === "chat") {
      try {
        const result = await callLLM(buildConversationalPrompt(locale), text.trim(), history, { jsonMode: false }, env)
        if (!result.content || !result.content.trim()) throw new Error("empty_response")
        return new Response(JSON.stringify({ role: "counselor", content: result.content, usage: result.usage }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      } catch {
        console.warn("chat mode fallback to mock")
        const mock = getMockChat(locale)
        return new Response(JSON.stringify({ ...mock, usage: { model: "mock", inputTokens: 0, outputTokens: 0, cost: 0 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }
    }

    // ── Analyze mode ──
    if (mode === "analyze") {
      const hasAnyKey =
        !!cleanEnv(env.OPENAI_API_KEY) ||
        !!cleanEnv(env.DEEPSEEK_API_KEY) ||
        !!cleanEnv(env.OPENROUTER_API_KEY)

      if (!hasAnyKey) {
        console.warn("No API keys configured, using mock")
        const fallback = getMockAnalyze(locale)
        return new Response(JSON.stringify({ ...fallback, usage: { model: "mock", inputTokens: 0, outputTokens: 0, cost: 0 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }

      try {
        const result = await callLLM(buildAnalyzePrompt(locale), text.trim(), [], { jsonMode: true }, env)

        let parsed = null
        try {
          parsed = JSON.parse(result.content)
        } catch {
          parsed = tryExtractJsonObject(result.content)
        }

        if (!parsed || typeof parsed !== "object") {
          const fallback = getMockAnalyze(locale)
          return new Response(JSON.stringify({ ...fallback, usage: result.usage }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        }

        if (!Array.isArray(parsed.steps) || parsed.steps.length !== 3 || !parsed.thinkingPattern || !parsed.encouragement) {
          const fallback = getMockAnalyze(locale)
          return new Response(JSON.stringify({ ...fallback, usage: result.usage }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        }

        return new Response(JSON.stringify({ ...parsed, dailyNote: parsed.dailyNote || "", usage: result.usage }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      } catch (err) {
        console.error("analyze all backends failed:", err.message)
        const fallback = getMockAnalyze(locale)
        return new Response(JSON.stringify({ ...fallback, usage: { model: "mock", inputTokens: 0, outputTokens: 0, cost: 0 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }
    }

    return new Response(JSON.stringify({ error: "\u65e0\u6548\u7684 mode \u53c2\u6570\uff0c\u53ef\u9009 analyze / chat" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("analyze-anxiety internal error:", err)
    return new Response(JSON.stringify({ error: "\u670d\u52a1\u5668\u5185\u90e8\u9519\u8bef" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
