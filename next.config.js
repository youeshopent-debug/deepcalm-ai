/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.deepcalm-ai.com' }],
        destination: 'https://deepcalm-ai.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
