const { chromium } = require("playwright")
const path = require("path")
const fs = require("fs")

const url = `https://deepcalm-ai.com/zh/guide?v=${Date.now()}`

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
  const page = await context.newPage()

  const logs = []
  page.on("console", (m) => logs.push({ type: m.type(), text: m.text() }))

  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 })
  await page.waitForTimeout(1500)

  const bodyTextHead = await page.evaluate(() => document.body.innerText.slice(0, 500))
  process.stdout.write(`url=${url}\n`)
  process.stdout.write(`bodyTextHead=${JSON.stringify(bodyTextHead)}\n`)

  const guideLinks = await page.locator('a[href^="/zh/guide/"]').count()
  process.stdout.write(`guideLinks=${guideLinks}\n`)

  const shotDir = path.resolve(__dirname, "screenshots")
  if (!fs.existsSync(shotDir)) fs.mkdirSync(shotDir, { recursive: true })
  const shot = path.resolve(shotDir, "prod_zh_guide.png")
  await page.screenshot({ path: shot, fullPage: false })
  process.stdout.write(`screenshot=${shot}\n`)

  const errors = logs.filter((l) => l.type === "error")
  process.stdout.write(`consoleErrors=${errors.length}\n`)

  await browser.close()
}

run().catch((err) => {
  process.stderr.write(String(err?.stack || err) + "\n")
  process.exit(1)
})

