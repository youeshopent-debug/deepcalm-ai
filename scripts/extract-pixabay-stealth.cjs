const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const TARGETS = [
  { name: 'rain', url: 'https://pixabay.com/sound-effects/nature-relaxing-rain-444802/' },
  { name: 'fire', url: 'https://pixabay.com/sound-effects/fire-crackling-229897/' },
  { name: 'stream', url: 'https://pixabay.com/sound-effects/nature-relaxing-stream-ambience-for-youtube-420901/' },
  { name: 'wind', url: 'https://pixabay.com/sound-effects/nature-soothing-ocean-waves-372489/' },
  { name: 'insects', url: 'https://pixabay.com/sound-effects/night-rain-with-distant-thunder-321446/' },
];

async function extractAll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--disable-web-security',
      '--no-zygote',
    ],
  });

  const results = [];
  for (const t of TARGETS) {
    console.log(`\n--- ${t.name} ---`);
    const page = await browser.newPage();

    // Override webdriver detection
    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1920, height: 1080 });

    try {
      await page.goto(t.url, { waitUntil: 'networkidle0', timeout: 30000 });
      const pageTitle = await page.title();
      const htmlLen = (await page.content()).length;
      console.log(`  Title: ${pageTitle}`);
      console.log(`  HTML: ${htmlLen} bytes`);
    } catch (e) {
      console.log(`  Nav error: ${e.message}`);
    }

    // Try multiple extraction strategies
    const url = await page.evaluate(() => {
      // Strategy 1: Check for audio element in the page
      const audioEl = document.querySelector('audio source');
      if (audioEl) return audioEl.src;

      // Strategy 2: Check JSON-LD
      const ld = document.querySelector('script[type="application/ld+json"]');
      if (ld) {
        try {
          const d = JSON.parse(ld.textContent);
          if (d?.audio?.contentUrl) return d.audio.contentUrl;
        } catch {}
      }

      // Strategy 3: Search all text for CDN URL
      const body = document.body.innerText;
      const cdnMatch = body.match(/https:\/\/cdn\.pixabay\.com\/download\/audio\/[^\s<"'`]+/);
      if (cdnMatch) return cdnMatch[0];

      // Strategy 4: Check all script tags for audio references
      const scripts = document.querySelectorAll('script');
      for (const s of scripts) {
        const txt = s.textContent || '';
        if (txt.includes('cdn.pixabay.com/download/audio')) {
          const m = txt.match(/https:\/\/cdn\.pixabay\.com\/download\/audio\/[^"'\s,}\]]+/);
          if (m) return m[0];
        }
        if (txt.includes('audioUrl') || txt.includes('"audio"')) {
          const m = txt.match(/"audioUrl"\s*:\s*"([^"]+)"/);
          if (m) return m[1];
          const m2 = txt.match(/"url"\s*:\s*"([^"]+\.mp3)"/);
          if (m2) return m2[1];
        }
      }

      // Strategy 5: Check for data-audio-url attributes
      const audioAttr = document.querySelector('[data-audio-url]');
      if (audioAttr) return audioAttr.getAttribute('data-audio-url');

      return null;
    });

    if (url) {
      console.log(`  FOUND: ${url}`);
      results.push({ name: t.name, url });
    } else {
      console.log('  NOT FOUND');
      results.push({ name: t.name, url: null });
    }

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

extractAll().catch(e => { console.error(e); process.exit(1); });
