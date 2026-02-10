/**
 * Migration script: Update product categories to match the new dropdown options.
 *
 * Maps legacy category values (e.g. "Interior Paint", "Interior Emulsion")
 * to the new standardized options.
 *
 * Run with: npx tsx scripts/migrate-categories.ts
 */

import { PrismaClient } from '@prisma/client';
import { CATEGORY_OPTIONS } from '../src/lib/product-constants';

const prisma = new PrismaClient();

// Map legacy/alternate category values to the new standardized options
const CATEGORY_MAP: Record<string, (typeof CATEGORY_OPTIONS)[number]> = {
  // Interior variants
  'interior': 'Interior',
  'interior paint': 'Interior',
  'interior emulsion': 'Interior',
  'interior wall': 'Interior',
  'interior walls': 'Interior',
  // Exterior variants
  'exterior': 'Exterior',
  'exterior paint': 'Exterior',
  'exterior wall': 'Exterior',
  'exterior walls': 'Exterior',
  // Both variants
  'interior & exterior': 'Interior & Exterior Both',
  'interior and exterior': 'Interior & Exterior Both',
  'interior & exterior both': 'Interior & Exterior Both',
  'interior and exterior both': 'Interior & Exterior Both',
  'both': 'Interior & Exterior Both',
  // Wood/Metal variants
  'wood': 'Wood Finish',
  'wood finish': 'Wood Finish',
  'wood paint': 'Wood Finish',
  'metal': 'Metal Finish',
  'metal finish': 'Metal Finish',
  'metal paint': 'Metal Finish',
  'wood & metal': 'Wood & Metal Finish',
  'wood and metal': 'Wood & Metal Finish',
  'wood & metal finish': 'Wood & Metal Finish',
  // Tile & Grout
  'tile': 'Tile & Grout',
  'tile & grout': 'Tile & Grout',
  'tile and grout': 'Tile & Grout',
  'grout': 'Tile & Grout',
  // Waterproof
  'waterproof': 'Waterproof',
  'waterproofing': 'Waterproof',
};

const DEFAULT_CATEGORY: (typeof CATEGORY_OPTIONS)[number] = 'Interior & Exterior Both';

function mapCategory(current: string | null): (typeof CATEGORY_OPTIONS)[number] | null {
  if (!current || typeof current !== 'string') return null;
  const trimmed = current.trim();
  if (!trimmed) return null;

  // Already valid
  if (CATEGORY_OPTIONS.includes(trimmed as any)) return trimmed as (typeof CATEGORY_OPTIONS)[number];

  // Try mapping
  const normalized = trimmed.toLowerCase();
  return CATEGORY_MAP[normalized] ?? null;
}

async function main() {
  console.log('Starting migration: product categories -> standardized options...');

  const products = await prisma.product.findMany({
    select: { id: true, name: true, category: true },
  });

  console.log(`Found ${products.length} products.`);

  let migrated = 0;
  let skipped = 0;
  let defaulted = 0;

  for (const product of products) {
    const current = product.category;
    const mapped = mapCategory(current);

    // Already valid - no change needed
    if (CATEGORY_OPTIONS.includes(current as any)) {
      skipped++;
      continue;
    }

    // Use mapped value or default for unknown categories
    const finalCategory = mapped ?? DEFAULT_CATEGORY;

    // Skip if it would be the same (shouldn't happen after above check)
    if (current === finalCategory) {
      skipped++;
      continue;
    }

    if (mapped === null) {
      defaulted++;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: { category: finalCategory },
    });

    migrated++;
    console.log(`  ${product.name}: "${current}" -> "${finalCategory}"`);
  }

  console.log(`\nDone. Migrated: ${migrated}, Defaulted: ${defaulted}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error('Migration failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
