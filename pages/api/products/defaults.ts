import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { CATEGORY_OPTIONS, SUB_CATEGORY_OPTIONS } from '@/lib/product-constants';

const SHEEN_LEVELS = ['Ultra Matt', 'Mat', 'Low Sheen', 'High Sheen'] as const;
const SURFACE_TYPES = ['Interior Wall', 'Exterior Wall', 'Wood', 'Metal'] as const;
const USAGE_TYPES = ['Home', 'Commercial'] as const;

function mostCommon<T>(arr: T[]): T | null {
  if (arr.length === 0) return null;
  const counts = new Map<T, number>();
  for (const v of arr) {
    counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  let max = 0;
  let result: T | null = null;
  for (const [k, c] of Array.from(counts.entries())) {
    if (c > max) {
      max = c;
      result = k;
    }
  }
  return result;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const products = await prisma.product.findMany({
      select: { category: true, subCategory: true, sheenLevel: true, surfaceType: true, usage: true, prices: true, sizeUnit: true },
    });

    if (products.length === 0) {
      return res.status(200).json({
        category: 'Interior & Exterior Both',
        subCategory: '',
        sheenLevel: 'Mat',
        surfaceType: 'Interior Wall',
        usage: 'Home',
        sizeUnit: 'L',
        availableSizes: ['1', '4', '10', '20'],
      });
    }

    type ProductRow = { category: string; subCategory: string | null; sheenLevel: string; surfaceType: string; usage: string; prices: unknown; sizeUnit: string | null };
    const category = mostCommon(products.map((p: ProductRow) => p.category as string)) ?? 'Interior & Exterior Both';
    const subCategoryRaw = mostCommon(products.map((p: ProductRow) => p.subCategory).filter(Boolean) as string[]);
    const sheenLevel = mostCommon(products.map((p: ProductRow) => p.sheenLevel)) ?? 'Mat';
    const surfaceType = mostCommon(products.map((p: ProductRow) => p.surfaceType)) ?? 'Interior Wall';
    const usage = mostCommon(products.map((p: ProductRow) => p.usage)) ?? 'Home';

    // Collect all size keys from all products, pick most common set
    const allSizes: string[] = [];
    for (const p of products as ProductRow[]) {
      const prices = p.prices as Record<string, number> | null;
      if (prices && typeof prices === 'object') {
        for (const key of Object.keys(prices)) {
          if (prices[key] > 0) allSizes.push(key.trim());
        }
      }
    }
    const sizeCounts = new Map<string, number>();
    for (const s of allSizes) {
      if (s) sizeCounts.set(s, (sizeCounts.get(s) ?? 0) + 1);
    }
    const defaultSizes = ['1', '4', '10', '20'];
    const sortedSizes = Array.from(sizeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([k]) => k.replace(/^(\d+(?:\.\d+)?)[LK]$/i, '$1') || k);
    const availableSizes = sortedSizes.length > 0 ? sortedSizes : defaultSizes;

    // Ensure category is valid
    const sizeUnitRaw = mostCommon(products.map((p: ProductRow) => p.sizeUnit).filter(Boolean) as string[]);
    const validSizeUnit = (sizeUnitRaw === 'K' || sizeUnitRaw === 'L') ? sizeUnitRaw : 'L';

    const validCategory = CATEGORY_OPTIONS.includes(category as any) ? category : 'Interior & Exterior Both';
    const validSubCategory = subCategoryRaw && SUB_CATEGORY_OPTIONS.includes(subCategoryRaw as any) ? subCategoryRaw : '';
    const validSheen = SHEEN_LEVELS.includes(sheenLevel as any) ? sheenLevel : 'Mat';
    const validSurface = SURFACE_TYPES.includes(surfaceType as any) ? surfaceType : 'Interior Wall';
    const validUsage = USAGE_TYPES.includes(usage as any) ? usage : 'Home';

    return res.status(200).json({
      category: validCategory,
      subCategory: validSubCategory,
      sizeUnit: validSizeUnit,
      sheenLevel: validSheen,
      surfaceType: validSurface,
      usage: validUsage,
      availableSizes,
    });
  } catch (error) {
    console.error('Get product defaults error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
