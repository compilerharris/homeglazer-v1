/**
 * Add a single Asian Paints product using data extracted from their product page.
 * Use this for testing or one-off adds. Only writes content where we have data from the source; skips rest.
 * Required fields (no data from link) use sensible defaults; image uses placeholder until you upload.
 *
 * Usage (ensure DATABASE_URL is set, e.g. in .env):
 *   node scripts/add-asian-paints-product-from-url.js
 *
 * Product: WoodTech Insignia Classic Series
 * Source: https://www.asianpaints.com/products/wood-finish/wood-listing/woodtech-insignia-classic-series.html
 */

try {
  require('dotenv').config();
} catch (_) {}
let dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.includes('sslmode=') && !dbUrl.includes('sslaccept=')) {
  process.env.DATABASE_URL =
    dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'sslaccept=accept_invalid_certs';
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ASIAN_PAINTS_SLUG = 'asian-paints';

// Data extracted from: https://www.asianpaints.com/products/wood-finish/wood-listing/woodtech-insignia-classic-series.html
// Only fields with content from the page are filled; rest are minimal for SEO or defaults.
const PRODUCT = {
  name: 'WoodTech Insignia- Classic series',
  slug: 'woodtech-insignia-classic-series',
  shortDescription:
    'Augment the décor of your furniture with this international product- WoodTech Insignia offers Best in class Italian, special effect for wood and glass and gives freedom to choose the look and experiment with colours. It highlights the surface and accents the decor quotient. Its available in below designs - Silver Micaceous (Product code: 4162), Craqulet (4163), Soft touch (4164), Stringy (4165), Iriidescent (4191) & Texture (4192).',
  description:
    'Augment the décor of your furniture with this international product- WoodTech Insignia offers Best in class Italian, special effect for wood and glass and gives freedom to choose the look and experiment with colours. It highlights the surface and accents the decor quotient. Its available in below designs - Silver Micaceous (Product code: 4162), Craqulet (4163), Soft touch (4164), Stringy (4165), Iriidescent (4191) & Texture (4192).',
  category: 'Wood Finish',
  subCategory: 'Ultra Luxury',
  sheenLevel: 'Mat',
  surfaceType: 'Wood',
  usage: 'Home',
  image: '/assets/images/bucket.png',
  bannerImage: null,
  sizeUnit: 'L',
  prices: {},
  colors: [],
  features: [],
  specifications: {},
  pisHeading: null,
  pisDescription: null,
  pisFileUrl: null,
  showPisSection: false,
  userGuideSteps: null,
  userGuideMaterials: null,
  userGuideTips: null,
  showUserGuide: false,
  faqs: null,
  showFaqSection: false,
};

async function main() {
  const brand = await prisma.brand.findUnique({
    where: { slug: ASIAN_PAINTS_SLUG },
  });
  if (!brand) {
    throw new Error(`Brand not found: ${ASIAN_PAINTS_SLUG}. Run seed or create brand first.`);
  }

  const existing = await prisma.product.findUnique({
    where: {
      brandId_slug: { brandId: brand.id, slug: PRODUCT.slug },
    },
  });
  if (existing) {
    console.log('Product already exists:', existing.id, PRODUCT.slug);
    return;
  }

  const product = await prisma.product.create({
    data: {
      ...PRODUCT,
      brandId: brand.id,
    },
  });
  console.log('Created product:', product.id, product.name, product.slug);
  console.log('URL: /products/asian-paints/' + product.slug);
  console.log('Image is placeholder; add real image via admin or link-asian-paints-media.js.');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
