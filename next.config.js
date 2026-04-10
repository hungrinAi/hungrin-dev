/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: 'picsum.photos' },
      { hostname: 'www.transparenttextures.com' },
    ],
  },
};

module.exports = nextConfig;
