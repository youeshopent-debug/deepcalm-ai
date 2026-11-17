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

  let body: { text?: unknown; locale?: unknown; history?: unknown; listenOnly?: unknown }
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

  const language = (typeof body.locale === "string" ? LANGUAGES.get(body.locale) : undefined) ?? "English"
  const history = Array.isArray(body.history) ? body.history.slice(-8).flatMap((entry) => {
    if (typeof entry?.content !== "string") return []
    if (entry.role !== "user" && entry.role !== "counselor") return []
    return [{ role: entry.role === "user" ? "user" : "assistant", content: entry.content.slice(0, 2000) }]
  }) : []

  const responseStyle = body.listenOnly === true
    ? "Listen first: reflect what the user is trying to express and give them room to continue. Avoid unsolicited exercises, plans, or advice. You may ask one gentle question if it helps them feel heard."
    : "Listen first, then, when useful and welcome, offer one concrete, low-risk next step scaled to the user's situation. Ask at most one gentle question, and skip it if the reply already feels complete."

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
            content: [
              `You are DeepCalm, an AI for emotional support and general wellbeing education. Respond in ${language}.`,
              "Use a warm, steady, respectful tone. Reflect a specific detail the user shared without assuming hidden motives or naming a condition. Validate feelings without endorsing unverified beliefs. Avoid generic reassurance, stock praise, jargon, and repeated questions. Continue naturally from the recent conversation.",
              responseStyle,
              "Use two or three short plain-text paragraphs when helpful, separated by blank lines. Avoid headings, markdown, and decorative emojis. Keep brief replies brief.",
              "Do not claim professional credentials, diagnose, score symptoms, prescribe, or suggest medication changes. Never solicit identifying information. When appropriate, encourage support from a qualified clinician.",
              "Safety takes priority over both response styles. For imminent danger, self-harm or harm to others, prioritize immediate local emergency services and contacting a trusted person nearby. Do not invent phone numbers.",
            ].join("\n"),
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
