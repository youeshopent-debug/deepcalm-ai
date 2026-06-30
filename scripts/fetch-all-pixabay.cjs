const https = require('https');
const http = require('http');

const PROXY = null; // proxy offline, use direct

const SOUNDS = [
  { key: 'rain',     url: 'https://pixabay.com/sound-effects/nature-relaxing-rain-444802/' },
  { key: 'fire',     url: 'https://pixabay.com/sound-effects/fire-crackling-229897/' },
  { key: 'ocean',    url: 'https://pixabay.com/sound-effects/nature-soothing-ocean-waves-372489/' },
  { key: 'stream',   url: 'https://pixabay.com/sound-effects/nature-relaxing-stream-ambience-for-youtube-420901/' },
  { key: 'thunder',  url: 'https://pixabay.com/sound-effects/night-rain-with-distant-thunder-321446/' },
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = url.startsWith('https') ? https : http;
    const opts = {
      hostname: urlObj.hostname,
      port: urlObj.port || 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      rejectUnauthorized: false,
    };
    if (PROXY) {
      opts.host = PROXY.host;
      opts.port = PROXY.port;
      opts.path = url;
    }
    const req = (PROXY ? http : client).request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

function extractCdnUrl(html) {
  const nextDataMatch = html.match(/<script[^>]*id="__NEXT_DATA__"[^>]*>({.+?})<\/script>/);
  if (!nextDataMatch) return null;
  try {
    const json = JSON.parse(nextDataMatch[1]);
    const str = JSON.stringify(json);
    const cdnMatch = str.match(/https?:\\\/\\\/cdn\.pixabay\.com\\\/download\\\/audio[^"]+/);
    if (cdnMatch) return cdnMatch[0].replace(/\\\//g, '/');
    const cdnMatch2 = str.match(/https?:\/\/cdn\.pixabay\.com\/download\/audio[^"\\,]+/);
    if (cdnMatch2) return cdnMatch2[0];
  } catch (e) {}
  return null;
}

(async () => {
  for (const sound of SOUNDS) {
    process.stdout.write(`Fetching ${sound.key}... `);
    try {
      const result = await fetchUrl(sound.url);
      if (result.status !== 200) {
        console.log(`HTTP ${result.status}`);
        continue;
      }
      const cdnUrl = extractCdnUrl(result.data);
      if (cdnUrl) {
        console.log(`✅ ${cdnUrl}`);
      } else {
        console.log('❌ No CDN URL found');
      }
    } catch (e) {
      console.log(`❌ Error: ${e.message}`);
    }
  }
})();
