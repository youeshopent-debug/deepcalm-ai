const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.resolve(__dirname, 'screenshots');
const BASE_URL = 'https://deepcalm-ai.com';

const pages = [
  { url: '/zh',              file: 'zh_home.png',          desc: '首页中文' },
  { url: '/en',              file: 'en_home.png',          desc: '首页英文' },
  { url: '/zh/guide',        file: 'zh_guide_list.png',    desc: '指南列表' },
  { url: '/zh/guide/ai-sleep-science-guide', file: 'zh_guide_detail.png', desc: '指南详情' },
  { url: '/en/anxiety/workplace-burnout',    file: 'en_anxiety_detail.png', desc: '焦虑详情英文' },
  { url: '/zh/privacy',      file: 'zh_privacy.png',       desc: '隐私政策' },
  { url: '/zh/about',        file: 'zh_about.png',         desc: '关于我们' },
  { url: '/zh/terms',        file: 'zh_terms.png',         desc: '服务条款' },
];

async function run() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Users\\User\\AppData\\Local\\ms-playwright\\chromium_headless_shell-1217\\chrome-headless-shell-win64\\chrome-headless-shell.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = [];

  for (const p of pages) {
    const fullUrl = `${BASE_URL}${p.url}`;
    const filePath = path.join(SCREENSHOTS_DIR, p.file);
    console.log(`[${p.desc}] ${fullUrl} ...`);

    try {
      const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      const screenshotBuf = await page.screenshot({ fullPage: true, path: filePath });
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(1);
      const dimensions = await page.evaluate(() => {
        return {
          width: document.documentElement.scrollWidth,
          height: document.documentElement.scrollHeight,
        };
      });

      results.push({ file: p.file, desc: p.desc, status: 'OK', sizeKB, width: dimensions.width, height: dimensions.height });
      console.log(`  -> ${p.file} (${dimensions.width}x${dimensions.height}, ${sizeKB}KB)`);
      await context.close();
    } catch (err) {
      results.push({ file: p.file, desc: p.desc, status: 'FAIL', error: err.message });
      console.error(`  -> FAIL: ${err.message}`);
    }
  }

  await browser.close();

  console.log('\n========== 截图完成报告 ==========');
  console.log(`总计: ${results.length} 张`);
  let ok = 0, fail = 0;
  for (const r of results) {
    if (r.status === 'OK') {
      ok++;
      console.log(`  [OK] ${r.file.padEnd(25)} ${r.desc.padEnd(14)} ${r.width}x${r.height}  ${r.sizeKB}KB`);
    } else {
      fail++;
      console.log(`  [FAIL] ${r.file.padEnd(25)} ${r.desc.padEnd(14)} ${r.error}`);
    }
  }
  console.log(`成功: ${ok}, 失败: ${fail}`);
}

run().catch(err => { console.error(err); process.exit(1); });
