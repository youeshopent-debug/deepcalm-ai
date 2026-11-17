const LANGUAGES = new Map([
  ["zh", "Simplified Chinese"], ["en", "English"], ["ms", "Malay"],
  ["ja", "Japanese"], ["ko", "Korean"], ["th", "Thai"], ["es", "Spanish"],
])

function failure(status: number) {
  return Response.json({ error: "Chat unavailable" }, { status })
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  if (origin && origin !== new URL(request.url).origin) return failure(403)

  let body
  try {
    const raw = await request.text()
    if (raw.length > 30_000) return failure(413)
    body = JSON.parse(raw)
  } catch {
    return failure(400)
  }
  const text = typeof body?.text === "string" ? body.text.trim() : ""
  if (!text || text.length > 2000) return failure(400)

  const apiKey = process.env.OPENAI_API_KEY?.trim()
  if (!apiKey) return failure(503)

  const language = LANGUAGES.get(body.locale) ?? "English"
  const history = Array.isArray(body.history) ? body.history.slice(-8).flatMap((entry) => {
    if (typeof entry?.content !== "string") return []
    if (entry.role !== "user" && entry.role !== "counselor") return []
    return [{ role: entry.role === "user" ? "user" : "assistant", content: entry.content.slice(0, 2000) }]
  }) : []

  try {
    const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL?.trim() || "gpt-4o-mini",
        store: false,
        max_completion_tokens: 420,
        messages: [
          {
            role: "system",
            content: `You are DeepCalm, an AI for emotional support and general wellbeing education. Respond in ${language}. Acknowledge the user's feelings, offer one practical low-risk next step if appropriate, and ask at most one gentle question. Use short plain-text paragraphs. Do not claim professional credentials, diagnose, score symptoms, prescribe, or suggest medication changes. For imminent danger, self-harm or harm to others, prioritize immediate local emergency services and contacting a trusted person nearby; do not invent phone numbers. For ongoing concerns encourage support from a qualified clinician. Never solicit identifying information.`,
          },
          ...history,
          { role: "user", content: text },
        ],
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(12_000),
    })
    if (!upstream.ok) return failure(503)
    const result = await upstream.json()
    const content = result.choices?.[0]?.message?.content
    if (typeof content !== "string" || !content.trim()) return failure(503)
    return Response.json({ content: content.trim() }, { headers: { "Cache-Control": "no-store" } })
  } catch {
    return failure(503)
  }
}
