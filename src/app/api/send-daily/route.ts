import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ""

const TOPICS_EN = [
  "Start your day with a mindful moment — close your eyes and take three deep breaths.",
  "Remember: your mental health matters. Small steps each day lead to big changes over time.",
  "You showed up today. That's already an act of self-care.",
  "Tonight, try a 5-minute gratitude practice before sleep.",
  "Progress isn't always visible. Rest is also progress.",
]

const TOPICS_ZH = [
  "今天，你愿意花点时间跟自己对话吗？哪怕只是三分钟。",
  "记住：照顾好自己的情绪，本身就是一种力量。",
  "你今天愿意点开这个邮件，已经是自我关怀的第一步了。",
  "今晚睡前，试试写下三件让你感到温暖的小事。",
  "有时候，停下来也是一种前进。",
]

function buildDailyEmail(name: string, lang: string, dayOfWeek: string): string {
  const topics = lang === "zh" ? TOPICS_ZH : TOPICS_EN
  const topic = topics[Math.floor(Math.random() * topics.length)]
  const dateStr = new Date().toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  })

  const bg = lang === "zh"
    ? `<h2 style="color:#e8edf5;font-size:18px;margin:0 0 20px">&#127793; 今日心灵养料</h2>`
    : `<h2 style="color:#e8edf5;font-size:18px;margin:0 0 20px">&#127793; Today's Mindful Moment</h2>`

  const tip = lang === "zh"
    ? `<p style="color:#7eb8ff;font-size:15px;line-height:1.7;margin:0 0 24px">${topic}</p>`
    : `<p style="color:#7eb8ff;font-size:15px;line-height:1.7;margin:0 0 24px">${topic}</p>`

  const cta = lang === "zh"
    ? `<a href="https://deepcalm-ai.com/${lang === 'zh' ? 'zh' : 'en'}" style="display:inline-block;background:#7eb8ff;color:#0f1421;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;margin:8px 0">开启今日心理陪伴 &rarr;</a>`
    : `<a href="https://deepcalm-ai.com/en" style="display:inline-block;background:#7eb8ff;color:#0f1421;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none;margin:8px 0">Start Today's Session &rarr;</a>`

  const greeting = lang === "zh"
    ? `亲爱的 ${name || "朋友"}，晚安`
    : `Good evening, ${name || "friend"}`

  return `<!DOCTYPE html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DeepCalm AI — Daily Sanctuary</title></head><body style="margin:0;padding:0;background-color:#0a0e1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"><table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px"><table width="560" cellpadding="0" cellspacing="0" style="background:linear-gradient(160deg,#131b30,#0d1225);border-radius:20px;border:1px solid rgba(126,184,255,0.12);overflow:hidden"><tr><td style="padding:40px 36px"><div style="font-size:40px;margin-bottom:16px">&#127769;</div><p style="color:#5a6484;font-size:12px;margin:0 0 4px">${dateStr}</p><h1 style="color:#e8edf5;font-size:24px;margin:0 0 8px;font-weight:600">${greeting}</h1><p style="color:#8892b0;font-size:13px;margin:0 0 32px">DeepCalm AI &middot; Midnight Sanctuary</p><hr style="border:none;border-top:1px solid rgba(126,184,255,0.08);margin:0 0 32px">${bg}${tip}<div style="text-align:center;margin:24px 0">${cta}</div><hr style="border:none;border-top:1px solid rgba(126,184,255,0.08);margin:28px 0 24px"><p style="color:#3a4460;font-size:11px;text-align:center;margin:0">You received this because you subscribed to DeepCalm AI.<br><a href="#" style="color:#3a4460;text-decoration:none">Unsubscribe</a></p></td></tr></table></td></tr></table></body></html>`
}

export async function GET(req: NextRequest) {
  try {
    const cronSecret = process.env.CRON_SECRET
    const authHeader = req.headers.get("x-cron-secret")

    if (cronSecret && authHeader !== cronSecret) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 })
    }

    if (!resend || !AUDIENCE_ID) {
      console.error("[send-daily] RESEND_API_KEY or AUDIENCE_ID not configured")
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 })
    }

    const listRes = await resend.contacts.list({ audienceId: AUDIENCE_ID })
    if (listRes.error) {
      console.error("[send-daily] failed to list contacts:", listRes.error)
      return NextResponse.json({ ok: false, error: "list_failed" }, { status: 500 })
    }

    const contacts = listRes.data?.data || []
    if (contacts.length === 0) {
      return NextResponse.json({ ok: true, sent: 0, message: "no subscribers" })
    }

    const dayOfWeek = new Date().toLocaleDateString("en-US", { weekday: "long" })
    const results = await Promise.allSettled(
      contacts.map((c) =>
        resend!.emails.send({
          from: "DeepCalm AI <onboarding@resend.dev>",
          to: c.email,
          subject: dayOfWeek === "Sunday" || dayOfWeek === "Saturday"
            ? "🌙 DeepCalm: Your Weekend Sanctuary Awaits"
            : "🌙 DeepCalm: Your Evening Sanctuary",
          html: buildDailyEmail((c as any).first_name || c.email.split("@")[0], (c as any).metadata?.lang || "en", dayOfWeek),
        })
      )
    )

    const sent = results.filter((r) => r.status === "fulfilled" && !(r as PromiseFulfilledResult<any>).value?.error).length
    const failed = results.length - sent

    console.log(`[send-daily] sent=${sent} failed=${failed} total=${contacts.length}`)

    return NextResponse.json({ ok: true, sent, failed, total: contacts.length })
  } catch (err) {
    console.error("[send-daily] error:", err)
    return NextResponse.json({ ok: false, error: "internal_error" }, { status: 500 })
  }
}
