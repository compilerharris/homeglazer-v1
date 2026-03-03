import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

/**
 * Small helper script to import products from
 * src/data/asian_paints_products.json into MongoDB via Prisma.
 *
 * Usage (from repo root):
 *   npx ts-node scripts/import-asian-paints-products.ts
 *
 * The script:
 * - Ensures the Asian Paints brand exists (by slug)
 * - Upserts all products from the JSON into the Product collection
 * - Creates related product links based on the `relatedProducts` slug list
 * - Creates suggested blog links based on `suggestedBlogSlugs` (if matching BlogPost entries exist)
 */

const prisma = new PrismaClient();

interface AsianPaintsJson {
  brand: {
    id: string;
    name: string;
    slug: string;
    logo: string;
    description: string;
  };
  products: any[];
}

async function main() {
  const jsonPath = path.join(
    process.cwd(),
    'src',
    'data',
    'asian_paints_products.json'
  );

  const raw = fs.readFileSync(jsonPath, 'utf8');
  const data = JSON.parse(raw) as AsianPaintsJson;

  console.log('Starting Asian Paints import...');

  // 1. Ensure brand exists (slug-based)
  const brandSlug = data.brand.id || data.brand.slug;

  let brand = await prisma.brand.findUnique({
    where: { slug: brandSlug },
  });

  if (!brand) {
    console.log(`Brand with slug "${brandSlug}" not found. Creating it now...`);
    brand = await prisma.brand.create({
      data: {
        name: data.brand.name,
        slug: brandSlug,
        logo: data.brand.logo,
        description: data.brand.description,
      },
    });
  } else {
    console.log(`Using existing brand "${brand.name}" (${brand.slug})`);
  }

  // 2. Upsert products
  const slugToProductId = new Map<string, string>();

  for (const product of data.products) {
    const slug = product.slug;
    if (!slug) {
      console.warn('Skipping product with no slug:', product);
      continue;
    }

    const payload = {
      brandId: brand.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category,
      subCategory: product.subCategory ?? null,
      sheenLevel: product.sheenLevel,
      surfaceType: product.surfaceType,
      usage: product.usage,
      image: product.image,
      bannerImage: product.bannerImage ?? null,
      prices: product.prices ?? {},
      sizeUnit: product.sizeUnit ?? 'L',
      colors: product.colors ?? [],
      features: product.features ?? [],
      specifications: product.specifications ?? {},
      pisHeading: product.pisHeading ?? null,
      pisDescription: product.pisDescription ?? null,
      pisFileUrl: product.pisFileUrl ?? null,
      showPisSection: product.showPisSection ?? false,
      userGuideSteps: product.userGuideSteps ?? null,
      userGuideMaterials: product.userGuideMaterials ?? null,
      userGuideTips: product.userGuideTips ?? null,
      showUserGuide: product.showUserGuide ?? false,
      faqs: product.faqs ?? null,
      showFaqSection: product.showFaqSection ?? false,
    };

    const dbProduct = await prisma.product.upsert({
      where: {
        brandId_slug: {
          brandId: brand.id,
          slug,
        },
      },
      update: payload,
      create: payload,
    });

    slugToProductId.set(slug, dbProduct.id);
    console.log(`✓ Upserted product: ${dbProduct.name} (${slug})`);
  }

  console.log(`Upserted ${slugToProductId.size} products.`);

  // 3. Create related product relationships
  let relatedCount = 0;

  for (const product of data.products) {
    const sourceId = slugToProductId.get(product.slug);
    if (!sourceId) continue;

    const relatedSlugs: string[] = product.relatedProducts || [];
    for (const relatedSlug of relatedSlugs) {
      const targetId = slugToProductId.get(relatedSlug);
      if (!targetId || targetId === sourceId) continue;

      try {
        await prisma.productRelatedProduct.upsert({
          where: {
            productId_relatedProductId: {
              productId: sourceId,
              relatedProductId: targetId,
            },
          },
          update: {},
          create: {
            productId: sourceId,
            relatedProductId: targetId,
          },
        });
        relatedCount++;
      } catch (err: any) {
        // Ignore duplicate relation errors, log others
        if (err?.code !== 'P2002') {
          console.error(
            `Error creating relation ${product.slug} -> ${relatedSlug}:`,
            err?.message || err
          );
        }
      }
    }
  }

  console.log(`Created/verified ${relatedCount} related product relations.`);

  // 4. Create suggested blog links (if blog posts already exist)
  let suggestionsCount = 0;

  for (const product of data.products) {
    const productId = slugToProductId.get(product.slug);
    if (!productId) continue;

    const suggestedSlugs: string[] = product.suggestedBlogSlugs || [];
    let order = 0;

    for (const blogSlug of suggestedSlugs) {
      const blog = await prisma.blogPost.findUnique({
        where: { slug: blogSlug },
        select: { id: true },
      });

      if (!blog) {
        console.warn(
          `Blog with slug "${blogSlug}" not found for product "${product.slug}", skipping suggestion.`
        );
        continue;
      }

      try {
        await prisma.productBlogSuggestion.upsert({
          where: {
            productId_blogId: {
              productId,
              blogId: blog.id,
            },
          },
          update: {
            order,
          },
          create: {
            productId,
            blogId: blog.id,
            order,
          },
        });

        suggestionsCount++;
        order++;
      } catch (err: any) {
        if (err?.code !== 'P2002') {
          console.error(
            `Error creating blog suggestion for product "${product.slug}" and blog "${blogSlug}":`,
            err?.message || err
          );
        }
      }
    }
  }

  console.log(`Created/updated ${suggestionsCount} product-blog suggestions.`);

  console.log('Asian Paints import completed.');
}

main()
  .catch((err) => {
    console.error('Asian Paints import failed:', err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

