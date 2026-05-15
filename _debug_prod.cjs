const { chromium } = require("playwright");
async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const logs = [], errors = [];
  page.on("console", msg => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on("pageerror", err => errors.push(err.message));
  await page.goto("https://deepcalm-ai.com/zh", { waitUntil: "load", timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));
  const htmlLang = await page.evaluate(() => document.documentElement.lang);
  console.log("html.lang:", JSON.stringify(htmlLang));
  const counselorTitle = await page.evaluate(() => { const el = document.querySelector("h2"); return el ? el.textContent : "NOT FOUND"; });
  console.log("First h2 text:", JSON.stringify(counselorTitle));
  console.log("\n=== CONSOLE LOGS ===");
  logs.forEach(l => console.log(l));
  console.log("\n=== ERROR LOGS ===");
  errors.forEach(e => console.log(e));
  await browser.close();
}
main().catch(e => { console.error("Script failed:", e.message); process.exit(1); });
