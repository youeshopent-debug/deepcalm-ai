const fs = require('fs');
const path = 'src/content/custom-content/index.ts';
const fullPath = path; // relative to cwd
try {
  const buf = fs.readFileSync(fullPath);
  // Try UTF-8 first, fallback to latin1
  let content;
  try {
    content = new TextDecoder('utf-8', { fatal: true }).decode(buf);
  } catch {
    console.log('WARN: UTF-8 decode failed, trying latin1 fallback');
    content = new TextDecoder('latin1').decode(buf);
  }
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log('OK: file rewritten as UTF-8');
} catch(e) {
  console.error('FAIL:', e.message);
  process.exit(1);
}
