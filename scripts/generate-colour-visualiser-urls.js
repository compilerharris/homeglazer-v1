/**
 * Generates a list of all single-wall colour visualiser URLs for GSC indexing.
 * Output: public/colour-visualiser-urls-for-gsc.txt (one URL per line)
 * Run: node scripts/generate-colour-visualiser-urls.js
 */
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homeglazer.com';

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

const colorsDir = path.join(process.cwd(), 'src', 'data', 'colors');
const outPath = path.join(process.cwd(), 'public', 'colour-visualiser-urls-for-gsc.txt');
const urls = [];

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
      const url = `${BASE_URL.replace(/\/$/, '')}/colour-visualiser/basic/${brand.id}/${encodeURIComponent(category)}/${slug}`;
      urls.push(url);
    }
  }
}

const unique = [...new Set(urls)].sort();
fs.writeFileSync(outPath, unique.join('\n') + '\n', 'utf8');
console.log('Wrote', unique.length, 'URLs to', outPath);
