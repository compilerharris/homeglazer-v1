import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const createBrandSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  logo: z.string().min(1, 'Logo is required').refine(
    (val) => {
      // Accept valid URLs (http/https) or relative paths starting with /
      return val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/');
    },
    { message: 'Logo must be a valid URL or a relative path starting with /' }
  ),
  description: z.string().min(1, 'Description is required'),
});

// GET /api/brands - List all brands
async function getBrands(req: NextApiRequest, res: NextApiResponse) {
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
  } catch (error) {
    console.error('Get brands error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// POST /api/brands - Create a new brand
async function createBrand(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validationResult = createBrandSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.issues,
      });
    }

    const { name, slug, logo, description } = validationResult.data;

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
  } catch (error) {
    console.error('Create brand error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Note: GET endpoint is public (no auth required)
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getBrands(req, res);
  } else if (req.method === 'POST') {
    return requireAuth(createBrand)(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

