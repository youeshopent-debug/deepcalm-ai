import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import fs from "fs"
import path from "path"

interface Subscriber {
  email: string
  subscribedAt: string
  lang?: string
}

const DATA_FILE = path.join(process.cwd(), "data", "subscribers.json")
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

function readSubscribers(): Subscriber[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return []
    const raw = fs.readFileSync(DATA_FILE, "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function writeSubscribers(list: Subscriber[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8")
  } catch (err) {
    console.error("[subscribe] failed to write subscribers.json:", err)
  }
}

function buildConfirmHtml(email: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to DeepCalm AI</title></head><body style="margin:0;padding:0;background-color:#0f1421;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a2238,#141a2e);border-radius:16px;border:1px solid rgba(126,184,255,0.15)"><tr><td style="padding:40px 32px;text-align:center"><div style="font-size:48px;margin-bottom:16px">&#127769;</div><h1 style="color:#e8edf5;font-size:22px;margin:0 0 8px;font-weight:600">You're In. Breathe Easy.</h1><p style="color:#8892b0;font-size:14px;line-height:1.6;margin:0 0 24px">Welcome to the DeepCalm AI community, <strong style="color:#e8edf5">${email}</strong>.</p><p style="color:#8892b0;font-size:13px;line-height:1.6;margin:0 0 24px">Starting tomorrow, you'll receive your daily healing report — a gentle reflection on your sleep, mood, and a personal AI-crafted note to carry with you through the day.</p><hr style="border:none;border-top:1px solid rgba(126,184,255,0.1);margin:24px 0"><p style="color:#5a6484;font-size:12px;line-height:1.5;margin:0">If you didn't sign up for this, you can safely ignore this email — or <a href="mailto:alanlsl8208@gmail.com" style="color:#7eb8ff;text-decoration:none">let us know</a> and we'll sort it out.</p></td></tr></table></td></tr></table></body></html>`
}

function buildNotifyHtml(subscriber: Subscriber): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>New DeepCalm Subscriber</title></head><body style="margin:0;padding:0;background-color:#0f1421;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a2238,#141a2e);border-radius:16px;border:1px solid rgba(126,184,255,0.15)"><tr><td style="padding:32px"><h2 style="color:#e8edf5;font-size:18px;margin:0 0 16px">&#128233; New Subscription</h2><table cellpadding="8" cellspacing="0" style="color:#8892b0;font-size:13px;width:100%"><tr><td style="color:#5a6484;width:100px">Email</td><td style="color:#e8edf5;word-break:break-all">${subscriber.email}</td></tr><tr><td style="color:#5a6484">Time</td><td style="color:#e8edf5">${subscriber.subscribedAt}</td></tr><tr><td style="color:#5a6484">Language</td><td style="color:#e8edf5">${subscriber.lang || "&mdash;"}</td></tr></table><hr style="border:none;border-top:1px solid rgba(126,184,255,0.1);margin:20px 0"><p style="color:#5a6484;font-size:11px;margin:0">DeepCalm AI &middot; Midnight Sanctuary</p></td></tr></table></td></tr></table></body></html>`
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

    const list = readSubscribers()
    if (list.some((s) => s.email === email)) {
      return NextResponse.json({ ok: true, message: "already_subscribed" })
    }

    const subscriber: Subscriber = { email, subscribedAt: new Date().toISOString(), lang }
    list.push(subscriber)
    writeSubscribers(list)

    if (!resend) {
      console.warn("[subscribe] RESEND_API_KEY not configured — email stored but not sent")
      return NextResponse.json({ ok: true, message: "subscribed_no_email" })
    }

    const from = process.env.MAIL_FROM || "DeepCalm AI <onboarding@resend.dev>"
    const notifyTo = process.env.MAIL_TO || "alanlsl8208@gmail.com"

    const [confirmRes, notifyRes] = await Promise.allSettled([
      resend.emails.send({
        from,
        to: email,
        subject: "🌙 Welcome to DeepCalm AI — Your Daily Healing Starts Now",
        html: buildConfirmHtml(email),
      }),
      resend.emails.send({
        from,
        to: notifyTo,
        subject: `📩 New DeepCalm Subscriber: ${email}`,
        html: buildNotifyHtml(subscriber),
      }),
    ])

    if (confirmRes.status === "rejected") {
      console.error("[subscribe] confirm email failed:", confirmRes.reason)
    }
    if (notifyRes.status === "rejected") {
      console.error("[subscribe] notify email failed:", notifyRes.reason)
    }

    return NextResponse.json({ ok: true, message: "subscribed" })
  } catch (err) {
    console.error("[subscribe] error:", err)
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
  }
}
