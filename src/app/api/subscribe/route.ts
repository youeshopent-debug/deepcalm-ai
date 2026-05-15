import { NextRequest, NextResponse } from "next/server";

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ""
const API_KEY = process.env.RESEND_API_KEY || ""

async function addToResendAudience(email: string, lang: string) {
  const https = require("https")
  return new Promise<{ success: boolean; already?: boolean; error?: string }>((resolve) => {
    const body = JSON.stringify({
      email,
      unsubscribed: false,
      metadata: { lang, subscribedAt: new Date().toISOString() },
    })
    const options = {
      hostname: "api.resend.com",
      path: `/audiences/${AUDIENCE_ID}/contacts`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    }
    const req = https.request(options, (res: any) => {
      let d = ""
      res.on("data", (c: any) => (d += c))
      res.on("end", () => {
        if (res.statusCode === 201) { resolve({ success: true }); return }
        if (res.statusCode === 400 && d.includes("already")) { resolve({ success: true, already: true }); return }
        try {
          const p = JSON.parse(d)
          resolve({ success: false, error: p.message || `HTTP ${res.statusCode}` })
        } catch { resolve({ success: false, error: d.slice(0, 200) }) }
      })
    })
    req.on("error", (e: any) => resolve({ success: false, error: e.message }))
    req.write(body)
    req.end()
  })
}

function buildWelcomeHtml(email: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to DeepCalm AI</title></head><body style="margin:0;padding:0;background-color:#0f1421;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a2238,#141a2e);border-radius:16px;border:1px solid rgba(126,184,255,0.15)"><tr><td style="padding:40px 32px;text-align:center"><div style="font-size:48px;margin-bottom:16px">&#127769;</div><h1 style="color:#e8edf5;font-size:22px;margin:0 0 8px;font-weight:600">You're In. Breathe Easy.</h1><p style="color:#8892b0;font-size:14px;line-height:1.6;margin:0 0 24px">Welcome, <strong style="color:#e8edf5">${email}</strong>. You're now part of the DeepCalm AI sanctuary.</p><p style="color:#8892b0;font-size:13px;line-height:1.6;margin:0 0 24px">Starting tomorrow at 8 PM SGT, you'll receive a daily personalized newsletter — gentle reflections on your mental wellness, crafted just for you by AI.</p><div style="text-align:center;margin:24px 0"><a href="https://deepcalm-ai.com/en" style="display:inline-block;background:#7eb8ff;color:#0f1421;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none">Start Your First Session &rarr;</a></div><hr style="border:none;border-top:1px solid rgba(126,184,255,0.1);margin:24px 0"><p style="color:#5a6484;font-size:12px;line-height:1.5;margin:0">Midnight Sanctuary &middot; DeepCalm AI &middot; <a href="mailto:alanlsl8208@gmail.com" style="color:#5a6484;text-decoration:none">Unsubscribe</a></p></td></tr></table></td></tr></table></body></html>`
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email: string = (body?.email || "").trim().toLowerCase()
    const lang: string = body?.lang || "en"

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !re.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 })
    }

    if (!AUDIENCE_ID || !API_KEY) {
      return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 })
    }

    const res = await addToResendAudience(email, lang)
    if (!res.success) {
      console.error("[subscribe] failed:", res.error)
      return NextResponse.json({ ok: false, error: "subscription_failed" }, { status: 500 })
    }

    if (res.already) {
      return NextResponse.json({ ok: true, message: "already_subscribed" })
    }

    return NextResponse.json({ ok: true, message: "subscribed" })
  } catch (err) {
    console.error("[subscribe] error:", err)
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
  }
}
