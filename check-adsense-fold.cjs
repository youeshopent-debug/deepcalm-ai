const { chromium } = require("playwright")
const path = require("path")
const fs = require("fs")

const ORIGIN = process.env.ORIGIN || "http://localhost:3000"
const URL = `${ORIGIN}/zh?v=${Date.now()}`

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
  const page = await context.newPage()

  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 })
  await page.waitForTimeout(1500)

  const block = page.locator('[data-testid="publisher-content"]')
  await block.waitFor({ timeout: 15000 })

  const text = await block.innerText()
  const normalized = text.replace(/\s+/g, " ").trim()
  if (normalized.length < 200) throw new Error(`publisher content text too short: ${normalized.length}`)
  if (normalized.includes("aiCounselor.")) throw new Error("raw i18n key leaked in publisher content")

  const box = await block.boundingBox()
  if (!box) throw new Error("publisher content bounding box missing")
  if (box.y + box.height > 1080) {
    throw new Error(`publisher content not fully above fold: y+height=${box.y + box.height}`)
  }

  const guideLink = page.locator('a[href^="/zh/guide"]')
  if ((await guideLink.count()) === 0) throw new Error("missing /zh/guide link")

  const topicLinks = page.locator('a[href^="/zh/topic/"]')
  const topicCount = await topicLinks.count()
  if (topicCount < 3) throw new Error(`expected >=3 topic links, got ${topicCount}`)

  const screenshotPath = path.resolve(__dirname, "screenshots", "adsense_fold_zh.png")
  if (!fs.existsSync(path.dirname(screenshotPath))) fs.mkdirSync(path.dirname(screenshotPath), { recursive: true })
  await page.screenshot({ path: screenshotPath, fullPage: false })

  await browser.close()
  process.stdout.write(`OK: ${URL}\nScreenshot: ${screenshotPath}\n`)
}

run().catch((err) => {
  process.stderr.write(String(err?.stack || err) + "\n")
  process.exit(1)
})
