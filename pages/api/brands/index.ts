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
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error('[Brands API] DATABASE_URL environment variable is not set');
      return res.status(500).json({ 
        error: 'Database configuration error',
        message: 'DATABASE_URL is not configured. Please check Amplify environment variables.',
      });
    }

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
    // Enhanced error logging
    const errorDetails = {
      message: error?.message || 'Unknown error',
      code: error?.code,
      name: error?.name,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    };
    
    console.error('[Brands API] Error fetching brands:', errorDetails);

    // Check for specific error types
    let errorMessage = 'Failed to fetch brands';
    let statusCode = 500;

    if (error?.code === 'P1001' || error?.message?.includes('Can\'t reach database server') || error?.message?.includes('ENOTFOUND')) {
      errorMessage = 'Database connection failed. Please check MongoDB Atlas network access allows Amplify IPs.';
    } else if (error?.code === 'P1002' || error?.message?.includes('Connection timeout') || error?.message?.includes('ETIMEDOUT')) {
      errorMessage = 'Database connection timeout. Please check MongoDB Atlas network access.';
    } else if (error?.code === 'P1000' || error?.message?.includes('Authentication failed')) {
      errorMessage = 'Database authentication failed. Please check DATABASE_URL credentials.';
    } else if (error?.message?.includes('MongoNetworkError') || error?.message?.includes('MongoServerSelectionError')) {
      errorMessage = 'Cannot connect to MongoDB. Please check MongoDB Atlas network access allows Amplify IPs (0.0.0.0/0).';
    }

    return res.status(statusCode).json({ 
      error: errorMessage,
      message: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
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
  try {
    if (req.method === 'GET') {
      return await getBrands(req, res);
    } else if (req.method === 'POST') {
      return await requireAuth(createBrand)(req, res);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('[Brands API] Unhandled error:', {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
    });
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
  }
};

