import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ""

function buildConfirmHtml(): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to DeepCalm AI</title></head><body style="margin:0;padding:0;background-color:#0f1421;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a2238,#141a2e);border-radius:16px;border:1px solid rgba(126,184,255,0.15)"><tr><td style="padding:40px 32px;text-align:center"><div style="font-size:48px;margin-bottom:16px">&#127769;</div><h1 style="color:#e8edf5;font-size:22px;margin:0 0 8px;font-weight:600">You're In. Breathe Easy.</h1><p style="color:#8892b0;font-size:14px;line-height:1.6;margin:0 0 24px">Welcome to DeepCalm AI — your daily sanctuary for mental wellness and AI-guided reflection.</p><p style="color:#8892b0;font-size:13px;line-height:1.6;margin:0 0 24px">Starting tomorrow, you'll receive a personalized daily healing report — a gentle reflection on your mood, sleep quality, and a warm note to carry you through the day.</p><hr style="border:none;border-top:1px solid rgba(126,184,255,0.1);margin:24px 0"><p style="color:#5a6484;font-size:12px;line-height:1.5;margin:0">Midnight Sanctuary &middot; DeepCalm AI</p></td></tr></table></td></tr></table></body></html>`
}

function buildNotifyHtml(email: string, lang: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>New DeepCalm Subscriber</title></head><body style="margin:0;padding:0;background-color:#0f1421;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a2238,#141a2e);border-radius:16px;border:1px solid rgba(126,184,255,0.15)"><tr><td style="padding:32px"><h2 style="color:#e8edf5;font-size:18px;margin:0 0 16px">&#128233; New Subscription</h2><table cellpadding="8" cellspacing="0" style="color:#8892b0;font-size:13px;width:100%"><tr><td style="color:#5a6484;width:100px">Email</td><td style="color:#e8edf5;word-break:break-all">${email}</td></tr><tr><td style="color:#5a6484">Language</td><td style="color:#e8edf5">${lang}</td></tr><tr><td style="color:#5a6484">Time</td><td style="color:#e8edf5">${new Date().toISOString()}</td></tr></table><hr style="border:none;border-top:1px solid rgba(126,184,255,0.1);margin:20px 0"><p style="color:#5a6484;font-size:11px;margin:0">DeepCalm AI &middot; Midnight Sanctuary</p></td></tr></table></td></tr></table></body></html>`
}

async function resendPost(path: string, body: Record<string, unknown>) {
  const res = await resend!.post(path, body as any) as any
  return res
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email: string = body?.email?.trim().toLowerCase()
    const lang: string = body?.lang || "en"

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !re.test(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 })
    }

    if (!resend || !AUDIENCE_ID) {
      console.error("[subscribe] RESEND_API_KEY or AUDIENCE_ID not configured")
      return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 })
    }

    const upsertRes = await resendPost(
      `/audiences/${AUDIENCE_ID}/contacts`,
      { email, unsubscribed: false, metadata: { lang, subscribedAt: new Date().toISOString() } }
    ) as any

    if (upsertRes.error) {
      const msg = upsertRes.error?.message || ""
      if (msg.toLowerCase().includes("already")) {
        return NextResponse.json({ ok: true, message: "already_subscribed" })
      }
      console.error("[subscribe] contact create failed:", upsertRes.error)
      return NextResponse.json({ ok: false, error: "resend_error" }, { status: 500 })
    }

    await Promise.allSettled([
      resend!.post("/email", {
        from: "DeepCalm AI <onboarding@resend.dev>",
        to: email,
        subject: "🌙 Welcome to DeepCalm AI — Your Daily Healing Starts Now",
        html: buildConfirmHtml(),
      }),
      resend!.post("/email", {
        from: "DeepCalm AI <onboarding@resend.dev>",
        to: "alanlsl8208@gmail.com",
        subject: `📩 New DeepCalm Subscriber: ${email}`,
        html: buildNotifyHtml(email, lang),
      }),
    ])

    return NextResponse.json({ ok: true, message: "subscribed" })
  } catch (err) {
    console.error("[subscribe] error:", err)
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
  }
}
