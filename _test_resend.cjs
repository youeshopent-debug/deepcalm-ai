const https = require('https');

const API_KEY = process.env.RESEND_API_KEY;
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

const email = process.argv[2] || 'alanlsl8208@gmail.com';
const lang = process.argv[3] || 'zh';

const body = JSON.stringify({
  email,
  unsubscribed: false,
  metadata: { lang, subscribedAt: new Date().toISOString() },
});

const options = {
  hostname: 'api.resend.com',
  path: `/audiences/${AUDIENCE_ID}/contacts`,
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  },
};

console.log('Testing Resend API...');
console.log('Audience:', AUDIENCE_ID);
console.log('Email:', email);

const req = https.request(options, (res) => {
  let d = '';
  res.on('data', (c) => (d += c));
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', d.slice(0, 500));
    process.exit(res.statusCode === 201 ? 0 : 1);
  });
});
req.on('error', (e) => { console.error('Request error:', e.message); process.exit(1); });
req.write(body);
req.end();
