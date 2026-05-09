const https = require('https');
function fetch(url) {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      const loc = res.headers.location.startsWith('/') ? 'https://deepcalm-ai.com' + res.headers.location : res.headers.location;
      console.log(`Redirect ${res.statusCode} -> ${loc}`);
      fetch(loc);
      return;
    }
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.log('STATUS:', res.statusCode, '| LEN:', data.length);
      const meta = data.match(/<meta[^>]*name="description"[^>]*content="([^"]+)"/);
      console.log('META DESC:', meta ? meta[1] : 'NOT FOUND');
      const h1 = data.match(/<h1[^>]*>([^<]+)<\/h1>/);
      console.log('H1:', h1 ? h1[1] : 'NOT FOUND');
      const classes = data.match(/class="([^"]*(?:glass|dc-|aurora)[^"]*)"/g);
      console.log('GLASS/AURORA/DC classes:', classes ? classes.length : 0);
      if (classes) classes.slice(0, 5).forEach(c => console.log('  ', c));
      console.log('Has dark class:', data.includes('class="dark"') || data.includes('dark mode'));
      console.log('Body bg:', data.includes('#1A2238') || data.includes('var(--dc-deep)'));
    });
  });
}
fetch('https://deepcalm-ai.com');
