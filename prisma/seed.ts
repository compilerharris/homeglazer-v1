import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { BRANDS, PRODUCTS } from '../src/data/products';

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user if it doesn't exist
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@homeglazer.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await hashPassword(adminPassword);
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash,
      },
    });
    console.log(`✅ Admin user created: ${adminEmail}`);
  } else {
    console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
  }

  // Seed brands
  console.log('Seeding brands...');
  const brandMap = new Map<string, string>(); // Map old brandId to new database id

  for (const brand of BRANDS) {
    try {
      const createdBrand = await prisma.brand.upsert({
        where: { slug: brand.id },
        update: {
          name: brand.name,
          logo: brand.logo,
          description: brand.description,
        },
        create: {
          name: brand.name,
          slug: brand.id,
          logo: brand.logo,
          description: brand.description,
        },
      });
      brandMap.set(brand.id, createdBrand.id);
      console.log(`  ✓ Brand: ${brand.name}`);
    } catch (error: any) {
      console.error(`  ✗ Error creating brand ${brand.name}:`, error.message);
    }
  }

  console.log(`✅ Created/updated ${brandMap.size} brands`);

  // Seed products
  console.log('Seeding products...');
  let productCount = 0;
  const productIdMap = new Map<string, string>(); // Map old product id to new database id

  for (const product of PRODUCTS) {
    try {
      const brandId = brandMap.get(product.brandId);
      if (!brandId) {
        console.error(`  ✗ Brand not found for product ${product.name}: ${product.brandId}`);
        continue;
      }

      const createdProduct = await prisma.product.upsert({
        where: {
          brandId_slug: {
            brandId,
            slug: product.slug,
          },
        },
        update: {
          name: product.name,
          description: product.description,
          shortDescription: product.shortDescription,
          category: product.category,
          sheenLevel: product.sheenLevel,
          surfaceType: product.surfaceType,
          usage: product.usage,
          image: product.image,
          prices: product.prices,
          colors: product.colors || [],
          features: product.features || [],
          specifications: product.specifications || {},
        },
        create: {
          brandId,
          name: product.name,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription,
          category: product.category,
          sheenLevel: product.sheenLevel,
          surfaceType: product.surfaceType,
          usage: product.usage,
          image: product.image,
          prices: product.prices,
          colors: product.colors || [],
          features: product.features || [],
          specifications: product.specifications || {},
        },
      });

      productIdMap.set(product.id, createdProduct.id);
      productCount++;
      console.log(`  ✓ Product: ${product.name}`);
    } catch (error: any) {
      console.error(`  ✗ Error creating product ${product.name}:`, error.message);
    }
  }

  console.log(`✅ Created/updated ${productCount} products`);

  // Create related products relationships
  console.log('Creating related product relationships...');
  let relationCount = 0;

  for (const product of PRODUCTS) {
    try {
      const currentProductId = productIdMap.get(product.id);
      if (!currentProductId) continue;

      // Find related products based on brandId and sheenLevel (similar to getRelatedProducts logic)
      const relatedProducts = PRODUCTS.filter(
        (p) =>
          p.id !== product.id &&
          (p.brandId === product.brandId || p.sheenLevel === product.sheenLevel)
      );

      for (const relatedProduct of relatedProducts.slice(0, 4)) {
        // Limit to 4 related products
        const relatedProductId = productIdMap.get(relatedProduct.id);
        if (!relatedProductId) continue;

        try {
          await prisma.productRelatedProduct.upsert({
            where: {
              productId_relatedProductId: {
                productId: currentProductId,
                relatedProductId,
              },
            },
            update: {},
            create: {
              productId: currentProductId,
              relatedProductId,
            },
          });
          relationCount++;
        } catch (error: any) {
          // Skip if relation already exists
          if (error.code !== 'P2002') {
            console.error(`  ✗ Error creating relation:`, error.message);
          }
        }
      }
    } catch (error: any) {
      console.error(`  ✗ Error processing relations for product ${product.name}:`, error.message);
    }
  }

  console.log(`✅ Created ${relationCount} product relationships`);

  console.log('\n✨ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

