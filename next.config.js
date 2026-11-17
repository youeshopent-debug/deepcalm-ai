/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return [
      {
        source: "/pdfs/:lang(zh|en|ms|ja|ko|th|es)/:slug([a-z0-9_-]+).pdf",
        destination: "/:lang/library/:slug/print",
        permanent: true,
      },
      {
        source: "/:lang(zh|en|ms|ja|ko|th|es)/social",
        destination: "/social",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
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
