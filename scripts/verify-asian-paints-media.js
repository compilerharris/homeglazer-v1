/**
 * Verify Asian Paints products have correct image and PIS linked.
 * Reports: placeholder images, missing files, filename mismatches.
 *
 * Usage:
 *   node scripts/verify-asian-paints-media.js
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
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const PLACEHOLDER_IMAGE = '/assets/images/bucket.png';
const PLACEHOLDER_PIS = '/downloads/sample-product-info.pdf';
const PUBLIC_ROOT = path.join(__dirname, '../public');

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Extract core product slug from a file path (e.g. tractor-emulsion from interior-walls-tractor-emulsion-asian-paints.png) */
function extractSlugFromPath(filePath) {
  const base = path.basename(filePath, path.extname(filePath));
  const normalized = base
    .toLowerCase()
    .replace(/[-_]/g, '-')
    .replace(/\d{4}_/g, '') // e.g. 5614_archi
    .replace(/_\d+$/, '') // trailing _123
    .replace(/^\d+-/, ''); // leading 0079-
  const stripped = normalized
    .replace(/^interior-walls-/, '')
    .replace(/^exterior-walls-/, '')
    .replace(/^exterior-/, '')
    .replace(/^pis-/, '')
    .replace(/-asian-paints-\d*$/, '')
    .replace(/-asian-paints$/, '')
    .replace(/-packshot$/, '')
    .replace(/-new$/, '')
    .replace(/-pis$/, '')
    .replace(/-updated$/, '')
    .replace(/-chit-pack\d*$/, '')
    .replace(/-single-layer$/, '')
    .replace(/-topcoat$/, '')
    .replace(/-luxury-emulsion$/, '')
    .replace(/-emulsion$/, '');
  return slugify(stripped);
}

/** Check if filename slug is plausibly related to product slug */
function slugMatches(productSlug, fileSlug) {
  const p = productSlug.replace(/^asian-paints-/, '').replace(/advacned/, 'advanced').replace(/sheild/, 'shield');
  const f = fileSlug.replace(/^asian-paints-/, '');
  if (p === f) return true;
  if (p.includes(f) || f.includes(p)) return true;
  // Product "Apex Duracast Pebbletex" -> pebbletex; file "pis-Pebbletex" -> pebbletex
  const pWords = p.split('-').filter((w) => w.length > 1);
  const fWords = f.split('-').filter((w) => w.length > 1 && !/^\d+$/.test(w));
  const overlap = pWords.filter((w) => fWords.some((fw) => fw.includes(w) || w.includes(fw)));
  return overlap.length >= Math.min(2, pWords.length);
}

async function main() {
  const brand = await prisma.brand.findFirst({
    where: { name: { contains: 'Asian', mode: 'insensitive' } },
  });
  if (!brand) {
    console.error('Asian Paints brand not found');
    process.exit(1);
  }

  const products = await prisma.product.findMany({
    where: { brandId: brand.id },
    select: { id: true, name: true, slug: true, image: true, pisFileUrl: true, showPisSection: true },
    orderBy: { name: 'asc' },
  });

  const issues = [];
  const ok = [];

  for (const p of products) {
    const productSlug = slugify(p.name);
    const imageIssues = [];
    const pisIssues = [];

    // Check image
    if (!p.image) {
      imageIssues.push('no image');
    } else if (p.image === PLACEHOLDER_IMAGE) {
      imageIssues.push('placeholder (bucket.png)');
    } else {
      const imagePath = path.join(PUBLIC_ROOT, p.image.replace(/^\//, ''));
      if (!fs.existsSync(imagePath)) {
        imageIssues.push(`file missing: ${p.image}`);
      } else {
        const fileSlug = extractSlugFromPath(imagePath);
        if (!slugMatches(productSlug, fileSlug)) {
          imageIssues.push(`possible mismatch: file suggests "${fileSlug}"`);
        }
      }
    }

    // Check PIS (only if showPisSection or pisFileUrl is set)
    if (p.showPisSection || p.pisFileUrl) {
      if (!p.pisFileUrl) {
        pisIssues.push('showPisSection=true but no pisFileUrl');
      } else if (p.pisFileUrl === PLACEHOLDER_PIS) {
        pisIssues.push('placeholder (sample-product-info.pdf)');
      } else {
        const pisPath = path.join(PUBLIC_ROOT, p.pisFileUrl.replace(/^\//, ''));
        if (!fs.existsSync(pisPath)) {
          pisIssues.push(`file missing: ${p.pisFileUrl}`);
        } else {
          const fileSlug = extractSlugFromPath(pisPath);
          if (!slugMatches(productSlug, fileSlug)) {
            pisIssues.push(`possible mismatch: file suggests "${fileSlug}"`);
          }
        }
      }
    }

    if (imageIssues.length || pisIssues.length) {
      issues.push({
        name: p.name,
        image: p.image,
        pisFileUrl: p.pisFileUrl,
        imageIssues,
        pisIssues,
      });
    } else {
      ok.push({
        name: p.name,
        image: p.image,
        pis: !!p.pisFileUrl,
      });
    }
  }

  // Report
  console.log('==================================================');
  console.log('Asian Paints Media Verification');
  console.log('==================================================');
  console.log(`Total products: ${products.length}`);
  console.log(`OK: ${ok.length}`);
  console.log(`With issues: ${issues.length}`);
  console.log('');

  if (issues.length > 0) {
    console.log('--- Products with issues ---');
    for (const i of issues) {
      console.log(`\n${i.name}`);
      if (i.imageIssues.length) {
        console.log(`  Image: ${i.image || '(none)'}`);
        i.imageIssues.forEach((msg) => console.log(`    - ${msg}`));
      }
      if (i.pisIssues.length) {
        console.log(`  PIS: ${i.pisFileUrl || '(none)'}`);
        i.pisIssues.forEach((msg) => console.log(`    - ${msg}`));
      }
    }
  }

  console.log('\n--- OK products (sample first 10) ---');
  ok.slice(0, 10).forEach((o) => {
    console.log(`  ${o.name} | image: ${o.image ? 'yes' : 'no'} | PIS: ${o.pis ? 'yes' : 'no'}`);
  });
  if (ok.length > 10) {
    console.log(`  ... and ${ok.length - 10} more`);
  }

  console.log('\n==================================================');
  console.log('Summary:');
  console.log(`  OK: ${ok.length}`);
  console.log(`  Issues: ${issues.length}`);
  if (issues.length > 0) {
    const placeholderImageCount = issues.filter((i) =>
      i.imageIssues.some((m) => m.includes('placeholder'))
    ).length;
    const placeholderPisCount = issues.filter((i) =>
      i.pisIssues.some((m) => m.includes('placeholder'))
    ).length;
    const missingCount = issues.filter((i) =>
      [...i.imageIssues, ...i.pisIssues].some((m) => m.includes('file missing'))
    ).length;
    const mismatchCount = issues.filter((i) =>
      [...i.imageIssues, ...i.pisIssues].some((m) => m.includes('mismatch'))
    ).length;
    if (placeholderImageCount) console.log(`  Using placeholder image (bucket.png): ${placeholderImageCount}`);
    if (placeholderPisCount) console.log(`  Using placeholder PIS (sample-product-info.pdf): ${placeholderPisCount}`);
    if (missingCount) console.log(`  Missing files: ${missingCount}`);
    if (mismatchCount) console.log(`  Possible mismatches: ${mismatchCount}`);
  }
  console.log('==================================================');

  await prisma.$disconnect();
  process.exit(issues.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
