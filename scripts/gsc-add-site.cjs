const puppeteer = require('puppeteer-core');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const page = await browser.newPage();
  
  console.log('=== [1] Try adding property ===');
  await page.goto('https://search.google.com/search-console/not-verified?resource_id=https://deepcalm-ai.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  
  const info = await page.evaluate(() => {
    const body = document.body.textContent;
    const hasAddProperty = body.includes('Add property') || body.includes('添加');
    const hasVerify = body.includes('verify') || body.includes('验证');
    const hasDNS = body.includes('DNS') || body.includes('TXT');
    const hasHTMLTag = body.includes('meta') || body.includes('HTML tag');
    const items = [...document.querySelectorAll('a, button, span, div[role]')].map(e => e.textContent.trim().substring(0,60)).filter(t => t.length > 0).slice(0,20);
    return { hasAddProperty, hasVerify, hasDNS, hasHTMLTag, bodySnippet: body.substring(0, 1500), items };
  });
  console.log(JSON.stringify(info, null, 2));
  
  await browser.disconnect();
  console.log('Done');
})();
