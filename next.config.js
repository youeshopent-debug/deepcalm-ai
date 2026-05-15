/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
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
