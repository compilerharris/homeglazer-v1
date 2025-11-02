import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';

// GET /api/products/related-options - Get products list for related product selection
export default requireAuth(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { excludeId, search } = req.query;

    const where: any = {};
    if (excludeId) {
      where.id = { not: excludeId as string };
    }
    if (search) {
      // SQLite doesn't support mode: 'insensitive', so we use contains and handle case in application
      const searchLower = (search as string).toLowerCase();
      where.OR = [
        { name: { contains: searchLower } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        slug: true,
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { name: 'asc' },
      take: 50, // Limit results for performance
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error('Get related options error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

