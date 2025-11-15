/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    proxy: true
  }
}

module.exports = nextConfig
