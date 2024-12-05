/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for development
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
};

module.exports = nextConfig;