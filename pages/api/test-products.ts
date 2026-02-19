import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * Test endpoint to diagnose products API issue
 * Tests fetching products with different limits
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    
    console.log(`[Test Products] Fetching ${limit} products...`);
    
    // Try to fetch limited products
    const products = await prisma.product.findMany({
      take: limit,
      select: {
        id: true,
        brandId: true,
        name: true,
        slug: true,
        description: true,
        shortDescription: true,
        category: true,
        subCategory: true,
        sheenLevel: true,
        surfaceType: true,
        usage: true,
        image: true,
        bannerImage: true,
        prices: true,
        sizeUnit: true,
        colors: true,
        features: true,
        specifications: true,
        createdAt: true,
        updatedAt: true,
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    console.log(`[Test Products] Successfully fetched ${products.length} products`);
    
    // Try to serialize
    const jsonString = JSON.stringify(products);
    console.log(`[Test Products] JSON size: ${jsonString.length} bytes`);
    
    return res.status(200).json({
      success: true,
      count: products.length,
      jsonSize: jsonString.length,
      products,
    });
  } catch (error: any) {
    console.error('[Test Products] Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      name: error.name,
    });
  }
}
