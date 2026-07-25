/**
 * 精确修复 custom-content JSON 文件中的嵌入式中文引号
 * 
 * 问题：中文内容中的「"太爱了"」使用了 ASCII 双引号 (0x22)
 * 而非全角引号。JSON 解析器会将它们视为字符串结束符。
 * 
 * 方案：用状态机遍历文件，在字符串值内部将 ASCII " 转义为 \"
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'content', 'custom-content', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

function isCJKOrPunct(code) {
  // CJK Unified Ideographs, CJK Symbols, full-width forms
  return (code >= 0x4E00 && code <= 0x9FFF) ||
         (code >= 0x3000 && code <= 0x303F) ||
         (code >= 0xFF00 && code <= 0xFFEF) ||
         (code >= 0x2E80 && code <= 0x2EFF) || // CJK Radicals
         (code >= 0x2000 && code <= 0x206F) || // General Punctuation (including em-dash, etc.)
         (code >= 0x2100 && code <= 0x214F);    // Letterlike Symbols
}

function isStructChar(code) {
  // JSON structural characters
  return code === 0x7B || code === 0x7D || // { }
         code === 0x5B || code === 0x5D || // [ ]
         code === 0x3A ||                   // :
         code === 0x2C;                     // ,
}

function fixJsonQuotes(content) {
  const chars = [...content]; // Split by Unicode code points, not bytes
  const result = [];
  let inString = false;
  let escaped = false;
  let fixCount = 0;
  
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const code = ch.codePointAt(0);
    
    if (escaped) {
      result.push(ch);
      escaped = false;
      continue;
    }
    
    if (ch === '\\') {
      result.push(ch);
      escaped = true;
      continue;
    }
    
    if (ch === '"') {
      if (!inString) {
        // Opening quote of a JSON string
        inString = true;
        result.push(ch);
      } else {
        // We're inside a string - check if this " ends the string or is embedded
        // Look at previous and next characters (non-whitespace, non-structural)
        let prevChar = null;
        let nextChar = null;
        
        // Find previous non-whitespace character
        for (let j = result.length - 1; j >= 0; j--) {
          const pc = result[j];
          if (pc !== ' ' && pc !== '\t' && pc !== '\n' && pc !== '\r') {
            prevChar = pc;
            break;
          }
        }
        
        // Find next non-whitespace character
        for (let j = i + 1; j < chars.length; j++) {
          const nc = chars[j];
          if (nc !== ' ' && nc !== '\t' && nc !== '\n' && nc !== '\r') {
            nextChar = nc;
            break;
          }
        }
        
        // Decision: if the " is surrounded by CJK or specific patterns, it's embedded
        const prevCode = prevChar ? prevChar.codePointAt(0) : null;
        const nextCode = nextChar ? nextChar.codePointAt(0) : null;
        
        const prevIsCJK = prevCode && isCJKOrPunct(prevCode);
        const nextIsCJK = nextCode && isCJKOrPunct(nextCode);
        const prevIsAlpha = prevCode && ((prevCode >= 0x41 && prevCode <= 0x5A) || (prevCode >= 0x61 && prevCode <= 0x7A));
        const nextIsAlpha = nextCode && ((nextCode >= 0x41 && nextCode <= 0x5A) || (nextCode >= 0x61 && nextCode <= 0x7A));
        const prevIsCommaBrace = prevCode && [0x2C, 0x7B, 0x5B, 0x3A].includes(prevCode);
        const nextIsCommaBrace = nextCode && [0x2C, 0x7D, 0x5D, 0x3A].includes(nextCode);
        
        // Heuristic: embedded quote if surrounded by CJK or alphanumeric
        if ((prevIsCJK || nextIsCJK) && !prevIsCommaBrace && !nextIsCommaBrace) {
          // This is an embedded quote inside Chinese text - escape it
          result.push('\\');
          result.push('"');
          fixCount++;
        } else if (prevIsAlpha && nextIsAlpha) {
          // Alphanumeric context - escape it
          result.push('\\');
          result.push('"');
          fixCount++;
        } else {
          // This is a structural string terminator
          inString = false;
          result.push(ch);
        }
      }
    } else {
      result.push(ch);
    }
  }
  
  return { fixed: result.join(''), fixCount };
}

let totalFixed = 0;
let totalFiles = 0;

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  let content = fs.readFileSync(fullPath, 'utf-8');
  
  // First try parsing as-is
  try {
    JSON.parse(content);
    console.log(`  ✓ ${file} (clean)`);
    totalFiles++;
    continue;
  } catch (e) {
    // Needs fixing
  }
  
  const { fixed, fixCount } = fixJsonQuotes(content);
  
  try {
    JSON.parse(fixed);
    fs.writeFileSync(fullPath, fixed, 'utf-8');
    console.log(`  ✓ ${file} (fixed ${fixCount} quotes)`);
    totalFixed++;
    totalFiles++;
  } catch (e2) {
    console.error(`  ✗ ${file} STILL BROKEN after fix: ${e2.message.split('\n')[0]}`);
    totalFiles++;
  }
}

console.log(`\nDone: ${totalFixed}/${totalFiles} files fixed.`);
