const BASE = process.env.DEEPCALM_BASE_URL || "https://deepcalm-ai.com"

function extractLangFromUrl(url) {
  try {
    const u = new URL(url)
    const parts = u.pathname.split("/").filter(Boolean)
    if (parts.length === 0) return null
    const lang = parts[0]
    if (["zh", "en", "ms", "ja", "ko", "th", "es"].includes(lang)) return lang
    return null
  } catch {
    return null
  }
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "follow" })
  const text = await res.text().catch(() => "")
  return { ok: res.ok, status: res.status, text }
}

function parseSitemapLocs(xml) {
  const locs = []
  const re = /<loc>([^<]+)<\/loc>/g
  let m
  while ((m = re.exec(xml))) locs.push(m[1].trim())
  return locs
}

async function runPool(items, worker, concurrency) {
  const results = new Array(items.length)
  let idx = 0
  async function runOne() {
    while (true) {
      const i = idx++
      if (i >= items.length) return
      results[i] = await worker(items[i], i)
    }
  }
  const runners = Array.from({ length: Math.max(1, concurrency) }, () => runOne())
  await Promise.all(runners)
  return results
}

async function main() {
  const sitemapUrl = `${BASE}/sitemap.xml`
  const sitemap = await fetchText(sitemapUrl)
  if (!sitemap.ok) {
    console.log(JSON.stringify({ ok: false, step: "fetch_sitemap", url: sitemapUrl, status: sitemap.status }, null, 2))
    process.exit(1)
  }

  const urls = parseSitemapLocs(sitemap.text).filter((u) => u.startsWith(BASE))
  const uniq = Array.from(new Set(urls))

  const pageChecks = await runPool(
    uniq,
    async (url) => {
      const lang = extractLangFromUrl(url)
      const r = await fetchText(url)
      if (!r.ok) return { url, lang, ok: false, status: r.status, missing: [] }
      const missing = []
      if (lang) {
        if (!r.text.includes(`/${lang}/privacy`)) missing.push("privacy_link")
        if (!r.text.includes(`/${lang}/terms`)) missing.push("terms_link")
      }
      return { url, lang, ok: true, status: r.status, missing }
    },
    Number(process.env.CONCURRENCY || 10),
  )

  const langs = ["zh", "en", "ms", "ja", "ko", "th", "es"]
  const policyChecks = {}
  for (const lang of langs) {
    const p = await fetchText(`${BASE}/${lang}/privacy`)
    const t = await fetchText(`${BASE}/${lang}/terms`)
    policyChecks[lang] = { privacy: p.status, terms: t.status }
  }

  const badPages = pageChecks.filter((r) => !r.ok || (r.missing && r.missing.length))
  const summary = {
    ok: badPages.length === 0,
    base: BASE,
    sitemapUrl,
    totalUrls: uniq.length,
    badPages: badPages.length,
    policyChecks,
    samples: badPages.slice(0, 20),
  }

  console.log(JSON.stringify(summary, null, 2))
  if (!summary.ok) process.exit(2)
}

main().catch((e) => {
  console.error("audit_error:", e && e.message ? e.message : String(e))
  process.exit(1)
})

