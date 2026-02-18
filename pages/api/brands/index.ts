import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Verify Prisma client is available
if (!prisma) {
  console.error('[Brands API] Prisma client is not initialized');
}

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
        details: {
          message: 'DATABASE_URL is not configured',
          databaseUrl: 'Not set',
        },
        timestamp: new Date().toISOString(),
      });
    }

    // Verify Prisma client is available
    if (!prisma) {
      return res.status(500).json({
        error: 'Prisma client not initialized',
        details: {
          message: 'Prisma client is null or undefined',
        },
        timestamp: new Date().toISOString(),
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
    // Enhanced error logging with full details
    const errorDetails = {
      message: error?.message || 'Unknown error',
      code: error?.code,
      name: error?.name,
      stack: error?.stack,
      cause: error?.cause,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
      databaseUrlPreview: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 30)}...` : 'Not set',
    };
    
    console.error('[Brands API] Error fetching brands:', errorDetails);

    // Return detailed error information for debugging
    return res.status(500).json({ 
      error: 'Failed to fetch brands',
      details: errorDetails,
      timestamp: new Date().toISOString(),
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
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set JSON content type immediately to prevent Next.js from rendering HTML error pages
  res.setHeader('Content-Type', 'application/json');
  
  try {
    if (req.method === 'GET') {
      return await getBrands(req, res);
    } else if (req.method === 'POST') {
      return await requireAuth(createBrand)(req, res);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    // Catch any unhandled errors at the route level
    const errorDetails = {
      message: error?.message || 'Unknown error',
      code: error?.code,
      name: error?.name,
      stack: error?.stack,
      cause: error?.cause,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    };
    
    console.error('[Brands API] Unhandled route-level error:', errorDetails);
    
    // Ensure we return JSON, not HTML
    if (!res.headersSent) {
      return res.status(500).json({ 
        error: 'Internal server error',
        details: errorDetails,
        timestamp: new Date().toISOString(),
      });
    }
  }
};

// Wrap export to catch module initialization errors
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return await handler(req, res);
  } catch (error: any) {
    // Catch errors during handler initialization
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).json({
      error: 'Handler initialization error',
      details: {
        message: error?.message || 'Unknown error',
        code: error?.code,
        name: error?.name,
        stack: error?.stack,
      },
      timestamp: new Date().toISOString(),
    });
  }
};

