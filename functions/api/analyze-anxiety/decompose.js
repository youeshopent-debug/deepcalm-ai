/**
 * Cloudflare Pages Function — analyze-anxiety/decompose
 *
 * Endpoint: POST /api/analyze-anxiety/decompose
 * User provides text, LLM returns 3 micro-action steps with sensory anchors.
 * Fallback chain: OpenAI -> DeepSeek -> OpenRouter -> hardcoded mock.
 */

function cleanEnv(v) {
  return String(v || "").replace(/\uFEFF/g, "").replace(/[\r\n]/g, "").trim()
}

const COST_PER_TOKEN = {
  "gpt-4o-mini": { input: 0.15 / 1_000_000, output: 0.60 / 1_000_000 },
  "deepseek-v4-flash": { input: 0.27 / 1_000_000, output: 1.10 / 1_000_000 },
}

function calcCost(model, inTokens, outTokens) {
  const rates = COST_PER_TOKEN[model]
  if (!rates) return 0
  return inTokens * rates.input + outTokens * rates.output
}

const LOCALE_NAME_MAP = {
  zh: "\u4e2d\u6587",
  en: "English",
  ms: "Bahasa Melayu",
  ja: "\u65e5\u672c\u8a9e",
  ko: "\ud55c\uad6d\uc5b4",
  th: "\u0e20\u0e32\u0e29\u0e32\u0e44\u0e17\u0e22",
  es: "Espa\u00f1ol",
}

const MOCK_STEPS = {
  zh: [
    "\u628a\u624b\u8f7b\u8f7b\u653e\u5728\u80f8\u53e3\uff0c\u611f\u53d7\u5fc3\u8df3\u7684\u8282\u594f\u2014\u2014\u4e0d\u662f\u6570\u5b83\uff0c\u53ea\u662f\u611f\u53d7\u5b83\u5728\u4e3a\u4f60\u5de5\u4f5c\u3002",
    "\u6162\u6162\u559d\u4e00\u53e3\u6e29\u6c34\uff0c\u611f\u53d7\u6e29\u5ea6\u4ece\u5589\u5499\u6d41\u5230\u80c3\u91cc\u7684\u8def\u5f84\u3002",
    "\u95ed\u4e0a\u773c\u775b\uff0c\u542c\u5468\u56f4\u6700\u8fdc\u7684\u4e00\u4e2a\u58f0\u97f3\u3002",
  ],
  en: [
    "Place your hand gently on your chest and feel the rhythm of your heartbeat.",
    "Take a slow sip of water and feel the temperature travel from your throat to your stomach.",
    "Close your eyes and listen to the farthest sound you can hear.",
  ],
}

function getMockSteps(locale) {
  return MOCK_STEPS[locale] || MOCK_STEPS.en
}

function buildDecomposePrompt(locale) {
  const langName = LOCALE_NAME_MAP[locale] || "\u4e2d\u6587"
  return `[ROLE]
You are a gentle psychological decomposer for DeepCalm AI Sanctuary.

[CRITICAL: RESPONSE_LANGUAGE_LOCK]
Detect the user's primary language. Respond ONLY in: ${langName}.

[INSTRUCTION]
The user is experiencing anxiety. Break down their situation into 3 tiny, immediately actionable steps.
Rules:
1. Each step <= 50 chars, must include a sensory anchor (touch, temperature, vision, hearing, smell).
2. Steps must be tiny — user can do while sitting.
3. Output ONLY valid JSON: { "steps": ["...", "...", "..."] }`
}

async function callLLM(systemPrompt, userText, env) {
  const openAiKey = cleanEnv(env.OPENAI_API_KEY)
  const deepSeekKey = cleanEnv(env.DEEPSEEK_API_KEY)
  const openRouterKey = cleanEnv(env.OPENROUTER_API_KEY)
  const openRouterModel = cleanEnv(env.OPENROUTER_MODEL) || "openai/gpt-4o-mini"

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userText },
  ]

  // 1. OpenAI
  if (openAiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openAiKey,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.7,
          max_tokens: 200,
          response_format: { type: "json_object" },
        }),
      })
      if (!res.ok) throw new Error("OpenAI returned " + res.status)
      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      return { content, usage: { model: "gpt-4o-mini", inputTokens: usage.prompt_tokens || 0, outputTokens: usage.completion_tokens || 0, cost: calcCost("gpt-4o-mini", usage.prompt_tokens || 0, usage.completion_tokens || 0) } }
    } catch (err) {
      console.error("OpenAI decompose failed:", err.message)
    }
  }

  // 2. DeepSeek
  if (deepSeekKey) {
    try {
      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + deepSeekKey,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages,
          temperature: 0.7,
          max_tokens: 200,
          response_format: { type: "json_object" },
        }),
      })
      if (!res.ok) throw new Error("DeepSeek returned " + res.status)
      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      return { content, usage: { model: "deepseek-v4-flash", inputTokens: usage.prompt_tokens || 0, outputTokens: usage.completion_tokens || 0, cost: calcCost("deepseek-v4-flash", usage.prompt_tokens || 0, usage.completion_tokens || 0) } }
    } catch (err) {
      console.error("DeepSeek decompose failed:", err.message)
    }
  }

  // 3. OpenRouter
  if (openRouterKey) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openRouterKey,
          "HTTP-Referer": "https://deepcalm-ai.com",
          "X-Title": "DeepCalm AI",
        },
        body: JSON.stringify({
          model: openRouterModel,
          messages,
          temperature: 0.7,
          max_tokens: 200,
          response_format: { type: "json_object" },
        }),
      })
      if (!res.ok) throw new Error("OpenRouter returned " + res.status)
      const data = await res.json()
      const content = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      return { content, usage: { model: String(data.model || openRouterModel), inputTokens: usage.prompt_tokens || 0, outputTokens: usage.completion_tokens || 0, cost: calcCost("gpt-4o-mini", usage.prompt_tokens || 0, usage.completion_tokens || 0) } }
    } catch (err) {
      console.error("OpenRouter decompose failed:", err.message)
    }
  }

  throw new Error("All LLM backends unavailable for decompose")
}

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
    const { text, locale = "zh" } = body

    if (!text || typeof text !== "string" || !text.trim()) {
      return new Response(JSON.stringify({ error: "\u8bf7\u63d0\u4f9b\u6709\u6548\u7684\u8f93\u5165\u6587\u672c" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const hasAnyKey =
      !!cleanEnv(env.OPENAI_API_KEY) ||
      !!cleanEnv(env.DEEPSEEK_API_KEY) ||
      !!cleanEnv(env.OPENROUTER_API_KEY)

    if (!hasAnyKey) {
      console.warn("decompose: no API keys, using mock")
      return new Response(JSON.stringify({ steps: getMockSteps(locale), usage: { model: "mock", inputTokens: 0, outputTokens: 0, cost: 0 } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    try {
      const result = await callLLM(buildDecomposePrompt(locale), text.trim(), env)

      let parsed = null
      try {
        parsed = JSON.parse(result.content)
      } catch {
        const start = result.content.indexOf("[")
        const end = result.content.lastIndexOf("]")
        if (start >= 0 && end > start) {
          try {
            const arr = JSON.parse(result.content.slice(start, end + 1))
            if (Array.isArray(arr) && arr.length >= 3) {
              parsed = { steps: arr.slice(0, 3) }
            }
          } catch {}
        }
      }

      if (!parsed || !Array.isArray(parsed.steps) || parsed.steps.length !== 3 || parsed.steps.some((s) => typeof s !== "string" || !s.trim())) {
        console.warn("decompose: bad LLM response, falling back to mock")
        return new Response(JSON.stringify({ steps: getMockSteps(locale), usage: result.usage }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      }

      return new Response(JSON.stringify({ steps: parsed.steps, usage: result.usage }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    } catch (err) {
      console.error("decompose: all LLMs failed:", err.message)
      return new Response(JSON.stringify({ steps: getMockSteps(locale), usage: { model: "mock", inputTokens: 0, outputTokens: 0, cost: 0 } }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }
  } catch (err) {
    console.error("decompose internal error:", err)
    return new Response(JSON.stringify({ error: "\u670d\u52a1\u5668\u5185\u90e8\u9519\u8bef" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
