/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BACKEND_URL: 'http://localhost:9090',
    },
    reactStrictMode: false,
    images: {
      domains: ['random.imagecdn.app'],
    }
  }

module.exports = nextConfig
