const puppeteer = require('puppeteer-core');

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const page = await browser.newPage();
  
  console.log('=== [1] Go to GSC add property page ===');
  await page.goto('https://search.google.com/search-console/not-verified?resource_id=https://deepcalm-ai.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  console.log('=== [2] Click "添加资源" (Add property) ===');
  const clicked = await page.evaluate(() => {
    const links = document.querySelectorAll('a');
    for (const link of links) {
      if (link.textContent.trim().includes('添加资源') || link.textContent.trim().includes('Add property')) {
        link.click();
        return 'clicked: ' + link.textContent.trim() + ' | href: ' + link.href;
      }
    }
    return 'not found';
  });
  console.log('Click result:', clicked);
  await sleep(4000);
  
  console.log('=== [3] Current page info ===');
  const info = await page.evaluate(() => {
    return {
      url: window.location.href,
      title: document.title,
      snippet: document.body.textContent.substring(0, 1200)
    };
  });
  console.log(JSON.stringify(info, null, 2));
  
  await browser.disconnect();
  console.log('Done');
})();
