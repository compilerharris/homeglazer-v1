const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const JSW_PRODUCTS = [
  {
    name: "JSW Vogue Astoniq",
    slug: "jsw-vogue-astoniq",
    description: "Premium interior emulsion paint with advanced stain-resistant technology. Perfect for living rooms, bedrooms, and hallways. Provides excellent coverage and durability with a smooth matte finish.",
    shortDescription: "Premium interior emulsion with stain-resistant technology",
    category: "Interior Emulsion",
    sheenLevel: "Mat",
    surfaceType: "Interior Walls",
    usage: "Home",
    image: "/assets/images/bucket.png",
    prices: { "1L": 450, "4L": 1650, "10L": 3800, "20L": 7200 },
    colors: ["Pure White", "Ivory White", "Cream White", "Pearly White"],
    features: [
      "Advanced stain-resistant technology",
      "Excellent coverage and durability",
      "Smooth matte finish",
      "Low odor formula",
      "Washable surface"
    ]
  },
  {
    name: "JSW Halo Majestic Interiors - Silk",
    slug: "jsw-halo-majestic-interiors-silk",
    description: "Luxury interior paint with silk finish. Provides elegant sheen and superior washability. Ideal for high-traffic areas like living rooms, dining rooms, and corridors. Long-lasting protection with easy maintenance.",
    shortDescription: "Luxury interior paint with elegant silk finish",
    category: "Interior Emulsion",
    sheenLevel: "Low Sheen",
    surfaceType: "Interior Walls",
    usage: "Home",
    image: "/assets/images/bucket.png",
    prices: { "1L": 520, "4L": 1920, "10L": 4400, "20L": 8400 },
    colors: ["Silk White", "Pearl White", "Bone White", "Off White"],
    features: [
      "Elegant silk finish",
      "Superior washability",
      "High-traffic resistance",
      "Easy maintenance",
      "Long-lasting protection"
    ]
  },
  {
    name: "JSW Halo Majestic Interiors Shine",
    slug: "jsw-halo-majestic-interiors-shine",
    description: "Premium interior paint with high sheen finish. Creates a luxurious look with exceptional durability and washability. Perfect for modern homes seeking a sophisticated appearance.",
    shortDescription: "Premium interior paint with high sheen finish",
    category: "Interior Emulsion",
    sheenLevel: "High Sheen",
    surfaceType: "Interior Walls",
    usage: "Home",
    image: "/assets/images/bucket.png",
    prices: { "1L": 580, "4L": 2100, "10L": 4800, "20L": 9200 },
    colors: ["Shine White", "Gloss White", "Bright White", "Premium White"],
    features: [
      "High sheen finish",
      "Luxurious appearance",
      "Exceptional durability",
      "Easy to clean",
      "Modern sophisticated look"
    ]
  },
  {
    name: "JSW Vogue Ultra Matt",
    slug: "jsw-vogue-ultra-matt",
    description: "Ultra matte finish interior paint for contemporary spaces. Provides excellent light diffusion and hides surface imperfections. Ideal for bedrooms and quiet spaces requiring a non-reflective finish.",
    shortDescription: "Ultra matte finish for contemporary interiors",
    category: "Interior Emulsion",
    sheenLevel: "Ultra Matt",
    surfaceType: "Interior Walls",
    usage: "Home",
    image: "/assets/images/bucket.png",
    prices: { "1L": 480, "4L": 1750, "10L": 4000, "20L": 7600 },
    colors: ["Ultra White", "Soft White", "Muted White", "Natural White"],
    features: [
      "Ultra matte finish",
      "Excellent light diffusion",
      "Hides imperfections",
      "Non-reflective surface",
      "Perfect for bedrooms"
    ]
  }
];

async function importJSWProducts() {
  try {
    console.log('🔍 Finding JSW Paints brand...');
    
    // Find JSW Paints brand
    const jswBrand = await prisma.brand.findFirst({
      where: {
        OR: [
          { name: { contains: 'JSW', mode: 'insensitive' } },
          { slug: 'jsw-paints' }
        ]
      }
    });

    if (!jswBrand) {
      console.error('❌ JSW Paints brand not found in database');
      return;
    }

    console.log(`✅ Found JSW Paints brand: ${jswBrand.name} (${jswBrand.id})`);
    console.log();

    // Import each product
    let imported = 0;
    let skipped = 0;

    for (const productData of JSW_PRODUCTS) {
      try {
        // Check if product already exists
        const existing = await prisma.product.findUnique({
          where: {
            brandId_slug: {
              brandId: jswBrand.id,
              slug: productData.slug
            }
          }
        });

        if (existing) {
          console.log(`⏭️  Skipped: ${productData.name} (already exists)`);
          skipped++;
          continue;
        }

        // Create product
        const product = await prisma.product.create({
          data: {
            brandId: jswBrand.id,
            name: productData.name,
            slug: productData.slug,
            description: productData.description,
            shortDescription: productData.shortDescription,
            category: productData.category,
            sheenLevel: productData.sheenLevel,
            surfaceType: productData.surfaceType,
            usage: productData.usage,
            image: productData.image,
            prices: productData.prices,
            colors: productData.colors || [],
            features: productData.features || [],
            specifications: {}
          }
        });

        console.log(`✅ Imported: ${product.name}`);
        imported++;

      } catch (error) {
        console.error(`❌ Failed to import ${productData.name}:`, error.message);
      }
    }

    console.log();
    console.log('=' .repeat(50));
    console.log(`📊 Import Summary:`);
    console.log(`   ✅ Imported: ${imported} products`);
    console.log(`   ⏭️  Skipped: ${skipped} products (already exist)`);
    console.log(`   📦 Total JSW Products: ${imported + skipped}`);
    console.log('=' .repeat(50));

  } catch (error) {
    console.error('❌ Import failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

console.log('🚀 Starting JSW Products Import...');
console.log();
importJSWProducts();

