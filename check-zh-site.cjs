const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const URL = 'https://deepcalm-ai.com/zh';

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const allLogs = [];
  const hydrationErrors = [];

  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    allLogs.push({ type, text });

    if (type === 'error') {
      if (text.includes('418') || text.includes('423') || text.includes('425') ||
          text.includes('hydrat') || text.includes('Hydrat') ||
          text.includes('minified React error')) {
        hydrationErrors.push(text);
      }
    }
  });

  page.on('pageerror', err => {
    allLogs.push({ type: 'pageerror', text: err.message });
    if (err.message.includes('hydrat') || err.message.includes('Hydrat') ||
        err.message.includes('418') || err.message.includes('423') || err.message.includes('425')) {
      hydrationErrors.push(err.message);
    }
  });

  process.stdout.write(`Navigating to ${URL} ...\n`);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(3000);

  const screenshotPath = path.resolve(__dirname, 'screenshots', 'zh_home_check.png');
  if (!fs.existsSync(path.dirname(screenshotPath))) {
    fs.mkdirSync(path.dirname(screenshotPath), { recursive: true });
  }
  await page.screenshot({ fullPage: true, path: screenshotPath });
  process.stdout.write(`Screenshot saved: ${screenshotPath}\n`);

  const langAttr = await page.evaluate(() => {
    return document.documentElement.getAttribute('lang');
  });
  process.stdout.write(`\n[html] lang attribute: "${langAttr}"\n`);

  const aiCounselorText = await page.evaluate(() => {
    const allElements = document.body.querySelectorAll('*');
    const results = [];
    for (const el of allElements) {
      const text = el.textContent.trim();
      if (text.includes('AI') || text.includes('心理') || text.includes('陪伴') ||
          text.includes('倾诉') || text.includes('你好') || text.includes('欢迎')) {
        if (el.children.length === 0 || el.tagName === 'BUTTON' || el.tagName === 'A') {
          results.push({ tag: el.tagName, text: text.substring(0, 200) });
        }
      }
    }
    return results;
  });
  process.stdout.write('\n[AI Counselor / Psychological Companion text elements]:\n');
  for (const r of aiCounselorText) {
    process.stdout.write(`  <${r.tag}> ${r.text}\n`);
  }

  const i18nLogs = allLogs.filter(l =>
    l.text.includes('[LanguageContext]') || l.text.includes('[i18n]')
  );

  process.stdout.write('\n========== CONSOLE LOG FULL ==========\n');
  for (const l of allLogs) {
    const typeLabel = l.type === 'log' ? 'LOG' : l.type === 'warn' ? 'WARN' : l.type === 'error' ? 'ERROR' : l.type.toUpperCase();
    process.stdout.write(`[${typeLabel}] ${l.text}\n`);
  }

  process.stdout.write('\n========== I18N / LANGUAGECONTEXT LOGS ==========\n');
  if (i18nLogs.length === 0) {
    process.stdout.write('(none found)\n');
  } else {
    for (const l of i18nLogs) {
      const typeLabel = l.type === 'log' ? 'LOG' : l.type === 'warn' ? 'WARN' : l.type === 'error' ? 'ERROR' : l.type.toUpperCase();
      process.stdout.write(`[${typeLabel}] ${l.text}\n`);
    }
  }

  process.stdout.write('\n========== REACT HYDRATION ERRORS ==========\n');
  if (hydrationErrors.length === 0) {
    process.stdout.write('(none found)\n');
  } else {
    for (const e of hydrationErrors) {
      process.stdout.write(`  [ERROR] ${e}\n`);
    }
  }

  process.stdout.write('\n========== SCREENSHOT ==========\n');
  process.stdout.write(`File: ${screenshotPath}\n`);

  await browser.close();
}

run().catch(err => { process.stderr.write('Script failed: ' + err.message + '\n' + err.stack + '\n'); process.exit(1); });
