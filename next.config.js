const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Exclude large static assets from serverless function bundles (Vercel 250MB limit)
    outputFileTracingExcludes: {
      '**': [
        'public/media/products/**',
        'public/assets/images/bedroom/**',
        'public/assets/images/bathroom/**',
        'public/assets/images/kitchen/**',
        'public/assets/images/livingroom/**',
        'public/assets/images/homeoffice/**',
        'public/assets/images/kidsroom/**',
        'public/assets/images/office/**',
        'public/assets/images/outdoor/**',
        'public/assets/images/maingate/**',
      ],
      '/api/email-visualiser-summary': [
        'public/assets/Ai/**',
        'public/uploads/**',
        'public/assets/images/bathroom/**',
        'public/assets/images/bedroom/**',
        'public/assets/images/homeoffice/**',
        'public/assets/images/kitchen/**',
        'public/assets/images/kidsroom/**',
        'public/assets/images/maingate/**',
        'public/assets/images/office/**',
        'public/assets/images/outdoor/**',
        'public/assets/images/livingroom/**',
        'public/assets/images/brand-logos/**',
      ],
    },
  },
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
        source: '/terms-of-service',
        destination: '/terms-and-condition',
        permanent: true,
      },
      {
        source: '/color-visualiser/:path*',
        destination: '/colour-visualiser/:path*',
        permanent: true,
      },
    ];
  },
};