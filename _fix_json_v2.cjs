/**
 * DeepCalm JSON 修复 v2 —— 处理所有已知编码损坏模式
 * 
 * 已知问题：
 * 1. 中文文本中的 ASCII 双引号 "" 与 JSON 结构冲突
 * 2. TRAE 错误修复导致的 `][],[""]` 语法碎片
 * 3. faq 数组中 answer 被错误包裹为嵌套数组
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'content', 'custom-content', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

function fixContent(raw) {
  let s = raw;
  
  // --- 修复 1: 移除语法碎片 `][],[""]` ---
  // 这是 TRAE 错误修复引入的无效 JSON 语法
  // 模式: "...重建"][],[""]  →  "...重建"]
  s = s.replace(/"\]\[],\[""\]/g, '"]');
  s = s.replace(/"\]\[],\[""/g, '"');
  s = s.replace(/\[],\[""\]/g, '');
  s = s.replace(/\[""\]/g, '');
  
  // --- 修复 2: 处理 `["XXX..."]"][],[""]` 模式 ---
  // 在 faq 中 answer 被错误包裹为 ["..."] 然后跟着碎片
  // 将 ["内容"]"][],[""] 还原为 "内容"
  s = s.replace(/\["([^"]{10,}?)"\]"\]\[],\[""?\]?/g, '"$1"');
  s = s.replace(/\["([^"]{10,}?)"\]"\]/g, '"$1"]');
  
  // --- 修复 3: 处理 `["内容"][],[""]` 模式 ---
  s = s.replace(/\["([^"]+?)"\]\[],\[""\]/g, '"$1"');
  
  // --- 修复 4: 替换中文内容中的 ASCII " 为全角引号 ---
  // 匹配 CJK 字符前后的 "
  s = s.replace(
    /([\u4e00-\u9fff\u3000-\u303f\uff00-\uffef\u2018-\u201d])"([\u4e00-\u9fff\u3000-\u303f\uff00-\uffef])/g,
    '$1\u201C$2'
  );
  s = s.replace(
    /([\u4e00-\u9fff\u3000-\u303f\uff00-\uffef])"([\u4e00-\u9fff\u3000-\u303f\uff00-\uffef.,;:!?\u201d])/g,
    '$1\u201D$2'
  );
  
  return s;
}

let fixed = 0, clean = 0, failed = 0;

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  let content = fs.readFileSync(fullPath, 'utf-8');
  
  try {
    JSON.parse(content);
    console.log(`  ✓ ${file} (clean)`);
    clean++;
    continue;
  } catch (e) {
    // needs fix
  }
  
  const beforeFix = content;
  content = fixContent(content);
  
  try {
    JSON.parse(content);
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`  ✓ ${file} (fixed)`);
    fixed++;
  } catch (e2) {
    console.error(`  ✗ ${file}: ${e2.message.split('\n')[0].substring(0,80)}`);
    // Restore original
    fs.writeFileSync(fullPath, beforeFix, 'utf-8');
    failed++;
  }
}

console.log(`\nResult: ${clean} clean, ${fixed} fixed, ${failed} failed`);
