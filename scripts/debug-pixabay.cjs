const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function debug() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://pixabay.com/sound-effects/nature-relaxing-rain-444802/', { waitUntil: 'networkidle2', timeout: 60000 });

  const html = await page.content();
  fs.writeFileSync('scripts/pixabay-debug.html', html, 'utf8');
  console.log('HTML saved, length:', html.length);

  const scripts = await page.evaluate(() => {
    const all = document.querySelectorAll('script');
    return Array.from(all).map(s => ({
      id: s.id,
      type: s.type,
      src: s.src,
      len: (s.textContent || '').length,
      hasAudio: (s.textContent || '').includes('audio'),
      hasCDN: (s.textContent || '').includes('cdn.pixabay'),
      sampleStart: (s.textContent || '').substring(0, 200),
    }));
  });

  for (const s of scripts) {
    console.log(`\n[id=${s.id}] type=${s.type} src=${s.src.substring(0,80)} len=${s.len} audio=${s.hasAudio} cdn=${s.hasCDN}`);
    if (s.hasAudio || s.hasCDN) console.log('  CONTENT:', s.sampleStart);
  }

  // Also check for audio in JSON-LD
  const jsonld = await page.evaluate(() => {
    const els = document.querySelectorAll('script[type="application/ld+json"]');
    return Array.from(els).map(e => e.textContent.substring(0, 1000));
  });
  console.log('\nJSON-LD:', JSON.stringify(jsonld, null, 2));

  await browser.close();
}

debug().catch(e => { console.error(e); process.exit(1); });
