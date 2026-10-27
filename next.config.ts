import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/Pouya_Portfolio',
  devIndicators: false,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
