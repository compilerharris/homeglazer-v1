import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateBrandSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens').optional(),
  logo: z.string().refine(
    (val) => val.startsWith('http://') || val.startsWith('https://') || val.startsWith('/'),
    { message: 'Logo must be a valid URL or a relative path starting with /' }
  ).optional(),
  description: z.string().min(1, 'Description is required').optional(),
});

// GET /api/brands/[id] - Get a single brand
async function getBrand(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const brand = await prisma.brand.findUnique({
      where: { id: id as string },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: { products: true },
        },
      },
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    return res.status(200).json(brand);
  } catch (error) {
    console.error('Get brand error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// PUT /api/brands/[id] - Update a brand
async function updateBrand(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const validationResult = updateBrandSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validationResult.error.issues,
      });
    }

    const updateData = validationResult.data;

    // If slug is being updated, check if it already exists
    if (updateData.slug) {
      const existingBrand = await prisma.brand.findUnique({
        where: { slug: updateData.slug },
      });

      if (existingBrand && existingBrand.id !== id) {
        return res.status(409).json({ error: 'Brand with this slug already exists' });
      }
    }

    const brand = await prisma.brand.update({
      where: { id: id as string },
      data: updateData,
    });

    return res.status(200).json(brand);
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Brand not found' });
    }
    console.error('Update brand error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE /api/brands/[id] - Delete a brand
async function deleteBrand(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    // Check if brand exists
    const brand = await prisma.brand.findUnique({
      where: { id: id as string },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Delete brand (products will be cascade deleted)
    await prisma.brand.delete({
      where: { id: id as string },
    });

    return res.status(200).json({
      success: true,
      message: 'Brand deleted successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Brand not found' });
    }
    console.error('Delete brand error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(async (req, res) => {
  if (req.method === 'GET') {
    return getBrand(req, res);
  } else if (req.method === 'PUT') {
    return updateBrand(req, res);
  } else if (req.method === 'DELETE') {
    return deleteBrand(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
});

