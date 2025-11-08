import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';

// Manual validation function to avoid Zod webpack issues
function validateCreateProduct(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required string fields
  if (!data.brandId || typeof data.brandId !== 'string' || data.brandId.trim() === '') {
    errors.push('Brand ID is required');
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
    errors.push('Slug is required');
  } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
    errors.push('Slug must be lowercase alphanumeric with hyphens');
  }

  if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
    errors.push('Description is required');
  }

  if (!data.shortDescription || typeof data.shortDescription !== 'string' || data.shortDescription.trim() === '') {
    errors.push('Short description is required');
  }

  if (!data.category || typeof data.category !== 'string' || data.category.trim() === '') {
    errors.push('Category is required');
  }

  if (!data.sheenLevel || typeof data.sheenLevel !== 'string') {
    errors.push('Sheen level is required');
  } else if (!['Ultra Matt', 'Mat', 'Low Sheen', 'High Sheen'].includes(data.sheenLevel)) {
    errors.push('Sheen level must be one of: Ultra Matt, Mat, Low Sheen, High Sheen');
  }

  if (!data.surfaceType || typeof data.surfaceType !== 'string' || data.surfaceType.trim() === '') {
    errors.push('Surface type is required');
  }

  if (!data.usage || typeof data.usage !== 'string' || data.usage.trim() === '') {
    errors.push('Usage is required');
  }

  if (!data.image || typeof data.image !== 'string' || data.image.trim() === '') {
    errors.push('Image is required');
  } else {
    const imageValue = data.image.trim();
    if (!imageValue.startsWith('http://') && !imageValue.startsWith('https://') && !imageValue.startsWith('/')) {
      errors.push('Image must be a valid URL or path starting with /');
    }
  }

  // Validate prices object
  if (!data.prices || typeof data.prices !== 'object' || Array.isArray(data.prices)) {
    errors.push('Prices is required and must be an object');
  } else {
    const priceKeys = ['1L', '4L', '10L', '20L'] as const;
    for (const key of priceKeys) {
      if (!(key in data.prices)) {
        errors.push(`Price for ${key} is required`);
      } else {
        const priceValue = data.prices[key];
        const numPrice = typeof priceValue === 'string' ? parseFloat(priceValue) : Number(priceValue);
        if (isNaN(numPrice) || numPrice < 0) {
          errors.push(`Price for ${key} must be a non-negative number`);
        }
      }
    }
  }

  // Optional array fields
  if (data.colors !== undefined && !Array.isArray(data.colors)) {
    errors.push('Colors must be an array');
  }

  if (data.features !== undefined && !Array.isArray(data.features)) {
    errors.push('Features must be an array');
  }

  // Optional object fields
  if (data.specifications !== undefined && (typeof data.specifications !== 'object' || Array.isArray(data.specifications))) {
    errors.push('Specifications must be an object');
  }

  if (data.relatedProductIds !== undefined && !Array.isArray(data.relatedProductIds)) {
    errors.push('Related product IDs must be an array');
  }

  // Optional PIS fields
  if (data.pisHeading !== undefined && typeof data.pisHeading !== 'string') {
    errors.push('PIS heading must be a string');
  }

  if (data.pisDescription !== undefined && typeof data.pisDescription !== 'string') {
    errors.push('PIS description must be a string');
  }

  if (data.pisFileUrl !== undefined) {
    if (typeof data.pisFileUrl !== 'string') {
      errors.push('PIS file URL must be a string');
    } else if (data.pisFileUrl.trim() !== '') {
      const pisFileValue = data.pisFileUrl.trim();
      if (!pisFileValue.startsWith('http://') && !pisFileValue.startsWith('https://') && !pisFileValue.startsWith('/')) {
        errors.push('PIS file URL must be a valid URL or path starting with /');
      }
    }
  }

  if (data.showPisSection !== undefined && typeof data.showPisSection !== 'boolean') {
    errors.push('Show PIS section must be a boolean');
  }

  // Optional User Guide fields
  if (data.userGuideSteps !== undefined && !Array.isArray(data.userGuideSteps)) {
    errors.push('User guide steps must be an array');
  }

  if (data.userGuideMaterials !== undefined && !Array.isArray(data.userGuideMaterials)) {
    errors.push('User guide materials must be an array');
  }

  if (data.userGuideTips !== undefined && !Array.isArray(data.userGuideTips)) {
    errors.push('User guide tips must be an array');
  }

  if (data.showUserGuide !== undefined && typeof data.showUserGuide !== 'boolean') {
    errors.push('Show user guide must be a boolean');
  }

  // Optional FAQ fields
  if (data.faqs !== undefined && !Array.isArray(data.faqs)) {
    errors.push('FAQs must be an array');
  }

  if (data.showFaqSection !== undefined && typeof data.showFaqSection !== 'boolean') {
    errors.push('Show FAQ section must be a boolean');
  }

  // Optional Blog Suggestion fields
  if (data.suggestedBlogIds !== undefined && !Array.isArray(data.suggestedBlogIds)) {
    errors.push('Suggested blog IDs must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// GET /api/products - List all products
async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { brandId, search } = req.query;

    let products = await prisma.product.findMany({
      where: brandId ? { brandId: brandId as string } : undefined,
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

    // Apply case-insensitive search filter if search query is provided
    if (search) {
      const searchLower = (search as string).toLowerCase();
      products = products.filter((product: any) => {
        const nameMatch = product.name.toLowerCase().includes(searchLower);
        const descriptionMatch = product.description.toLowerCase().includes(searchLower);
        const brandMatch = product.brand.name.toLowerCase().includes(searchLower);
        const categoryMatch = product.category.toLowerCase().includes(searchLower);
        return nameMatch || descriptionMatch || brandMatch || categoryMatch;
      });
    }

    return res.status(200).json(products);
  } catch (error: any) {
    console.error('Get products error:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
  }
}

// POST /api/products - Create a new product
async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== CREATE PRODUCT REQUEST ===');
  console.log('Request method:', req.method);
  console.log('Request body keys:', Object.keys(req.body || {}));
  console.log('Full request body:', JSON.stringify(req.body, null, 2));
  try {
    // Validate request body
    const validation = validateCreateProduct(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    const data = req.body;

    // Normalize prices - ensure they are numbers
    const normalizedPrices: Record<string, number> = {};
    const priceKeys = ['1L', '4L', '10L', '20L'] as const;
    for (const key of priceKeys) {
      const priceValue = data.prices[key];
      normalizedPrices[key] = typeof priceValue === 'string' ? parseFloat(priceValue) : Number(priceValue);
    }
    data.prices = normalizedPrices;

    // Check if brand exists
    const brand = await prisma.brand.findUnique({
      where: { id: data.brandId },
    });

    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
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

    // Extract related product IDs and suggested blog IDs
    const { relatedProductIds, suggestedBlogIds, ...productData } = data;
    
    console.log('=== CREATE PRODUCT DEBUG ===');
    console.log('Raw request body:', JSON.stringify(req.body, null, 2));
    console.log('Extracted relatedProductIds:', relatedProductIds);
    console.log('relatedProductIds type:', typeof relatedProductIds);
    console.log('relatedProductIds is array?:', Array.isArray(relatedProductIds));
    console.log('relatedProductIds length:', relatedProductIds?.length || 0);
    if (relatedProductIds && relatedProductIds.length > 0) {
      console.log('Related product IDs to create:', relatedProductIds);
    } else {
      console.warn('WARNING: No relatedProductIds provided or array is empty!');
    }

    // Create product
    console.log('Creating product with data:', { name: data.name, brandId: data.brandId, slug: data.slug });
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
    console.log('Product created successfully with ID:', product.id);

    // Create related product relationships
    let relationshipsCreated = false;
    if (relatedProductIds && relatedProductIds.length > 0) {
      // Filter out duplicates and self-references
      const uniqueRelatedIds = Array.from(new Set(relatedProductIds as string[])).filter(
        (id: string) => id !== product.id
      );

      console.log('About to create relationships with:', uniqueRelatedIds);
      if (uniqueRelatedIds.length > 0) {
        try {
          // Create relationships one by one to handle duplicates gracefully
          // This works even if skipDuplicates is not supported
          let createdCount = 0;
          const createPromises = uniqueRelatedIds.map(async (relatedId) => {
            try {
              await prisma.productRelatedProduct.create({
                data: {
                  productId: product.id,
                  relatedProductId: relatedId,
                },
              });
              createdCount++;
              console.log(`✅ Created relationship: ${product.id} -> ${relatedId}`);
            } catch (createError: any) {
              // If it's a unique constraint error, it means the relationship already exists
              // This is fine, we'll just skip it
              if (createError?.code === 'P2002') {
                console.log(`ℹ️ Relationship already exists: ${product.id} -> ${relatedId} (skipping)`);
              } else {
                console.error(`❌ Error creating relationship ${product.id} -> ${relatedId}:`, createError?.message);
                throw createError; // Re-throw if it's a different error
              }
            }
          });
          
          await Promise.all(createPromises);
          console.log('Relationships created successfully. Count:', createdCount);
          console.log('Created relationships data:', uniqueRelatedIds.map((relatedId) => ({
            productId: product.id,
            relatedProductId: relatedId,
          })));
          
          // Verify relationships were actually created
          const verifyRelations = await prisma.productRelatedProduct.findMany({
            where: { productId: product.id },
          });
          console.log('Verification: Relationships in database after creation:', verifyRelations.length);
          relationshipsCreated = true;
        } catch (relationError: any) {
          console.error('Error creating relationships:', relationError);
          console.error('Full relation error:', JSON.stringify(relationError, null, 2));
          // Don't fail the request if relationships fail - product is already created
        }
      }
    }

    // Create blog suggestion relationships
    if (suggestedBlogIds && Array.isArray(suggestedBlogIds) && suggestedBlogIds.length > 0) {
      const uniqueBlogIds = Array.from(new Set(suggestedBlogIds));
      
      for (let i = 0; i < uniqueBlogIds.length; i++) {
        const blogId = uniqueBlogIds[i];
        try {
          await prisma.productBlogSuggestion.create({
            data: {
              productId: product.id,
              blogId: blogId as string,
              order: i,
            },
          });
          console.log(`✅ Created blog suggestion: ${product.id} -> ${blogId}`);
        } catch (blogError: any) {
          if (blogError?.code !== 'P2002') {
            console.error(`❌ Error creating blog suggestion:`, blogError?.message);
          }
        }
      }
    }

    // Try to fetch product with relations, but don't fail if this fails
    // ALWAYS return 201 with at least the basic product data
    try {
      console.log('Attempting to fetch product with relations for ID:', product.id);
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

      console.log('Prisma query result:', productWithRelations ? 'Success' : 'Null');
      if (productWithRelations) {
        console.log('Related products count:', productWithRelations.relatedProducts?.length || 0);
        return res.status(201).json(productWithRelations);
      } else {
        // Product not found (shouldn't happen but handle gracefully)
        console.warn('Product not found after creation - returning basic product data');
        return res.status(201).json({
          ...product,
          relatedProducts: [],
        });
      }
    } catch (fetchError: any) {
      // Log the error but don't fail the request - product was created successfully
      console.error('Error fetching product with relations:', fetchError);
      console.error('Error message:', fetchError?.message);
      console.error('Error code:', fetchError?.code);
      console.error('Error name:', fetchError?.name);
      console.error('Full error:', JSON.stringify(fetchError, Object.getOwnPropertyNames(fetchError), 2));
      console.error('Product was created successfully with ID:', product.id);
      console.error('Relationships created:', relationshipsCreated);
      
      // Return 201 with basic product data - this is a success response
      // The product exists in the database, even if we can't fetch it with relations
      return res.status(201).json({
        ...product,
        relatedProducts: [],
      });
    }
  } catch (error: any) {
    console.error('Create product error:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
  }
}

// Note: GET endpoint is public (no auth required)
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return getProducts(req, res);
  } else if (req.method === 'POST') {
    return requireAuth(createProduct)(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
};

