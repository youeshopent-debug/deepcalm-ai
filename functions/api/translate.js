/**
 * Cloudflare Pages Function — translate
 *
 * Endpoint: POST /api/translate
 * Proxies text translation via Google Translate API (free, no key required).
 */

export async function onRequest(context) {
  const { request } = context

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "POST" },
    })
  }

  try {
    const { text, targetLang } = await request.json()

    if (!text || !targetLang) {
      return new Response(JSON.stringify({ error: "Missing text or targetLang" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" +
      encodeURIComponent(targetLang) +
      "&dt=t&q=" +
      encodeURIComponent(String(text).slice(0, 1000))

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    const data = await res.json()

    const translated = data[0]?.[0]?.[0]
    const detectedLang = data[2] || "unknown"

    if (!translated) {
      return new Response(JSON.stringify({ error: "Empty translation result" }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ translated, detectedLang }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error"
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
