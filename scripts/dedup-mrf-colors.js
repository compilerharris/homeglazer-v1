/**
 * Removes cross-category duplicates from mrf_colors.json.
 * For each color (name+hex) that appears in multiple categories,
 * keeps it only in the category that matches its actual shade (hue).
 *
 * Run: node scripts/dedup-mrf-colors.js
 */

const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../src/data/colors/mrf_colors.json');

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}

function rgbToHsl(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Assign best-matching category based on hue. Returns one of the valid category names.
// For low-saturation (greyish) colors, keep in first category to preserve source intent.
function getBestCategory(hex, validCategories) {
  const rgb = hexToRgb(hex);
  if (!rgb) return validCategories[0];
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
  // Hue: 0=red, 60=yellow, 120=green, 240=blue, 300=magenta
  // Whites/off-whites: high lightness or very low saturation
  if (validCategories.includes('Whites') && (l >= 88 || s < 6)) return 'Whites';
  // Greys: low saturation (neutral/desaturated)
  if (validCategories.includes('Greys') && s < 18) return 'Greys';
  // Browns: warm tones (h 15-55) with lower lightness - tan, beige, brown
  if (validCategories.includes('Browns') && h >= 15 && h <= 55 && l < 82) return 'Browns';
  if (s < 12) return validCategories[0]; // greyish - keep in first (source order)
  // Yellows: ~48-72 (warm yellows)
  // Oranges: ~15-48 (red-orange, orange, yellow-orange)
  // Greens: ~85-165 (yellow-green, green, cyan-green)
  // Blues: ~165-250 (cyan, blue, blue-violet)
  // Purples: ~210-340 (blue-purple, violet, lavender, magenta)
  // Reds: 0-25, 335-360 (true red + red-orange); when Reds in validCategories, prefer it for this range
  // Pinks: 320-335 (magenta-pink)
  // Oranges: 25-48 (orange, yellow-orange)
  let preferred = validCategories[0];
  if (h >= 48 && h <= 72) preferred = 'Yellows';
  else if (h >= 25 && h <= 48) preferred = 'Oranges';
  else if (h >= 85 && h <= 165) preferred = 'Greens';
  else if (h >= 165 && h <= 250) preferred = 'Blues';
  else if (h >= 210 && h <= 320) preferred = 'Purples';
  else if (validCategories.includes('Reds') && ((h >= 0 && h <= 25) || h >= 335)) preferred = 'Reds';
  else if (h >= 320 && h < 335) preferred = 'Pinks';
  else preferred = 'Pinks';
  if (validCategories.includes(preferred)) return preferred;
  return validCategories[0];
}

function main() {
  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
  const categories = Object.keys(data.colorTypes || {});

  // Collect all colors with their current categories
  const colorToCategories = {}; // key (name|hex) -> { color, categories: [] }
  for (const cat of categories) {
    const arr = data.colorTypes[cat] || [];
    for (const c of arr) {
      const key = `${c.colorName.toLowerCase()}|${c.colorHex.toLowerCase()}`;
      if (!colorToCategories[key]) {
        colorToCategories[key] = { color: c, categories: [] };
      }
      colorToCategories[key].categories.push(cat);
    }
  }

  const duplicates = Object.entries(colorToCategories).filter(([k, v]) => v.categories.length > 1);
  console.log(`Found ${duplicates.length} colors appearing in multiple categories`);

  const bestCategory = {}; // key -> category to keep
  for (const [key, { color, categories }] of duplicates) {
    bestCategory[key] = getBestCategory(color.colorHex, categories);
  }

  // Rebuild each category: only include colors that should be there
  const result = {
    brand: data.brand,
    totalColors: 0,
    colorTypes: {}
  };

  for (const cat of categories) {
    result.colorTypes[cat] = [];
    const arr = data.colorTypes[cat] || [];
    const seenInCat = new Set();
    for (const c of arr) {
      const key = `${c.colorName.toLowerCase()}|${c.colorHex.toLowerCase()}`;
      const keepIn = bestCategory[key] || cat; // non-duplicates stay where they are
      if (keepIn === cat && !seenInCat.has(key)) {
        seenInCat.add(key);
        result.colorTypes[cat].push(c);
      }
    }
    result.totalColors += result.colorTypes[cat].length;
    const removed = arr.length - result.colorTypes[cat].length;
    if (removed > 0) console.log(`  ${cat}: kept ${result.colorTypes[cat].length}, removed ${removed} duplicates`);
  }

  fs.writeFileSync(JSON_PATH, JSON.stringify(result, null, 2));
  console.log(`Deduplicated. Total unique colors: ${result.totalColors}`);
}

if (require.main === module) {
  main();
} else {
  module.exports = { run: main };
}
