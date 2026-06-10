import { mockAnalyze } from "@/lib/mockCounselor";
import type { Locale } from "@/types";
import { NextRequest, NextResponse } from "next/server";

function cleanEnv(v: unknown): string {
  return String(v || "")
    .replace(/\uFEFF/g, "")
    .replace(/[\r\n]/g, "")
    .trim()
}

const COST_PER_TOKEN: Record<string, { input: number; output: number }> = {
  "gpt-4o-mini": { input: 0.15 / 1_000_000, output: 0.60 / 1_000_000 },
  "deepseek-v4-flash": { input: 0.27 / 1_000_000, output: 1.10 / 1_000_000 },
}

function calcCost(model: string, inTokens: number, outTokens: number): number {
  const rates = COST_PER_TOKEN[model]
  if (!rates) return 0
  return inTokens * rates.input + outTokens * rates.output
}

const buildDecomposePrompt = (locale: string) => {
  const localeNameMap: Record<string, string> = {
    zh: "中文", en: "English", ms: "Bahasa Melayu",
    ja: "日本語", ko: "한국어", th: "ภาษาไทย", es: "Español",
  }
  const langName = localeNameMap[locale] || "中文"
  return `[ROLE]
你是一位温柔的心理拆解师，为 DeepCalm AI 治愈空间的用户提供即时可执行的行动步骤。

[CRITICAL: RESPONSE_LANGUAGE_LOCK]
- 检测用户输入的主语言。
- 必须且只能使用与用户输入相同的语言输出 steps。
- 当前会话语言锁定为：${langName}。

[INSTRUCTION]
用户正在经历焦虑或情绪困扰。请将他们的处境拆解为 3 个极小、可立即执行的行动步骤。

规则：
1. 每步 ≤ 50 字，必须包含一个具体的感官锚点（触觉、温度、视觉、听觉、嗅觉）。
2. 步骤必须极其微小——用户坐着就能完成（如"把手放在胸口，感受心跳"），不能写"出去走走"。
3. 步骤使用${langName}输出。
4. 必须输出纯净 JSON，无任何其他内容。

输出格式：
{ "steps": ["第1步（感官锚点）", "第2步（感官锚点）", "第3步（感官锚点）"] }`
}

async function callLLM(
  systemPrompt: string,
  userText: string,
): Promise<{ content: string; usage: { model: string; inputTokens: number; outputTokens: number; cost: number } }> {
  const openAiKey = cleanEnv(process.env.OPENAI_API_KEY)
  const deepSeekKey = cleanEnv(process.env.DEEPSEEK_API_KEY)
  const openRouterKey = cleanEnv(process.env.OPENROUTER_API_KEY)
  const openRouterModel = cleanEnv(process.env.OPENROUTER_MODEL) || "openai/gpt-4o-mini"

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userText },
  ]

  /* 1. 尝试 OpenAI GPT-4o-mini */
  if (openAiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.7,
          max_tokens: 200,
          response_format: { type: "json_object" },
        }),
      })
      if (!res.ok) {
        const errBody = await res.text()
        console.error("OpenAI decompose error:", res.status, errBody)
        throw new Error(`OpenAI returned ${res.status}`)
      }
      const data = await res.json()
      const content: string = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      return {
        content,
        usage: {
          model: "gpt-4o-mini",
          inputTokens: usage.prompt_tokens || 0,
          outputTokens: usage.completion_tokens || 0,
          cost: calcCost("gpt-4o-mini", usage.prompt_tokens || 0, usage.completion_tokens || 0),
        },
      }
    } catch (err) {
      console.error("OpenAI decompose failed, trying DeepSeek:", (err as Error).message)
    }
  }

  /* 2. 降级：DeepSeek */
  if (deepSeekKey) {
    try {
      const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${deepSeekKey}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages,
          temperature: 0.7,
          max_tokens: 200,
          response_format: { type: "json_object" },
        }),
      })
      if (!res.ok) {
        const errBody = await res.text()
        console.error("DeepSeek decompose error:", res.status, errBody)
        throw new Error(`DeepSeek returned ${res.status}`)
      }
      const data = await res.json()
      const content: string = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      return {
        content,
        usage: {
          model: "deepseek-v4-flash",
          inputTokens: usage.prompt_tokens || 0,
          outputTokens: usage.completion_tokens || 0,
          cost: calcCost("deepseek-v4-flash", usage.prompt_tokens || 0, usage.completion_tokens || 0),
        },
      }
    } catch (err) {
      console.error("DeepSeek decompose failed, trying OpenRouter:", (err as Error).message)
    }
  }

  /* 3. 兜底：OpenRouter */
  if (openRouterKey) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openRouterKey}`,
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
      if (!res.ok) {
        const errBody = await res.text()
        console.error("OpenRouter decompose error:", res.status, errBody)
        throw new Error(`OpenRouter returned ${res.status}`)
      }
      const data = await res.json()
      const content: string = data.choices?.[0]?.message?.content || ""
      const usage = data.usage || { prompt_tokens: 0, completion_tokens: 0 }
      return {
        content,
        usage: {
          model: String(data.model || openRouterModel),
          inputTokens: usage.prompt_tokens || 0,
          outputTokens: usage.completion_tokens || 0,
          cost: calcCost("gpt-4o-mini", usage.prompt_tokens || 0, usage.completion_tokens || 0),
        },
      }
    } catch (err) {
      console.error("OpenRouter decompose failed:", (err as Error).message)
    }
  }

  throw new Error("All LLM backends unavailable for decompose")
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, locale = "zh" } = body

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "请提供有效的输入文本" }, { status: 400 })
    }

    const hasAnyKey =
      !!cleanEnv(process.env.OPENAI_API_KEY) ||
      !!cleanEnv(process.env.DEEPSEEK_API_KEY) ||
      !!cleanEnv(process.env.OPENROUTER_API_KEY)

    /* 无 API key：降级到本地 mock */
    if (!hasAnyKey) {
      console.warn("decompose: 无 API Key，降级到本地 mock")
      const fallback = mockAnalyze(locale as Locale, text.trim())
      return NextResponse.json({ steps: fallback.steps, usage: { model: "mock", inputTokens: 0, outputTokens: 0, cost: 0 } })
    }

    try {
      const result = await callLLM(buildDecomposePrompt(locale), text.trim())

      let parsed: { steps: string[] } | null = null
      try {
        parsed = JSON.parse(result.content)
      } catch {
        // attempt loose extraction
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

      if (!parsed || !Array.isArray(parsed.steps) || parsed.steps.length !== 3) {
        console.warn("decompose: LLM 返回格式异常，降级到 mock")
        const fallback = mockAnalyze(locale as Locale, text.trim())
        return NextResponse.json({ steps: fallback.steps, usage: result.usage })
      }

      if (parsed.steps.some((s: unknown) => typeof s !== "string" || !s.trim())) {
        const fallback = mockAnalyze(locale as Locale, text.trim())
        return NextResponse.json({ steps: fallback.steps, usage: result.usage })
      }

      return NextResponse.json({ steps: parsed.steps, usage: result.usage })
    } catch (err) {
      console.error("decompose: LLM 调用全部失败，降级到 mock:", (err as Error).message)
      const fallback = mockAnalyze(locale as Locale, text.trim())
      return NextResponse.json({ steps: fallback.steps, usage: { model: "mock", inputTokens: 0, outputTokens: 0, cost: 0 } })
    }
  } catch (err) {
    console.error("decompose internal error:", err)
    return NextResponse.json({ error: "服务器内部错误" }, { status: 500 })
  }
}
