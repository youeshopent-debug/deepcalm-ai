import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ""

async function addToResendAudience(email: string, lang: string) {
  const https = require("https")
  const API_KEY = process.env.RESEND_API_KEY || ""

  return new Promise<{ success: boolean; error?: string }>((resolve) => {
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
        try {
          const parsed = JSON.parse(d)
          if (parsed.id) resolve({ success: true })
          else if ((parsed.message || "").toLowerCase().includes("already"))
            resolve({ success: true })
          else resolve({ success: false, error: parsed.message || "unknown" })
        } catch {
          resolve({ success: false, error: d.slice(0, 200) })
        }
      })
    })
    req.on("error", (e: any) => resolve({ success: false, error: e.message }))
    req.write(body)
    req.end()
  })
}

function buildConfirmHtml(): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Welcome to DeepCalm AI</title></head><body style="margin:0;padding:0;background-color:#0f1421;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a2238,#141a2e);border-radius:16px;border:1px solid rgba(126,184,255,0.15)"><tr><td style="padding:40px 32px;text-align:center"><div style="font-size:48px;margin-bottom:16px">&#127769;</div><h1 style="color:#e8edf5;font-size:22px;margin:0 0 8px;font-weight:600">You're In. Breathe Easy.</h1><p style="color:#8892b0;font-size:14px;line-height:1.6;margin:0 0 24px">Welcome to DeepCalm AI — your daily sanctuary for mental wellness and AI-guided reflection.</p><p style="color:#8892b0;font-size:13px;line-height:1.6;margin:0 0 24px">Starting tomorrow, you'll receive a personalized daily healing report — a gentle reflection on your mood, sleep quality, and a warm note to carry you through the day.</p><hr style="border:none;border-top:1px solid rgba(126,184,255,0.1);margin:24px 0"><p style="color:#5a6484;font-size:12px;line-height:1.5;margin:0">Midnight Sanctuary &middot; DeepCalm AI</p></td></tr></table></td></tr></table></body></html>`
}

function buildNotifyHtml(email: string, lang: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>New DeepCalm Subscriber</title></head><body style="margin:0;padding:0;background-color:#0f1421;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a2238,#141a2e);border-radius:16px;border:1px solid rgba(126,184,255,0.15)"><tr><td style="padding:32px"><h2 style="color:#e8edf5;font-size:18px;margin:0 0 16px">&#128233; New Subscription</h2><table cellpadding="8" cellspacing="0" style="color:#8892b0;font-size:13px;width:100%"><tr><td style="color:#5a6484;width:100px">Email</td><td style="color:#e8edf5;word-break:break-all">${email}</td></tr><tr><td style="color:#5a6484">Language</td><td style="color:#e8edf5">${lang}</td></tr><tr><td style="color:#5a6484">Time</td><td style="color:#e8edf5">${new Date().toISOString()}</td></tr></table><hr style="border:none;border-top:1px solid rgba(126,184,255,0.1);margin:20px 0"><p style="color:#5a6484;font-size:11px;margin:0">DeepCalm AI &middot; Midnight Sanctuary</p></td></tr></table></td></tr></table></body></html>`
}

async function sendGmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER || "alanlsl8208@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD || "",
    },
  })
  if (!process.env.GMAIL_APP_PASSWORD) {
    return { success: false, error: "GMAIL_APP_PASSWORD not set" }
  }
  try {
    await transporter.sendMail({
      from: `"DeepCalm AI" <alanlsl8208@gmail.com>`,
      to,
      subject,
      html,
    })
    return { success: true }
  } catch (e: any) {
    console.error("[sendGmail] failed:", e.message)
    return { success: false, error: e.message }
  }
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

    if (!AUDIENCE_ID || !process.env.RESEND_API_KEY) {
      console.error("[subscribe] RESEND_API_KEY or AUDIENCE_ID not configured")
      return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 })
    }

    const audienceRes = await addToResendAudience(email, lang)
    if (!audienceRes.success) {
      console.error("[subscribe] audience add failed:", audienceRes.error)
      return NextResponse.json({ ok: false, error: "resend_error" }, { status: 500 })
    }

    const gmailResults = await Promise.allSettled([
      sendGmail(email, "🌙 Welcome to DeepCalm AI — Your Daily Healing Starts Now", buildConfirmHtml()),
      sendGmail("alanlsl8208@gmail.com", `📩 New DeepCalm Subscriber: ${email}`, buildNotifyHtml(email, lang)),
    ])

    const confirmed = gmailResults[0].status === "fulfilled" && gmailResults[0].value.success
    const notified = gmailResults[1].status === "fulfilled" && gmailResults[1].value.success

    console.log(`[subscribe] audience=added confirmed=${confirmed} owner_notified=${notified}`)

    return NextResponse.json({ ok: true, message: "subscribed" })
  } catch (err) {
    console.error("[subscribe] error:", err)
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
  }
}
