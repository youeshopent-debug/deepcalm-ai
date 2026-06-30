import { chromium } from 'playwright';

const TARGETS = [
  { name: 'rain', url: 'https://pixabay.com/sound-effects/nature-relaxing-rain-444802/' },
  { name: 'fire', url: 'https://pixabay.com/sound-effects/fire-crackling-229897/' },
  { name: 'stream', url: 'https://pixabay.com/sound-effects/nature-relaxing-stream-ambience-for-youtube-420901/' },
  { name: 'wind', url: 'https://pixabay.com/sound-effects/nature-soothing-ocean-waves-372489/' },
  { name: 'insects', url: 'https://pixabay.com/sound-effects/night-rain-with-distant-thunder-321446/' },
];

async function extractUrls() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const target of TARGETS) {
    console.log(`\n--- ${target.name} ---`);
    const page = await browser.newPage();
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });

    const cdnUrl = await page.evaluate(() => {
      const scripts = document.querySelectorAll('script');
      for (const s of scripts) {
        const text = s.textContent || '';
        if (text.includes('__NEXT_DATA__')) continue;
        const m = text.match(/https:\/\/cdn\.pixabay\.com\/download\/audio\/[^"'\s]+/);
        if (m) return m[0];
      }
      return null;
    });

    if (!cdnUrl) {
      const jsonData = await page.evaluate(() => {
        const s = document.getElementById('__NEXT_DATA__');
        return s ? s.textContent : null;
      });
      if (jsonData) {
        try {
          const parsed = JSON.parse(jsonData);
          const audioUrl = parsed?.props?.pageProps?.audio?.audioUrl
            || parsed?.props?.pageProps?.audioData?.audioUrl
            || parsed?.props?.pageProps?.soundEffect?.audioUrl;
          if (audioUrl && audioUrl.startsWith('http')) {
            results.push({ name: target.name, url: audioUrl });
            console.log(`  URL: ${audioUrl}`);
            continue;
          }
        } catch {}
      }
      results.push({ name: target.name, url: null });
      console.log('  NOT FOUND');
      continue;
    }

    results.push({ name: target.name, url: cdnUrl });
    console.log(`  URL: ${cdnUrl}`);
    await page.close();
  }

  await browser.close();

  console.log('\n=== RESULTS ===');
  for (const r of results) {
    console.log(`${r.name}: ${r.url || 'NOT FOUND'}`);
  }
}

extractUrls().catch(e => { console.error(e); process.exit(1); });
