const { chromium } = require('playwright');

const LOCALES = ['zh', 'en', 'ms', 'ja', 'ko', 'th', 'es'];
const RESULTS = [];

async function testLocale(locale) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const start = Date.now();

  page.on('pageerror', e => {
    if (e.message.includes('Minified React error')) {
      errors.push('REACT:' + e.message.match(/#\d+/)?.[0] || 'unknown');
    } else if (e.message.includes('Error') || e.message.includes('fetch')) {
      errors.push('ERR:' + e.message.slice(0, 80));
    }
  });

  page.on('console', m => {
    if (m.type() === 'error') {
      const t = m.text();
      if (!t.includes('favicon') && !t.includes('Failed to load resource')) {
        errors.push('CONSOLE_ERR:' + t.slice(0, 80));
      }
    }
  });

  try {
    await page.goto(`https://deepcalm-ai.com/${locale}`, {
      waitUntil: 'load',
      timeout: 15000
    });
    await page.waitForTimeout(2000);

    const htmlLang = await page.evaluate(() => document.documentElement.lang);
    const title = await page.title();
    const h2 = await page.locator('h2').first().textContent().catch(() => 'n/a');
    const hasHeader = await page.locator('header').count() > 0;
    const hasAI = await page.locator('[class*="counselor"], section').count() > 0;
    const loadTime = Date.now() - start;

    RESULTS.push({
      locale,
      pass: errors.length === 0,
      htmlLang,
      title: title.slice(0, 40),
      firstH2: h2?.slice(0, 30) || 'n/a',
      hasHeader,
      hasAI,
      loadTime,
      errors
    });
  } catch (e) {
    RESULTS.push({
      locale,
      pass: false,
      error: e.message,
      errors
    });
  }

  await browser.close();
}

async function testAPI() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const apiErrors = [];

  page.on('pageerror', e => apiErrors.push(e.message));

  await page.goto('https://deepcalm-ai.com/zh', { waitUntil: 'load', timeout: 15000 });

  try {
    const result = await page.evaluate(async () => {
      const r = await fetch('/api/analyze-anxiety', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: 'I feel anxious about my work',
          mode: 'chat',
          history: [],
          locale: 'en'
        })
      });
      const data = await r.json();
      return { status: r.status, hasContent: !!data.content, contentLen: data.content?.length || 0 };
    });

    RESULTS.push({ test: 'API', pass: result.status === 200 && result.hasContent, ...result, errors: apiErrors });
  } catch (e) {
    RESULTS.push({ test: 'API', pass: false, error: e.message });
  }

  await browser.close();
}

async function testStress() {
  console.log('🧪 Starting stress test...\n');

  for (const locale of LOCALES) {
    process.stdout.write(`  Testing /${locale}... `);
    await testLocale(locale);
    const r = RESULTS[RESULTS.length - 1];
    console.log(r.pass ? `✅ (${r.loadTime}ms, lang="${r.htmlLang}")` : `❌ ${r.errors.length} errors`);
  }

  console.log('\n');
  await testAPI();
  const apiR = RESULTS[RESULTS.length - 1];
  console.log(`  API /analyze-anxiety: ${apiR.pass ? '✅ ' + apiR.status : '❌ ' + (apiR.error || apiR.errors?.[0])}`);

  console.log('\n========== RESULTS ==========\n');
  let passCount = 0;
  for (const r of RESULTS) {
    if (r.locale) {
      const status = r.pass ? '✅' : '❌';
      const lang = r.htmlLang || r.error || '';
      console.log(`${status} /${r.locale.padEnd(3)} lang="${lang}" h2="${r.firstH2}" load=${r.loadTime}ms`);
      if (!r.pass && r.errors?.length) {
        r.errors.forEach(e => console.log(`     └─ ${e}`));
      }
      if (r.pass) passCount++;
    }
  }
  console.log(`\n  API: ${apiR.pass ? '✅' : '❌'} POST /api/analyze-anxiety → ${apiR.status || 'FAILED'}`);

  const total = LOCALES.length + 1;
  console.log(`\n📊 SCORE: ${passCount}/${total} passed (${Math.round(passCount/total*100)}%)`);
  if (passCount === total) {
    console.log('🎉 ALL TESTS PASSED!');
  } else {
    console.log('⚠️  Some tests failed - check above');
  }
}

testStress().catch(e => {
  console.error('Stress test failed:', e.message);
  process.exit(1);
});
