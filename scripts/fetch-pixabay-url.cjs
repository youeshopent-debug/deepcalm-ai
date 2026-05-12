const https = require('https');
const http = require('http');

const SOUND_URL = 'https://pixabay.com/sound-effects/nature-birds-chirping-calm-173695/';

function fetch(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  const html = await fetch(SOUND_URL);

  // Search for any JSON data in script tags
  const jsonPattern = /<script[^>]*id="__NEXT_DATA__"[^>]*>({.+?})<\/script>/;
  const jsonMatch = html.match(jsonPattern);
  if (jsonMatch) {
    console.log('=== __NEXT_DATA__ found ===');
    const json = JSON.parse(jsonMatch[1]);
    const str = JSON.stringify(json);
    const audioMatches = str.match(/(?:audio|mp3|download|sound)[^}]*/gi);
    if (audioMatches) {
      audioMatches.forEach(m => console.log('AUDIO_KEY:', m.substring(0, 300)));
    }
  }

  // Search for any JSON-LD
  const ldPattern = /<script[^>]*type="application\/ld\+json"[^>]*>({.+?})<\/script>/;
  const ldMatch = html.match(ldPattern);
  if (ldMatch) {
    console.log('\n=== JSON-LD found ===');
    console.log(ldMatch[1].substring(0, 500));
  }

  // Search for any embedded audio URLs
  const audioUrlPattern = /"audio(?:Url|Download|File)"\s*:\s*"([^"]+)"/gi;
  let auMatch;
  let found = false;
  while ((auMatch = audioUrlPattern.exec(html)) !== null) {
    console.log('\nAUDIO URL FOUND:', auMatch[1]);
    found = true;
  }

  // Search for any CDN URLs
  const cdnPattern = /cdn\.pixabay\.com[^"'\s\\]+/gi;
  let cdnMatch;
  while ((cdnMatch = cdnPattern.exec(html)) !== null) {
    console.log('\nCDN URL:', cdnMatch[0]);
    found = true;
  }

  // Search for download links
  const downloadPattern = /"download(?:Url|Link|Path)"\s*:\s*"([^"]+)"/gi;
  let dlMatch;
  while ((dlMatch = downloadPattern.exec(html)) !== null) {
    console.log('\nDOWNLOAD URL:', dlMatch[1]);
    found = true;
  }

  // General MP3 search
  const mp3Pattern = /https?:\/\/[^"'\s]+\.mp3[^"'\s]*/gi;
  let mp3Match;
  while ((mp3Match = mp3Pattern.exec(html)) !== null) {
    console.log('\nMP3 URL:', mp3Match[0]);
    found = true;
  }

  if (!found) {
    console.log('No audio URLs found in raw HTML. The content is JS-rendered.');
    console.log('HTML length:', html.length);
    // Save HTML for inspection
    const fs = require('fs');
    fs.writeFileSync(__dirname + '/pixabay_page.html', html);
    console.log('Saved HTML to pixabay_page.html for inspection');
  }
})();
