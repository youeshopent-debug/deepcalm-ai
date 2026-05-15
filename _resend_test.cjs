const https = require('https');

const API_KEY = 're_KsGfM3fs_7byYe6hSTm8nX3saoM5ZSm9t';
const AUDIENCE_ID = 'cd7400b0-3bb5-4997-bc2d-7977649cfc95';

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
        console.log(`[${method} ${path}] Status: ${res.statusCode}`);
        console.log('Response:', d.slice(0, 500));
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
  // Test 1: Add contact to audience
  console.log('\n=== Test: Add contact ===');
  await api('POST', `/audiences/${AUDIENCE_ID}/contacts`, {
    email: 'test@example.com',
    unsubscribed: false,
    metadata: { lang: 'en', subscribedAt: new Date().toISOString() }
  });

  // Test 2: List contacts
  console.log('\n=== Test: List contacts ===');
  await api('GET', `/audiences/${AUDIENCE_ID}/contacts`);

  // Test 3: Send email
  console.log('\n=== Test: Send email ===');
  await api('POST', '/email', {
    from: 'onboarding@resend.dev',
    to: 'test@example.com',
    subject: 'Test from DeepCalm',
    html: '<h1>Hello!</h1>'
  });
}

main().catch(e => console.error('Error:', e.message));
