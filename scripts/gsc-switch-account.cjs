const puppeteer = require('puppeteer-core');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const page = await browser.newPage();
  
  console.log('=== [1] Navigate to GSC ===');
  await page.goto('https://search.google.com/search-console?resource_id=https://deepcalm-ai.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  
  console.log('=== [2] Try to open account switcher ===');
  const clickResult = await page.evaluate(() => {
    const btns = document.querySelectorAll('a[class*="gb_"], button[class*="gb_"], [role="button"][class*="gb_"]');
    for (const btn of btns) {
      if (btn.offsetHeight > 5 && btn.offsetWidth > 5) {
        btn.click();
        return 'clicked: ' + btn.className.substring(0, 80);
      }
    }
    return 'no visible account button found';
  });
  console.log('Click result:', clickResult);
  await sleep(3000);
  
  console.log('=== [3] Check account picker ===');
  const info = await page.evaluate(() => {
    const body = document.body.textContent;
    const emails = ['alanlsl8208', 'youeshopent', 'yurilauyueyee'];
    const found = emails.filter(e => body.includes(e));
    return { found, snippet: body.substring(0, 1000) };
  });
  console.log(JSON.stringify(info, null, 2));
  
  await browser.disconnect();
  console.log('Done');
})();
