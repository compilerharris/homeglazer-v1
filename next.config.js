const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Don't transpile Prisma client - we're using compiled JavaScript files
  // transpilePackages: ['@prisma/client'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ['@svgr/webpack'],
    });
    
    // Externalize Prisma client - it needs to be loaded at runtime
    // This prevents webpack from trying to bundle Prisma internals
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });
    }
    
    return config;
  },
};

module.exports = {
  ...nextConfig,
  async redirects() {
    return [
      {
        source: '/color-visualiser/:path*',
        destination: '/colour-visualiser/:path*',
        permanent: true,
      },
    ];
  },
};