const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  console.log('START');
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\User\\AppData\\Local\\ms-playwright\\chromium_headless_shell-1217\\chrome-headless-shell-win64\\chrome-headless-shell.exe',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const logs = [];
  page.on('console', msg => logs.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => logs.push({ type: 'error', text: 'PAGE_ERROR: ' + err.message.substring(0, 200) }));
  page.on('requestfailed', req => logs.push({ type: 'error', text: 'REQ_FAIL: ' + req.url().substring(0, 100) + ' -> ' + (req.failure()?.errorText || '') }));
  await page.goto('https://deepcalm-ai.com/zh', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ fullPage: true, path: 'output/debug_screenshot.png' });
  const title = await page.title();
  const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent);
  const lang = await page.evaluate(() => document.documentElement.lang);
  const h2s = await page.evaluate(() => Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.substring(0, 100)));
  const counselorEl = await page.evaluate(() => {
    const all = document.querySelectorAll('*');
    for (const el of all) {
      const c = el.className;
      if (typeof c === 'string' && c.toLowerCase().includes('counsel')) return { class: c.substring(0, 150), text: el.textContent?.substring(0, 500) };
    }
    return null;
  });
  console.log('TITLE:', title);
  console.log('H1:', h1);
  console.log('LANG:', lang);
  console.log('H2s:', JSON.stringify(h2s));
  console.log('COUNSELOR:', JSON.stringify(counselorEl));
  console.log('LOGS_COUNT:', logs.length);
  logs.forEach(l => console.log('[' + l.type + '] ' + l.text.substring(0, 300)));
  await browser.close();
  console.log('DONE');
})().catch(e => { console.error('ERR:', e.message); console.error(e.stack?.substring(0, 500)); process.exit(1); });
