const { chromium } = require("playwright")
const path = require("path")
const fs = require("fs")

async function check(pathname) {
  const url = `https://deepcalm-ai.com${pathname}?v=${Date.now()}`
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 })
  await page.waitForTimeout(1200)

  const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").trim())
  const head = text.slice(0, 200)

  const outDir = path.resolve(__dirname, "screenshots")
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.resolve(outDir, pathname.replaceAll("/", "_").slice(1) + ".png")
  await page.screenshot({ path: outPath, fullPage: false })

  await browser.close()

  process.stdout.write(`${pathname} len=${text.length} head=${JSON.stringify(head)} screenshot=${outPath}\n`)
}

async function run() {
  await check("/zh/privacy")
  await check("/zh/terms")
}

run().catch((err) => {
  process.stderr.write(String(err?.stack || err) + "\n")
  process.exit(1)
})

