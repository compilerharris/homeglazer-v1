/**
 * Link Asian Paints product shots and PIS PDFs from public/media to database.
 * Updates Product.image and Product.pisFileUrl for matched products.
 * Skips products with no matching media.
 *
 * Usage:
 *   node scripts/link-asian-paints-media.js
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

const MEDIA_ROOT = path.join(__dirname, '../public/media');
const PACKS_ROOT = path.join(MEDIA_ROOT, 'products/packs/Asian Paints');
const PIS_ROOT = path.join(MEDIA_ROOT, 'products/PIS/Asian Paints');

const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.webp', '.avif'];

function slugify(str) {
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractCoreSlug(filename) {
  let base = path.basename(filename, path.extname(filename));
  base = base
    .replace(/\s*\(\d+\)\s*$/, '')
    .replace(/\s+$/, '')
    .toLowerCase();
  const patterns = [
    /^interior-walls-(.+?)(?:-asian-paints)?$/i,
    /^exterior-walls-(.+?)(?:-asian-paints)?$/i,
    /^interior-walls-undercoats-(.+?)(?:-asian-paints)?$/i,
    /^exterior-walls-(.+?)(?:-asian-paints)?$/i,
    /^metals-(.+?)(?:-asian-paints)?$/i,
    /^(.+?)-packshot(?:-asian-paints)?$/i,
    /^(.+?)-packshot-asian-paints$/i,
    /^(.+?)-PIS$/i,
    /^(.+?)-pis$/i,
    /^PIS-(.+)$/i,
    /^pis_(.+)$/i,
    /^pis-(.+)$/i,
    /^AP_(.+)_PIS$/i,
    /^Revised-(.+)-PIS$/i,
    /^(\d+)_(.+)$/,
    /^(.+?)-new$/i,
    /^(.+?)-updated$/i,
    /^(.+?)-advance-new$/i,
    /^(.+?)-advance$/i,
    /^(.+?)-digital-pack$/i,
    /^(.+?)-banner-desktop$/i,
    /^(.+?)-without-ultraa-coverage-logo$/i,
    /^(.+?)-topcoat-new-asian-paints$/i,
    /^(.+?)-topcoat-single-layer$/i,
    /^(.+?)-chit-pack\d*$/i,
    /^(.+?)-pack$/i,
    /^(.+?)-Sack$/i,
    /^(.+?)-finish$/i,
    /^(.+?)-new-asian-paints$/i,
    /^0079-new-(.+)$/i,
    /^(.+?)-\d{4}$/i, // e.g. WoodTech-Polyester-VFM-6778
    /^PIS-smartcare-(.+)$/i,
    /^(smartcare-.+?)-asian-paints$/i, // e.g. smartcare-repair-polymer-asian-paints -> smartcare-repair-polymer
    /^SmartCare-(.+)$/i,
    /^asian-repair-polymer.*$/i,
    /^wood-tech-(.+)$/i,
    /^WoodTech-(.+)$/i,
    /^woodtech-(.+)$/i,
    /^apextileguard-(.+)$/i,
    /^apexfloorguard-(.+)$/i,
    /^Apex-(.+)$/i,
    /^apex-(.+)$/i,
    /^ultima-(.+)$/i,
  ];
  for (const p of patterns) {
    const m = base.match(p);
    if (m) {
      const extracted = (m.length > 2 ? m[2] : m[1]) ?? base;
      return slugify(String(extracted).replace(/[-_]/g, '-'));
    }
  }
  return slugify(String(base || '').replace(/[-_]/g, '-'));
}

function getAllSlugVariants(coreSlug) {
  const variants = new Set([coreSlug]);
  const add = (s) => s && variants.add(slugify(s));
  add(coreSlug.replace(/-pis$/, '').replace(/-new$/, '').replace(/-updated$/, '').replace(/-advance$/, '').replace(/-advanced$/, ''));
  add(coreSlug.replace(/^trucare-/, 'tru-care-'));
  add(coreSlug.replace(/^tru-care-/, 'trucare-'));
  add(coreSlug.replace(/^apex-/, 'apex-'));
  add(coreSlug.replace(/archi-concrete/, 'royale-play-archi-concrete'));
  add(coreSlug.replace(/calcecruda/, 'royale-play-calcecruda'));
  add(coreSlug.replace(/calcecrudda/, 'royale-play-calcecruda'));
  add(coreSlug.replace(/royale-play-calcecrudda/, 'royale-play-calcecruda'));
  add(coreSlug.replace(/^5497-calcecrudda$/, 'royale-play-calcecruda'));
  add(coreSlug.replace(/royale-play-metalics/, 'royale-play-metallics'));
  add(coreSlug.replace(/royale-play-special-effects/, 'royale-play-special-effect'));
  add(coreSlug.replace(/royale-play-infinitex/, 'royale-play-infintex'));
  add(coreSlug.replace(/apex-ultima-allura-reserva-novi-marble/, 'apex-ultima-allura-reserva-novi-marble'));
  add(coreSlug.replace(/apex-ultima-allura-meraki-aeris/, 'apex-ultima-allura-meraki-aeris'));
  add(coreSlug.replace(/apex-ultima-allura-concordia-granizia/, 'apex-ultima-allura-concordia-granizia'));
  add(coreSlug.replace(/ultima-allura-clara/, 'apex-ultima-allura-clara'));
  add(coreSlug.replace(/apex-shyne-dustproof/, 'apex-shyne-dust-proof'));
  add(coreSlug.replace(/apex-advanced-dust-proof/, 'apex-advanced-dust-proof'));
  add(coreSlug.replace(/apex-dust-proof-ultraa/, 'apex-dust-proof-ultraa'));
  add(coreSlug.replace(/apex-dust-proof-emulsion/, 'apex-dust-proof'));
  add(coreSlug.replace(/apex-shyne-dust-proof-advance/, 'apex-shyne-dust-proof-advanced'));
  add(coreSlug.replace(/apextileguard-clear/, 'apex-tile-guard-clear-matt'));
  add(coreSlug.replace(/apextileguard/, 'apex-tile-guard'));
  add(coreSlug.replace(/apexfloorguard/, 'apex-floor-guard'));
  add(coreSlug.replace(/apex-createx-roller-finish/, 'apex-createx-roller-finish'));
  add(coreSlug.replace(/apex-createx-dholpur/, 'apex-createx-dholpur'));
  add(coreSlug.replace(/apex-createx-scratch-finish/, 'apex-createx-scratch-finish'));
  add(coreSlug.replace(/apex-duracast-dholpurtex/, 'apex-duracast-dholpurtex'));
  add(coreSlug.replace(/apex-duracast-roughtex/, 'apex-duracast-roughtex'));
  add(coreSlug.replace(/apex-duracast-crosstex/, 'apex-duracast-crosstex'));
  add(coreSlug.replace(/apex-duracast-finete/, 'apex-duracast-finetex'));
  add(coreSlug.replace(/apex-duracast-swirltex/, 'apex-duracast-swirltex'));
  add(coreSlug.replace(/apex-duracast-pebbletex/, 'apex-duracast-pebbletex'));
  add(coreSlug.replace(/interior-wall-finish-lustre/, 'asian-paints-interior-wall-finish-lustre'));
  add(coreSlug.replace(/shyne-premium-emulsion/, 'apcolite-advanced-shyne-premium-emulsion'));
  add(coreSlug.replace(/apcolite-premium-emulsion/, 'apcolite-advanced-premium-emulsion'));
  add(coreSlug.replace(/apcolite-premium-satin-emulsion/, 'apcolite-advanced-premium-emulsion'));
  add(coreSlug.replace(/royale-lustre/, 'royale-luster'));
  add(coreSlug.replace(/luxury-emulsion-shyne-advanced-ps-royale/, 'royale-shyne-advanced'));
  add(coreSlug.replace(/royale-glitz-reserv/, 'royale-glitz-reserv'));
  add(coreSlug.replace(/royale-glitz-new-packshot/, 'royale-glitz-ultra-shyne'));
  add(coreSlug.replace(/royale-glitz-ultra-matt/, 'royale-glitz-ultra-matt'));
  add(coreSlug.replace(/royale-advanced/, 'royale-advacned'));
  add(coreSlug.replace(/interior-walls-tractor-sparc-advanced/, 'tractor-sparc-advanced'));
  add(coreSlug.replace(/tractor-emulsion-ultraa/, 'tractor-ultraa'));
  add(coreSlug.replace(/neobharat/, 'neo-bharat-latex-interior-paint'));
  add(coreSlug.replace(/exterior-neobharat/, 'neo-bharat-latex-exterior-paint'));
  add(coreSlug.replace(/ace-power-plus/, 'ace-power+'));
  add(coreSlug.replace(/ace-powerplus/, 'ace-power+'));
  add(coreSlug.replace(/ace-sparc-advance/, 'ace-sparc-ultra'));
  add(coreSlug.replace(/ace-sparc-advance-new/, 'ace-sparc-ultra'));
  add(coreSlug.replace(/ace-sparc-new/, 'ace-sparc'));
  add(coreSlug.replace(/ace-pis/, 'ace-exterior-emulsion'));
  add(coreSlug.replace(/ace-ultraa/, 'ace-ultraa'));
  add(coreSlug.replace(/ace-sparc-colours/, 'ace-sparc-colours'));
  add(coreSlug.replace(/ace-shyne/, 'ace-shyne'));
  add(coreSlug.replace(/ace-advanced/, 'ace-advanced'));
  add(coreSlug.replace(/ace-exterior-emulsion/, 'ace-exterior-emulsion'));
  add(coreSlug.replace(/exterior-walls-ultima-protek-topcoat/, 'apex-ultima-protek'));
  add(coreSlug.replace(/ultima-protek-advanced/, 'apex-ultima-protek-advanced'));
  add(coreSlug.replace(/duralife-topcoat-single-layer/, 'apex-ultima-protek-duralife'));
  add(coreSlug.replace(/exterior-walls-apex-ultima/, 'apex-ultima'));
  add(coreSlug.replace(/ultima-stretch-packshot-asian-paints/, 'apex-ultima-stretch'));
  add(coreSlug.replace(/aqualock/, 'tractor-aqualock'));
  add(coreSlug.replace(/tractor-uno/, 'tractor-uno'));
  add(coreSlug.replace(/tractor-sparc-shyne/, 'tractor-sparc-shyne'));
  add(coreSlug.replace(/tractor-sparc-ultraa/, 'tractor-sparc-ultra'));
  add(coreSlug.replace(/tractor-sparc/, 'tractor-sparc'));
  add(coreSlug.replace(/tractor-emulsion-shyne-advanced/, 'tractor-shyne-advanced'));
  add(coreSlug.replace(/tractor-emulsion-shyne/, 'tractor-emulsion-shyne'));
  add(coreSlug.replace(/tractor-emulsion-advanced/, 'tractor-emulsion-advanced'));
  add(coreSlug.replace(/tractor-emulsion/, 'tractor-emulsion'));
  add(coreSlug.replace(/trucare-wall-putty/, 'trucare-wall-putty'));
  add(coreSlug.replace(/trucare-2x-primer-putty-mix/, 'trucare-2x-primer-putty-mix'));
  add(coreSlug.replace(/smartcare-putty-boost/, 'putty-boost'));
  add(coreSlug.replace(/smartcare-waterproofing-putty/, 'smartcare-waterproofing-putty'));
  add(coreSlug.replace(/trucare-knifing-paste-filler/, 'trucare-knifing-paste-filler'));
  add(coreSlug.replace(/trucare-filling-putty/, 'trucare-filling-putty'));
  add(coreSlug.replace(/trucare-acrylic-wall-putty/, 'trucare-acrylic-wall-putty'));
  add(coreSlug.replace(/trucare-acrylic-wall-putty/, 'trucare-powder-acrylic-putty')); // no dedicated image; use acrylic wall putty
  add(coreSlug.replace(/smartcare-repair-polymer/, 'smartcare-repair-polymer'));
  add(coreSlug.replace(/smartcare-epoxy-triblock/, 'smartcare-epoxy-triblock'));
  add(coreSlug.replace(/smartcare-epoxy-tri-block/, 'smartcare-epoxy-triblock'));
  add(coreSlug.replace(/wood-tech-insignia/, 'woodtech-insignia'));
  add(coreSlug.replace(/woodtech-insignia-classics/, 'woodtech-insignia-chrome-series'));
  add(coreSlug.replace(/woodtech-epoxy-insulator-neo/, 'woodtech-epoxy-insulator-neo'));
  add(coreSlug.replace(/woodtech-polyester-vfm/, 'woodtech-polyester-vfm'));
  add(coreSlug.replace(/woodtech-polyester-ul-wood-coating/, 'woodtech-polyester-vfm'));
  add(coreSlug.replace(/^polyester-ul-wood-coating$/, 'woodtech-polyester-vfm')); // extractCoreSlug strips woodtech- prefix
  add(coreSlug.replace(/woodtech-polyester-gold/, 'asian-paints-woodtech-polyester-gold'));
  add(coreSlug.replace(/nilaya-arc-matt/, 'nilaya-arc-matt'));
  add(coreSlug.replace(/nilaya-arc-pearlescent/, 'nilaya-arc-pearlescent'));
  return Array.from(variants);
}

function walkDir(dir, predicate, results = []) {
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkDir(full, predicate, results);
    } else if (e.isFile() && predicate(e.name)) {
      results.push(full);
    }
  }
  return results;
}

function buildImageLookup() {
  const map = new Map();
  const files = walkDir(PACKS_ROOT, (name) =>
    IMAGE_EXT.some((ext) => name.toLowerCase().endsWith(ext))
  );
  for (const f of files) {
    const rel = path.relative(path.join(__dirname, '../public'), f).replace(/\\/g, '/');
    const webPath = '/' + rel;
    const core = extractCoreSlug(f);
    const variants = getAllSlugVariants(core);
    for (const v of variants) {
      if (!map.has(v)) map.set(v, webPath);
    }
    map.set(core, webPath);
  }
  return map;
}

function buildPisLookup() {
  const map = new Map();
  const files = walkDir(PIS_ROOT, (name) => name.toLowerCase().endsWith('.pdf'));
  for (const f of files) {
    const rel = path.relative(path.join(__dirname, '../public'), f).replace(/\\/g, '/');
    const webPath = '/' + rel;
    const core = extractCoreSlug(f);
    const variants = getAllSlugVariants(core);
    for (const v of variants) {
      if (!map.has(v)) map.set(v, webPath);
    }
    map.set(core, webPath);
  }
  return map;
}

function findMatch(productSlug, lookup) {
  if (lookup.has(productSlug)) return lookup.get(productSlug);
  const slugNorm = productSlug.replace(/^asian-paints-/, '').replace(/-asian-paints$/, '');
  if (lookup.has(slugNorm)) return lookup.get(slugNorm);
  for (const [key, val] of lookup) {
    if (key.includes(productSlug) || productSlug.includes(key)) return val;
  }
  const parts = productSlug.split('-');
  for (let len = parts.length; len >= 2; len--) {
    for (let i = 0; i <= parts.length - len; i++) {
      const sub = parts.slice(i, i + len).join('-');
      if (lookup.has(sub)) return lookup.get(sub);
    }
  }
  return null;
}

async function main() {
  if (!fs.existsSync(PACKS_ROOT) || !fs.existsSync(PIS_ROOT)) {
    console.error('Media directories not found. Expected:');
    console.error('  ', PACKS_ROOT);
    console.error('  ', PIS_ROOT);
    process.exit(1);
  }

  console.log('Scanning media...');
  const imageLookup = buildImageLookup();
  const pisLookup = buildPisLookup();
  console.log(`  Images: ${imageLookup.size} slug variants from packs`);
  console.log(`  PIS: ${pisLookup.size} slug variants from PIS\n`);

  const brand = await prisma.brand.findFirst({
    where: {
      OR: [
        { name: { contains: 'Asian', mode: 'insensitive' } },
        { slug: 'asian-paints' },
      ],
    },
  });
  if (!brand) {
    console.error('Asian Paints brand not found');
    process.exit(1);
  }

  const products = await prisma.product.findMany({
    where: { brandId: brand.id },
  });
  console.log(`Found ${products.length} Asian Paints products\n`);

  let updatedCount = 0;
  let imageCount = 0;
  let pisCount = 0;
  let skippedCount = 0;

  for (const product of products) {
    const slug = product.slug;
    const imagePath = findMatch(slug, imageLookup);
    const pisPath = findMatch(slug, pisLookup);

    if (!imagePath && !pisPath) {
      console.log(`Skipped: ${product.name} (no matching media)`);
      skippedCount++;
      continue;
    }

    const updates = {};
    if (imagePath) {
      updates.image = imagePath;
      imageCount++;
    }
    if (pisPath) {
      updates.pisFileUrl = pisPath;
      updates.showPisSection = true;
      pisCount++;
    }

    if (Object.keys(updates).length > 0) {
      await prisma.product.update({
        where: { id: product.id },
        data: updates,
      });
      const parts = [];
      if (imagePath) parts.push('image');
      if (pisPath) parts.push('PIS');
      console.log(`Updated: ${product.name} (${parts.join(', ')})`);
      updatedCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('Summary:');
  console.log(`  Updated: ${updatedCount} products`);
  console.log(`  With image: ${imageCount}`);
  console.log(`  With PIS: ${pisCount}`);
  console.log(`  Skipped: ${skippedCount}`);
  console.log('='.repeat(50));
}

main()
  .catch((e) => {
    console.error('Fatal:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
