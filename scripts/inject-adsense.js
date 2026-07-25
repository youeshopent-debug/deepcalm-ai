const fs = require("fs")
const path = require("path")

const ADSENSE_TAG = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9587418043365530" crossorigin="anonymous"></script>`

const BUILD_DIR = path.resolve(__dirname, "..", ".next", "server", "app")

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full)
    } else if (entry.name.endsWith(".html")) {
      inject(full)
    }
  }
}

function inject(filePath) {
  let html = fs.readFileSync(filePath, "utf-8")

  if (html.includes('<script async src="https://pagead2.googlesyndication.com')) {
    console.log(`[SKIP] already has literal AdSense tag: ${path.relative(BUILD_DIR, filePath)}`)
    return
  }

  const idx = html.lastIndexOf("</body>")
  if (idx === -1) {
    console.log(`[SKIP] no </body> found: ${path.relative(BUILD_DIR, filePath)}`)
    return
  }

  html = html.slice(0, idx) + ADSENSE_TAG + html.slice(idx)
  fs.writeFileSync(filePath, html, "utf-8")
  console.log(`[INJECT] ${path.relative(BUILD_DIR, filePath)}`)
}

if (!fs.existsSync(BUILD_DIR)) {
  console.error(`Build directory not found: ${BUILD_DIR}`)
  console.error("Run 'next build' first!")
  process.exit(1)
}

walk(BUILD_DIR)
console.log("Done.")
