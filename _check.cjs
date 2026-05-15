const urls = [
  'https://deepcalm-ai.com',
  'https://deepcalm-ai.com/en',
  'https://deepcalm-ai.com/zh',
  'https://deepcalm-ai.com/ja',
]

async function checkPage(url) {
  try {
    const r = await fetch(url, { redirect: 'follow' })
    const text = await r.text()
    const title = (text.match(/<title>([^<]+)<\/title>/) || [])[1] || ''
    const desc = (text.match(/<meta[^>]+name="description"[^>]+content="([^"]+)"/) || [])[1] || ''
    const h1 = (text.match(/<h1[^>]*>([^<]+)<\/h1>/) || [])[1] || ''
    const canonical = (text.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/) || [])[1] || ''
    const viewport = (text.match(/<meta[^>]+name="viewport"[^>]+content="([^"]+)"/) || [])[1] || ''
    const lang = (text.match(/<html[^>]+lang="([^"]+)"/) || [])[1] || ''
    const ogTitle = (text.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/) || [])[1] || ''
    const ogDesc = (text.match(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/) || [])[1] || ''
    const ogImage = (text.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/) || [])[1] || ''
    const hasForest = text.includes('forest-bg')
    const hasAudioTray = text.includes('AudioFloatingTray') || text.includes('audio-floating')
    const hasSanctuary = text.includes('Sanctuary') || text.includes('sanctuary')
    return { url, status: r.status, title, desc, h1, lang, viewport, canonical, ogTitle, ogDesc, ogImage, hasForest, hasAudioTray, hasSanctuary }
  } catch(e) {
    return { url, status: 'ERROR', error: e.message }
  }
}

(async () => {
  const results = await Promise.all(urls.map(checkPage))
  console.log(JSON.stringify(results, null, 2))
})()
