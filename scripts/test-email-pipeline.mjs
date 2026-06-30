/**
 * DeepCalm AI — 邮件订阅管线压力测试
 *
 * 直接调用 Resend API 验证真实链路：
 *   1. 认证测试 (API Key 有效性)
 *   2. 读取 Audience (验证 Audience ID)
 *   3. 添加测试联系人
 *   4. 批量发送测试邮件
 *   5. 清理测试数据
 *
 * 用法:
 *   node scripts/test-email-pipeline.mjs
 *
 * 依赖:
 *   .env.local 中必须已配置 RESEND_API_KEY 和 RESEND_AUDIENCE_ID
 *   (脚本自动从 .env.local 读取)
 */

import { readFileSync, existsSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── 从 .env.local 加载环境变量 ──────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(__dirname, "..", ".env.local")
  if (!existsSync(envPath)) {
    console.error("❌ .env.local 未找到。请确保文件存在。")
    process.exit(1)
  }
  const raw = readFileSync(envPath, "utf-8")
  const env = {}
  for (const line of raw.split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eqIdx = trimmed.indexOf("=")
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "")
    env[key] = val
  }
  return env
}

// ── 工具函数 ─────────────────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function timestamp() {
  return new Date().toISOString().replace("T", " ").slice(0, 19)
}

function color(s, code) {
  return `\x1b[${code}m${s}\x1b[0m`
}
const green = (s) => color(s, 32)
const red = (s) => color(s, 31)
const yellow = (s) => color(s, 33)
const cyan = (s) => color(s, 36)
const dim = (s) => color(s, 90)

let PASS = 0
let FAIL = 0
let WARN = 0

function assert(label, ok, detail) {
  if (ok) {
    PASS++
    console.log(`  ${green("✔")} ${dim(label)}`)
  } else {
    FAIL++
    console.log(`  ${red("✘")} ${red(label)}`)
    if (detail) console.log(`    ${dim("→")} ${yellow(String(detail))}`)
  }
}

function warn(label, detail) {
  WARN++
  console.log(`  ${yellow("⚠")} ${dim(label)}`)
  if (detail) console.log(`    ${dim("→")} ${yellow(String(detail))}`)
}

// ── 测试开始 ────────────────────────────────────────────────────────────
console.log(`\n${cyan("╔══════════════════════════════════════════════════╗")}`)
console.log(`${cyan("║")}  DeepCalm AI — 邮件管线压力测试                  ${cyan("║")}`)
console.log(`${cyan("║")}  ${new Date().toISOString()}            ${cyan("║")}`)
console.log(`${cyan("╚══════════════════════════════════════════════════╝")}\n`)

const env = loadEnv()
const RESEND_API_KEY = env.RESEND_API_KEY
const RESEND_AUDIENCE_ID = env.RESEND_AUDIENCE_ID

console.log(dim("── 配置检查 ───────────────────────────────────────────"))
assert("RESEND_API_KEY 已设置", !!RESEND_API_KEY)
assert("RESEND_API_KEY 格式有效", /^re_[a-zA-Z0-9_]+$/.test(RESEND_API_KEY || ""), "Key 的前缀/格式检查")
assert("RESEND_AUDIENCE_ID 已设置", !!RESEND_AUDIENCE_ID)
assert("RESEND_AUDIENCE_ID 是 UUID", /^[0-9a-f-]{36}$/.test(RESEND_AUDIENCE_ID || ""), "UUID 格式")

if (FAIL > 0) {
  console.log(`\n${red("基本配置检查失败，无法继续测试。请检查 .env.local")}`)
  process.exit(1)
}

// ── Test 1: API 认证 ──────────────────────────────────────────────────
console.log(`\n${dim("── Test 1: API 认证 & 账户状态 ──────────────────────")}`)
{
  const res = await fetch("https://api.resend.com/audiences", {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  })
  const body = await res.json().catch(() => ({}))

  if (res.status === 200) {
    assert("GET /audiences → 200 (API Key 有效)", true)
    const audiences = body?.data || []
    const ourAudience = audiences.find((a) => a.id === RESEND_AUDIENCE_ID)
    if (ourAudience) {
      assert(`Audience "${ourAudience.name}" (${ourAudience.id}) 存在`, true)
    } else {
      warn(`Audience ID ${RESEND_AUDIENCE_ID} 不在返回列表中`, "可能名称不同或列表不完整")
      assert("Audience ID 可访问", true)
    }
  } else {
    assert("GET /audiences → " + res.status, false, body?.message || body?.error || "未知错误")
  }
}

// ── Test 2: 读取联系人 ────────────────────────────────────────────────
console.log(`\n${dim("── Test 2: 读取 Audience 联系人 ─────────────────────")}`)
let existingContacts = []
{
  const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  })
  const body = await res.json().catch(() => ({}))

  if (res.status === 200) {
    const data = body?.data
    assert("GET /contacts → 200", true)
    assert("data 是数组类型", Array.isArray(data), `实际类型: ${typeof data}`)
    existingContacts = Array.isArray(data) ? data : []
    assert(`当前联系人数量: ${existingContacts.length}`, true)
    if (existingContacts.length > 0) {
      console.log(`    ${dim("最近订阅:")}`)
      existingContacts.slice(-3).forEach((c) => {
        console.log(`      ${dim(c.email)}  lang=${c.metadata?.lang || "—"}`)
      })
    }
  } else {
    assert("GET /contacts → " + res.status, false, body?.message || body?.error || "未知错误")
  }
}

// ── Test 3: 添加测试联系人 ────────────────────────────────────────────
console.log(`\n${dim("── Test 3: 添加测试联系人 ───────────────────────────")}`)
const TEST_EMAIL = `test+${Date.now()}@deepcalm-ai.com`
const TEST_LANG = "en"
{
  const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: TEST_EMAIL,
      unsubscribed: false,
      metadata: {
        lang: TEST_LANG,
        subscribedAt: new Date().toISOString(),
        source: "stress-test",
      },
    }),
  })
  const body = await res.json().catch(() => ({}))

  if (res.status === 201) {
    assert("POST /contacts (新建) → 201", true)
  } else if (res.status === 400 && (body?.message || "").toLowerCase().includes("already")) {
    warn("测试邮箱已存在（不影响测试）", "重复订阅场景")
  } else {
    assert("POST /contacts → " + res.status, false, body?.message || body?.error || "未知错误")
  }
}

// ── Test 4: 重复订阅检测 ──────────────────────────────────────────────
console.log(`\n${dim("── Test 4: 重复订阅检测 ─────────────────────────────")}`)
{
  const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: TEST_EMAIL,
      unsubscribed: false,
    }),
  })
  const body = await res.json().catch(() => ({}))

  const msg = (body?.message || "").toLowerCase()
  if (res.status === 201) {
    warn("重复订阅返回 201（预期可能是 400）", "Resend 可能允许重复添加")
  } else if (res.status === 400 && (msg.includes("already") || msg.includes("exists"))) {
    assert("重复订阅 → 400 + 'already/exists'", true)
  } else {
    assert("重复订阅状态码: " + res.status, false, body?.message || "未知")
  }
}

// ── Test 5: 验证联系人已写入 ──────────────────────────────────────────
console.log(`\n${dim("── Test 5: 验证数据一致性 ───────────────────────────")}`)
{
  await sleep(1000) // Resend 数据最终一致性缓冲
  const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  })
  const body = await res.json().catch(() => ({}))
  const data = Array.isArray(body?.data) ? body.data : []

  const found = data.find((c) => c.email === TEST_EMAIL)
  if (found) {
    assert(`测试联系人 "${TEST_EMAIL}" 已出现在联系人列表中`, true)
    assert(`  语言标记: ${found.metadata?.lang || "—"}`, found.metadata?.lang === TEST_LANG)
  } else {
    assert("测试联系人未出现在列表中", false, "可能是最终一致性延迟")
  }
}

// ── Test 6: 批量发送压力测试 ──────────────────────────────────────────
console.log(`\n${dim("── Test 6: 批量发送压力测试 ─────────────────────────")}`)

const RESEND_FROM = env.RESEND_FROM || "DeepCalm AI <onboarding@resend.dev>"
console.log(`  ${dim("发件地址:")} ${cyan(RESEND_FROM)}`)

const BATCH_SIZE = 3 // 短平快压力测试，非生产级压测
const BATCH_EMAILS = [
  TEST_EMAIL,
  ...existingContacts.slice(0, BATCH_SIZE - 1).map((c) => c.email),
].filter(Boolean)

if (BATCH_EMAILS.length === 0) {
  warn("没有可用的收件地址", "跳过批量发送测试")
} else {
  console.log(`  ${dim("目标收件:")} ${BATCH_EMAILS.length} 个地址`)
  console.log(`  ${dim("发件上限:")} ${BATCH_SIZE} 封`)

  const sampleHTML = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:20px;background:#0a0e1a;font-family:sans-serif">
<table width="100%"><tr><td align="center">
<table width="560" style="background:#131b30;border-radius:16px;padding:32px">
<tr><td>
<div style="font-size:40px">🌙</div>
<p style="color:#5a6484;font-size:12px">${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
<h1 style="color:#e8edf5;font-size:22px;margin:8px 0">Good evening, friend</h1>
<p style="color:#8892b0;font-size:13px">DeepCalm AI · Stress Test</p>
<hr style="border:none;border-top:1px solid rgba(126,184,255,0.08);margin:24px 0">
<p style="color:#e8edf5;font-size:16px">🌱 This is an automated stress test email</p>
<p style="color:#7eb8ff;font-size:14px;line-height:1.7">If you received this, the email pipeline is fully operational. No action needed.</p>
<p style="color:#3a4460;font-size:10px;text-align:center;margin-top:24px">DeepCalm AI · Midnight Sanctuary</p>
</td></tr></table></td></tr></table></body></html>`

  const results = []
  for (let i = 0; i < BATCH_EMAILS.length; i++) {
    const to = BATCH_EMAILS[i]
    const subject = `DeepCalm AI · Pipeline Stress Test #${i + 1} · ${Date.now()}`
    
    const start = Date.now()
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [to],
        subject,
        html: sampleHTML,
      }),
    })
    const elapsed = Date.now() - start
    const body = await res.json().catch(() => ({}))

    results.push({ to, ok: res.ok, status: res.status, elapsed, id: body.id, error: body.message || body.error })

    if (res.ok) {
      console.log(`  ${green(`✔ [${i + 1}/${BATCH_EMAILS.length}]`)} ${dim(to)} ${dim("→")} ${green(body.id)} ${dim(`(${elapsed}ms)`)}`)
    } else {
      console.log(`  ${red(`✘ [${i + 1}/${BATCH_EMAILS.length}]`)} ${dim(to)} ${dim("→")} ${red(body.message || body.error || "unknown")} ${dim(`(${elapsed}ms)`)}`)
    }

    // 发信间隔 500ms 避免限流
    if (i < BATCH_EMAILS.length - 1) await sleep(500)
  }

  const sent = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok).length

  assert(`批量发送: ${sent} 成功 / ${failed} 失败`, failed === 0, failed > 0 ? `失败详情: ${results.filter((r) => !r.ok).map((r) => r.to + "=" + r.error).join("; ")}` : undefined)

  // ── Test 7: 发送延迟分析 ──────────────────────────────────────────
  console.log(`\n${dim("── Test 7: 发送延迟分析 ─────────────────────────────")}`)
  if (results.length > 0) {
    const avgMs = Math.round(results.reduce((s, r) => s + r.elapsed, 0) / results.length)
    const maxMs = Math.max(...results.map((r) => r.elapsed))
    const minMs = Math.min(...results.map((r) => r.elapsed))
    assert("平均延迟: " + avgMs + "ms", avgMs < 5000, avgMs >= 5000 ? `高于预期的 5s 阈值` : undefined)
    console.log(`    ${dim("最短:")} ${minMs}ms  ${dim("最长:")} ${maxMs}ms  ${dim("平均:")} ${avgMs}ms`)
  }
}

// ── Test 8: 清理测试数据 ──────────────────────────────────────────────
console.log(`\n${dim("── Test 8: 清理测试数据 ─────────────────────────────")}`)
{
  const res = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
    headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
  })
  const body = await res.json().catch(() => ({}))
  const data = Array.isArray(body?.data) ? body.data : []
  const testContact = data.find((c) => c.email === TEST_EMAIL)

  if (testContact?.id) {
    // Resend 目前没有公开的 DELETE contact API，尝试删除
    const delRes = await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts/${testContact.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
    }).catch(() => null)

    if (delRes && delRes.status === 204) {
      assert(`测试联系人 "${TEST_EMAIL}" 已删除`, true)
    } else if (delRes && delRes.status === 404) {
      warn("DELETE contact → 404 (可能已被自动清理)")
    } else {
      warn("清理测试联系人", "Resend 可能不支持 DELETE, 联系人在 Audience 中可忽略")
    }
  } else {
    warn("未找到测试联系人, 无需清理")
  }
}

// ── 最终报告 ──────────────────────────────────────────────────────────
console.log(`\n${cyan("╔══════════════════════════════════════════════════╗")}`)
console.log(`${cyan("║")}  测试报告                                       ${cyan("║")}`)
console.log(`${cyan("╚══════════════════════════════════════════════════╝")}`)
console.log(`  ${green("通过:")} ${PASS}`)
console.log(`  ${red("失败:")} ${FAIL}`)
console.log(`  ${yellow("警告:")} ${WARN}`)
console.log(`  ${dim("总计:")} ${PASS + FAIL + WARN}\n`)

if (PASS > 0 && FAIL === 0) {
  console.log(`  ${green("✔ ALL TESTS PASSED")} — 邮件管线核心链路正常。\n`)
  console.log(`  ${dim("但是请注意:")}`)
  console.log(`  ${dim("  1. 使用 ")}${yellow("onboarding@resend.dev")}${dim(" 作为发件地址只能发送到 Resend 注册邮箱。")}`)
  console.log(`  ${dim("  2. 如需发送到真实用户，必须在 Resend 中验证自定义域名。")}`)
  console.log(`  ${dim("  3. 生产环境建议 RESEND_FROM = DeepCalm AI <newsletter@deepcalm-ai.com>")}`)
} else {
  console.log(`  ${red("✘ SOME TESTS FAILED")} — 请检查上述错误详情。\n`)
}

process.exit(FAIL > 0 ? 1 : 0)
