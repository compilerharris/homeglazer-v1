/**
 * Generates an XML sitemap for all single-wall colour visualiser URLs.
 * Best practice: separate sitemap by page type (visualiser) for easier updates and GSC.
 * Output: public/sitemap-colour-visualiser.xml
 * Run: node scripts/generate-sitemap-colour-visualiser.js
 */
const fs = require('fs');
const path = require('path');
const { getColourVisualiserUrls, urlsToSitemapXml } = require('./lib/colour-visualiser-sitemap');

const MAX_URLS_PER_SITEMAP = 50000; // Google limit
const publicDir = path.join(process.cwd(), 'public');
const unique = getColourVisualiserUrls();

if (unique.length === 0) {
  console.warn('No URLs generated.');
  process.exit(1);
}

if (unique.length <= MAX_URLS_PER_SITEMAP) {
  const outPath = path.join(publicDir, 'sitemap-colour-visualiser.xml');
  fs.writeFileSync(outPath, urlsToSitemapXml(unique), 'utf8');
  console.log('Wrote', unique.length, 'URLs to', outPath);
} else {
  for (let i = 0; i < unique.length; i += MAX_URLS_PER_SITEMAP) {
    const chunk = unique.slice(i, i + MAX_URLS_PER_SITEMAP);
    const idx = Math.floor(i / MAX_URLS_PER_SITEMAP);
    const outPath = path.join(publicDir, idx === 0 ? 'sitemap-colour-visualiser.xml' : `sitemap-colour-visualiser-${idx}.xml`);
    fs.writeFileSync(outPath, urlsToSitemapXml(chunk), 'utf8');
    console.log('Wrote', chunk.length, 'URLs to', outPath);
  }
  console.log('Total', unique.length, 'URLs across', Math.ceil(unique.length / MAX_URLS_PER_SITEMAP), 'file(s).');
}
