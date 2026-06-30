/**
 * Cloudflare Pages Function — send-daily
 *
 * Endpoint: GET /api/send-daily
 * Cron-triggered: Sends daily mindfulness emails via Resend API.
 * Protected by x-cron-secret header.
 * Supports ?dryRun=1 for dry-run testing.
 *
 * NOTE: Cron triggers for Pages Functions must be configured in
 * Cloudflare Dashboard -> Workers & Pages -> deepcalm-ai -> Cron Triggers.
 * The route is: https://deepcalm-ai.com/api/send-daily
 */

function cleanEnv(v) {
  return String(v || "").replace(/\uFEFF/g, "").replace(/[\r\n]/g, "").trim()
}

const TOPICS_EN = [
  "Start your day with a mindful moment \u2014 close your eyes and take three deep breaths.",
  "Remember: your mental health matters. Small steps each day lead to big changes over time.",
  "You showed up today. That\u2019s already an act of self-care.",
  "Tonight, try a 5-minute gratitude practice before sleep.",
  "Progress isn\u2019t always visible. Rest is also progress.",
]

const TOPICS_ZH = [
  "\u4eca\u5929\uff0c\u4f60\u613f\u610f\u82b1\u70b9\u65f6\u95f4\u8ddf\u81ea\u5df1\u5bf9\u8bdd\u5417\uff1f\u54ea\u6015\u53ea\u662f\u4e09\u5206\u949f\u3002",
  "\u8bb0\u4f4f\uff1a\u7167\u987e\u597d\u81ea\u5df1\u7684\u60c5\u7eea\uff0c\u672c\u8eab\u5c31\u662f\u4e00\u79cd\u529b\u91cf\u3002",
  "\u4f60\u4eca\u5929\u613f\u610f\u70b9\u5f00\u8fd9\u5c01\u90ae\u4ef6\uff0c\u5df2\u7ecf\u662f\u81ea\u6211\u5173\u6000\u7684\u7b2c\u4e00\u6b65\u4e86\u3002",
  "\u4eca\u665a\u7761\u524d\uff0c\u8bd5\u8bd5\u5199\u4e0b\u4e09\u4ef6\u8ba9\u4f60\u611f\u5230\u6e29\u6696\u7684\u5c0f\u4e8b\u3002",
  "\u6709\u65f6\u5019\uff0c\u505c\u4e0b\u6765\u4e5f\u662f\u4e00\u79cd\u524d\u8fdb\u3002",
]

function buildDailyEmailHTML(name, lang, dayOfWeek) {
  const topics = lang === "zh" ? TOPICS_ZH : TOPICS_EN
  const topic = topics[Math.floor(Math.random() * topics.length)]
  const dateStr = new Date().toLocaleDateString(lang === "zh" ? "zh-CN" : "en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  })
  const isWeekend = dayOfWeek === "Sunday" || dayOfWeek === "Saturday"
  const greeting = lang === "zh"
    ? "\u4eb2\u7231\u7684 " + (name || "\u670b\u53cb") + "\uff0c\u665a\u5b89"
    : "Good evening, " + (name || "friend")

  const ctaText = isWeekend
    ? (lang === "zh" ? "\u5f00\u542f\u5468\u672b\u5fc3\u7075\u966a\u4f34" : "Start Your Weekend Session")
    : (lang === "zh" ? "\u5f00\u542f\u4eca\u65e5\u5fc3\u7406\u966a\u4f34" : "Start Today\u2019s Session")

  return "<!DOCTYPE html><html lang=\"" + lang + "\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\"><title>DeepCalm AI \u2014 Daily Sanctuary</title></head><body style=\"margin:0;padding:0;background-color:#0a0e1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif\"><table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tr><td align=\"center\" style=\"padding:40px 20px\"><table width=\"560\" cellpadding=\"0\" cellspacing=\"0\" style=\"background:linear-gradient(160deg,#131b30,#0d1225);border-radius:20px;border:1px solid rgba(126,184,255,0.12);overflow:hidden\"><tr><td style=\"padding:40px 36px\"><div style=\"font-size:40px;margin-bottom:16px\">&#127769;</div><p style=\"color:#5a6484;font-size:12px;margin:0 0 4px\">" + dateStr + "</p><h1 style=\"color:#e8edf5;font-size:24px;margin:0 0 8px;font-weight:600\">" + greeting + "</h1><p style=\"color:#8892b0;font-size:13px;margin:0 0 32px\">DeepCalm AI &middot; Midnight Sanctuary</p><hr style=\"border:none;border-top:1px solid rgba(126,184,255,0.08);margin:0 0 32px\"><h2 style=\"color:#e8edf5;font-size:18px;margin:0 0 20px\">" + (lang === "zh" ? "&#127793; \u4eca\u65e5\u5fc3\u7075\u517b\u6599" : "&#127793; Today's Mindful Moment") + "</h2><p style=\"color:#7eb8ff;font-size:15px;line-height:1.7;margin:0 0 24px\">" + topic + "</p><div style=\"text-align:center;margin:24px 0\"><a href=\"https://deepcalm-ai.com/" + (lang === "zh" ? "zh" : "en") + "\" style=\"display:inline-block;background:#7eb8ff;color:#0f1421;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;text-decoration:none\">" + ctaText + " &rarr;</a></div><hr style=\"border:none;border-top:1px solid rgba(126,184,255,0.08);margin:28px 0 24px\"><p style=\"color:#3a4460;font-size:11px;text-align:center;margin:0\">You received this because you subscribed to DeepCalm AI.</p></td></tr></table></td></tr></table></body></html>"
}

async function fetchAudienceContacts(audienceId, apiKey) {
  try {
    const res = await fetch("https://api.resend.com/audiences/" + audienceId + "/contacts", {
      headers: { Authorization: "Bearer " + apiKey },
    })
    const data = await res.json()
    // Resend API returns { object: "list", data: [{ email, ... }] }
    return data?.data || []
  } catch {
    return []
  }
}

async function sendEmail(to, subject, html, apiKey, from) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], subject, html }),
    })
    const data = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, data }
  } catch {
    return { ok: false, status: 0, data: { message: "network_error" } }
  }
}

export async function onRequest(context) {
  const { request, env } = context

  if (request.method !== "GET") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json", Allow: "GET" },
    })
  }

  try {
    const cronSecret = cleanEnv(env.CRON_SECRET)
    const authHeader = request.headers.get("x-cron-secret")
    if (cronSecret && authHeader !== cronSecret) {
      return new Response(JSON.stringify({ ok: false, error: "unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const url = new URL(request.url)
    const dryRun = url.searchParams.get("dryRun") === "1"
    const audienceId = cleanEnv(env.RESEND_AUDIENCE_ID)
    const apiKey = cleanEnv(env.RESEND_API_KEY)
    const resendFrom = cleanEnv(env.RESEND_FROM) || "DeepCalm AI <onboarding@resend.dev>"

    if (!audienceId || !apiKey) {
      return new Response(JSON.stringify({ ok: false, error: "not_configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      })
    }

    const contacts = await fetchAudienceContacts(audienceId, apiKey)
    if (contacts.length === 0) {
      return new Response(JSON.stringify({ ok: true, sent: 0, message: "no subscribers" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const dayOfWeek = new Date().toLocaleDateString("en-US", { weekday: "long" })

    const subscribers = contacts.map((c) => ({
      email: c.email,
      lang: c.metadata?.lang || "en",
      name: c.first_name || c.email.split("@")[0],
    }))

    if (dryRun) {
      return new Response(JSON.stringify({ ok: true, via: "dryRun", sent: 0, total: contacts.length, subscribers }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    }

    const limit = Math.max(1, Math.min(50, Number(env.DAILY_SEND_LIMIT || 30)))
    const targets = subscribers.slice(0, limit)
    const errors = []
    let sent = 0

    for (const t of targets) {
      const subject = t.lang === "zh"
        ? "DeepCalm AI \u00b7 \u6bcf\u65e5\u5fc3\u7075\u966a\u4f34"
        : "DeepCalm AI \u00b7 Your Daily Sanctuary"
      const html = buildDailyEmailHTML(t.name, t.lang, dayOfWeek)
      const r = await sendEmail(t.email, subject, html, apiKey, resendFrom)
      if (r.ok) {
        sent += 1
        continue
      }
      errors.push({ email: t.email, status: r.status, message: r.data?.message || "send_failed" })
    }

    return new Response(JSON.stringify({
      ok: errors.length === 0,
      via: "resend",
      sent,
      total: contacts.length,
      attempted: targets.length,
      skipped: Math.max(0, contacts.length - targets.length),
      errors,
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("[send-daily] error:", err)
    return new Response(JSON.stringify({ ok: false, error: "internal_error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
