import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

/**
 * Simplified products endpoint for production debugging
 * Exact copy of test-products but with pagination
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page, limit, brandId } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 100;
    const skip = (pageNumber - 1) * pageSize;
    
    console.log(`[Products Simple] Fetching products (page: ${pageNumber}, limit: ${pageSize})`);
    
    // Build where clause
    const whereClause = brandId ? { brandId: brandId as string } : undefined;

    // Get total count
    const totalCount = await prisma.product.count({
      where: whereClause,
    });

    // Fetch products with exact same select as test-products
    const products = await prisma.product.findMany({
      where: whereClause,
      take: pageSize,
      skip: skip,
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

    console.log(`[Products Simple] Successfully fetched ${products.length} products`);
    
    // Calculate pagination
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNextPage = pageNumber < totalPages;
    const hasPreviousPage = pageNumber > 1;

    return res.status(200).json({
      data: products,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total: totalCount,
        totalPages: totalPages,
        hasNextPage: hasNextPage,
        hasPreviousPage: hasPreviousPage,
      },
    });
  } catch (error: any) {
    console.error('[Products Simple] Error:', error);
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
      name: error.name,
    });
  }
}
