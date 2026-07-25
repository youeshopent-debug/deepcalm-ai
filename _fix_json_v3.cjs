/**
 * JSON 修复脚本 v3 — 精准修复中文直引号 + TRAE 碎片
 *
 * 策略：
 * 1. 先预处理移除 TRAE 引入的语法碎片（如 co-dependency.json 中的 `][],[""]`）
 * 2. 再用状态机遍历字符，识别 JSON 字符串内部的中文直引号并转义
 * 3. 最终用 JSON.parse 验证
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'src/content/custom-content/data');
const FILES = [
  'co-dependency.json',
  'dark-thoughts.json',
  'dependent-personality.json',
  'emotional-numbness.json',
  'panic-attack.json',
  'sleep-paralysis.json',
];

// ─── Step 1: 预处理 TRAE 碎片 ────────────────────────────────────
function preprocessTRAE(raw) {
  // 检测 co-dependency.json 特有碎片：
  // ["问题", ["答案内容"][],[""]]
  // └─────────┬─────────┘└──┬──┘
  //           数组答案       TRAE 残留
  const traePattern = /\["([^"]+)"\s*,\s*\["([^"]+)"\]\s*\[\]\s*,\s*\[""\]\s*\]/g;
  let result = raw.replace(traePattern, (match, q, a) => {
    // 将 ["问题", ["答案"][],[""]] 修复为 ["问题", "答案"]
    // 注意：答案内部可能还有未转义的直引号，留到 Step 2 处理
    return `["${q}", "${a}"]`;
  });

  // 更通用的模式：检测 [...][],[""] 模式
  // 可能出现在任何数组元素末尾
  result = result.replace(/\]\s*\[\]\s*,\s*\[""\]\s*\]/g, '"]');

  return result;
}

// ─── Step 2: 转义字符串内嵌直引号 ──────────────────────────────
function escapeEmbeddedQuotes(raw) {
  const chars = [...raw];
  const out = [];
  let i = 0;
  let inString = false;

  function isWhitespace(ch) {
    return ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r';
  }

  function findPrevNonWs(idx) {
    let j = idx - 1;
    while (j >= 0 && isWhitespace(chars[j])) j--;
    return j >= 0 ? chars[j] : null;
  }

  function findNextNonWs(idx) {
    let j = idx + 1;
    while (j < chars.length && isWhitespace(chars[j])) j++;
    return j < chars.length ? chars[j] : null;
  }

  while (i < chars.length) {
    const ch = chars[i];

    // 转义序列
    if (ch === '\\' && i + 1 < chars.length) {
      out.push(ch);
      i++;
      out.push(chars[i]);
      i++;
      continue;
    }

    if (ch === '"') {
      if (!inString) {
        // 进入字符串
        inString = true;
        out.push(ch);
      } else {
        // 判断是否为结构闭合引号
        const nextNonWs = findNextNonWs(i);
        const prevNonWs = findPrevNonWs(i);

        // 结构闭合引号：后跟 : , } ]
        // 或前跟 : , { [（用于值结束后的键开始等边界情况）
        const isCloseStructural = nextNonWs === ':'
                               || nextNonWs === ','
                               || nextNonWs === '}'
                               || nextNonWs === ']';
        // 特殊情况：当前字符前向检查是否是结构起始
        const isOpenStructural = prevNonWs === ':'
                              || prevNonWs === ','
                              || prevNonWs === '{'
                              || prevNonWs === '[';

        if (isCloseStructural || isOpenStructural) {
          // 结构引号 — 字符串结束
          inString = false;
          out.push(ch);
        } else {
          // 内嵌中文直引号 — 转义
          out.push('\\');
          out.push(ch);
        }
      }
      i++;
      continue;
    }

    out.push(ch);
    i++;
  }

  return out.join('');
}

// ─── Step 3: 验证 ──────────────────────────────────────────────
function validate(raw, label) {
  try {
    JSON.parse(raw);
    return true;
  } catch (e) {
    console.log(`  ❌ 验证失败: ${e.message}`);
    return false;
  }
}

// ─── 主流程 ──────────────────────────────────────────────────
let fixed = 0;
let failed = 0;
let clean = 0;

for (const file of FILES) {
  const fp = path.join(DATA_DIR, file);
  const original = fs.readFileSync(fp, 'utf-8');

  // 跳过已合法的
  try {
    JSON.parse(original);
    console.log(`⏭️  ${file}: 已合法，跳过`);
    clean++;
    continue;
  } catch (_) {
    // 需要修复
  }

  console.log(`\n🔧 ${file}: 修复中...`);

  // Step 1: 移除 TRAE 碎片
  let content = preprocessTRAE(original);
  if (content !== original) {
    console.log(`   → TRAE 碎片已清理`);
  }

  // Step 2: 转义内嵌引号
  content = escapeEmbeddedQuotes(content);

  // Step 3: 验证
  if (validate(content, file)) {
    fs.writeFileSync(fp, content, 'utf-8');
    console.log(`   ✅ 修复成功 ✔`);
    fixed++;
  } else {
    // 回滚
    console.log(`   ❌ 修复失败，正在回滚...`);

    // 诊断具体位置
    try {
      JSON.parse(content);
    } catch (e) {
      const match = e.message.match(/position (\d+)/);
      if (match) {
        const pos = parseInt(match[1], 10);
        const before = content.substring(Math.max(0, pos - 50), pos);
        const after = content.substring(pos, pos + 50);
        const lineNum = content.substring(0, pos).split('\n').length;
        console.log(`   错误位置 ${pos} (行 ${lineNum})`);
        console.log(`   前文: ${JSON.stringify(before)}`);
        console.log(`   后文: ${JSON.stringify(after)}`);
      }
    }

    // 写回原始内容
    fs.writeFileSync(fp, original, 'utf-8');
    failed++;
  }
}

console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`结果: ${clean} 干净, ${fixed} 修复, ${failed} 失败`);
