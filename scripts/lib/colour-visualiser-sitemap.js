/**
 * Shared logic to build colour visualiser sitemap URLs and XML.
 * Used by: scripts/generate-sitemap-colour-visualiser.js and pages/api/sitemap-colour-visualiser.ts
 */
const fs = require('fs');
const path = require('path');

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

/**
 * @param {string} [baseUrl]
 * @returns {string[]} sorted unique full URLs
 */
function getColourVisualiserUrls(baseUrl) {
  const BASE_URL = (baseUrl || process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com').replace(/\/$/, '');
  const colorsDir = path.join(process.cwd(), 'src', 'data', 'colors');
  const locs = [];

  for (const brand of BRAND_CONFIG) {
    const filePath = path.join(colorsDir, brand.fileName);
    if (!fs.existsSync(filePath)) continue;
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
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

  return [...new Set(locs)].sort();
}

/** @param {string[]} urls - full URL strings */
function urlsToSitemapXml(urls) {
  const lastmod = new Date().toISOString().split('T')[0];
  const urlEntries = urls
    .map(
      (loc) =>
        `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

/**
 * @param {string} [baseUrl]
 * @returns {string} full sitemap XML
 */
function getColourVisualiserSitemapXml(baseUrl) {
  const urls = getColourVisualiserUrls(baseUrl);
  return urlsToSitemapXml(urls);
}

module.exports = { getColourVisualiserUrls, getColourVisualiserSitemapXml, urlsToSitemapXml };
