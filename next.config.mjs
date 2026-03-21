/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["react"]
  },
  images: {
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
