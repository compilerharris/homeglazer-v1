/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://homeglazer.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin', '/admin/*', '/api/*', '/404', '/protected-visualizer-demo'],
  additionalPaths: async (config) => {
    const result = [];
    try {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      const [products, blogPosts] = await Promise.all([
        prisma.product.findMany({
          select: { slug: true, brand: { select: { slug: true } }, updatedAt: true },
        }),
        prisma.blogPost.findMany({
          where: { published: true },
          select: { slug: true, updatedAt: true },
        }),
      ]);
      await prisma.$disconnect();

      for (const p of products) {
        result.push({
          loc: `/products/${p.brand.slug}/${p.slug}`,
          changefreq: 'weekly',
          priority: 0.6,
          lastmod: p.updatedAt?.toISOString?.() || new Date().toISOString(),
        });
      }
      for (const b of blogPosts) {
        result.push({
          loc: `/blog/${b.slug}`,
          changefreq: 'monthly',
          priority: 0.6,
          lastmod: b.updatedAt?.toISOString?.() || new Date().toISOString(),
        });
      }
    } catch (err) {
      console.warn('next-sitemap: Could not fetch dynamic paths (DATABASE_URL may be unset):', err?.message || err);
    }
    return result;
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin/', '/api/'] },
      // AI Crawlers - Allow for AI search visibility
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
    ],
    additionalSitemaps: [],
  },
}
