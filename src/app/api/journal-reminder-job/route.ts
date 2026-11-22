import { timingSafeEqual } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const maxDuration = 30

type Reminder = { owner_id: string; email: string; language: "zh" | "en"; local_day: string }

export async function POST(request: NextRequest) {
  const { JOURNAL_REMINDER_CRON_SECRET: secret, JOURNAL_SUPABASE_URL: url,
    JOURNAL_SUPABASE_PUBLIC_KEY: key, RESEND_API_KEY: resendKey } = process.env
  const supplied = Buffer.from(request.headers.get("authorization") || "")
  const expected = Buffer.from("Bearer " + (secret || ""))
  if (!secret || supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }
  if (!url || !key || !resendKey) return NextResponse.json({ error: "unavailable" }, { status: 503 })

  async function rpc(name: string, params: object) {
    const response = await fetch(new URL("/rest/v1/rpc/" + name, url), {
      method: "POST", cache: "no-store", signal: AbortSignal.timeout(4000),
      headers: { apikey: key!, "Content-Type": "application/json" },
      body: JSON.stringify({ p_secret: secret, ...params }),
    })
    if (!response.ok) throw Error("Reminder database request failed")
    return response
  }

  let reminders: Reminder[]
  try {
    reminders = await (await rpc("claim_mood_reminders", {})).json()
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 503 })
  }
  let sent = 0
  // Keep a slow or rate-limited provider within the route's execution limit.
  const deadline = Date.now() + 17000
  for (const reminder of reminders) {
    if (Date.now() >= deadline) break
    const zh = reminder.language === "zh"
    const settings = "https://deepcalm-ai.com/" + reminder.language + "/journal"
    const text = zh
      ? "想留一句话给自己吗？有空时来写一条情绪小日记。\n\n" + settings + "\n\n可以在日记的「邮件提醒」里关闭。"
      : "Would you like to leave yourself a note today? Open your journal when you have a moment.\n\n" + settings + "\n\nYou can turn off reminders in the journal's Email reminders settings."
    try {
      const email = await fetch("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(4000),
        headers: {
          Authorization: "Bearer " + resendKey,
          "Content-Type": "application/json",
          "Idempotency-Key": "mood-reminder/" + reminder.owner_id + "/" + reminder.local_day,
        },
        body: JSON.stringify({
          from: "DeepCalm AI <noreply@deepcalm-ai.com>",
          to: [reminder.email], subject: zh ? "给自己留一点时间" : "A moment for yourself", text,
        }),
      })
      if (email.ok) {
        await rpc("complete_mood_reminder", { p_owner: reminder.owner_id, p_day: reminder.local_day })
        sent++
      }
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 300))
  }
  return NextResponse.json({ sent, claimed: reminders.length }, { headers: { "Cache-Control": "no-store" } })
}
