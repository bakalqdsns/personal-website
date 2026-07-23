import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'three', '@react-three/drei', '@react-three/fiber'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Allow `.mdx` files inside the `app/` directory to be rendered as routes.
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({
  // Keep options minimal — the project currently has no MDX content.
  // Add `remarkPlugins` / `rehypePlugins` here when MDX content lands.
});

export default withMDX(nextConfig);
