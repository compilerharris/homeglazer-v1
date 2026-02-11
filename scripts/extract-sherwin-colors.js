/**
 * Extracts Sherwin Williams colors from crackColors.html and merges into sherwin_williams_colors.json
 *
 * Usage:
 *   1. Add Sherwin Williams color grid HTML to crackColors.html
 *      - Go to https://www.sherwin-williams.com/en-us/color/color-family/... (whites, greens, neutrals)
 *      - Let the page fully load, then copy the HTML of the color swatch grid
 *      - Paste into crackColors.html after the section comment (e.g. <!-- Greens -->)
 *   2. Run: node scripts/extract-sherwin-colors.js
 *      - Or for a specific section: node scripts/extract-sherwin-colors.js Greens
 */

const fs = require('fs');
const path = require('path');

const HTML_PATH = path.join(__dirname, '../crackColors.html');
const JSON_PATH = path.join(__dirname, '../src/data/colors/sherwin_williams_colors.json');

// Match Sherwin Williams structure: data-colorname, data-colorid, background-color rgb in nested div
// Attribute order may vary (e.g. data-colorfamily between them), so we use flexible [\s\S]*?
const REGEX = /data-colorname="([^"]+)"[\s\S]*?data-colorid="([^"]+)"[\s\S]*?background-color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/g;

function extractColors(html) {
  const colors = [];
  let m;
  while ((m = REGEX.exec(html)) !== null) {
    const r = parseInt(m[3]).toString(16).padStart(2, '0');
    const g = parseInt(m[4]).toString(16).padStart(2, '0');
    const b = parseInt(m[5]).toString(16).padStart(2, '0');
    colors.push({
      colorName: m[1].toLowerCase(),
      colorCode: m[2],
      colorHex: '#' + r + g + b
    });
  }
  return colors;
}

/**
 * Extract HTML for a given section (between <!-- SectionName --> and next comment or EOF)
 */
function getSectionHtml(html, sectionName) {
  const sectionRegex = new RegExp(
    `<!--\\s*${sectionName}\\s*-->([\\s\\S]*?)(?=<!--|$)`,
    'i'
  );
  const match = html.match(sectionRegex);
  return match ? match[1].trim() : html;
}

// Map HTML section names to JSON colorTypes keys (e.g. Green -> Greens, Blue -> Blues, Red/Reds -> Reds, Yellow/Yellows -> Yellows, Purple -> Purples, Orange/Oranges -> Oranges)
const SECTION_MAP = { Green: 'Greens', Blue: 'Blues', Red: 'Reds', Reds: 'Reds', Yellow: 'Yellows', Yellows: 'Yellows', Purple: 'Purples', Purples: 'Purples', Orange: 'Oranges', Oranges: 'Oranges' };

function main() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const section = process.argv[2] || (() => {
    const m = html.match(/<!--\s*(\w+)\s*-->/);
    return m ? m[1] : 'Neutrals';
  })();
  const jsonKey = SECTION_MAP[section] || section;

  const sectionHtml = getSectionHtml(html, section);
  const colors = extractColors(sectionHtml);

  if (colors.length === 0) {
    console.error(`No colors found for section "${section}" in crackColors.html`);
    console.error(`Paste the Sherwin Williams ${section} color grid HTML after <!-- ${section} -->`);
    const familySlug = section.toLowerCase() + '-paint-colors';
    console.error(`See: https://www.sherwin-williams.com/en-us/color/color-family/${familySlug}`);
    process.exit(1);
  }

  const existing = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  existing.colorTypes[jsonKey] = colors;

  const totalColors = Object.values(existing.colorTypes).reduce((sum, arr) => sum + arr.length, 0);
  existing.totalColors = totalColors;

  fs.writeFileSync(JSON_PATH, JSON.stringify(existing, null, 2));
  console.log(`Added ${colors.length} ${jsonKey} colors. Total: ${totalColors}`);
}

main();
