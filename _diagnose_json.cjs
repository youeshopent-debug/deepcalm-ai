/**
 * JSON 诊断脚本 — 逐文件尝试解析，报告精确错误位置
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src/content/custom-content/data');
const files = [
  'co-dependency.json',
  'dark-thoughts.json',
  'dependent-personality.json',
  'emotional-numbness.json',
  'panic-attack.json',
  'sleep-paralysis.json',
];

for (const file of files) {
  const fp = path.join(dataDir, file);
  const raw = fs.readFileSync(fp, 'utf-8');
  const lines = raw.split('\n');

  try {
    JSON.parse(raw);
    console.log(`✅ ${file}: VALID`);
  } catch (e) {
    console.log(`\n❌ ${file}: ${e.message}`);
    const match = e.message.match(/position (\d+)/);
    if (match) {
      const pos = parseInt(match[1], 10);
      const before = raw.substring(Math.max(0, pos - 40), pos);
      const after = raw.substring(pos, pos + 40);
      const lineNum = raw.substring(0, pos).split('\n').length;
      console.log(`   Position: ${pos}, Line: ${lineNum}`);
      console.log(`   Context before: ${JSON.stringify(before)}`);
      console.log(`   Context after:  ${JSON.stringify(after)}`);

      // Show the specific line
      if (lineNum <= lines.length) {
        const line = lines[lineNum - 1];
        const col = pos - raw.substring(0, pos).lastIndexOf('\n');
        console.log(`   Line ${lineNum}: ${line.substring(0, 120)}`);
        console.log(`   ${' '.repeat(Math.min(col + 3, 120))}^`);
      }
    }
  }
}
