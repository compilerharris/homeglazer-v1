/**
 * Push a curated local JSON product into MongoDB via Prisma.
 *
 * Usage (from project root, with DATABASE_URL set for your cluster):
 *   node scripts/push-json-product-to-mongo.js woodtech-insignia-classic-series
 *
 * This will read:
 *   scripts/import-output/<slug>.json
 * take `productData`, find the brand by `meta.brandSlug`, and
 * upsert the Product by (brandId, slug).
 */

try {
  // First try loading from a standard .env file
  require('dotenv').config();

  // If DATABASE_URL is still not set, fall back to .env.production
  if (!process.env.DATABASE_URL) {
    require('dotenv').config({ path: '.env.production' });
  }
} catch (_) {}

// Patch DATABASE_URL for some MongoDB providers with strict SSL
let dbUrl = process.env.DATABASE_URL;
if (dbUrl && dbUrl.includes('sslmode=') && !dbUrl.includes('sslaccept=')) {
  process.env.DATABASE_URL =
    dbUrl + (dbUrl.includes('?') ? '&' : '?') + 'sslaccept=accept_invalid_certs';
}

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

function getStringArrayFromJson(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((v) => String(v));
  }
  return [];
}

async function main() {
  const slug = process.argv[2];

  if (!slug) {
    console.error(
      'Usage: node scripts/push-json-product-to-mongo.js <product-slug>',
    );
    process.exit(1);
  }

  const jsonPath = path.join(__dirname, 'import-output', `${slug}.json`);

  if (!fs.existsSync(jsonPath)) {
    console.error(
      `JSON file not found for slug "${slug}". Expected path: ${jsonPath}`,
    );
    process.exit(1);
  }

  let payload;
  try {
    const raw = fs.readFileSync(jsonPath, 'utf8');
    payload = JSON.parse(raw);
  } catch (error) {
    console.error('Failed to read or parse JSON file:', error);
    process.exit(1);
  }

  if (!payload || !payload.productData) {
    console.error('JSON file does not contain productData section.');
    process.exit(1);
  }

  const meta = payload.meta || {};
  const productData = payload.productData;

  const brandSlug =
    meta.brandSlug || productData.brandSlug || 'asian-paints';

  const brand = await prisma.brand.findUnique({
    where: { slug: brandSlug },
  });

  if (!brand) {
    console.error(
      `Brand with slug "${brandSlug}" not found. Make sure the brand exists in the database.`,
    );
    process.exit(1);
  }

  // Map productData to Prisma Product fields.
  const {
    brandSlug: _ignoreBrandSlug,
    name,
    slug: productSlug,
    description,
    shortDescription,
    category,
    subCategory,
    sheenLevel,
    surfaceType,
    usage,
    image,
    bannerImage,
    sizeUnit,
    prices,
    colors,
    features,
    specifications,
    pisHeading,
    pisDescription,
    pisFileUrl,
    showPisSection,
    userGuideSteps,
    userGuideMaterials,
    userGuideTips,
    showUserGuide,
    faqs,
    showFaqSection,
  } = productData;

  const prismaData = {
    brandId: brand.id,
    name: name || '',
    slug: productSlug || slug,
    description: description || shortDescription || '',
    shortDescription: shortDescription || description || '',
    category: category || 'Paint',
    subCategory: subCategory || null,
    sheenLevel: sheenLevel || '',
    surfaceType: surfaceType || '',
    usage: usage || '',
    image: image || '/assets/images/bucket.png',
    bannerImage: bannerImage || null,
    prices: prices || {},
    sizeUnit: sizeUnit || 'L',
    colors: colors || [],
    features: features || [],
    specifications: specifications || {},
    pisHeading: pisHeading || null,
    pisDescription: pisDescription || null,
    pisFileUrl: pisFileUrl || null,
    showPisSection: !!showPisSection,
    userGuideSteps: userGuideSteps || null,
    userGuideMaterials: userGuideMaterials || null,
    userGuideTips: userGuideTips || null,
    showUserGuide: !!showUserGuide,
    faqs: faqs || null,
    showFaqSection: !!showFaqSection,
  };

  const existing = await prisma.product.findUnique({
    where: {
      brandId_slug: {
        brandId: brand.id,
        slug: prismaData.slug,
      },
    },
  });

  let result;
  if (existing) {
    result = await prisma.product.update({
      where: { id: existing.id },
      data: prismaData,
    });
    console.log(
      'Updated existing product from JSON:',
      result.id,
      result.slug,
    );
  } else {
    result = await prisma.product.create({
      data: prismaData,
    });
    console.log(
      'Created new product from JSON:',
      result.id,
      result.slug,
    );
  }

  console.log(
    'Frontend URL:',
    `/products/${brandSlug}/${prismaData.slug}`,
  );
  // Automatically manage related products and suggested blogs
  await updateRelatedProductsForProduct(result);
  await updateSuggestedBlogsForProduct(result);
}

async function updateRelatedProductsForProduct(product) {
  try {
    // Clear existing related products for this product
    await prisma.productRelatedProduct.deleteMany({
      where: { productId: product.id },
    });

    const candidates = await prisma.product.findMany({
      where: {
        id: { not: product.id },
        brandId: product.brandId,
        category: product.category,
        surfaceType: product.surfaceType,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 12,
    });

    const selected = candidates.slice(0, 4);

    for (const related of selected) {
      await prisma.productRelatedProduct.upsert({
        where: {
          productId_relatedProductId: {
            productId: product.id,
            relatedProductId: related.id,
          },
        },
        update: {},
        create: {
          productId: product.id,
          relatedProductId: related.id,
        },
      });
    }

    if (selected.length > 0) {
      console.log(
        'Updated related products:',
        selected.map((p) => p.slug).join(', '),
      );
    } else {
      console.log('No related products candidates found for this product.');
    }
  } catch (error) {
    console.error('Error updating related products:', error);
  }
}

async function updateSuggestedBlogsForProduct(product) {
  try {
    // Clear existing suggestions
    await prisma.productBlogSuggestion.deleteMany({
      where: { productId: product.id },
    });

    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: {
        publishedAt: 'desc',
      },
      take: 30,
    });

    const scored = blogs
      .map((blog) => {
        const categories = getStringArrayFromJson(blog.categories).map((c) =>
          c.toLowerCase(),
        );
        const productCategory = (product.category || '').toLowerCase();
        const productSurface = (product.surfaceType || '').toLowerCase();

        let score = 0;
        if (productCategory && categories.includes(productCategory)) {
          score += 3;
        }
        if (productSurface && categories.includes(productSurface)) {
          score += 2;
        }
        if (categories.some((c) => c.includes('wood'))) {
          score += 1;
        }
        if (categories.some((c) => c.includes('furniture'))) {
          score += 1;
        }
        return { blog, score };
      })
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const aDate = a.blog.publishedAt
          ? new Date(a.blog.publishedAt).getTime()
          : 0;
        const bDate = b.blog.publishedAt
          ? new Date(b.blog.publishedAt).getTime()
          : 0;
        return bDate - aDate;
      });

    const selected = scored
      .filter((item) => item.score > 0)
      .slice(0, 3)
      .map((item) => item.blog);

    // Fallback: if nothing scored > 0, just take latest 3 blogs
    const finalBlogs =
      selected.length > 0 ? selected : blogs.slice(0, 3);

    for (let index = 0; index < finalBlogs.length; index++) {
      const blog = finalBlogs[index];
      await prisma.productBlogSuggestion.create({
        data: {
          productId: product.id,
          blogId: blog.id,
          order: index,
        },
      });
    }

    if (finalBlogs.length > 0) {
      console.log(
        'Updated suggested blogs:',
        finalBlogs.map((b) => b.slug).join(', '),
      );
    } else {
      console.log('No blog suggestions found for this product.');
    }
  } catch (error) {
    console.error('Error updating suggested blogs:', error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Error pushing JSON product to MongoDB:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

