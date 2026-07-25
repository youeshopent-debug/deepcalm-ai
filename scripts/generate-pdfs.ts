/**
 * scripts/generate-pdfs.ts
 *
 * Build-time PDF generation script using Playwright Chromium.
 *
 * Usage:
 *   1. Run `npm run build` first (to compile the Next.js SSG pages)
 *   2. Run `npx tsx scripts/generate-pdfs.ts`
 *
 * The script:
 *   - Starts a local Next.js production server on port 3456
 *   - Discovers all [slug]/print pages from the built output
 *   - Generates A4 PDF for each locale × slug combination
 *   - Saves PDFs to public/pdfs/{locale}/{slug}.pdf
 *   - Generates public/pdfs/sitemap-pdfs.xml
 *   - Cleans up the server process
 */

import { chromium, type Browser, type Page } from "playwright"
import { spawn, type ChildProcess } from "child_process"
import * as path from "path"
import * as fs from "fs"

const ALL_LOCALES = ["zh", "en", "ms", "ja", "ko", "th", "es"]
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`
const OUTPUT_DIR = path.resolve(__dirname, "../public/pdfs")
const NEXT_SERVER_DIR = path.resolve(__dirname, "../.next/server/app")

// ── Helpers ──

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}

/** Discover slugs that have a print page in the built output.
 *  The build produces a flat structure: `.next/server/app/en/library/insomnia/print.html`
 *  We look in the first locale's library directory for all slug subdirectories. */
function discoverPrintSlugs(): string[] {
  const slugs = new Set<string>()
  const libraryDir = path.join(NEXT_SERVER_DIR, "en", "library")
  if (!fs.existsSync(libraryDir)) {
    console.warn(`  Library directory not found: ${libraryDir}`)
    return []
  }
  const entries = fs.readdirSync(libraryDir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const printHtml = path.join(libraryDir, entry.name, "print.html")
      if (fs.existsSync(printHtml)) {
        slugs.add(entry.name)
      }
    }
  }
  return Array.from(slugs).sort()
}

/** Start the Next.js production server and return the child process. */
function startServer(): Promise<ChildProcess> {
  return new Promise((resolve, reject) => {
    const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
      cwd: path.resolve(__dirname, ".."),
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    })

    let started = false

    server.stdout?.on("data", (data: Buffer) => {
      const text = data.toString()
      process.stdout.write(`[next] ${text}`)
      if (!started && text.includes("Local:")) {
        started = true
        resolve(server)
      }
    })

    server.stderr?.on("data", (data: Buffer) => {
      const text = data.toString()
      // Next.js sometimes writes the "ready" message to stderr
      process.stderr.write(`[next:err] ${text}`)
      if (!started && (text.includes("Local:") || text.includes("ready"))) {
        started = true
        resolve(server)
      }
    })

    server.on("error", (err) => reject(err))
    server.on("exit", (code) => {
      if (!started) reject(new Error(`Server exited with code ${code} before becoming ready`))
    })

    // Timeout after 60 seconds
    setTimeout(() => {
      if (!started) reject(new Error("Server start timed out after 60s"))
    }, 60000)
  })
}

/** Wait for server to be ready by polling the health endpoint. */
async function waitForServer(maxRetries = 30): Promise<void> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(BASE_URL)
      if (res.ok || res.status === 404) return // 404 means server is up but page might not exist yet
    } catch {
      // not ready yet
    }
    await sleep(2000)
  }
  throw new Error(`Server at ${BASE_URL} not ready after ${maxRetries * 2}s`)
}

/** Ensure the output directory structure exists. */
function ensureOutputDirs(locale: string): string {
  const dir = path.join(OUTPUT_DIR, locale)
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

/** Generate a single PDF for a locale × slug combination. */
async function generatePdf(
  browser: Browser,
  locale: string,
  slug: string,
  outputDir: string
): Promise<boolean> {
  const url = `${BASE_URL}/${locale}/library/${slug}/print`
  const outputPath = path.join(outputDir, `${slug}.pdf`)

  let page: Page | null = null
  try {
    page = await browser.newPage()
    await page.setViewportSize({ width: 1280, height: 800 })

    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 30000 })

    if (!response || response.status() === 404) {
      console.warn(`  ⚠️  404 for ${url}, skipping`)
      return false
    }

    if (response.status() >= 400) {
      console.warn(`  ⚠️  HTTP ${response.status()} for ${url}, skipping`)
      return false
    }

    // Wait for the content to render
    await page.waitForSelector(".print-page", { timeout: 10000 }).catch(() => {})

    // Generate the PDF
    await page.pdf({
      path: outputPath,
      format: "A4",
      margin: { top: "20mm", bottom: "20mm", left: "15mm", right: "15mm" },
      printBackground: true,
      preferCSSPageSize: true,
    })

    console.log(`  ✅ ${locale}/${slug}.pdf (${Math.round(fs.statSync(outputPath).size / 1024)} KB)`)
    return true
  } catch (err) {
    console.error(`  ❌ ${locale}/${slug}.pdf failed:`, (err as Error).message)
    return false
  } finally {
    if (page) await page.close().catch(() => {})
  }
}

// ── Main ──

async function main() {
  console.log("=".repeat(60))
  console.log("  DeepCalm PDF Generator")
  console.log("=".repeat(60))

  // Step 1: Discover slugs from built output
  console.log("\n📂 Discovering print pages from built output...")
  const slugs = discoverPrintSlugs()
  if (slugs.length === 0) {
    console.error("  ❌ No print pages found. Did you run `npm run build` first?")
    console.error(`     Looking in: ${NEXT_SERVER_DIR}`)
    process.exit(1)
  }
  console.log(`  Found ${slugs.length} slugs: ${slugs.slice(0, 5).join(", ")}${slugs.length > 5 ? "..." : ""}`)

  // Step 2: Start Next.js server
  console.log("\n🚀 Starting Next.js production server...")
  const server = await startServer()
  await waitForServer()
  console.log("  ✅ Server is ready")

  // Step 3: Generate PDFs
  console.log("\n📄 Generating PDFs...")
  const browser = await chromium.launch({ headless: true })

  try {
    let successCount = 0
    let failCount = 0

    for (const locale of ALL_LOCALES) {
      const outputDir = ensureOutputDirs(locale)
      console.log(`\n  [${locale.toUpperCase()}]`)

      // Process slugs in batches to avoid overwhelming the server
      const batchSize = 5
      for (let i = 0; i < slugs.length; i += batchSize) {
        const batch = slugs.slice(i, i + batchSize)
        const results = await Promise.all(
          batch.map((slug) => generatePdf(browser, locale, slug, outputDir))
        )
        for (const ok of results) {
          if (ok) successCount++
          else failCount++
        }
      }
    }

    console.log(`\n📊 Summary: ${successCount} succeeded, ${failCount} failed`)

    // Step 4: Generate PDF sitemap
    console.log("\n🗺️  Generating PDF sitemap...")
    const sitemapPath = path.join(OUTPUT_DIR, "sitemap-pdfs.xml")
    const now = new Date().toISOString().split("T")[0]

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${slugs
    .map(
      (slug) => ALL_LOCALES
        .map(
          (locale) => `  <url>
    <loc>https://deepcalm-ai.com/pdfs/${locale}/${slug}.pdf</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`
        )
        .join("\n")
    )
    .join("\n")}
</urlset>`

    fs.writeFileSync(sitemapPath, sitemap, "utf-8")
    console.log(`  ✅ sitemap-pdfs.xml generated (${slugs.length * ALL_LOCALES.length} entries)`)

    // Step 5: Print file sizes
    console.log("\n📏 File size overview:")
    for (const locale of ALL_LOCALES) {
      const dir = path.join(OUTPUT_DIR, locale)
      if (!fs.existsSync(dir)) continue
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".pdf"))
      const totalSize = files.reduce((sum, f) => sum + fs.statSync(path.join(dir, f)).size, 0)
      console.log(`  [${locale.toUpperCase()}] ${files.length} files, ${Math.round(totalSize / 1024)} KB total`)
    }
  } finally {
    await browser.close()
    server.kill("SIGTERM")
    console.log("\n🧹 Cleanup complete")
  }
}

main().catch((err) => {
  console.error("\n💥 Fatal error:", err)
  process.exit(1)
})
