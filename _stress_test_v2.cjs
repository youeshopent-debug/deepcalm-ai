/**
 * DeepCalm AI — 全量压力测试 v2
 * ===============================
 * 覆盖 P1(留存钩子) + P2(GSC优化) 全部新功能点
 *
 * 测试域：
 *   1. 7语言 SSG 页面加载 + SEO Title 断言
 *   2. 庇护所页面 DailyBriefing 卡片验证
 *   3. 百科文章页面推荐阅读模块验证
 *   4. library 列表页 SEO Title 格式校验
 *   5. /api/analyze-anxiety/decompose API 压测
 *   6. /api/analyze-anxiety API 压测
 *   7. Sitemap 路由完整性爬取
 *   8. 并发压力：5路并行请求核心端点
 *   9. 响应时间基准报告
 *
 * Usage: node _stress_test_v2.cjs
 */

const { chromium } = require('playwright');
const https = require('https');
const http = require('http');

// ── 配置 ──
const BASE_URL = 'https://deepcalm-ai.com';
const LOCALES = ['zh', 'en', 'ms', 'ja', 'ko', 'th', 'es'];
const REQUEST_TIMEOUT = 20000;        // 单页超时 20s
const CONCURRENCY = 5;                // 并发数
const SLOW_THRESHOLD_MS = 5000;       // 响应 >5s 标记为慢速
const SAMPLE_SLUGS = ['sleep-science', 'anxiety-causes', 'loneliness-causes', 'mindfulness-meditation'];

// ── 结果收集 ──
const RESULTS = [];
let PASS_COUNT = 0;
let FAIL_COUNT = 0;
let TOTAL_TESTS = 0;

function report(label, pass, detail = {}) {
  TOTAL_TESTS++;
  if (pass) PASS_COUNT++; else FAIL_COUNT++;
  RESULTS.push({ label, pass, ...detail, ts: new Date().toISOString() });
  const icon = pass ? '✅' : '❌';
  console.log(`${icon} ${label} ${detail.msg || ''}`);
  if (!pass && detail.error) {
    console.log(`     └─ ${detail.error.slice(0, 120)}`);
  }
}

// ── HTTP GET 辅助（无浏览器、可用于 sitemap） ──
function httpGet(url, timeout = REQUEST_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// ── HTTP POST 辅助（API 测试） ──
function httpPost(url, bodyObj, timeout = REQUEST_TIMEOUT) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const body = JSON.stringify(bodyObj);
    const u = new URL(url);
    const req = client.request({
      hostname: u.hostname, path: u.pathname, method: 'POST', timeout,
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        let parsed = null;
        try { parsed = JSON.parse(data); } catch {}
        resolve({ status: res.statusCode, body: data, json: parsed });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(body);
    req.end();
  });
}

// ── 用 Playwright 测试页面渲染 ──
async function testPage(label, url, assertions, timeout = REQUEST_TIMEOUT) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  const start = Date.now();

  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => {
    if (m.type() === 'error') {
      const t = m.text();
      if (!t.includes('favicon') && !t.includes('Failed to load resource') && !t.includes('ERR_BLOCKED')) {
        errors.push(t.slice(0, 100));
      }
    }
  });

  try {
    await page.goto(url, { waitUntil: 'load', timeout });
    await page.waitForTimeout(1500); // 等 JS 执行完毕

    const loadTime = Date.now() - start;
    const title = await page.title();
    const content = await page.content();
    const htmlLang = await page.evaluate(() => document.documentElement.lang).catch(() => '');
    const slow = loadTime > SLOW_THRESHOLD_MS;

    const assertionResults = [];
    for (const [key, fn] of Object.entries(assertions)) {
      try {
        const ok = await fn(page, content, title);
        assertionResults.push({ key, pass: ok });
      } catch (e) {
        assertionResults.push({ key, pass: false, error: e.message });
      }
    }

    const allPass = errors.length === 0 && assertionResults.every(a => a.pass);
    report(label, allPass, {
      msg: `${slow ? '🐢' : ''} load=${loadTime}ms lang="${htmlLang}" title="${title.slice(0, 50)}"`,
      loadTime, errors, htmlLang, title: title.slice(0, 80), assertions: assertionResults, slow,
    });
  } catch (e) {
    report(label, false, { msg: `LOAD_FAIL`, error: e.message, loadTime: Date.now() - start });
  }

  await browser.close();
}

// ── 断言工厂 ──
const assert = {
  titleContains: (sub) => (_p, _c, title) => title.includes(sub),
  titleNotContains: (sub) => (_p, _c, title) => !title.includes(sub),
  selectorExists: (sel) => async (page) => (await page.locator(sel).count()) > 0,
  selectorText: (sel, fn) => async (page) => fn(await page.locator(sel).first().textContent().catch(() => '')),
  textInContent: (...txts) => (_p, content) => txts.some(t => content.includes(t)),
};

// ══════════════════════════════════════════════════
//  测试套件
// ══════════════════════════════════════════════════

async function testSSGPages() {
  console.log('\n═══ 1. 7语言 SSG 首页加载 + SEO ═══\n');
  for (const locale of LOCALES) {
    await testPage(`/${locale} 首页`, `${BASE_URL}/${locale}`, {
      'html-lang': (p) => p.evaluate(() => document.documentElement.lang === '{{locale}}'.replace('{{locale}}', locale)),
      'has-header': assert.selectorExists('header'),
      'has-main': assert.selectorExists('main, section, [class*="container"]'),
      'title-not-deepcalm-only': (_p, _c, title) => {
        // SEO title should not be just "DeepCalm AI" — must have localized content
        return title.length > 15 && title.includes('-');
      },
    });
  }
}

async function testSanctuaryPages() {
  console.log('\n═══ 2. 庇护所页面 + DailyBriefing ═══\n');
  const localesSanctuary = ['zh', 'en', 'ms'];
  for (const locale of localesSanctuary) {
    await testPage(`/${locale}/sanctuary 庇护所+简报`, `${BASE_URL}/${locale}/sanctuary`, {
      'daily-briefing-today': assert.textInContent('今日健康简报', 'Daily Health Briefing', 'Ringkasan Kesihatan Harian', '今日の健康ブリーフィング', '오늘의 건강 브리핑', 'สรุปสุขภาพประจำวัน', 'Resumen de Salud de Hoy'),
      'has-sanctuary-content': assert.selectorExists('[class*="max-w-2xl"], [class*="container"], main'),
    });
  }
}

async function testTopicSEOandRelated() {
  console.log('\n═══ 3. 百科文章页面 SEO + 推荐阅读 ═══\n');
  const localesForTopics = ['zh', 'en'];
  for (const locale of localesForTopics) {
    for (const slug of SAMPLE_SLUGS) {
      const url = `${BASE_URL}/${locale}/library/${slug}`;
      await testPage(`/${locale}/library/${slug} 文章详情`, url, {
        'seo-title-has-category': (_p, _c, title) => {
          // Should have format: "Title | Category suffix - DeepCalm AI"
          return title.includes('|') && title.includes('- DeepCalm');
        },
        'related-reading-section': assert.textInContent('推荐阅读', 'Recommended Reading', 'Bacaan Disyorkan'),
      });
    }
  }
}

async function testLibraryListingSEO() {
  console.log('\n═══ 4. library 列表页 SEO Title ═══\n');
  const locales = ['zh', 'en', 'ms', 'ja'];
  for (const locale of locales) {
    await testPage(`/${locale}/library 百科列表`, `${BASE_URL}/${locale}/library`, {
      'seo-title-百科格式': (_p, _c, title) => {
        // Must contain localized encyclopedia title with article count
        return title.includes('百科') || title.includes('Encyclopedia') || title.includes('Ensiklopedia') || title.includes('百科');
      },
      'page-renders': assert.selectorExists('[class*="grid"], article, section, main'),
    });
  }
}

async function testDecomposeAPI() {
  console.log('\n═══ 5. /api/analyze-anxiety/decompose API ═══\n');

  // Test with zh
  const zhRes = await httpPost(`${BASE_URL}/api/analyze-anxiety/decompose`, {
    text: '最近工作压力很大，感觉焦虑睡不着',
    locale: 'zh',
  });
  const zhOk = zhRes.status === 200 && zhRes.json && Array.isArray(zhRes.json.steps) && zhRes.json.steps.length === 3;
  report('decompose API [zh] 返回3步', zhOk, {
    msg: zhOk ? `steps=[${zhRes.json.steps.map(s => s.slice(0, 20)).join(' | ')}]` : `status=${zhRes.status}`,
    steps: zhRes.json?.steps, status: zhRes.status,
  });

  // Test with en
  const enRes = await httpPost(`${BASE_URL}/api/analyze-anxiety/decompose`, {
    text: 'I feel overwhelmed with work deadlines and can\'t sleep',
    locale: 'en',
  });
  const enOk = enRes.status === 200 && enRes.json && Array.isArray(enRes.json.steps) && enRes.json.steps.length === 3;
  report('decompose API [en] 返回3步', enOk, {
    msg: enOk ? `steps: ${enRes.json.steps.map(s => s.length).join('|')} chars` : `status=${enRes.status}`,
    stepLengths: enRes.json?.steps?.map(s => s.length), status: enRes.status,
  });

  // Test missing text → 400
  const badRes = await httpPost(`${BASE_URL}/api/analyze-anxiety/decompose`, {});
  report('decompose API [空白] → 400', badRes.status === 400, {
    msg: `status=${badRes.status} body=${badRes.body.slice(0, 60)}`,
  });

  // Step validation: each step ≤ 50 chars
  if (zhRes.json?.steps) {
    const allUnder50 = zhRes.json.steps.every(s => s.length <= 50);
    report('decompose API [zh] 每步≤50字', allUnder50, {
      msg: allUnder50 ? 'ok' : `违规步长: ${zhRes.json.steps.map(s => `${s.length}`).join(',')}`,
      lengths: zhRes.json.steps.map(s => s.length),
    });
  }
}

async function testAnalyzeAPI() {
  console.log('\n═══ 6. /api/analyze-anxiety API ═══\n');
  const res = await httpPost(`${BASE_URL}/api/analyze-anxiety`, {
    text: 'I feel anxious about my work',
    mode: 'chat',
    history: [],
    locale: 'en',
  });
  const ok = res.status === 200 && res.json && res.json.content && res.json.content.length > 0;
  report('analyze-anxiety API [en]', ok, {
    msg: ok ? `contentLen=${res.json.content.length}` : `status=${res.status}`,
    contentLen: res.json?.content?.length || 0, status: res.status,
  });
}

async function testSitemap() {
  console.log('\n═══ 7. Sitemap 路由完整性 ═══\n');
  try {
    const smRes = await httpGet(`${BASE_URL}/sitemap.xml`, 15000);
    if (smRes.status !== 200) {
      report('sitemap.xml 可访问', false, { msg: `HTTP ${smRes.status}` });
      return;
    }
    report('sitemap.xml 可访问', true, { msg: `size=${smRes.body.length}` });

    const body = smRes.body;
    const urls = (body.match(/<loc>([^<]+)<\/loc>/g) || []).map(u => u.replace(/<\/?loc>/g, ''));

    report(`sitemap 收录 ${urls.length} 个 URL`, urls.length > 100, { msg: `${urls.length} URLs total` });

    // Check key routes presence
    const checks = [
      { key: '首页 /zh', pattern: 'https://deepcalm-ai.com/zh<' },
      { key: '首页 /en', pattern: 'https://deepcalm-ai.com/en<' },
      { key: '庇护所 /zh/sanctuary', pattern: '/zh/sanctuary' },
      { key: '庇护所 /en/sanctuary', pattern: '/en/sanctuary' },
      { key: '百科 /zh/library', pattern: '/zh/library' },
      { key: '关于 /zh/about', pattern: '/zh/about' },
      { key: '指南 /zh/guide', pattern: '/zh/guide' },
    ];
    for (const { key, pattern } of checks) {
      const found = body.includes(pattern);
      report(`sitemap 包含 [${key}]`, found, { msg: found ? pattern : 'MISSING' });
    }
  } catch (e) {
    report('sitemap 测试', false, { error: e.message });
  }
}

async function testConcurrency() {
  console.log('\n═══ 8. 并发压力 (5路并行) ═══\n');
  const targets = [
    `${BASE_URL}/zh`,
    `${BASE_URL}/en`,
    `${BASE_URL}/zh/sanctuary`,
    `${BASE_URL}/zh/library`,
    `${BASE_URL}/zh/about`,
  ];

  const start = Date.now();
  const results = await Promise.allSettled(
    targets.map(url => httpGet(url, 30000))
  );

  const totalTime = Date.now() - start;
  let allOk = true;
  for (let i = 0; i < targets.length; i++) {
    const r = results[i];
    const ok = r.status === 'fulfilled' && r.value.status === 200;
    if (!ok) allOk = false;
    const path = targets[i].replace(BASE_URL, '');
    report(`并发 ${path} (5路中第${i+1})`, ok, {
      msg: ok ? `HTTP ${r.value.status}` : `FAIL: ${r.reason?.message || 'unknown'}`,
    });
  }
  report('5路并发 全部 200', allOk, { msg: `总耗时 ${totalTime}ms` });
}

async function testResponseTimeBenchmark() {
  console.log('\n═══ 9. 响应时间基准 ═══\n');
  const samples = [
    `${BASE_URL}/zh`,
    `${BASE_URL}/en`,
    `${BASE_URL}/zh/sanctuary`,
    `${BASE_URL}/zh/library/sleep-science`,
    `${BASE_URL}/zh/about`,
    `${BASE_URL}/zh/guide`,
  ];

  let totalLoadTime = 0;
  let count = 0;
  let slowPages = 0;

  for (const url of samples) {
    const start = Date.now();
    try {
      const res = await httpGet(url, 30000);
      const elapsed = Date.now() - start;
      totalLoadTime += elapsed;
      count++;
      const slow = elapsed > SLOW_THRESHOLD_MS ? '🐢' : '⚡';
      if (elapsed > SLOW_THRESHOLD_MS) slowPages++;
      const path = url.replace(BASE_URL, '');
      report(`基准 ${path}`, res.status === 200, {
        msg: `${slow} ${elapsed}ms HTTP ${res.status}`,
        loadTime: elapsed,
      });
    } catch (e) {
      const elapsed = Date.now() - start;
      report(`基准 ${url.replace(BASE_URL, '')}`, false, {
        msg: `FAIL ${elapsed}ms ${e.message}`,
      });
    }
  }

  const avg = count > 0 ? Math.round(totalLoadTime / count) : 0;
  report(`📊 平均响应 ${avg}ms | 慢速页 ${slowPages}/${count}`, avg < 3000, {
    msg: `avg=${avg}ms slow=${slowPages}/${count} threshold=${SLOW_THRESHOLD_MS}ms`,
  });
}

// ══════════════════════════════════════════════════
//  主流程
// ══════════════════════════════════════════════════

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('  DeepCalm AI 全量压力测试 v2');
  console.log(`  目标: ${BASE_URL}`);
  console.log(`  时间: ${new Date().toISOString()}`);
  console.log('═══════════════════════════════════════════\n');

  const startTime = Date.now();

  // ── 浏览器渲染测试 ──
  await testSSGPages();
  await testSanctuaryPages();
  await testTopicSEOandRelated();
  await testLibraryListingSEO();

  // ── API 测试 ──
  await testDecomposeAPI();
  await testAnalyzeAPI();

  // ── HTTP 直连测试 ──
  await testSitemap();
  await testConcurrency();
  await testResponseTimeBenchmark();

  // ── 汇总报告 ──
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const passRate = Math.round((PASS_COUNT / TOTAL_TESTS) * 100);

  console.log('\n═══════════════════════════════════════════');
  console.log('  📊 最终报告');
  console.log('═══════════════════════════════════════════');
  console.log(`  总测试: ${TOTAL_TESTS}`);
  console.log(`  ✅ 通过: ${PASS_COUNT}`);
  console.log(`  ❌ 失败: ${FAIL_COUNT}`);
  console.log(`  通过率: ${passRate}%`);
  console.log(`  总耗时: ${elapsed}s`);
  console.log('');

  // 打印失败测试详情
  const failures = RESULTS.filter(r => !r.pass);
  if (failures.length > 0) {
    console.log('  ── 失败明细 ──');
    for (const f of failures) {
      console.log(`  ❌ ${f.label}`);
      if (f.error) console.log(`     Error: ${f.error.slice(0, 100)}`);
      if (f.assertions) {
        for (const a of f.assertions) {
          if (!a.pass) console.log(`     Assert: ${a.key}${a.error ? ` — ${a.error}` : ''}`);
        }
      }
    }
    console.log('');
  }

  // 慢速页面警告
  const slowPages = RESULTS.filter(r => r.slow);
  if (slowPages.length > 0) {
    console.log(`  ⚠️  慢速页面 (>{SLOW_THRESHOLD_MS}ms): ${slowPages.length}`);
    for (const s of slowPages) {
      console.log(`     🐢 ${s.label} — ${s.loadTime}ms`);
    }
    console.log('');
  }

  if (passRate === 100) {
    console.log('  🎉 全量压力测试通过！');
  } else {
    console.log(`  ⚠️  通过率 ${passRate}% — 请检查失败项`);
  }

  console.log('═══════════════════════════════════════════\n');
}

main().catch(e => {
  console.error('FATAL:', e.message);
  process.exit(1);
});
