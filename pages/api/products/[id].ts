import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';
import { CATEGORY_OPTIONS, SUB_CATEGORY_OPTIONS } from '@/lib/product-constants';

// Manual validation function to avoid Zod webpack issues
function validateUpdateProduct(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.brandId !== undefined && typeof data.brandId !== 'string') {
    errors.push('brandId must be a string');
  }

  if (data.name !== undefined && typeof data.name !== 'string') {
    errors.push('name must be a string');
  }

  if (data.slug !== undefined) {
    if (typeof data.slug !== 'string') {
      errors.push('slug must be a string');
    } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
      errors.push('slug must be lowercase alphanumeric with hyphens');
    }
  }

  if (data.description !== undefined && typeof data.description !== 'string') {
    errors.push('description must be a string');
  }

  if (data.shortDescription !== undefined && typeof data.shortDescription !== 'string') {
    errors.push('shortDescription must be a string');
  }

  if (data.category !== undefined) {
    if (typeof data.category !== 'string') {
      errors.push('category must be a string');
    } else if (data.category.trim() !== '' && !CATEGORY_OPTIONS.includes(data.category.trim() as any)) {
      errors.push(`category must be one of: ${CATEGORY_OPTIONS.join(', ')}`);
    }
  }

  if (data.sizeUnit !== undefined && data.sizeUnit !== null && data.sizeUnit !== '') {
    if (data.sizeUnit !== 'L' && data.sizeUnit !== 'K') {
      errors.push('sizeUnit must be L (Liter) or K (KG)');
    }
  }

  if (data.subCategory !== undefined && data.subCategory !== null && data.subCategory !== '') {
    if (typeof data.subCategory !== 'string') {
      errors.push('subCategory must be a string');
    } else if (!SUB_CATEGORY_OPTIONS.includes(data.subCategory.trim() as any)) {
      errors.push(`subCategory must be one of: ${SUB_CATEGORY_OPTIONS.join(', ')}`);
    }
  }

  if (data.sheenLevel !== undefined) {
    if (typeof data.sheenLevel !== 'string') {
      errors.push('sheenLevel must be a string');
    } else if (!['Ultra Matt', 'Mat', 'Low Sheen', 'High Sheen'].includes(data.sheenLevel)) {
      errors.push('sheenLevel must be one of: Ultra Matt, Mat, Low Sheen, High Sheen');
    }
  }

  if (data.surfaceType !== undefined && typeof data.surfaceType !== 'string') {
    errors.push('surfaceType must be a string');
  }

  if (data.usage !== undefined && typeof data.usage !== 'string') {
    errors.push('usage must be a string');
  }

  if (data.image !== undefined) {
    if (typeof data.image !== 'string') {
      errors.push('image must be a string');
    } else if (data.image.trim() !== '' && !data.image.startsWith('http://') && !data.image.startsWith('https://') && !data.image.startsWith('/')) {
      errors.push('image must be a valid URL or path starting with /');
    }
  }

  if (data.bannerImage !== undefined && data.bannerImage !== null && data.bannerImage !== '') {
    if (typeof data.bannerImage !== 'string') {
      errors.push('Banner image must be a string');
    } else {
      const bannerValue = data.bannerImage.trim();
      if (bannerValue && !bannerValue.startsWith('http://') && !bannerValue.startsWith('https://') && !bannerValue.startsWith('/')) {
        errors.push('Banner image must be a valid URL or path starting with /');
      }
    }
  }

  if (data.colors !== undefined && !Array.isArray(data.colors)) {
    errors.push('colors must be an array');
  }

  if (data.features !== undefined && !Array.isArray(data.features)) {
    errors.push('features must be an array');
  }

  if (data.specifications !== undefined && (typeof data.specifications !== 'object' || Array.isArray(data.specifications))) {
    errors.push('specifications must be an object');
  }

  if (data.relatedProductIds !== undefined && !Array.isArray(data.relatedProductIds)) {
    errors.push('relatedProductIds must be an array');
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
    } else if (data.pisFileUrl.trim() !== '' && !data.pisFileUrl.startsWith('http://') && !data.pisFileUrl.startsWith('https://') && !data.pisFileUrl.startsWith('/')) {
      errors.push('PIS file URL must be a valid URL or path starting with /');
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

// GET /api/products/[id] - Get a single product
async function getProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    console.log('GET /api/products/[id] - Fetching product with ID:', id);

    // First, verify relationships exist in database
    const directRelations = await prisma.productRelatedProduct.findMany({
      where: { productId: id as string },
      include: {
        relatedProduct: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
    console.log('Direct database query - Related products found:', directRelations.length);
    console.log('Direct relationships:', JSON.stringify(directRelations, null, 2));

    const product = await prisma.product.findUnique({
      where: { id: id as string },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
        relatedProducts: {
          include: {
            relatedProduct: {
              include: {
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
        suggestedBlogs: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                categories: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      console.log('Product not found for ID:', id);
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Product found:', product.name);
    console.log('Related products count from include:', product.relatedProducts?.length || 0);
    console.log('Related products from include:', JSON.stringify(product.relatedProducts, null, 2));
    
    // Verify both queries match
    if (directRelations.length !== (product.relatedProducts?.length || 0)) {
      console.warn('WARNING: Direct query count differs from include query count!');
      console.warn(`Direct: ${directRelations.length}, Include: ${product.relatedProducts?.length || 0}`);
    }

    console.log('🔵 GET ENDPOINT: About to return product response');
    console.log('  → Product keys:', Object.keys(product));
    console.log('  → Has relatedProducts?:', 'relatedProducts' in product);
    console.log('  → relatedProducts value:', product.relatedProducts);
    console.log('  → Full product JSON (first 500 chars):', JSON.stringify(product).substring(0, 500));
    
    return res.status(200).json(product);
  } catch (error: any) {
    console.error('Get product error:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error?.message : undefined,
    });
  }
}

// PUT /api/products/[id] - Update a product
async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  console.log('=== UPDATE PRODUCT REQUEST ===');
  console.log('Request method:', req.method);
  const { id } = req.query;
  console.log('Product ID:', id);
  console.log('Request body keys:', Object.keys(req.body || {}));
  console.log('Full request body:', JSON.stringify(req.body, null, 2));
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Extract prices first to validate separately
    const { prices, ...bodyWithoutPrices } = req.body;

    // Validate all fields except prices
    const validation = validateUpdateProduct(bodyWithoutPrices);
    if (!validation.isValid) {
      console.error('Validation error:', validation.errors);
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    const data = bodyWithoutPrices;

    // Manually validate and coerce prices (available sizes) if provided
    let validatedPrices: Record<string, number> | null = null;
    if (prices && typeof prices === 'object') {
      validatedPrices = {};
      const sizeKeyPattern = /^[a-zA-Z0-9\s\-]{1,30}$/;
      const rawPrices = prices as Record<string, unknown>;
      for (const key of Object.keys(rawPrices)) {
        const trimmedKey = key.trim();
        if (trimmedKey && sizeKeyPattern.test(trimmedKey)) {
          const val = rawPrices[key];
          const numVal = typeof val === 'boolean' ? (val ? 1 : 0) : Number(val);
          if (isNaN(numVal) || numVal < 0 || numVal > 1) {
            return res.status(400).json({
              error: `Invalid value for ${key}. Must be 0 or 1 (available/unavailable).`,
            });
          }
          if (numVal > 0) validatedPrices[trimmedKey] = 1;
        }
      }
      if (Object.keys(validatedPrices).length === 0) {
        return res.status(400).json({
          error: 'At least one size must be available.',
        });
      }
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: id as string },
    });

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // If brand is being updated, check if it exists
    if (data.brandId) {
      const brand = await prisma.brand.findUnique({
        where: { id: data.brandId },
      });

      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
    }

    // If slug is being updated, check if it already exists for the brand
    if (data.slug) {
      const brandId = data.brandId || existingProduct.brandId;
      const existingSlugProduct = await prisma.product.findUnique({
        where: {
          brandId_slug: {
            brandId,
            slug: data.slug,
          },
        },
      });

      if (existingSlugProduct && existingSlugProduct.id !== id) {
        return res.status(409).json({ error: 'Product with this slug already exists for this brand' });
      }
    }

    // Extract related product IDs, suggested blog IDs, and brandId
    console.log('=== BEFORE EXTRACTION ===');
    console.log('data keys:', Object.keys(data));
    console.log('data.relatedProductIds:', data.relatedProductIds);
    console.log('data.suggestedBlogIds:', data.suggestedBlogIds);
    const { relatedProductIds, suggestedBlogIds, brandId: newBrandId, ...productData } = data;
    
    // Handle brandId separately - Prisma requires relation syntax
    if (newBrandId && newBrandId !== existingProduct.brandId) {
      // Brand is being changed - use connect syntax
      (productData as any).brand = { connect: { id: newBrandId } };
    }
    // If brandId is the same or not provided, don't include it in the update
    
    console.log('=== UPDATE PRODUCT DEBUG ===');
    console.log('Raw request body:', JSON.stringify(req.body, null, 2));
    console.log('bodyWithoutPrices keys:', Object.keys(bodyWithoutPrices));
    console.log('data object:', JSON.stringify(data, null, 2));
    console.log('Extracted relatedProductIds:', relatedProductIds);
    console.log('relatedProductIds type:', typeof relatedProductIds);
    console.log('relatedProductIds is array?:', Array.isArray(relatedProductIds));
    console.log('relatedProductIds length:', relatedProductIds?.length || 0);
    if (relatedProductIds !== undefined) {
      if (relatedProductIds.length > 0) {
        console.log('Related product IDs to update:', relatedProductIds);
      } else {
        console.log('relatedProductIds is empty array - will delete all relationships');
      }
    } else {
      console.log('⚠️⚠️⚠️ relatedProductIds is undefined - relationships will not be updated ⚠️⚠️⚠️');
      console.log('This means relatedProductIds was not in the request body or was removed during validation');
    }

    // If prices (available sizes) were provided and validated, replace
    if (validatedPrices) {
      productData.prices = validatedPrices;
    }

    // Normalize bannerImage: empty string -> null
    if ('bannerImage' in productData) {
      (productData as any).bannerImage = productData.bannerImage?.trim() || null;
    }
    // Normalize subCategory: empty string -> null
    if ('subCategory' in productData) {
      const val = (productData as any).subCategory;
      (productData as any).subCategory = (typeof val === 'string' && val.trim()) ? val.trim() : null;
    }
    // Normalize sizeUnit: must be L or K
    if ('sizeUnit' in productData) {
      const val = (productData as any).sizeUnit;
      (productData as any).sizeUnit = (val === 'K' || val === 'L') ? val : 'L';
    }

    // Build update data with only Prisma Product model fields (exclude relation names)
    const updateData: Record<string, unknown> = {};
    const allowedFields = ['name', 'slug', 'description', 'shortDescription', 'category', 'subCategory', 'sheenLevel', 'surfaceType', 'usage', 'image', 'bannerImage', 'prices', 'colors', 'features', 'specifications', 'pisHeading', 'pisDescription', 'pisFileUrl', 'showPisSection', 'userGuideSteps', 'userGuideMaterials', 'userGuideTips', 'showUserGuide', 'faqs', 'showFaqSection', 'sizeUnit', 'brand'];
    for (const key of allowedFields) {
      if (key in productData && (productData as any)[key] !== undefined) {
        updateData[key] = (productData as any)[key];
      }
    }
    if (newBrandId && newBrandId !== existingProduct.brandId) {
      updateData.brand = { connect: { id: newBrandId } };
    }
    console.log('Updating product with ID:', id);
    console.log('Update data keys:', Object.keys(updateData));
    const product = await prisma.product.update({
      where: { id: id as string },
      data: updateData,
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
    console.log('Product updated successfully');

    // Update related products if provided
    let relationshipsUpdated = false;
    console.log('🔵 STEP 1: Checking if relatedProductIds is provided');
    console.log('  → relatedProductIds !== undefined?:', relatedProductIds !== undefined);
    
    if (relatedProductIds !== undefined) {
      console.log('🟢 STEP 2: relatedProductIds is provided, proceeding with update');
      console.log('  → relatedProductIds value:', relatedProductIds);
      console.log('  → relatedProductIds type:', typeof relatedProductIds);
      console.log('  → relatedProductIds is array?:', Array.isArray(relatedProductIds));
      console.log('  → relatedProductIds length:', relatedProductIds.length);
      
      // Delete existing relationships
      console.log('🟡 STEP 3: Deleting existing relationships for product:', id);
      const deleteResult = await prisma.productRelatedProduct.deleteMany({
        where: { productId: id as string },
      });
      console.log('  → Delete result count:', deleteResult.count);
      console.log('  ✅ Existing relationships deleted');

      // Create new relationships
      console.log('🟡 STEP 4: Checking if relatedProductIds array has items');
      console.log('  → relatedProductIds.length > 0?:', relatedProductIds.length > 0);
      
      if (relatedProductIds.length > 0) {
        // Filter out duplicates and self-references
        console.log('🟡 STEP 5: Filtering out duplicates and self-references');
        const beforeFilter = Array.from(new Set(relatedProductIds));
        console.log('  → After removing duplicates:', beforeFilter);
        const uniqueRelatedIds = beforeFilter.filter((relatedId) => relatedId !== id);
        console.log('  → After removing self-reference:', uniqueRelatedIds);
        console.log('  → Final unique IDs count:', uniqueRelatedIds.length);

        console.log('🟡 STEP 6: Checking if unique IDs array is not empty');
        if (uniqueRelatedIds.length > 0) {
          console.log('🟡 STEP 7: Creating relationships in database');
          console.log('  → Data to create:', uniqueRelatedIds.map((relatedId) => ({
            productId: id as string,
            relatedProductId: relatedId,
          })));
          
          try {
            // Create relationships one by one to handle duplicates gracefully
            // This works even if skipDuplicates is not supported
            let createdCount = 0;
            const createPromises = uniqueRelatedIds.map(async (relatedId) => {
              try {
                await prisma.productRelatedProduct.create({
                  data: {
                    productId: id as string,
                    relatedProductId: relatedId,
                  },
                });
                createdCount++;
                console.log(`  ✅ Created relationship: ${id} -> ${relatedId}`);
              } catch (createError: any) {
                // If it's a unique constraint error, it means the relationship already exists
                // This is fine, we'll just skip it
                if (createError?.code === 'P2002') {
                  console.log(`  ℹ️ Relationship already exists: ${id} -> ${relatedId} (skipping)`);
                } else {
                  console.error(`  ❌ Error creating relationship ${id} -> ${relatedId}:`, createError?.message);
                  throw createError; // Re-throw if it's a different error
                }
              }
            });
            
            await Promise.all(createPromises);
            console.log('  ✅ Relationships created successfully');
            console.log('  → Created count:', createdCount);
            console.log('  → Expected count:', uniqueRelatedIds.length);
            
            if (createdCount !== uniqueRelatedIds.length) {
              console.warn('  ⚠️ WARNING: Created count differs from expected!');
              console.warn(`  → Created: ${createdCount}, Expected: ${uniqueRelatedIds.length}`);
              console.warn('  → Some relationships might have already existed');
            }
            
            // Verify relationships were actually created
            console.log('🟡 STEP 8: Verifying relationships in database');
            const verifyRelations = await prisma.productRelatedProduct.findMany({
              where: { productId: id as string },
            });
            console.log('  → Verification query result count:', verifyRelations.length);
            console.log('  → Verification result:', JSON.stringify(verifyRelations, null, 2));
            
            if (verifyRelations.length === 0) {
              console.error('  ❌ ERROR: Relationships were not saved to database!');
              console.error('  → Even though create operations completed');
            } else {
              console.log('  ✅ Relationships verified in database');
            }
            relationshipsUpdated = true;
          } catch (relationError: any) {
            console.error('  ❌ ERROR in STEP 7: Failed to create relationships');
            console.error('  → Error message:', relationError?.message);
            console.error('  → Error code:', relationError?.code);
            console.error('  → Error name:', relationError?.name);
            console.error('  → Full error:', JSON.stringify(relationError, Object.getOwnPropertyNames(relationError), 2));
            // Don't fail the request if relationships fail - product is already updated
          }
        } else {
          console.log('  ⚠️ STEP 6: Unique IDs array is empty after filtering');
          console.log('  → This means all IDs were duplicates or self-references');
        }
      } else {
        console.log('  ⚠️ STEP 4: relatedProductIds array is empty');
        console.log('  → All relationships deleted, none to create');
      }
    } else {
      console.log('  ⚠️ STEP 1: relatedProductIds is undefined');
      console.log('  → Relationships will not be updated');
    }
    
    console.log('🔵 STEP 9: Relationship update status:', relationshipsUpdated ? '✅ Updated' : '❌ Not updated');

    // Update blog suggestions if provided
    if (suggestedBlogIds !== undefined) {
      console.log('🟢 Updating blog suggestions');
      
      // Delete existing blog suggestions
      await prisma.productBlogSuggestion.deleteMany({
        where: { productId: id as string },
      });
      
      // Create new blog suggestions
      if (suggestedBlogIds.length > 0 && Array.isArray(suggestedBlogIds)) {
        const uniqueBlogIds = Array.from(new Set(suggestedBlogIds));
        
        for (let i = 0; i < uniqueBlogIds.length; i++) {
          const blogId = uniqueBlogIds[i];
          try {
            await prisma.productBlogSuggestion.create({
              data: {
                productId: id as string,
                blogId: blogId as string,
                order: i,
              },
            });
            console.log(`  ✅ Created blog suggestion: ${id} -> ${blogId}`);
          } catch (blogError: any) {
            if (blogError?.code !== 'P2002') {
              console.error(`  ❌ Error creating blog suggestion:`, blogError?.message);
            }
          }
        }
      }
      console.log('  ✅ Blog suggestions updated');
    }

    // Try to fetch product with relations, but don't fail if this fails
    // ALWAYS return 200 with at least the basic product data
    console.log('🔵 STEP 10: Fetching product with relations to return in response');
    try {
      console.log('  → Attempting to fetch product with ID:', id);
      console.log('  → Including relatedProducts in query...');
      const productWithRelations = await prisma.product.findUnique({
        where: { id: id as string },
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
                include: {
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
      });

      console.log('  → Prisma query completed');
      console.log('  → Product found?:', productWithRelations ? 'Yes' : 'No');
      if (productWithRelations) {
        console.log('  → Related products in response:', productWithRelations.relatedProducts?.length || 0);
        console.log('  → Related products data:', JSON.stringify(productWithRelations.relatedProducts, null, 2));
        console.log('  ✅ STEP 10: Returning product with relations');
        return res.status(200).json(productWithRelations);
      } else {
        // Product not found (shouldn't happen but handle gracefully)
        console.warn('  ⚠️ STEP 10: Product not found after update (unexpected!)');
        console.warn('  → Returning basic product data without relations');
        return res.status(200).json({
          ...product,
          relatedProducts: [],
        });
      }
    } catch (fetchError: any) {
      // Log the error but don't fail the request - product was updated successfully
      console.error('  ❌ ERROR in STEP 10: Failed to fetch product with relations');
      console.error('  → Error message:', fetchError?.message);
      console.error('  → Error code:', fetchError?.code);
      console.error('  → Error name:', fetchError?.name);
      console.error('  → Full error:', JSON.stringify(fetchError, Object.getOwnPropertyNames(fetchError), 2));
      console.error('  → Product was updated successfully with ID:', id);
      console.error('  → Relationships updated:', relationshipsUpdated);
      console.warn('  ⚠️ STEP 10: Returning basic product data (without relations fetch)');
      
      // Return 200 with basic product data - this is a success response
      // The product exists in the database and was updated, even if we can't fetch it with relations
      return res.status(200).json({
        ...product,
        relatedProducts: [],
      });
    }
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    console.error('Update product error:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message || 'Unknown error',
    });
  }
}

// DELETE /api/products/[id] - Delete a product
async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: id as string },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete product (related products will be cascade deleted)
    await prisma.product.delete({
      where: { id: id as string },
    });

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Brand not found' });
    }
    console.error('Delete product error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default requireAuth(async (req, res) => {
  if (req.method === 'GET') {
    return getProduct(req, res);
  } else if (req.method === 'PUT') {
    return updateProduct(req, res);
  } else if (req.method === 'DELETE') {
    return deleteProduct(req, res);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
});

