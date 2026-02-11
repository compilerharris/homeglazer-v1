/**
 * Fetches Sherwin Williams colors from official Excel and filters by family.
 * Uses the ColorSnap Excel (Color Name, Number, RGB, Hex) - no family column,
 * so we filter Blues by hex: blue component must be dominant (B > R and B > G).
 *
 * Usage:
 *   node scripts/fetch-sherwin-colors.js Blue
 *   node scripts/fetch-sherwin-colors.js Blue   (fetches, filters blues, merges)
 *
 * Requires: xlsx, and network to download the Excel (or place it in tmp/)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const EXCEL_URL = 'https://images.sherwin-williams.com/content_images/SW-XCL-SHERWIN-WILLIAMS-COLORC.zip';
const TMP_DIR = path.join(__dirname, '../tmp');
const ZIP_PATH = path.join(TMP_DIR, 'sw-colors.zip');
const XLSX_PATH = path.join(TMP_DIR, 'SW-ColorSnap-Color-Swatches-for-SW-Site-locator-031319.xlsx');
const JSON_PATH = path.join(__dirname, '../src/data/colors/sherwin_williams_colors.json');

const FAMILY_FILTERS = {
  Blue: (r, g, b) => {
    if (b < r && b < g) return false; // blue must not be smallest
    const diff = b - Math.max(r, g);
    return diff >= 5 || (b >= r && b >= g && b > 100); // distinctly blue or light blue
  },
};

function downloadExcel() {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(XLSX_PATH)) return resolve(XLSX_PATH);
    const systemTmp = '/tmp/SW-ColorSnap-Color-Swatches-for-SW-Site-locator-031319.xlsx';
    if (fs.existsSync(systemTmp)) return resolve(systemTmp);
    fs.mkdirSync(TMP_DIR, { recursive: true });
    const file = fs.createWriteStream(ZIP_PATH);
    https.get(EXCEL_URL, (res) => {
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(ZIP_PATH);
        zip.extractAllTo(TMP_DIR, true);
        resolve(XLSX_PATH);
      });
    }).on('error', reject);
  });
}

function parseExcel(filePath) {
  const XLSX = require('xlsx');
  const wb = XLSX.readFile(filePath);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  const headerRow = data.find(r => r[0] === 'COLOR #') || data[1];
  const codeIdx = headerRow.indexOf('COLOR #');
  const nameIdx = headerRow.indexOf('COLOR NAME');
  const rIdx = headerRow.indexOf('RED');
  const gIdx = headerRow.indexOf('GREEN');
  const bIdx = headerRow.indexOf('BLUE');
  const hexIdx = headerRow.indexOf('HEX');
  const startRow = data.findIndex(r => String(r[0] || '').match(/^SW\d/));
  const rows = data.slice(startRow).filter(r => r[codeIdx] && r[codeIdx].match(/^SW\d/));
  return rows.map(r => ({
    colorCode: String(r[codeIdx]).trim(),
    colorName: String(r[nameIdx] || '').toLowerCase(),
    r: parseInt(r[rIdx]) || 0,
    g: parseInt(r[gIdx]) || 0,
    b: parseInt(r[bIdx]) || 0,
    hex: '#' + String(r[hexIdx] || '').replace(/^#/, '').padStart(6, '0'),
  }));
}

function filterByFamily(colors, family) {
  const filter = FAMILY_FILTERS[family];
  if (!filter) return colors;
  return colors.filter(c => filter(c.r, c.g, c.b));
}

const SECTION_MAP = { Blue: 'Blues', Green: 'Greens' };

function main() {
  const family = process.argv[2] || 'Blue';
  const jsonKey = SECTION_MAP[family] || family + 's';

  console.log(`Fetching Sherwin Williams colors...`);

  downloadExcel()
    .then((xlsxPath) => {
      const all = parseExcel(xlsxPath);
      const filtered = filterByFamily(all, family);
      const colors = filtered.map(c => ({
        colorName: c.colorName,
        colorCode: c.colorCode,
        colorHex: c.hex,
      }));

      if (colors.length === 0) {
        console.error(`No ${family} colors found.`);
        process.exit(1);
      }

      const existing = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
      existing.colorTypes[jsonKey] = colors;
      existing.totalColors = Object.values(existing.colorTypes).reduce((s, arr) => s + arr.length, 0);
      fs.writeFileSync(JSON_PATH, JSON.stringify(existing, null, 2));
      console.log(`Added ${colors.length} ${jsonKey} colors. Total: ${existing.totalColors}`);
    })
    .catch((err) => {
      console.error('Error:', err.message);
      if (err.message.includes('ENOTFOUND') || err.message.includes('ECONNREFUSED')) {
        console.error('\nNetwork required. Alternatively, download manually from:');
        console.error(EXCEL_URL);
        console.error('Extract and place the .xlsx in:', TMP_DIR);
      }
      process.exit(1);
    });
}

main();
