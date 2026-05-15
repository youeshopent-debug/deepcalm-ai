export async function POST(request: Request) {
  try {
    const { text, targetLang } = await request.json()
    if (!text || !targetLang) {
      return Response.json({ error: "Missing text or targetLang" }, { status: 400 })
    }

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text.slice(0, 1000))}`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    const data = await res.json()

    const translated: string = data[0]?.[0]?.[0]
    const detectedLang: string = data[2] || "unknown"

    if (!translated) {
      return Response.json({ error: "Empty translation result" }, { status: 502 })
    }

    return Response.json({ translated, detectedLang })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return Response.json({ error: msg }, { status: 500 })
  }
}
