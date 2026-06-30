const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '..', 'output', 'DEEPCALM_Dossier_20260512', '截图');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const PAGES = [
  { name: '01_zh_home',       url: '/zh',                                              fp: true },
  { name: '02_en_home',       url: '/en',                                              fp: true },
  { name: '03_zh_guide_list', url: '/zh/guide',                                        fp: true },
  { name: '04_zh_guide_sleep',url: '/zh/guide/ai-sleep-science-guide',                 fp: true },
  { name: '05_zh_anxiety',    url: '/zh/anxiety/workplace-burnout',                    fp: true },
  { name: '06_en_guide_sleep',url: '/en/guide/ai-sleep-science-guide',                 fp: true },
  { name: '07_zh_about',      url: '/zh/about',                                        fp: true },
  { name: '08_zh_privacy',    url: '/zh/privacy',                                      fp: true },
  { name: '09_zh_topics',     url: '/zh/topic/insomnia',                               fp: true },
  { name: '10_zh_home_mobile',url: '/zh',                                              fp: false, mobile: true },
];

async function run() {
  console.log('=== DEEPCALM 4K Screenshot Generator ===');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  let ok = 0, fail = 0;

  for (const p of PAGES) {
    console.log(`\n--- ${p.name} ---`);
    const ctx = await browser.newContext({
      viewport: p.mobile ? { width: 390, height: 844 } : { width: 3840, height: 2160 },
      deviceScaleFactor: 1,
      locale: 'zh-CN',
    });
    const page = await ctx.newPage();

    try {
      const url = `${BASE_URL}${p.url}`;
      console.log(`  -> ${url}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(2000);

      await page.evaluate(() => {
        const targets = [];
        document.querySelectorAll('section, header, main, article, [id], [class*="card"]').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 100 && rect.height > 50) targets.push(el);
        });
        targets.slice(0, 10).forEach(el => {
          el.style.outline = '3px solid #FF0000';
          el.style.outlineOffset = '2px';
          el.style.boxShadow = '0 0 0 4px rgba(255,0,0,0.15)';
        });
      });
      await page.waitForTimeout(300);

      const fp = p.fp;
      const fname = `${p.name}.png`;
      const fpath = path.join(OUTPUT_DIR, fname);
      await page.screenshot({ path: fpath, fullPage: fp });
      const mb = (fs.statSync(fpath).size / 1024 / 1024).toFixed(2);
      console.log(`  ✅ ${fname}  (${mb} MB)`);
      ok++;
    } catch (e) {
      console.error(`  ❌ ${e.message}`);
      fail++;
    } finally {
      await page.close();
      await ctx.close();
    }
  }

  await browser.close();
  console.log(`\n=== Done: ${ok} OK, ${fail} Failed ===`);
}

run().catch(e => { console.error('FATAL:', e); process.exit(1); });
