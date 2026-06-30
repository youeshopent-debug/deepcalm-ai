const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const TARGETS = [
  { name: 'rain', url: 'https://pixabay.com/sound-effects/nature-relaxing-rain-444802/' },
  { name: 'fire', url: 'https://pixabay.com/sound-effects/fire-crackling-229897/' },
  { name: 'stream', url: 'https://pixabay.com/sound-effects/nature-relaxing-stream-ambience-for-youtube-420901/' },
  { name: 'wind', url: 'https://pixabay.com/sound-effects/nature-soothing-ocean-waves-372489/' },
  { name: 'insects', url: 'https://pixabay.com/sound-effects/night-rain-with-distant-thunder-321446/' },
];

async function extract() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const results = [];
  for (const t of TARGETS) {
    console.log(`\n--- ${t.name} ---`);
    const page = await browser.newPage();
    await page.goto(t.url, { waitUntil: 'networkidle2', timeout: 60000 });

    const cdnUrl = await page.evaluate(() => {
      const s = document.getElementById('__NEXT_DATA__');
      if (!s) return null;
      const data = JSON.parse(s.textContent);
      const audio = data?.props?.pageProps?.audio || data?.props?.pageProps?.audioData || data?.props?.pageProps?.soundEffect || {};
      return audio?.audioUrl || audio?.downloadUrl || null;
    });

    console.log(`  Result: ${cdnUrl || 'NOT FOUND'}`);
    results.push({ name: t.name, url: cdnUrl });
    await page.close();
  }

  await browser.close();

  console.log('\n===== FINAL RESULTS =====');
  for (const r of results) {
    if (r.url) {
      console.log(`${r.name}: ${r.url}`);
    } else {
      console.log(`${r.name}: MISSING`);
    }
  }
}

extract().catch(e => { console.error(e); process.exit(1); });
