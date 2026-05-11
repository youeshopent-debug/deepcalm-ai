const fs = require('fs');
const c = fs.readFileSync('src/content/topic-content-templates.ts', 'utf8');
const lines = c.split('\n');
let found = [];
for (let i = 0; i < lines.length; i++) {
  const l = lines[i];
  // Count double quotes in the line
  const quotes = l.match(/"/g);
  if (quotes && quotes.length > 4) {
    found.push({ line: i + 1, text: l.trim(), count: quotes.length });
  }
}
if (found.length) {
  found.forEach(f => console.log('Line ' + f.line + ' (' + f.count + ' quotes): ' + f.text));
} else {
  console.log('No issues found');
}
