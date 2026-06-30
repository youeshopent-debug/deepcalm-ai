const { spawn, execSync } = require('child_process');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const USER_DATA_DIR = 'C:\\Users\\User\\AppData\\Local\\Google\\Chrome\\User Data';
const CDP_PORT = 9222;
const TARGET_URL = 'https://deepcalm-ai.com/';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function waitForTarget(page, textCheck, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const has = await page.evaluate((t) => {
      return document.body.textContent.toLowerCase().includes(t.toLowerCase());
    }, textCheck);
    if (has) return true;
    await sleep(1500);
  }
  return false;
}

async function tryClickByText(page, textPattern) {
  return page.evaluate((text) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
    let node;
    while ((node = walker.nextNode())) {
      const el = node;
      if (el.textContent && el.textContent.trim().toLowerCase() === text.toLowerCase()) {
        if (typeof el.click === 'function') { el.click(); return true; }
      }
      if (el.textContent && el.textContent.trim().toLowerCase().includes(text.toLowerCase()) && el.children.length > 0) {
        const child = el.querySelector('button, a, span, div[role="button"]');
        if (child && typeof child.click === 'function') { child.click(); return true; }
      }
    }
    return false;
  }, textPattern);
}

function urlEncodeParam(str) {
  return encodeURIComponent(str);
}

async function main() {
  console.log('=== Submit deepcalm-ai.com to Google Search Console ===\n');

  // Step 1: Kill existing Chrome
  console.log('[1] Killing running Chrome...');
  try {
    execSync('taskkill /F /IM chrome.exe 2>nul', { stdio: 'pipe', timeout: 10000, shell: true });
    console.log('  -> Chrome terminated');
  } catch {
    console.log('  -> No running Chrome found');
  }
  await sleep(4000);

  // Step 2: Launch Chrome with CDP
  console.log('[2] Launching Chrome with remote debugging (port 9222)...');
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${CDP_PORT}`,
    `--user-data-dir=${USER_DATA_DIR}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions-except=',
  ], { stdio: 'ignore', detached: true, shell: true });
  chrome.unref();
  await sleep(5000);

  // Step 3: Connect via puppeteer-core
  console.log('[3] Connecting Puppeteer...');
  let browser;
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${CDP_PORT}`, defaultViewport: null });
      console.log('  -> Connected');
      break;
    } catch (err) {
      console.log(`  -> Attempt ${attempt + 1}/5 failed, retrying...`);
      await sleep(3000);
    }
  }
  if (!browser) throw new Error('Could not connect to Chrome after 5 attempts');

  // Step 4: Open GSC URL Inspection
  const resId = urlEncodeParam(TARGET_URL);
  const inspUrl = urlEncodeParam(TARGET_URL);
  const gscUrl = `https://search.google.com/search-console/inspect?resource_id=${resId}&inspectionUrl=${inspUrl}`;

  console.log('[4] Opening Google Search Console URL Inspection...');
  const page = await browser.newPage();
  await page.goto(gscUrl, { waitUntil: 'networkidle2', timeout: 60000 });
  console.log('  -> Page loaded');

  // Step 5: Wait for "Request Indexing" to appear
  console.log('[5] Waiting for "Request Indexing" button...');
  const appeared = await waitForTarget(page, 'request indexing', 30000);
  if (!appeared) {
    console.log('  -> "Request Indexing" not found. Trying alternative...');
    await page.screenshot({ path: 'gsc-before.png', fullPage: true });
    console.log('  -> Screenshot saved to gsc-before.png');
  } else {
    console.log('  -> Button detected in DOM');
  }
  await sleep(3000);

  // Step 6: Click "Request Indexing"
  console.log('[6] Clicking "Request Indexing"...');
  const clicked = await tryClickByText(page, 'request indexing');
  console.log(`  -> ${clicked ? 'Clicked successfully' : 'Could not find button'}`);

  // If first method fails, try page.evaluate with more flexible matching
  if (!clicked) {
    console.log('  -> Trying alternative click method...');
    const result = await page.evaluate(() => {
      const all = document.querySelectorAll('*');
      for (const el of all) {
        const t = el.textContent?.trim().toLowerCase() || '';
        if ((t === 'request indexing' || t.startsWith('request indexing')) && el.offsetParent !== null) {
          el.click();
          return 'direct';
        }
        if (t.includes('request indexing') && (el.tagName === 'BUTTON' || el.tagName === 'A' || el.getAttribute('role') === 'button')) {
          el.click();
          return 'button-' + el.tagName;
        }
      }
      return 'none';
    });
    console.log(`  -> Alternative result: ${result}`);
  }

  await sleep(4000);

  // Step 7: Screenshot result
  console.log('[7] Taking screenshot...');
  await page.screenshot({ path: 'gsc-result.png', fullPage: true });
  console.log('  -> Saved to gsc-result.png');

  // Step 8: Log page title and current URL
  const title = await page.title();
  const url = page.url();
  console.log(`  -> Page: "${title}"`);
  console.log(`  -> URL: ${url}`);

  await browser.disconnect();
  console.log('\n✅ Done! Chrome is running with restored tabs.');
}

main().catch(err => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
