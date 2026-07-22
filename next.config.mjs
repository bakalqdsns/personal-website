/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'three', '@react-three/drei', '@react-three/fiber'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;