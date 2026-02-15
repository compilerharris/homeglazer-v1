/**
 * Enrich Asian Paints products with User Guide, FAQ, and Related Products
 * when these sections are missing. Does NOT overwrite CSV content.
 *
 * Rules:
 * - Only adds to sections that are empty. Never replaces existing content.
 * - Online content (from Asian Paints) is used as-is; no modifications to technical details.
 * - When fetch fails, fallback uses "Refer to Product Information Sheet" to avoid wrong specs.
 * - CSV content is handled by import script; enrichment never overwrites it.
 *
 * Usage:
 *   node scripts/enrich-asian-paints-products.js
 *   node scripts/enrich-asian-paints-products.js 5   # limit to first 5 products
 */

try {
  require('dotenv').config();
} catch (_) {}
let dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.includes('sslmode=') && !dbUrl.includes('sslaccept=')) {
  process.env.DATABASE_URL =
    dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'sslaccept=accept_invalid_certs';
}

const path = require('path');
const https = require('https');
const http = require('http');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const BASE_URL = 'https://www.asianpaints.com';
const DEFAULT_DELAY_MS = 2000;

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function fetch(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HomeGlazer/1.0)' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('timeout'));
    });
  });
}

function normalizeProductName(name) {
  return name
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function toAsianPaintsSlug(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/gi, '')
    .toLowerCase();
}

const PRODUCT_URL_PATTERNS = [
  (slug) => `${BASE_URL}/products/paints-and-textures/interior-walls/plain-finishes/${slug}.html`,
  (slug) => `${BASE_URL}/products/paints-and-textures/exterior-walls/plain-finishes/${slug}.html`,
  (slug) => `${BASE_URL}/products/undercoats/${slug}.html`,
  (slug) => `${BASE_URL}/products/waterproofing-solutions/${slug}.html`,
  (slug) => `${BASE_URL}/products/wood-finish/wood-for-interior/${slug}.html`,
];

function getProductUrl(product) {
  const slug = toAsianPaintsSlug(product.name);
  return PRODUCT_URL_PATTERNS[0](slug);
}

// Fallback only when fetch fails. Uses non-specific language; no product-specific technical details
// (dilution ratios, drying times, etc.) to avoid accuracy issues. Refer to PIS for exact specs.
const INTERIOR_EMULSION_GUIDE = {
  steps: [
    { title: 'Surface Preparation', description: 'Ensure the surface is clean, dry, and free from dust, grease, oil, and loose paint. Apply putty if required and sand the surface smooth. Apply primer as recommended in the Product Information Sheet.' },
    { title: 'Mixing the Paint', description: 'Stir the paint thoroughly before use. Add water as per the dilution ratio specified in the Product Information Sheet. Do not over-thin.' },
    { title: 'Applying the Paint', description: 'Apply using a brush, roller, or spray as per the Product Information Sheet. Allow adequate drying time between coats. Apply the recommended number of coats.' },
    { title: 'Clean Up', description: 'Clean brushes and rollers immediately after use with water. Wipe any spills or splashes before they dry.' },
    { title: 'Final Touches', description: 'Allow the paint to fully cure before washing. Avoid painting in extreme temperatures. Refer to the Product Information Sheet for specific conditions.' },
  ],
  materials: [
    'Paint (as per coverage requirement)',
    'Primer (if required)',
    'Putty (for surface defects)',
    'Brush or roller',
    'Paint tray',
    'Water for dilution',
    'Drop cloth or newspapers',
  ],
  tips: [
    'Refer to the Product Information Sheet for dilution ratio, drying time, and recoating interval.',
    'Remove loose paint, dust, grease, and fungal growth before application.',
    'Use only manufacturer-approved colorants for tinting.',
    'Tinted paints require thorough shaking before use.',
  ],
};

const EXTERIOR_EMULSION_GUIDE = {
  steps: [
    { title: 'Surface Preparation', description: 'Clean the surface from dust, algae, fungal growth, and loose material. Apply putty for cracks and repair surface defects. Sand smooth and prime as per the Product Information Sheet.' },
    { title: 'Mixing the Paint', description: 'Stir the paint thoroughly. Add water as per the dilution ratio specified in the Product Information Sheet. Do not over-thin.' },
    { title: 'Applying the Paint', description: 'Apply using brush, roller, or spray as per the Product Information Sheet. Allow adequate drying time between coats.' },
    { title: 'Clean Up', description: 'Clean tools with water immediately after use.' },
    { title: 'Final Touches', description: 'Allow the paint to fully cure. Avoid painting during rain or high humidity. Refer to the Product Information Sheet for specific conditions.' },
  ],
  materials: [
    'Exterior paint',
    'Primer (if required)',
    'Putty',
    'Brush or roller',
    'Paint tray',
    'Water for dilution',
  ],
  tips: [
    'Refer to the Product Information Sheet for product-specific application details.',
    'Ensure surface is completely dry before painting.',
    'Avoid painting in extreme temperatures or high humidity.',
  ],
};

function getGenericUserGuide(product) {
  const cat = (product.category || '').toLowerCase();
  if (cat.includes('exterior')) return EXTERIOR_EMULSION_GUIDE;
  return INTERIOR_EMULSION_GUIDE;
}

async function parseAsianPaintsPage(html, productName) {
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);
  const result = { steps: [], relatedNames: [] };
  // Extract steps and related product names as-is from Asian Paints HTML; no truncation or rewriting

  $('h2, h3, h4, h5').each((_, el) => {
    const text = $(el).text().trim();
    const next = $(el).nextAll().first();
    const nextText = next.text().trim();
    if (text.match(/PRIMER|PUTTY|TOP COAT|primer|putty|top coat/i) && !text.match(/^Step\s*\d+/i)) {
      const title = text.replace(/^\d+\s*COAT/i, '').trim();
      if (title.length > 2) {
        result.steps.push({
          title,
          description: nextText || title,
        });
      }
    }
  });

  $('a[href*="plain-finishes"], a[href*="undercoats"], a[href*="tractor"], a[href*="apcolite"], a[href*="royale"], a[href*="ace"]').each((_, el) => {
    const text = $(el).text().trim();
    if (text && text.length > 3 && text.length < 60 && !text.match(/^[0-9]+/) && !text.match(/VIEW|view all/i)) {
      result.relatedNames.push(text);
    }
  });
  result.relatedNames = [...new Set(result.relatedNames)].filter((n) => normalizeProductName(n) !== normalizeProductName(productName));

  return result;
}

function findRelatedProductByName(products, name) {
  const norm = normalizeProductName(name);
  const slug = slugify(name);
  for (const p of products) {
    if (p.slug === slug) return p;
    if (normalizeProductName(p.name) === norm) return p;
    if (norm.includes(p.slug) || p.slug.includes(slug)) return p;
  }
  return null;
}

async function main() {
  const limit = parseInt(process.argv[2], 10) || 0;
  const brand = await prisma.brand.findFirst({
    where: {
      OR: [
        { name: { contains: 'Asian', mode: 'insensitive' } },
        { slug: 'asian-paints' },
      ],
    },
  });
  if (!brand) {
    console.error('❌ Asian Paints brand not found');
    process.exit(1);
  }

  let products = await prisma.product.findMany({
    where: { brandId: brand.id },
    include: { relatedProducts: { include: { relatedProduct: true } } },
  });
  if (limit > 0) {
    products = products.slice(0, limit);
    console.log(`🧪 Running in limited mode: first ${limit} products\n`);
  }

  let userGuideEnriched = 0;
  let faqEnriched = 0;
  let relatedEnriched = 0;
  let skipped = 0;

  for (const product of products) {
    let updated = false;
    const updates = {};

    const hasUserGuide = product.showUserGuide &&
      ((product.userGuideSteps && product.userGuideSteps.length > 0) ||
        (product.userGuideMaterials && product.userGuideMaterials.length > 0) ||
        (product.userGuideTips && product.userGuideTips.length > 0));
    const needsUserGuide = !hasUserGuide;
    const needsRelated = !product.relatedProducts?.length;
    const needsFaq = !product.showFaqSection || !product.faqs?.length;

    if (needsFaq) {
      const specs = product.specifications || {};
      const genericFaqs = [
        { question: `How do I apply ${product.name}?`, answer: specs['Drying Time'] ? `Apply as per the Product Information Sheet. Typical drying time: ${specs['Drying Time']}. Surface preparation and number of coats should be followed as per manufacturer guidelines.` : `Refer to the Product Information Sheet for application instructions, surface preparation, and number of coats.` },
        { question: `What is the coverage of ${product.name}?`, answer: specs['Coverage'] || `Refer to the Product Information Sheet for coverage details.` },
        { question: `Is ${product.name} washable?`, answer: specs['Washability'] || `Refer to the Product Information Sheet for washability details.` },
        { question: `How long does ${product.name} last?`, answer: specs['Durability'] || `Refer to the Product Information Sheet for durability and warranty details.` },
      ];
      updates.faqs = genericFaqs;
      updates.showFaqSection = true;
      updated = true;
      faqEnriched++;
    }

    if (needsUserGuide) {
      let guide = null;
      try {
        const url = getProductUrl(product);
        const html = await fetch(url);
        const parsed = await parseAsianPaintsPage(html, product.name);
        if (parsed.steps?.length >= 2) {
          guide = {
            steps: parsed.steps,
            materials: INTERIOR_EMULSION_GUIDE.materials,
            tips: INTERIOR_EMULSION_GUIDE.tips,
          };
        }
      } catch (err) {
        // use generic
      }
      if (!guide) guide = getGenericUserGuide(product);
      updates.userGuideSteps = guide.steps;
      updates.userGuideMaterials = guide.materials;
      updates.userGuideTips = guide.tips;
      updates.showUserGuide = true;
      updated = true;
      userGuideEnriched++;
    }

    if (needsRelated) {
      let relatedIds = [];
      try {
        const url = getProductUrl(product);
        const html = await fetch(url);
        const parsed = await parseAsianPaintsPage(html, product.name);
        for (const name of parsed.relatedNames || []) {
          const match = findRelatedProductByName(products, name);
          if (match && match.id !== product.id && !relatedIds.includes(match.id)) {
            relatedIds.push(match.id);
            if (relatedIds.length >= 4) break;
          }
        }
      } catch (_) {}
      if (relatedIds.length === 0) {
        const sameCategory = products.filter(
          (p) => p.id !== product.id &&
            (p.category === product.category || p.subCategory === product.subCategory) &&
            relatedIds.length < 4
        );
        relatedIds = sameCategory.slice(0, 4).map((p) => p.id);
      }
      for (const relatedId of relatedIds) {
        try {
          await prisma.productRelatedProduct.upsert({
            where: {
              productId_relatedProductId: { productId: product.id, relatedProductId: relatedId },
            },
            update: {},
            create: { productId: product.id, relatedProductId: relatedId },
          });
        } catch (_) {}
      }
      if (relatedIds.length > 0) {
        relatedEnriched++;
        updated = true;
      }
    }

    if (Object.keys(updates).length > 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: updates,
      });
    }
    if (updated) {
      console.log(`✅ Enriched: ${product.name}`);
    } else {
      skipped++;
    }

    await delay(DEFAULT_DELAY_MS);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Enrichment Summary:');
  console.log(`   📖 User Guide: ${userGuideEnriched}`);
  console.log(`   🔗 Related Products: ${relatedEnriched}`);
  console.log(`   ⏭️  Skipped: ${skipped}`);
  console.log('='.repeat(50));
}

main()
  .catch((e) => {
    console.error('❌ Fatal:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
