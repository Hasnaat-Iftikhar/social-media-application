/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    appDir: true,
  },
  images: {
    domains: ["utfs.io", "uploadthing.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;
