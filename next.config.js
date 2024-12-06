/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      BACKEND_URL: 'http://localhost:9090',
      WEB_SOCKET_URL: 'ws://localhost:9090/ws'
    },
    reactStrictMode: false,
    images: {
      domains: ['random.imagecdn.app'],
    }
  }

module.exports = nextConfig
