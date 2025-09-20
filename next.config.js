/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.elevatecopilot.com'],
  },
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/mission',
        permanent: false,
      },
      {
        source: '/certification',
        destination: '/mission',
        permanent: false,
      },
      {
        source: '/join',
        destination: '/events',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
