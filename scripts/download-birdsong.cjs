const https = require('https');
const fs = require('fs');
const path = require('path');

const URLS = [
  'https://cdn.pixabay.com/download/audio/2023/07/19/audio_25fe3bfc7c.mp3?filename=forest-birds-nature-sound-145204.mp3',
  'https://cdn.pixabay.com/download/audio/2021/08/09/audio_6b294070f5.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3',
  'https://cdn.pixabay.com/download/audio/2022/03/09/audio_0dda787382.mp3?filename=birds-in-the-morning-24147.mp3',
  'https://cdn.pixabay.com/download/audio/2022/03/09/audio_05483e3d6e.mp3?filename=shining-neural-network-26727.mp3'
];

const OUTPUT = path.resolve(__dirname, '../public/audio/birds-nature.mp3');

function download(url) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(OUTPUT);
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'audio/mpeg,*/*',
        'Referer': 'https://pixabay.com/',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 20000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(OUTPUT); } catch {}
        return resolve(download(res.headers.location));
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(OUTPUT); } catch {}
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const total = parseInt(res.headers['content-length'] || '0', 10);
      let downloaded = 0;
      res.on('data', (chunk) => {
        downloaded += chunk.length;
        if (total) process.stdout.write(`\r  ${Math.round(downloaded/total*100)}% (${(downloaded/1024/1024).toFixed(1)}MB)`);
      });
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(OUTPUT);
        if (stats.size < 5000) {
          fs.unlinkSync(OUTPUT);
          return reject(new Error(`Too small: ${stats.size} bytes`));
        }
        console.log(`\n  Done! ${(stats.size/1024/1024).toFixed(2)}MB`);
        resolve(true);
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

(async () => {
  for (const url of URLS) {
    console.log(`Trying: ${url.split('?')[0].slice(-30)}...`);
    try {
      await download(url);
      console.log('Success!');
      process.exit(0);
    } catch (e) {
      console.log(`  Failed: ${e.message}`);
    }
  }
  console.log('All URLs failed.');
  process.exit(1);
})();
