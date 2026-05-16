import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"

function cleanEnv(v: unknown): string {
  return String(v || "")
    .replace(/\uFEFF/g, "")
    .replace(/[\r\n]/g, "")
    .trim()
}

const AUDIENCE_ID = cleanEnv(process.env.RESEND_AUDIENCE_ID)
const API_KEY = cleanEnv(process.env.RESEND_API_KEY)

async function addToResendAudience(email: string, lang: string) {
  try {
    const body = JSON.stringify({
      email,
      unsubscribed: false,
      metadata: { lang, subscribedAt: new Date().toISOString() },
    })

    const res = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
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

    return { success: false, error: data?.message || `HTTP ${res.status}` }
  } catch (e: any) {
    return { success: false, error: e?.message || "network_error" }
  }
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
      console.error("[subscribe] Missing env vars — AUDIENCE_ID:", !!AUDIENCE_ID, "API_KEY:", !!API_KEY)
      return NextResponse.json({ ok: false, error: "service_unavailable" }, { status: 503 })
    }

    const res = await addToResendAudience(email, lang)

    if (!res.success) {
      console.error("[subscribe] Resend error:", res.error)
      return NextResponse.json({ ok: false, error: "subscription_failed", detail: res.error }, { status: 500 })
    }

    if (res.already) {
      return NextResponse.json({ ok: true, message: "already_subscribed" })
    }

    console.log(`[subscribe] Success: ${email} (lang=${lang})`)
    return NextResponse.json({ ok: true, message: "subscribed" })
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err)
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
  }
}
