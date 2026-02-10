import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dummyProducts = [
  {
    name: 'JSW Vogue Astoniq',
    slug: 'jsw-vogue-astoniq',
    description: 'Premium interior emulsion paint with advanced stain-resistant technology. Perfect for living rooms, bedrooms, and hallways. Provides excellent coverage and durability with a smooth matte finish.',
    shortDescription: 'Premium interior emulsion with stain-resistant technology',
    category: 'Interior Emulsion',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Walls',
    usage: 'Home',
    image: '/assets/images/bucket.png',
    prices: { '1L': 1, '4L': 1, '10L': 1, '20L': 1 },
    colors: ['Pure White', 'Ivory White', 'Cream White', 'Pearly White'],
    features: [
      'Advanced stain-resistant technology',
      'Excellent coverage and durability',
      'Smooth matte finish',
      'Low odor formula',
      'Washable surface',
    ],
    specifications: {
      'Coverage': '120-140 sq ft per liter',
      'Drying Time': '2-4 hours',
      'Recoat Time': '4-6 hours',
      'Sheen': 'Mat',
      'Application': 'Brush, Roller, Spray',
    },
  },
  {
    name: 'JSW Halo Majestic Interiors - Silk',
    slug: 'jsw-halo-majestic-interiors-silk',
    description: 'Luxury interior paint with silk finish. Provides elegant sheen and superior washability. Ideal for high-traffic areas like living rooms, dining rooms, and corridors. Long-lasting protection with easy maintenance.',
    shortDescription: 'Luxury interior paint with elegant silk finish',
    category: 'Interior Emulsion',
    sheenLevel: 'Low Sheen',
    surfaceType: 'Interior Walls',
    usage: 'Home',
    image: '/assets/images/bucket.png',
    prices: { '1L': 1, '4L': 1, '10L': 1, '20L': 1 },
    colors: ['Silk White', 'Pearl White', 'Bone White', 'Off White'],
    features: [
      'Elegant silk finish',
      'Superior washability',
      'High-traffic resistance',
      'Easy maintenance',
      'Long-lasting protection',
    ],
    specifications: {
      'Coverage': '110-130 sq ft per liter',
      'Drying Time': '2-3 hours',
      'Recoat Time': '4-6 hours',
      'Sheen': 'Low Sheen',
      'Application': 'Brush, Roller, Spray',
    },
  },
  {
    name: 'JSW Halo Majestic Interiors Shine',
    slug: 'jsw-halo-majestic-interiors-shine',
    description: 'Premium interior paint with high sheen finish. Creates a luxurious look with exceptional durability and washability. Perfect for modern homes seeking a sophisticated appearance.',
    shortDescription: 'Premium interior paint with high sheen finish',
    category: 'Interior Emulsion',
    sheenLevel: 'High Sheen',
    surfaceType: 'Interior Walls',
    usage: 'Home',
    image: '/assets/images/bucket.png',
    prices: { '1L': 1, '4L': 1, '10L': 1, '20L': 1 },
    colors: ['Shine White', 'Gloss White', 'Bright White', 'Premium White'],
    features: [
      'High sheen finish',
      'Luxurious appearance',
      'Exceptional durability',
      'Easy to clean',
      'Modern sophisticated look',
    ],
    specifications: {
      'Coverage': '100-120 sq ft per liter',
      'Drying Time': '2-3 hours',
      'Recoat Time': '4-6 hours',
      'Sheen': 'High Sheen',
      'Application': 'Brush, Roller, Spray',
    },
  },
  {
    name: 'JSW Vogue Ultra Matt',
    slug: 'jsw-vogue-ultra-matt',
    description: 'Ultra matte finish interior paint for contemporary spaces. Provides excellent light diffusion and hides surface imperfections. Ideal for bedrooms and quiet spaces requiring a non-reflective finish.',
    shortDescription: 'Ultra matte finish for contemporary interiors',
    category: 'Interior Emulsion',
    sheenLevel: 'Ultra Matt',
    surfaceType: 'Interior Walls',
    usage: 'Home',
    image: '/assets/images/bucket.png',
    prices: { '1L': 1, '4L': 1, '10L': 1, '20L': 1 },
    colors: ['Ultra White', 'Soft White', 'Muted White', 'Natural White'],
    features: [
      'Ultra matte finish',
      'Excellent light diffusion',
      'Hides imperfections',
      'Non-reflective surface',
      'Perfect for bedrooms',
    ],
    specifications: {
      'Coverage': '120-140 sq ft per liter',
      'Drying Time': '3-4 hours',
      'Recoat Time': '5-7 hours',
      'Sheen': 'Ultra Matt',
      'Application': 'Brush, Roller',
    },
  },
];

async function main() {
  console.log('🚀 Adding dummy JSW Paints products...\n');

  // Find JSW Paints brand
  const jswBrand = await prisma.brand.findUnique({
    where: { slug: 'jsw-paints' },
  });

  if (!jswBrand) {
    console.error('❌ JSW Paints brand not found. Please create the brand first.');
    process.exit(1);
  }

  console.log(`✅ Found brand: ${jswBrand.name} (ID: ${jswBrand.id})\n`);

  let created = 0;
  let updated = 0;
  let errors = 0;

  for (const productData of dummyProducts) {
    try {
      const result = await prisma.product.upsert({
        where: {
          brandId_slug: {
            brandId: jswBrand.id,
            slug: productData.slug,
          },
        },
        update: {
          name: productData.name,
          description: productData.description,
          shortDescription: productData.shortDescription,
          category: productData.category,
          sheenLevel: productData.sheenLevel,
          surfaceType: productData.surfaceType,
          usage: productData.usage,
          image: productData.image,
          prices: productData.prices,
          colors: productData.colors,
          features: productData.features,
          specifications: productData.specifications,
        },
        create: {
          brandId: jswBrand.id,
          ...productData,
        },
      });

      if (result.createdAt.getTime() === result.updatedAt.getTime()) {
        created++;
        console.log(`  ✅ Created: ${productData.name}`);
      } else {
        updated++;
        console.log(`  🔄 Updated: ${productData.name}`);
      }
    } catch (error: any) {
      errors++;
      console.error(`  ❌ Error with ${productData.name}:`, error.message);
    }
  }

  console.log(`\n✨ Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`\n✅ Done!`);
}

main()
  .catch((e) => {
    console.error('❌ Script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

