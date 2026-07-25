const proxy = "http://127.0.0.1:7890"
const url = "https://pixabay.com/videos/forest-nature-moss-trees-woods-287510/"

// Method 1: oEmbed API (no key needed)
try {
  const r = await fetch(`https://pixabay.com/oembed/?url=${encodeURIComponent(url)}&format=json`)
  const data = await r.json()
  if (data?.url) console.log("oEmbed video:", data.url)
  if (data?.thumbnail_url) console.log("oEmbed thumb:", data.thumbnail_url)
} catch { console.log("oEmbed failed") }

// Method 2: scrape page HTML
try {
  const r = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
  })
  const html = await r.text()
  const sources = [...html.matchAll(/src="(https:\/\/cdn\.pixabay\.com\/video\/[^"]+\.mp4)"/g)]
  for (const s of sources) console.log("Source:", s[1])
} catch { console.log("scrape failed") }
