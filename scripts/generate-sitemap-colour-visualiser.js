/**
 * Generates an XML sitemap for all single-wall colour visualiser URLs.
 * Best practice: separate sitemap by page type (visualiser) for easier updates and GSC.
 * Output: public/sitemap-colour-visualiser.xml
 * Run: node scripts/generate-sitemap-colour-visualiser.js
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com').replace(/\/$/, '');
const MAX_URLS_PER_SITEMAP = 50000; // Google limit

const BRAND_CONFIG = [
  { id: 'asian-paints', fileName: 'asian_paints_colors.json' },
  { id: 'sherwin-williams', fileName: 'sherwin_williams_colors.json' },
  { id: 'nerolac', fileName: 'nerolac_colors.json' },
  { id: 'berger', fileName: 'berger_colors.json' },
  { id: 'jsw', fileName: 'jsw_colors.json' },
  { id: 'birla-opus', fileName: 'birla_opus_colors.json' },
  { id: 'dulux', fileName: 'dulux_colors.json' },
  { id: 'jk-maxx', fileName: 'jk_maxx_colors.json' },
  { id: 'shalimar', fileName: 'shalimar_colors.json' },
  { id: 'nippon', fileName: 'nippon_colors.json' },
  { id: 'mrf-paints', fileName: 'mrf_colors.json' },
  { id: 'ral', fileName: 'ral_colors.json' },
  { id: 'ncs', fileName: 'ncs_colors.json' },
];

function toKebabCase(str) {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase().replace(/\s+/g, '-');
}

function buildColorSlug(colorName, colorCode) {
  const cleanCode = (colorCode || '').toString().replace(/\s+/g, '-');
  return `${toKebabCase(colorName)}-${cleanCode}`;
}

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const colorsDir = path.join(process.cwd(), 'src', 'data', 'colors');
const publicDir = path.join(process.cwd(), 'public');
const locs = [];

for (const brand of BRAND_CONFIG) {
  const filePath = path.join(colorsDir, brand.fileName);
  if (!fs.existsSync(filePath)) {
    console.warn('Skip (file not found):', brand.fileName);
    continue;
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.warn('Skip (parse error):', brand.fileName, err.message);
    continue;
  }
  const colorTypes = data.colorTypes || {};
  for (const [category, colors] of Object.entries(colorTypes)) {
    if (!Array.isArray(colors)) continue;
    for (const c of colors) {
      const slug = buildColorSlug(c.colorName, c.colorCode);
      if (!slug) continue;
      const pathSegment = `/colour-visualiser/basic/${brand.id}/${encodeURIComponent(category)}/${slug}`;
      locs.push(BASE_URL + pathSegment);
    }
  }
}

const unique = [...new Set(locs)].sort();
const lastmod = new Date().toISOString().split('T')[0];

function writeSitemapXml(urls, filePath) {
  const urlEntries = urls
    .map(
      (loc) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
  fs.writeFileSync(filePath, xml, 'utf8');
}

if (unique.length === 0) {
  console.warn('No URLs generated.');
  process.exit(1);
}

if (unique.length <= MAX_URLS_PER_SITEMAP) {
  const outPath = path.join(publicDir, 'sitemap-colour-visualiser.xml');
  writeSitemapXml(unique, outPath);
  console.log('Wrote', unique.length, 'URLs to', outPath);
} else {
  for (let i = 0; i < unique.length; i += MAX_URLS_PER_SITEMAP) {
    const chunk = unique.slice(i, i + MAX_URLS_PER_SITEMAP);
    const idx = Math.floor(i / MAX_URLS_PER_SITEMAP);
    const outPath = path.join(publicDir, idx === 0 ? 'sitemap-colour-visualiser.xml' : `sitemap-colour-visualiser-${idx}.xml`);
    writeSitemapXml(chunk, outPath);
    console.log('Wrote', chunk.length, 'URLs to', outPath);
  }
  console.log('Total', unique.length, 'URLs across', Math.ceil(unique.length / MAX_URLS_PER_SITEMAP), 'file(s).');
}
