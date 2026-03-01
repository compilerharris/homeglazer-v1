/**
 * Generates an XML sitemap for Asian Paints product pages only (for GSC).
 * Output: public/sitemap-products-asian-paints.xml
 * Run: node scripts/generate-sitemap-products-asian-paints.js
 * Requires: DATABASE_URL (if unset, skips generation; API route can still serve from DB at runtime).
 */
const fs = require('fs');
const path = require('path');
const { entriesToSitemapXml } = require('./lib/sitemap-utils');

const ASIAN_PAINTS_SLUG = 'asian-paints';
const BASE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com').replace(/\/$/, '');
const publicDir = path.join(process.cwd(), 'public');
const outPath = path.join(publicDir, 'sitemap-products-asian-paints.xml');

async function main() {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not set; skipping product sitemap file generation. API route will generate on request.');
    process.exit(0);
  }

  let prisma;
  try {
    const { PrismaClient } = require('@prisma/client');
    prisma = new PrismaClient();
  } catch (err) {
    console.warn('Prisma not available:', err?.message || err);
    process.exit(0);
  }

  try {
    const products = await prisma.product.findMany({
      where: { brand: { slug: ASIAN_PAINTS_SLUG } },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    });
    await prisma.$disconnect();

    if (products.length === 0) {
      console.warn('No Asian Paints products found.');
      process.exit(0);
    }

    const entries = products.map((p) => ({
      loc: `${BASE_URL}/products/${ASIAN_PAINTS_SLUG}/${p.slug}`,
      lastmod: p.updatedAt?.toISOString?.() || new Date().toISOString(),
    }));

    const xml = entriesToSitemapXml(entries);
    fs.writeFileSync(outPath, xml, 'utf8');
    console.log('Wrote', products.length, 'URLs to', outPath);
  } catch (err) {
    console.error('Error generating product sitemap:', err?.message || err);
    await prisma?.$disconnect?.();
    process.exit(1);
  }
}

main();
