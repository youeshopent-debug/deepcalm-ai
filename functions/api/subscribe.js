/**
 * Cloudflare Pages Function — subscribe
 *
 * Endpoint: POST /api/subscribe
 * Adds an email to the Resend audience (mailing list).
 * Requires env vars: RESEND_API_KEY, RESEND_AUDIENCE_ID
 */

function cleanEnv(v) {
  return String(v || "").replace(/\uFEFF/g, "").replace(/[\r\n]/g, "").trim()
}

async function addToResendAudience(email, lang, audienceId, apiKey) {
  try {
    const body = JSON.stringify({
      email,
      unsubscribed: false,
      metadata: { lang, subscribedAt: new Date().toISOString() },
    })

    const res = await fetch("https://api.resend.com/audiences/" + audienceId + "/contacts", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body,
    })

    const data = await res.json()

    if (res.status === 201) {
      return { success: true }
    }

    const msg = (data?.message || "").toLowerCase()
    if (res.status === 400 && (msg.includes("already") || msg.includes("exists"))) {
      return { success: true, already: true }
    }

    return { success: false, error: data?.message || "HTTP " + res.status }
  } catch (e) {
    return { success: false, error: e?.message || "network_error" }
  }
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
    const email = (body?.email || "").trim().toLowerCase()
    const lang = body?.lang || "en"

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !re.test(email)) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const audienceId = cleanEnv(env.RESEND_AUDIENCE_ID)
    const apiKey = cleanEnv(env.RESEND_API_KEY)

    if (!audienceId || !apiKey) {
      console.error("[subscribe] Missing env vars")
      return new Response(JSON.stringify({ ok: false, error: "service_unavailable" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    }

    const result = await addToResendAudience(email, lang, audienceId, apiKey)

    if (!result.success) {
      console.error("[subscribe] Resend error:", result.error)
      return new Response(JSON.stringify({ ok: false, error: "subscription_failed", detail: result.error }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }

    if (result.already) {
      return new Response(JSON.stringify({ ok: true, message: "already_subscribed" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    console.log("[subscribe] Success:", email, "(lang=" + lang + ")")
    return new Response(JSON.stringify({ ok: true, message: "subscribed" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err)
    return new Response(JSON.stringify({ ok: false, error: "internal_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
