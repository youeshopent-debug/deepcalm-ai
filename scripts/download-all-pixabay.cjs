const https = require('https');
const fs = require('fs');
const path = require('path');

const AUDIO_DIR = path.resolve(__dirname, '../public/audio');

const URLS = [
  { name: 'rain', url: 'https://cdn.pixabay.com/download/audio/2025/11/29/audio_04e9ec42a3.mp3?filename=dragon-studio-relaxing-rain-444802.mp3', file: 'rain-nature.mp3' },
  { name: 'fire', url: 'https://cdn.pixabay.com/download/audio/2024/08/04/audio_f2784444c5.mp3?filename=soul_serenity_sounds-fire-crackling-229897.mp3', file: 'fire-nature.mp3' },
  { name: 'stream', url: 'https://cdn.pixabay.com/download/audio/2025/10/15/audio_4c8fc5f319.mp3?filename=dragon-studio-relaxing-stream-ambience-for-youtube-420901.mp3', file: 'stream-nature.mp3' },
  { name: 'wind', url: 'https://cdn.pixabay.com/download/audio/2025/07/09/audio_56227295c2.mp3?filename=dragon-studio-soothing-ocean-waves-372489.mp3', file: 'wind-nature.mp3' },
  { name: 'insects', url: 'https://cdn.pixabay.com/download/audio/2025/04/01/audio_18c9b25c48.mp3?filename=mindmist-night-rain-with-distant-thunder-321446.mp3', file: 'insects-nature.mp3' },
];

function downloadSingle(item) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(AUDIO_DIR, item.file);
    const file = fs.createWriteStream(outputPath);
    const req = https.get(item.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'audio/mpeg,*/*',
        'Referer': 'https://pixabay.com/',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 30000
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        try { fs.unlinkSync(outputPath); } catch {}
        item.url = res.headers.location;
        return resolve(downloadSingle(item));
      }
      if (res.statusCode !== 200) {
        file.close();
        try { fs.unlinkSync(outputPath); } catch {}
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      const total = parseInt(res.headers['content-length'] || '0', 10);
      let downloaded = 0;
      res.on('data', (chunk) => {
        downloaded += chunk.length;
        if (total) process.stdout.write(`\r  ${item.name}: ${Math.round(downloaded/total*100)}% (${(downloaded/1024/1024).toFixed(1)}MB)`);
      });
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(outputPath);
        if (stats.size < 5000) {
          fs.unlinkSync(outputPath);
          return reject(new Error(`Too small: ${stats.size} bytes`));
        }
        console.log(`\n  ${item.name} done! ${(stats.size/1024/1024).toFixed(2)}MB`);
        resolve(true);
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

(async () => {
  let success = 0;
  let fail = 0;
  for (const item of URLS) {
    console.log(`\n[${success+fail+1}/${URLS.length}] Downloading ${item.name}...`);
    try {
      await downloadSingle(item);
      success++;
    } catch (e) {
      console.log(`  ${item.name} FAILED: ${e.message}`);
      fail++;
    }
  }
  console.log(`\n=== Done: ${success} success, ${fail} failed ===`);
  process.exit(fail > 0 ? 1 : 0);
})();
