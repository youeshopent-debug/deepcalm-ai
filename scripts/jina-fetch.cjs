const https = require('https');

const SOUNDS = [
  { key: 'rain',     id: 'nature-relaxing-rain-444802' },
  { key: 'fire',     id: 'fire-crackling-229897' },
  { key: 'ocean',    id: 'nature-soothing-ocean-waves-372489' },
  { key: 'stream',   id: 'nature-relaxing-stream-ambience-for-youtube-420901' },
  { key: 'thunder',  id: 'night-rain-with-distant-thunder-321446' },
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    https.get({
      hostname: u.hostname,
      path: u.pathname + u.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/plain',
      },
      rejectUnauthorized: false,
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', reject);
  });
}

function extractCdnUrl(text) {
  // Pattern: https://cdn.pixabay.com/download/audio/...mp3
  const m = text.match(/https:\/\/cdn\.pixabay\.com\/download\/audio\/[^\s"'<>]+?\.mp3[^\s"'<>]*/);
  if (m) return m[0].replace(/&amp;/g, '&');
  // Pattern: /download/audio/...
  const m2 = text.match(/\/download\/audio\/[^\s"'<>]+?\.mp3[^\s"'<>]*/);
  if (m2) return 'https://cdn.pixabay.com' + m2[0].replace(/&amp;/g, '&');
  return null;
}

(async () => {
  for (const s of SOUNDS) {
    process.stdout.write(`${s.key}... `);
    try {
      const url = `https://r.jina.ai/https://pixabay.com/sound-effects/${s.id}/`;
      const r = await fetchUrl(url);
      if (r.status !== 200) { console.log(`HTTP ${r.status}`); continue; }
      const cdn = extractCdnUrl(r.data);
      if (cdn) {
        console.log(`✅`);
        console.log(`  ${cdn}`);
      } else {
        // Show first 1000 chars to debug
        console.log(`❌ no CDN. First 500 chars:`);
        console.log(r.data.substring(0, 500).replace(/\n/g, ' '));
      }
    } catch(e) { console.log(`❌ ${e.message}`); }
  }
})();
