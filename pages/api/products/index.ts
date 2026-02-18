import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/middleware';

// GET /api/products - List all products
const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { page, limit, brandId, search } = req.query;
    const pageNumber = parseInt(page as string) || 1;
    const pageSize = parseInt(limit as string) || 100;
    const skip = (pageNumber - 1) * pageSize;
    
    const whereClause = brandId ? { brandId: brandId as string } : undefined;

    const totalCount = await prisma.product.count({ where: whereClause });

    let products = await prisma.product.findMany({
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
        relatedProducts: {
          include: {
            relatedProduct: {
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
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Apply search filter if provided
    if (search) {
      const searchLower = (search as string).toLowerCase();
      products = products.filter((product: any) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.brand.name.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    }

    const totalPages = Math.ceil(totalCount / pageSize);

    return res.status(200).json({
      data: products,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total: totalCount,
        totalPages: totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
  } catch (error: any) {
    console.error('[Products GET] Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// POST /api/products - Create a new product
const createProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;

    // Basic validation
    if (!data.brandId || !data.name || !data.slug) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if product with same slug exists for this brand
    const existingProduct = await prisma.product.findUnique({
      where: {
        brandId_slug: {
          brandId: data.brandId,
          slug: data.slug,
        },
      },
    });

    if (existingProduct) {
      return res.status(409).json({ error: 'Product with this slug already exists for this brand' });
    }

    // Extract related product IDs
    const { relatedProductIds, ...productData } = data;

    // Normalize prices to numbers
    if (productData.prices) {
      const normalizedPrices: Record<string, number> = {};
      for (const [key, value] of Object.entries(productData.prices)) {
        normalizedPrices[key] = typeof value === 'string' ? parseFloat(value as string) : Number(value);
      }
      productData.prices = normalizedPrices;
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        ...productData,
        colors: productData.colors || [],
        features: productData.features || [],
        specifications: productData.specifications || {},
      },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    // Create related product relationships if provided
    if (relatedProductIds && Array.isArray(relatedProductIds) && relatedProductIds.length > 0) {
      const uniqueRelatedIds = Array.from(new Set(relatedProductIds as string[])).filter(
        (id: string) => id !== product.id
      );

      if (uniqueRelatedIds.length > 0) {
        await Promise.all(
          uniqueRelatedIds.map(async (relatedId) => {
            try {
              await prisma.productRelatedProduct.create({
                data: {
                  productId: product.id,
                  relatedProductId: relatedId,
                },
              });
            } catch (err: any) {
              // Ignore duplicate relationship errors
              if (err?.code !== 'P2002') throw err;
            }
          })
        );
      }
    }

    // Fetch product with relations
    const productWithRelations = await prisma.product.findUnique({
      where: { id: product.id },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        relatedProducts: {
          include: {
            relatedProduct: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).json(productWithRelations || product);
  } catch (error: any) {
    console.error('[Products POST] Error:', error);
    return res.status(500).json({ error: error.message });
  }
};

// Main handler - matches blogs API pattern
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getProducts(req, res);
  } else if (req.method === 'POST') {
    return requireAuth(createProduct)(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};
