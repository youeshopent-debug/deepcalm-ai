const https = require('https')
const http = require('http')
const fs = require('fs')
const path = require('path')

async function fetchPage(url) {
  const parsed = new URL(url)
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    }, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    })
    req.on('error', reject)
  })
}

async function main() {
  const pages = [
    { url: 'https://pixabay.com/sound-effects/nature-birds-19624/', name: 'nature-birds-long' },
    { url: 'https://pixabay.com/sound-effects/nature-chirping-birds-ambience-217410/', name: 'chirping-birds' },
  ]

  for (const { url, name } of pages) {
    console.log(`\n=== ${name} ===`)
    try {
      const html = await fetchPage(url)
      
      // Find all MP3 download links
      const matches = html.match(/https?:\/\/cdn\.pixabay\.com[^"'\s]*\.mp3[^"'\s]*/g)
      if (matches) {
        const unique = [...new Set(matches)]
        console.log(`MP3 download URLs (${unique.length}):`)
        unique.forEach(u => console.log(`  ${u}`))
      }

      // Also look for audio download IDs
      const idMatch = html.match(/audio_id["'\s:=]+["']?(\d+)["']?/i)
      if (idMatch) console.log(`Audio ID: ${idMatch[1]}`)

      // Check for preview URL patterns
      const preview = html.match(/https?:\/\/www\.pixabay\.com[^"']*\/download\/[^"']*/g)
      if (preview) {
        const uniqueP = [...new Set(preview)]
        uniqueP.forEach(u => console.log(`  Preview URL: ${u}`))
      }

      // Check for any other audio-related URLs
      const audioUrls = html.match(/\/audio\/[^"'\s]+/g)
      if (audioUrls) {
        const uniqueA = [...new Set(audioUrls)]
        uniqueA.forEach(u => console.log(`  Audio path: ${u}`))
      }

      console.log(`HTML length: ${html.length} bytes`)
    } catch (err) {
      console.error(`Failed: ${err.message}`)
    }
  }
}

main().catch(console.error)
