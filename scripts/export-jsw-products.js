const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function exportJSWProducts() {
  try {
    // Find JSW Paints brand
    const jswBrand = await prisma.brand.findFirst({
      where: {
        name: { contains: 'JSW', mode: 'insensitive' }
      }
    });

    if (!jswBrand) {
      console.log('❌ JSW Paints brand not found');
      return;
    }

    console.log('✅ Found JSW Paints brand:', jswBrand.id);

    // Get all JSW products
    const jswProducts = await prisma.product.findMany({
      where: { brandId: jswBrand.id },
      include: {
        relatedProducts: true
      }
    });

    console.log(`\n📦 Found ${jswProducts.length} JSW products:\n`);
    
    jswProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.slug})`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Sheen: ${product.sheenLevel}`);
      console.log(`   Prices: 1L=${product.prices['1L']}, 4L=${product.prices['4L']}, 10L=${product.prices['10L']}, 20L=${product.prices['20L']}`);
      console.log();
    });

    // Export as JSON
    const exportData = {
      brand: jswBrand,
      products: jswProducts.map(p => ({
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        category: p.category,
        sheenLevel: p.sheenLevel,
        surfaceType: p.surfaceType,
        usage: p.usage,
        image: p.image,
        prices: p.prices,
        colors: p.colors,
        features: p.features,
        specifications: p.specifications
      }))
    };

    require('fs').writeFileSync(
      'jsw-products-export.json',
      JSON.stringify(exportData, null, 2)
    );

    console.log('✅ Exported to jsw-products-export.json');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

exportJSWProducts();
