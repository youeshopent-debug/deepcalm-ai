const { chromium } = require("playwright")

const ORIGIN = "https://deepcalm-ai.com"
const URL = `${ORIGIN}/zh?v=${Date.now()}`

async function run() {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } })
  const page = await context.newPage()

  await page.goto(URL, { waitUntil: "networkidle", timeout: 45000 })

  const block = page.locator('[data-testid="publisher-content"]')
  const count = await block.count()
  if (count === 0) {
    throw new Error("publisher content block not found")
  }

  await browser.close()
}

run().catch((err) => {
  process.stderr.write(String(err?.stack || err) + "\n")
  process.exit(1)
})

