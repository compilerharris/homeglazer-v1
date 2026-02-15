/**
 * Import Asian Paints products from CSV into the database.
 * CSV is source of truth: when a product exists, it is REPLACED with CSV content as-is.
 *
 * CSV path: public/Products Asian Paints.csv
 *
 * Column mapping:
 *   ProductTitle -> name
 *   Category -> category
 *   ProductSubCat -> subCategory
 *   ProductWeight -> sizeUnit (Liter->L, Kg->K)
 *   Size 1-5 -> prices (available sizes)
 *   ProductWashability, ProductDurability, ProductShades, ProductCoverage, ProductFinish, ProductDryingTime -> specifications
 *   ProductDetails -> description
 *   One Liner -> shortDescription
 *   ProductFeature1-6 -> features
 *   ProductFinish -> sheenLevel (mapped to Mat, Ultra Matt, Low Sheen, High Sheen)
 *
 * PIS section: inactive (showPisSection: false) - PIS sheet not yet found
 *
 * Usage:
 *   node scripts/import-asian-paints-products.js
 *   node scripts/import-asian-paints-products.js "path/to/custom.csv"
 */

// Load .env and fix TLS "bad certificate format" for cloud PostgreSQL (Vercel, AWS RDS, etc.)
try {
  require('dotenv').config();
} catch (_) {}
let dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.includes('sslmode=') && !dbUrl.includes('sslaccept=')) {
  process.env.DATABASE_URL =
    dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'sslaccept=accept_invalid_certs';
}

const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DEFAULT_CSV_PATH = path.join(__dirname, '../public/Products Asian Paints.csv');

// Map CSV ProductFinish to our sheen levels
const SHEEN_MAP = {
  'matt (g-20)': 'Mat',
  'matt': 'Mat',
  'mat': 'Mat',
  'highly matt': 'Ultra Matt',
  'highly mat': 'Ultra Matt',
  'ultra matt': 'Ultra Matt',
  'ultra mat': 'Ultra Matt',
  'dead matt': 'Ultra Matt',
  'soft sheen': 'Low Sheen',
  'satin': 'Low Sheen',
  'rich satin': 'Low Sheen',
  'high sheen': 'High Sheen',
  'silk': 'Low Sheen',
  'lustre': 'Low Sheen',
};

function mapSheen(value) {
  if (!value || typeof value !== 'string') return 'Mat';
  const key = value.toLowerCase().trim();
  for (const [pattern, sheen] of Object.entries(SHEEN_MAP)) {
    if (key.includes(pattern) || key === pattern) return sheen;
  }
  return 'Mat';
}

// Map Category to our CATEGORY_OPTIONS
function mapCategory(value) {
  if (!value || typeof value !== 'string') return 'Interior';
  const v = value.trim();
  if (v === 'Interior') return 'Interior';
  if (v === 'Exterior') return 'Exterior';
  if (v.includes('Both') || v === 'Interior & Exterior') return 'Interior & Exterior Both';
  if (v.includes('Wood')) return 'Wood Finish';
  if (v.includes('Metal')) return 'Metal Finish';
  return 'Interior';
}

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Clean description - remove common scraped junk
function cleanDescription(text) {
  if (!text || typeof text !== 'string') return '';
  let out = text.trim();
  // Remove content from "Pack sizes" or "lucky-draw" onwards (scraped UI content)
  const junkMarkers = [
    'lucky-draw-redirection',
    'Pack sizes available',
    'MRP ₹',
    'Painting Quotation Calculator',
    'Waterproofing Calculator',
    'Meet Virat Kohli',
    'ENQUIRE NOW',
    'Stain Guard for Interior Walls',
    'exterior-finishes-ace-sparc',
  ];
  for (const m of junkMarkers) {
    const idx = out.indexOf(m);
    if (idx > 0) {
      out = out.substring(0, idx).trim();
    }
  }
  return out;
}

function parseCSV(filePath) {
  const wb = XLSX.readFile(filePath, { type: 'file', raw: true });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => String(h || '').trim());
  const col = (name) => headers.indexOf(name);
  const products = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const get = (name) => (col(name) >= 0 && r[col(name)] !== undefined ? String(r[col(name)] || '').trim() : '');
    const name = get('ProductTitle');
    if (!name) continue;
    const sizeUnit = get('ProductWeight').toLowerCase().includes('kg') ? 'K' : 'L';
    const sizeSuffix = sizeUnit === 'K' ? 'K' : 'L';
    const prices = {};
    for (let s = 1; s <= 5; s++) {
      const val = get(`Size ${s}`);
      if (val && !isNaN(parseInt(val, 10))) {
        prices[`${val}${sizeSuffix}`] = 1;
      }
    }
    if (Object.keys(prices).length === 0) {
      prices['1' + sizeSuffix] = 1;
    }
    const desc = cleanDescription(get('ProductDetails'));
    const shortDesc = get('One Liner') || name + ' - Interior paint from Asian Paints';
    const features = [
      get('ProductFeature1'),
      get('ProductFeature2'),
      get('ProductFeature3'),
      get('ProductFeature4'),
      get('ProductFeature5'),
      get('ProductFeature6'),
    ].filter(Boolean);
    const specs = {};
    const wash = get('ProductWashability');
    const dur = get('ProductDurability');
    const shades = get('ProductShades');
    const cov = get('ProductCoverage');
    const finish = get('ProductFinish');
    const dry = get('ProductDryingTime');
    if (wash) specs['Washability'] = wash;
    if (dur) specs['Durability'] = dur;
    if (shades) specs['Shades'] = shades;
    if (cov) specs['Coverage'] = cov;
    if (finish) specs['Finish'] = finish;
    if (dry) specs['Drying Time'] = dry;
    const faqs = [];
    for (let q = 1; q <= 5; q++) {
      const qq = get(`Question ${q}`);
      const aa = get(`Answer ${q}`);
      if (qq && aa) faqs.push({ question: qq, answer: aa });
    }
    const surfPrep = get('ProductSurfacePreparation');
    const mixPaint = get('ProductMixingthePaint');
    const applyPaint = get('ProductApplyingthePaint');
    const cleanUp = get('ProductCleanUp');
    const finalTouch = get('ProductFinalTouches');
    const materials = get('ProductMaterials');
    const tips = get('ProductTips');
    const userGuideSteps = [];
    if (surfPrep) userGuideSteps.push({ title: 'Surface Preparation', description: surfPrep });
    if (mixPaint) userGuideSteps.push({ title: 'Mixing the Paint', description: mixPaint });
    if (applyPaint) userGuideSteps.push({ title: 'Applying the Paint', description: applyPaint });
    if (cleanUp) userGuideSteps.push({ title: 'Clean Up', description: cleanUp });
    if (finalTouch) userGuideSteps.push({ title: 'Final Touches', description: finalTouch });
    const userGuideMaterials = materials ? materials.split(/[,;]/).map((s) => s.trim()).filter(Boolean) : [];
    const userGuideTips = tips ? tips.split(/[,;]/).map((s) => s.trim()).filter(Boolean) : [];
    products.push({
      name,
      slug: slugify(name),
      description: desc || shortDesc,
      shortDescription: shortDesc,
      category: mapCategory(get('Category')),
      subCategory: get('ProductSubCat') || null,
      sheenLevel: mapSheen(get('ProductFinish')),
      surfaceType: 'Interior Wall',
      usage: 'Home',
      image: '/assets/images/bucket.png',
      sizeUnit,
      prices,
      colors: [],
      features,
      specifications: specs,
      showPisSection: false,
      faqs,
      showFaqSection: faqs.length > 0,
      userGuideSteps: userGuideSteps.length > 0 ? userGuideSteps : null,
      userGuideMaterials: userGuideMaterials.length > 0 ? userGuideMaterials : null,
      userGuideTips: userGuideTips.length > 0 ? userGuideTips : null,
      showUserGuide: userGuideSteps.length > 0 || userGuideMaterials.length > 0 || userGuideTips.length > 0,
    });
  }
  return products;
}

async function main() {
  const csvPath = process.argv[2] || DEFAULT_CSV_PATH;
  const resolved = path.resolve(csvPath);
  if (!fs.existsSync(resolved)) {
    console.error('❌ CSV file not found:', resolved);
    process.exit(1);
  }
  console.log('📂 Reading CSV:', resolved);
  const products = parseCSV(resolved);
  console.log(`📋 Parsed ${products.length} products from CSV\n`);

  const brand = await prisma.brand.findFirst({
    where: {
      OR: [
        { name: { contains: 'Asian', mode: 'insensitive' } },
        { slug: 'asian-paints' },
      ],
    },
  });
  if (!brand) {
    console.error('❌ Asian Paints brand not found in database');
    process.exit(1);
  }
  console.log(`✅ Found brand: ${brand.name} (${brand.id})\n`);

  let imported = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  const csvData = (p) => ({
    name: p.name,
    description: p.description,
    shortDescription: p.shortDescription,
    category: p.category,
    subCategory: p.subCategory,
    sheenLevel: p.sheenLevel,
    surfaceType: p.surfaceType,
    usage: p.usage,
    image: p.image,
    sizeUnit: p.sizeUnit,
    prices: p.prices,
    colors: p.colors,
    features: p.features,
    specifications: p.specifications,
    faqs: p.faqs || [],
    showFaqSection: p.showFaqSection || false,
    userGuideSteps: p.userGuideSteps || null,
    userGuideMaterials: p.userGuideMaterials || null,
    userGuideTips: p.userGuideTips || null,
    showUserGuide: p.showUserGuide || false,
  });

  const jsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const needsUpdate = (existing, csv) => {
    const db = {
      name: existing.name,
      description: existing.description,
      shortDescription: existing.shortDescription,
      category: existing.category,
      subCategory: existing.subCategory,
      sheenLevel: existing.sheenLevel,
      surfaceType: existing.surfaceType,
      usage: existing.usage,
      image: existing.image,
      sizeUnit: existing.sizeUnit || 'L',
      prices: existing.prices,
      colors: existing.colors || [],
      features: existing.features || [],
      specifications: existing.specifications || {},
      faqs: existing.faqs || [],
      showFaqSection: existing.showFaqSection || false,
      userGuideSteps: existing.userGuideSteps || null,
      userGuideMaterials: existing.userGuideMaterials || null,
      userGuideTips: existing.userGuideTips || null,
      showUserGuide: existing.showUserGuide || false,
    };
    return (
      db.name !== csv.name ||
      db.description !== csv.description ||
      db.shortDescription !== csv.shortDescription ||
      db.category !== csv.category ||
      db.subCategory !== csv.subCategory ||
      db.sheenLevel !== csv.sheenLevel ||
      db.surfaceType !== csv.surfaceType ||
      db.usage !== csv.usage ||
      db.image !== csv.image ||
      db.sizeUnit !== csv.sizeUnit ||
      !jsonEqual(db.prices, csv.prices) ||
      !jsonEqual(db.colors, csv.colors) ||
      !jsonEqual(db.features, csv.features) ||
      !jsonEqual(db.specifications, csv.specifications) ||
      !jsonEqual(db.faqs, csv.faqs) ||
      db.showFaqSection !== csv.showFaqSection ||
      !jsonEqual(db.userGuideSteps, csv.userGuideSteps) ||
      !jsonEqual(db.userGuideMaterials, csv.userGuideMaterials) ||
      !jsonEqual(db.userGuideTips, csv.userGuideTips) ||
      db.showUserGuide !== csv.showUserGuide
    );
  };

  for (const p of products) {
    try {
      const existing = await prisma.product.findUnique({
        where: {
          brandId_slug: { brandId: brand.id, slug: p.slug },
        },
      });
      const data = csvData(p);
      if (existing) {
        if (needsUpdate(existing, data)) {
          await prisma.product.update({
            where: { id: existing.id },
            data: {
              name: data.name,
              description: data.description,
              shortDescription: data.shortDescription,
              category: data.category,
              subCategory: data.subCategory,
              sheenLevel: data.sheenLevel,
              surfaceType: data.surfaceType,
              usage: data.usage,
              image: data.image,
              sizeUnit: data.sizeUnit,
              prices: data.prices,
              colors: data.colors,
              features: data.features,
              specifications: data.specifications,
              showPisSection: false,
              faqs: data.faqs,
              showFaqSection: data.showFaqSection,
              userGuideSteps: data.userGuideSteps,
              userGuideMaterials: data.userGuideMaterials,
              userGuideTips: data.userGuideTips,
              showUserGuide: data.showUserGuide,
            },
          });
          console.log(`📝 Updated: ${p.name}`);
          updated++;
        } else {
          console.log(`⏭️  Skipped: ${p.name} (no changes)`);
          skipped++;
        }
        continue;
      }
      await prisma.product.create({
        data: {
          brandId: brand.id,
          name: p.name,
          slug: p.slug,
          description: p.description,
          shortDescription: p.shortDescription,
          category: p.category,
          subCategory: p.subCategory,
          sheenLevel: p.sheenLevel,
          surfaceType: p.surfaceType,
          usage: p.usage,
          image: p.image,
          sizeUnit: p.sizeUnit,
          prices: p.prices,
          colors: p.colors,
          features: p.features,
          specifications: p.specifications,
          showPisSection: false,
          faqs: p.faqs || [],
          showFaqSection: (p.faqs && p.faqs.length > 0) || false,
          userGuideSteps: p.userGuideSteps,
          userGuideMaterials: p.userGuideMaterials,
          userGuideTips: p.userGuideTips,
          showUserGuide: p.showUserGuide || false,
        },
      });
      console.log(`✅ Imported: ${p.name}`);
      imported++;
    } catch (err) {
      console.error(`❌ Failed: ${p.name}`, err.message);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Import Summary:');
  console.log(`   ✅ Imported: ${imported}`);
  console.log(`   📝 Updated: ${updated}`);
  console.log(`   ⏭️  Skipped: ${skipped} (no changes)`);
  if (failed) console.log(`   ❌ Failed: ${failed}`);
  console.log('='.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Fatal:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
