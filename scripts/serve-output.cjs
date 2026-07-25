const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'output', 'DEEPCALM_Dossier_20260512');
const PORT = 4311;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.md5': 'text/plain; charset=utf-8',
  '.zip': 'application/zip',
  '.json': 'application/json; charset=utf-8',
};

http.createServer((req, res) => {
  let filePath = path.join(ROOT, decodeURIComponent(req.url));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    const files = fs.readdirSync(filePath);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>DEEPCALM Dossier</title>
<style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;max-width:800px;margin:40px auto;padding:0 20px}
h1{color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:10px}
a{color:#2563eb;text-decoration:none;display:block;padding:6px 0;font-size:14px;word-break:break-all}
a:hover{color:#1d4ed8;text-decoration:underline}
.dir{font-weight:600;color:#7c3aed}
.file{color:#374151}
.size{color:#9ca3af;font-size:12px;margin-left:8px}
</style></head><body>
<h1>📂 DEEPCALM Dossier</h1>
<div id="files">${files.map(f => {
  const full = path.join(filePath, f);
  const s = fs.statSync(full);
  const size = s.isDirectory() ? '' : ` <span class="size">(${(s.size/1024/1024).toFixed(1)} MB)</span>`;
  const cls = s.isDirectory() ? 'dir' : 'file';
  const icon = s.isDirectory() ? '📁' : '📄';
  return `<a class="${cls}" href="${path.join(req.url, f)}">${icon} ${f}${size}</a>`;
}).join('\n')}</div></body></html>`);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  const stream = fs.createReadStream(filePath);
  res.writeHead(200, { 'Content-Type': contentType });
  stream.pipe(res);
}).listen(PORT, () => {
  console.log(`🚀 文件服务器已启动: http://localhost:${PORT}`);
  console.log(`📁 根目录: ${ROOT}`);
});
