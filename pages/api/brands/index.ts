import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// GET /api/brands - List all brands
const getBrands = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    return res.status(200).json(brands);
  } catch (error: any) {
    console.error('[Brands GET] Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/brands - Create a new brand
const createBrand = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, slug, logo, description } = req.body;

    // Basic validation
    if (!name || !slug || !logo || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if slug already exists
    const existingBrand = await prisma.brand.findUnique({
      where: { slug },
    });

    if (existingBrand) {
      return res.status(409).json({ error: 'Brand with this slug already exists' });
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        slug,
        logo,
        description,
      },
    });

    return res.status(201).json(brand);
  } catch (error: any) {
    console.error('[Brands POST] Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Main handler - simplified without auth for now
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getBrands(req, res);
  } else if (req.method === 'POST') {
    return createBrand(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

