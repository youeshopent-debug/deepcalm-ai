const https = require('https');

const API_KEY = 're_KsGfM3fs_7byYe6hSTm8nX3saoM5ZSm9t';

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const bodyStr = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'api.resend.com',
      path,
      method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr || '')
      }
    };
    const req = https.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        if (!d) { resolve({}); return; }
        try { resolve(JSON.parse(d)); }
        catch { resolve({ raw: d }); }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

async function main() {
  // List existing audiences
  console.log('=== Existing Audiences ===');
  const list = await api('GET', '/audiences');
  console.log(JSON.stringify(list, null, 2));

  // Create DeepCalm AI audience
  console.log('\n=== Creating DeepCalm AI Audience ===');
  const created = await api('POST', '/audiences', {
    name: 'DeepCalm AI',
    description: 'Midnight Sanctuary - Daily AI Companion Newsletter'
  });
  console.log(JSON.stringify(created, null, 2));
}

main().catch(e => { console.error('Error:', e.message); process.exit(1); });
