import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const SESSION = "dc_journal_session"
const MOODS = ["calm", "happy", "stressed", "anxious", "low"]
const FIELDS = "id,created_at,mood,note,next_step"

function reply(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } })
}

async function handle(req: NextRequest) {
  const { JOURNAL_SUPABASE_URL: url, JOURNAL_SUPABASE_PUBLIC_KEY: key } = process.env
  if (!url || !key) return reply({ error: "unavailable" }, 503)
  const token = cookies().get(SESSION)?.value
  const method = req.method
  if (method !== "GET" && req.headers.get("origin") !== req.nextUrl.origin) return reply({ error: "origin" }, 403)

  let body: Record<string, unknown> = {}
  if (method === "POST" || method === "PATCH") {
    const parsed: unknown = await req.json().catch(() => null)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return reply({ error: "invalid" }, 400)
    body = parsed as Record<string, unknown>
  }

  function upstream(path: string, options: RequestInit = {}) {
    return fetch(new URL(path, url), {
      ...options,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
      headers: {
        apikey: key!,
        ...(token ? { Authorization: "Bearer " + token } : {}),
        "Content-Type": "application/json",
        ...options.headers,
      },
    })
  }

  if (method === "POST" && (body.action === "otp" || body.action === "verify")) {
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply({ error: "invalid" }, 400)
    const verify = body.action === "verify"
    if (verify && (typeof body.code !== "string" || !/^\d{6}$/.test(body.code))) return reply({ error: "invalid" }, 400)
    const result = await upstream(verify ? "/auth/v1/verify" : "/auth/v1/otp", {
      method: "POST",
      body: JSON.stringify(verify ? { email, token: body.code, type: "email" } : { email, create_user: true }),
    })
    if (!result.ok) return reply({ error: "auth" }, result.status === 429 ? 429 : verify ? 400 : 503)
    const response = reply({ ok: true })
    if (verify) {
      const { access_token, expires_in } = await result.json()
      if (typeof access_token !== "string" || !Number.isFinite(expires_in) || expires_in <= 0) return reply({ error: "unavailable" }, 503)
      response.cookies.set(SESSION, access_token, {
        httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
        path: "/api/journal", maxAge: Math.min(expires_in, 3600),
      })
    }
    return response
  }

  if (method === "POST" && body.action === "logout") {
    const response = reply({ ok: true })
    response.cookies.set(SESSION, "", { path: "/api/journal", maxAge: 0 })
    return response
  }
  if (!token) return reply({ error: "login" }, 401)

  const params = new URLSearchParams({ select: FIELDS })
  if (method === "GET") {
    const offset = Number(req.nextUrl.searchParams.get("offset") || 0)
    if (!Number.isSafeInteger(offset) || offset < 0) return reply({ error: "invalid" }, 400)
    params.set("order", "created_at.desc,id.desc")
    params.set("limit", "21")
    params.set("offset", String(offset))
  }
  if (method === "PATCH" || method === "DELETE") {
    const id = req.nextUrl.searchParams.get("id") || ""
    if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) return reply({ error: "invalid" }, 400)
    params.set("id", "eq." + id)
  }

  let data: string | undefined
  if (method === "POST" || method === "PATCH") {
    const { mood, note, next_step } = body
    if (typeof mood !== "string" || !MOODS.includes(mood) ||
        typeof note !== "string" || note.length > 4000 ||
        typeof next_step !== "string" || next_step.length > 500) return reply({ error: "invalid" }, 400)
    data = JSON.stringify({ mood, note: note.trim(), next_step: next_step.trim() })
  }

  const result = await upstream("/rest/v1/mood_entries?" + params, {
    method, body: data, headers: { Prefer: "return=representation" },
  })
  if (result.status === 401) return reply({ error: "login" }, 401)
  if (!result.ok) return reply({ error: "unavailable" }, 503)
  const entries = await result.json()
  if (method !== "GET" && !entries.length) return reply({ error: "missing" }, 404)
  return reply({ entries: entries.slice(0, 20), more: entries.length > 20 })
}

async function safely(req: NextRequest) {
  try {
    return await handle(req)
  } catch {
    return reply({ error: "unavailable" }, 503)
  }
}

export { safely as GET, safely as POST, safely as PATCH, safely as DELETE }
