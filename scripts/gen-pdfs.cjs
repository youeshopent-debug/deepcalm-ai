const { chromium } = require('playwright');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUT = path.resolve(__dirname, '..', 'output', 'DEEPCALM_Dossier_20260512');

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ['--no-sandbox', '--disable-gpu', '--headless=new'],
  });

  // 1. AI 白皮书 → PDF
  const page1 = await browser.newPage();
  await page1.goto('file:///' + path.resolve(OUT, '白皮书', 'AI_White_Paper.html').replace(/\\/g, '/'), {
    waitUntil: 'networkidle',
  });
  await page1.pdf({
    path: path.join(OUT, '白皮书', 'AI_White_Paper.pdf'),
    format: 'A4',
    margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
    printBackground: true,
  });
  await page1.close();

  // 2. PPT 幻灯片 → PDF (landscape)
  const page2 = await browser.newPage();
  await page2.goto('file:///' + path.resolve(OUT, 'PPT模板', 'DEEPCALM_Slide_Deck.html').replace(/\\/g, '/'), {
    waitUntil: 'networkidle',
  });
  await page2.pdf({
    path: path.join(OUT, 'PPT模板', 'DEEPCALM_Slide_Deck.pdf'),
    width: '1280px',
    height: '720px',
    landscape: true,
    margin: { top: '0', bottom: '0', left: '0', right: '0' },
    printBackground: true,
  });
  await page2.close();

  await browser.close();
  console.log('OK');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
