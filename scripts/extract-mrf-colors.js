/**
 * Extracts MRF Paints colors from crackColors.html
 * MRF HTML format: data-color-id, data-color-name, data-colorcode="rgb(r,g,b)"
 *
 * IMPORTANT: Always checks for duplicates (in-section + cross-category by hue).
 *
 * Usage:
 *   1. Add MRF color grid HTML to crackColors.html after section comment (e.g. <!-- Greens -->)
 *   2. Run: node scripts/extract-mrf-colors.js [SectionName]
 *      e.g. node scripts/extract-mrf-colors.js Greens
 */

const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, '../crackColors.html');
const JSON_PATH = path.join(__dirname, '../src/data/colors/mrf_colors.json');

// MRF format: style="background-color:rgb(r,g,b);" and data-color-id, data-color-name
// Semicolon after rgb() is optional
const REGEX = /style="background-color:rgb\((\d+),\s*(\d+),\s*(\d+)\);?"[\s\S]*?data-color-id="(\d+)"[\s\S]*?data-color-name="([^"]+)"/g;

function extractColors(html) {
  const colors = [];
  const seen = new Set(); // de-duplicate by name+hex
  let m;
  while ((m = REGEX.exec(html)) !== null) {
    const r = parseInt(m[1]).toString(16).padStart(2, '0');
    const g = parseInt(m[2]).toString(16).padStart(2, '0');
    const b = parseInt(m[3]).toString(16).padStart(2, '0');
    const hex = '#' + r + g + b;
    const nameLower = m[5].toLowerCase();
    const key = `${nameLower}|${hex}`;
    if (seen.has(key)) continue; // skip duplicate
    seen.add(key);
    colors.push({
      colorName: nameLower,
      colorCode: `MRF-${m[4]}`,
      colorHex: hex
    });
  }
  return colors;
}

// Match section content until next section header (<!-- SectionName -->) or EOF
// Avoid stopping at inline comments like <!-- Info Show Checkbox -->
function getSectionHtml(html, sectionName) {
  const sectionStart = new RegExp(`<!--\\s*${sectionName}\\s*-->`, 'i');
  const match = html.match(sectionStart);
  if (!match) return html;
  const startIdx = match.index + match[0].length;
  // Find next section: <!-- Word --> where Word is a section name (Greens, Oranges, etc.)
  const nextSection = html.slice(startIdx).match(/\n\s*<!--\s*(?:Yellows|Pinks|Greens|Blues|Reds|Oranges|Purple|Purples|Neutrals|Whites|Green)\s*-->/i);
  const endIdx = nextSection ? startIdx + nextSection.index : html.length;
  return html.slice(startIdx, endIdx).trim();
}

function main() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const section = process.argv[2] || 'Yellows';
  const jsonKey = section.endsWith('s') ? section : section + 's'; // Yellows, Greens, etc.

  let sectionHtml = getSectionHtml(html, section);
  // Fallback: use full HTML if section is empty (e.g. only one section in file)
  if (!sectionHtml || sectionHtml.length < 100) {
    sectionHtml = html;
  }
  const colors = extractColors(sectionHtml);

  // Duplicate check: report in-section duplicates (by hex, by name)
  const byHex = {};
  const byName = {};
  colors.forEach(c => {
    byHex[c.colorHex] = (byHex[c.colorHex] || []).concat(c);
    const k = c.colorName.toLowerCase();
    byName[k] = (byName[k] || []).concat(c);
  });
  const dupHex = Object.entries(byHex).filter(([, arr]) => arr.length > 1);
  const dupName = Object.entries(byName).filter(([, arr]) => arr.length > 1);
  if (dupHex.length > 0 || dupName.length > 0) {
    console.log(`[Duplicates in ${jsonKey}] Same hex diff names: ${dupHex.length} | Same name diff hex: ${dupName.length}`);
  }

  if (colors.length === 0) {
    console.error(`No colors found for section "${section}" in crackColors.html`);
    process.exit(1);
  }

  let existing;
  if (fs.existsSync(JSON_PATH)) {
    existing = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  } else {
    existing = {
      brand: 'MRF Paints',
      totalColors: 0,
      colorTypes: {}
    };
  }

  existing.colorTypes[jsonKey] = colors;
  existing.totalColors = Object.values(existing.colorTypes).reduce((sum, arr) => sum + arr.length, 0);

  fs.writeFileSync(JSON_PATH, JSON.stringify(existing, null, 2));
  console.log(`Added ${colors.length} ${jsonKey} colors. Total: ${existing.totalColors}`);

  // Run cross-category dedup: keep each color only in its best-matching shade category
  try {
    require('./dedup-mrf-colors.js').run();
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') console.warn('Dedup skipped:', e.message);
  }
}

main();
