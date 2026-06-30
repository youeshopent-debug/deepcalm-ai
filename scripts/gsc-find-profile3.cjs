const puppeteer = require('puppeteer-core');
(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const pages = await browser.pages();
  const targets = browser.targets();
  console.log('=== Connected targets ===');
  for (const t of targets) {
    try {
      const info = { type: t.type(), url: t.url().substring(0,120), title: '' };
      if (t.type() === 'page') {
        try { const p = await t.page(); info.title = (await p.title()).substring(0,80); } catch(e){}
      }
      console.log(`  [${info.type}] ${info.url} | title=${info.title}`);
    } catch(e){}
  }
  console.log(`\nTotal targets: ${targets.length}`);
  // Try to find any page that might be GSC or check cookies
  console.log('\n=== Checking Google accounts in cookies ===');
  for (const p of pages) {
    try {
      const cookies = await p.cookies('.google.com');
      const sessionCookies = cookies.filter(c => c.name.includes('OSID') || c.name.includes('SID') || c.name.includes('oauth'));
      if (sessionCookies.length > 0) {
        console.log(`  Page ${p.url().substring(0,80)}: ${sessionCookies.map(c=>c.name+'='+c.value.substring(0,20)).join(', ')}`);
      } else {
        console.log(`  Page ${p.url().substring(0,80)}: no Google session cookies`);
      }
    } catch(e){
      console.log(`  Error reading cookies: ${e.message}`);
    }
  }
  await browser.disconnect();
  console.log('\nDone');
})().catch(e => { console.error(e); process.exit(1); });
