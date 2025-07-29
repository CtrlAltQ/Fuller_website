/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/Fuller_website',
  assetPrefix: '/Fuller_website/',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig