/**
 * Migration script: Convert product prices from numeric format to available-sizes format.
 *
 * Old format: { "1L": 450, "4L": 1700, "10L": 3800, "20L": 7200 }
 * New format: { "1L": 1, "4L": 1, "10L": 1, "20L": 1 } (only sizes with value > 0)
 *
 * Run with: npx tsx scripts/migrate-prices-to-available-sizes.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SIZE_KEYS = ['1L', '4L', '10L', '20L'] as const;

function convertPricesToAvailableSizes(prices: Record<string, unknown> | null): Record<string, number> {
  if (!prices || typeof prices !== 'object') {
    return {};
  }

  const newPrices: Record<string, number> = {};
  for (const key of SIZE_KEYS) {
    if (key in prices) {
      const value = prices[key];
      const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
      if (!isNaN(numValue) && numValue > 0) {
        newPrices[key] = 1;
      }
    }
  }
  return newPrices;
}

async function main() {
  console.log('Starting migration: prices -> available sizes...');

  const products = await prisma.product.findMany({
    select: { id: true, name: true, prices: true },
  });

  console.log(`Found ${products.length} products to migrate.`);

  let migrated = 0;
  let skipped = 0;

  for (const product of products) {
    const oldPrices = product.prices as Record<string, unknown> | null;
    const newPrices = convertPricesToAvailableSizes(oldPrices);

    // Check if already in new format (all values are 0 or 1)
    const isAlreadyMigrated =
      oldPrices &&
      Object.values(oldPrices).every((v) => {
        const n = Number(v);
        return n === 0 || n === 1;
      });

    if (isAlreadyMigrated && Object.keys(newPrices).length === Object.keys(oldPrices || {}).length) {
      skipped++;
      continue;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { prices: newPrices },
    });

    migrated++;
    console.log(`  Migrated: ${product.name} (${Object.keys(newPrices).join(', ') || 'none'})`);
  }

  console.log(`\nDone. Migrated: ${migrated}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
