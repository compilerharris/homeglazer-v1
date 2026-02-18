/**
 * Migrate data from PostgreSQL to MongoDB.
 *
 * Reads products, blogs, brands, users, and relations from PostgreSQL,
 * transforms IDs to MongoDB ObjectIds, and inserts into MongoDB.
 *
 * Environment:
 *   SOURCE_DATABASE_URL - PostgreSQL connection (or POSTGRES_URL)
 *   DATABASE_URL        - MongoDB connection (Prisma uses this)
 *
 * Usage:
 *   npm run db:migrate-to-mongo
 *   npm run db:migrate-to-mongo -- --dry-run
 *   npm run db:migrate-to-mongo -- --clear  (truncate MongoDB before insert)
 */

import { config } from 'dotenv';
import { Client } from 'pg';
import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';

config({ path: '.env' });
config({ path: '.env.local', override: true }); // .env.local overrides for migration

const DRY_RUN = process.argv.includes('--dry-run');
const CLEAR_FIRST = process.argv.includes('--clear');

function newObjectId(): string {
  return crypto.randomBytes(12).toString('hex');
}

function safeGet<T>(row: Record<string, unknown>, key: string, def: T): T {
  const v = row[key];
  if (v === undefined || v === null) return def;
  return v as T;
}

function parseJson(val: unknown): unknown {
  if (val === null || val === undefined) return null;
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
}

async function tableExists(pg: Client, table: string): Promise<boolean> {
  const r = await pg.query(
    `SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = $1`,
    [table]
  );
  return r.rowCount > 0;
}

async function main() {
  const sourceUrl =
    process.env.SOURCE_DATABASE_URL || process.env.POSTGRES_URL;

  const mongoUrl = process.env.DATABASE_URL;

  if (!sourceUrl || !sourceUrl.startsWith('postgres')) {
    console.error(
      'SOURCE_DATABASE_URL or POSTGRES_URL must be set to a PostgreSQL URL'
    );
    process.exit(1);
  }

  if (!mongoUrl || !mongoUrl.startsWith('mongodb')) {
    console.error(
      'DATABASE_URL must be set to a MongoDB URL for the migration target'
    );
    console.error(
      'Tip: Use SOURCE_DATABASE_URL for PostgreSQL and DATABASE_URL for MongoDB'
    );
    process.exit(1);
  }

  // Fix PostgreSQL SSL if needed
  let pgUrl = sourceUrl;
  if (pgUrl.includes('sslmode=') && !pgUrl.includes('sslaccept=')) {
    pgUrl =
      pgUrl + (pgUrl.includes('?') ? '&' : '?') + 'sslaccept=accept_invalid_certs';
  }

  console.log('PostgreSQL source:', pgUrl.replace(/:[^:@]+@/, ':****@'));
  console.log('MongoDB target:', mongoUrl.replace(/:[^:@]+@/, ':****@'));
  if (DRY_RUN) console.log('\n[DRY RUN - no writes to MongoDB]\n');
  if (CLEAR_FIRST && !DRY_RUN)
    console.log('\n[CLEAR - MongoDB collections will be truncated first]\n');

  const pg = new Client({ connectionString: pgUrl });
  const prisma = new PrismaClient();

  const idMap = {
    User: new Map<string, string>(),
    Brand: new Map<string, string>(),
    Product: new Map<string, string>(),
    BlogPost: new Map<string, string>(),
  };

  try {
    await pg.connect();
    console.log('Connected to PostgreSQL\n');

    // 1. Users
    const users = (await pg.query('SELECT * FROM "User"')).rows;
    console.log(`Users: ${users.length}`);
    if (!DRY_RUN && users.length > 0) {
      if (CLEAR_FIRST) {
        await prisma.user.deleteMany({});
      }
      for (const row of users) {
        const newId = newObjectId();
        idMap.User.set(row.id, newId);
        await prisma.user.create({
          data: {
            id: newId,
            email: row.email as string,
            passwordHash: row.passwordHash as string,
            createdAt: new Date(row.createdAt as string),
            updatedAt: new Date(row.updatedAt as string),
          },
        });
      }
      console.log(`  Migrated ${users.length} users`);
    }

    // 2. Brands
    const brands = (await pg.query('SELECT * FROM "Brand"')).rows;
    console.log(`Brands: ${brands.length}`);
    if (!DRY_RUN && brands.length > 0) {
      if (CLEAR_FIRST) {
        await prisma.brand.deleteMany({});
      }
      for (const row of brands) {
        const newId = newObjectId();
        idMap.Brand.set(row.id, newId);
        await prisma.brand.create({
          data: {
            id: newId,
            name: row.name as string,
            slug: row.slug as string,
            logo: row.logo as string,
            description: row.description as string,
            createdAt: new Date(row.createdAt as string),
            updatedAt: new Date(row.updatedAt as string),
          },
        });
      }
      console.log(`  Migrated ${brands.length} brands`);
    }

    // 3. Products
    const products = (await pg.query('SELECT * FROM "Product"')).rows;
    console.log(`Products: ${products.length}`);
    if (!DRY_RUN && products.length > 0) {
      if (CLEAR_FIRST) {
        await prisma.productRelatedProduct.deleteMany({});
        await prisma.productBlogSuggestion.deleteMany({});
        await prisma.product.deleteMany({});
      }
      for (const row of products) {
        const newId = newObjectId();
        const brandId = idMap.Brand.get(row.brandId as string);
        if (!brandId) {
          console.warn(`  Skip product ${row.name}: brand ${row.brandId} not found`);
          continue;
        }
        idMap.Product.set(row.id, newId);

        const prices = parseJson(row.prices);
        const colors = parseJson(row.colors);
        const features = parseJson(row.features);
        const specifications = parseJson(row.specifications);

        await prisma.product.create({
          data: {
            id: newId,
            brandId,
            name: row.name as string,
            slug: row.slug as string,
            description: row.description as string,
            shortDescription: row.shortDescription as string,
            category: row.category as string,
            subCategory: safeGet(row, 'subCategory', null) as string | null,
            sheenLevel: row.sheenLevel as string,
            surfaceType: row.surfaceType as string,
            usage: row.usage as string,
            image: row.image as string,
            bannerImage: safeGet(row, 'bannerImage', null) as string | null,
            prices: (prices as object) ?? {},
            sizeUnit:
              (safeGet(row, 'sizeUnit', 'L') as string) === 'K' ||
              (safeGet(row, 'sizeUnit', 'L') as string) === 'P'
                ? (safeGet(row, 'sizeUnit', 'L') as string)
                : 'L',
            colors: (colors as object) ?? null,
            features: (features as object) ?? null,
            specifications: (specifications as object) ?? null,
            pisHeading: safeGet(row, 'pisHeading', null) as string | null,
            pisDescription: safeGet(row, 'pisDescription', null) as string | null,
            pisFileUrl: safeGet(row, 'pisFileUrl', null) as string | null,
            showPisSection: safeGet(row, 'showPisSection', false) as boolean,
            userGuideSteps: parseJson(safeGet(row, 'userGuideSteps', null)) as object | null,
            userGuideMaterials: parseJson(
              safeGet(row, 'userGuideMaterials', null)
            ) as object | null,
            userGuideTips: parseJson(safeGet(row, 'userGuideTips', null)) as object | null,
            showUserGuide: safeGet(row, 'showUserGuide', false) as boolean,
            faqs: parseJson(safeGet(row, 'faqs', null)) as object | null,
            showFaqSection: safeGet(row, 'showFaqSection', false) as boolean,
            createdAt: new Date(row.createdAt as string),
            updatedAt: new Date(row.updatedAt as string),
          },
        });
      }
      console.log(`  Migrated ${products.length} products`);
    }

    // 4. ProductRelatedProduct
    const rels = (await pg.query('SELECT * FROM "ProductRelatedProduct"')).rows;
    console.log(`ProductRelatedProduct: ${rels.length}`);
    if (!DRY_RUN && rels.length > 0 && !CLEAR_FIRST) {
      for (const row of rels) {
        const productId = idMap.Product.get(row.productId as string);
        const relatedProductId = idMap.Product.get(row.relatedProductId as string);
        if (!productId || !relatedProductId) continue;
        try {
          await prisma.productRelatedProduct.create({
            data: {
              productId,
              relatedProductId,
              createdAt: new Date(row.createdAt as string),
            },
          });
        } catch (e: unknown) {
          if ((e as { code?: string }).code !== 'P2002') throw e;
        }
      }
      console.log(`  Migrated ${rels.length} relations`);
    } else if (!DRY_RUN && CLEAR_FIRST && rels.length > 0) {
      for (const row of rels) {
        const productId = idMap.Product.get(row.productId as string);
        const relatedProductId = idMap.Product.get(row.relatedProductId as string);
        if (!productId || !relatedProductId) continue;
        try {
          await prisma.productRelatedProduct.create({
            data: {
              productId,
              relatedProductId,
              createdAt: new Date(row.createdAt as string),
            },
          });
        } catch (e: unknown) {
          if ((e as { code?: string }).code !== 'P2002') throw e;
        }
      }
      console.log(`  Migrated ${rels.length} relations`);
    }

    // 5. BlogPost (optional - table may not exist)
    const hasBlogPost = await tableExists(pg, 'BlogPost');
    if (hasBlogPost) {
      const blogs = (await pg.query('SELECT * FROM "BlogPost"')).rows;
      console.log(`BlogPost: ${blogs.length}`);
      if (!DRY_RUN && blogs.length > 0) {
        if (CLEAR_FIRST) {
          await prisma.productBlogSuggestion.deleteMany({});
          await prisma.blogPost.deleteMany({});
        }
        for (const row of blogs) {
          const newId = newObjectId();
          idMap.BlogPost.set(row.id, newId);
          await prisma.blogPost.create({
            data: {
              id: newId,
              slug: row.slug as string,
              title: row.title as string,
              excerpt: row.excerpt as string,
              content: row.content as string,
              coverImage: row.coverImage as string,
              author: row.author as string,
              readTime: row.readTime as string,
              categories: (parseJson(row.categories) as object) ?? [],
              published: safeGet(row, 'published', false) as boolean,
              metaDescription: safeGet(row, 'metaDescription', null) as string | null,
              metaKeywords: safeGet(row, 'metaKeywords', null) as string | null,
              featuredOrder: safeGet(row, 'featuredOrder', null) as number | null,
              viewCount: safeGet(row, 'viewCount', 0) as number,
              createdAt: new Date(row.createdAt as string),
              updatedAt: new Date(row.updatedAt as string),
              publishedAt: row.publishedAt
                ? new Date(row.publishedAt as string)
                : null,
            },
          });
        }
        console.log(`  Migrated ${blogs.length} blog posts`);
      }
    } else {
      console.log('BlogPost: table not found (skipped)');
    }

    // 6. ProductBlogSuggestion (optional)
    const hasPBS = await tableExists(pg, 'ProductBlogSuggestion');
    if (hasPBS && hasBlogPost) {
      const pbs = (await pg.query('SELECT * FROM "ProductBlogSuggestion"')).rows;
      console.log(`ProductBlogSuggestion: ${pbs.length}`);
      if (!DRY_RUN && pbs.length > 0 && !CLEAR_FIRST) {
        for (const row of pbs) {
          const productId = idMap.Product.get(row.productId as string);
          const blogId = idMap.BlogPost.get(row.blogId as string);
          if (!productId || !blogId) continue;
          try {
            await prisma.productBlogSuggestion.create({
              data: {
                productId,
                blogId,
                order: safeGet(row, 'order', 0) as number,
                createdAt: new Date(row.createdAt as string),
              },
            });
          } catch (e: unknown) {
            if ((e as { code?: string }).code !== 'P2002') throw e;
          }
        }
        console.log(`  Migrated ${pbs.length} product-blog suggestions`);
      } else if (!DRY_RUN && pbs.length > 0 && CLEAR_FIRST) {
        for (const row of pbs) {
          const productId = idMap.Product.get(row.productId as string);
          const blogId = idMap.BlogPost.get(row.blogId as string);
          if (!productId || !blogId) continue;
          try {
            await prisma.productBlogSuggestion.create({
              data: {
                productId,
                blogId,
                order: safeGet(row, 'order', 0) as number,
                createdAt: new Date(row.createdAt as string),
              },
            });
          } catch (e: unknown) {
            if ((e as { code?: string }).code !== 'P2002') throw e;
          }
        }
        console.log(`  Migrated ${pbs.length} product-blog suggestions`);
      }
    } else if (hasPBS) {
      console.log('ProductBlogSuggestion: skipped (BlogPost not migrated)');
    }

    console.log('\nMigration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await pg.end();
    await prisma.$disconnect();
  }
}

main();
