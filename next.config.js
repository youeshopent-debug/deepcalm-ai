/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://*.googlesyndication.com https://*.googleadservices.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://*.googlesyndication.com; font-src 'self' data:; connect-src 'self' https://*.google-analytics.com https://analytics.google.com; frame-src https://pagead2.googlesyndication.com https://*.googlesyndication.com; media-src 'self' blob:;",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
