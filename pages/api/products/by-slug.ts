import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// GET /api/products/by-slug - Get product by brand slug and product slug
// This is a public endpoint for fetching products on the frontend
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { brand, slug } = req.query;

    // Validate query parameters
    if (!brand || !slug || typeof brand !== 'string' || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Brand and slug query parameters are required' });
    }

    // Find the brand by slug
    const brandRecord = await prisma.brand.findUnique({
      where: { slug: brand },
      select: { id: true, name: true },
    });

    if (!brandRecord) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Find the product by brand ID and slug
    const product = await prisma.product.findUnique({
      where: {
        brandId_slug: {
          brandId: brandRecord.id,
          slug: slug,
        },
      },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        relatedProducts: {
          take: 4,
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
          take: 3,
          orderBy: {
            order: 'asc',
          },
          include: {
            blog: {
              select: {
                id: true,
                slug: true,
                title: true,
                excerpt: true,
                coverImage: true,
                author: true,
                readTime: true,
                categories: true,
                publishedAt: true,
                published: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Format product response
    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      brandId: product.brandId,
      brand: product.brand.name,
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category,
      subCategory: product.subCategory || null,
      sheenLevel: product.sheenLevel,
      surfaceType: product.surfaceType,
      usage: product.usage,
      image: product.image,
      bannerImage: product.bannerImage || null,
      sizeUnit: product.sizeUnit || 'L',
      prices: product.prices as Record<string, number>,
      colors: (product.colors as string[]) || [],
      features: (product.features as string[]) || [],
      specifications: (product.specifications as Record<string, string>) || {},
      pisHeading: product.pisHeading || null,
      pisDescription: product.pisDescription || null,
      pisFileUrl: product.pisFileUrl || null,
      showPisSection: product.showPisSection || false,
      userGuideSteps: (product.userGuideSteps as Array<{title: string, description: string}>) || null,
      userGuideMaterials: (product.userGuideMaterials as string[]) || null,
      userGuideTips: (product.userGuideTips as string[]) || null,
      showUserGuide: product.showUserGuide || false,
      faqs: (product.faqs as Array<{question: string, answer: string}>) || null,
      showFaqSection: product.showFaqSection || false,
    };

    // Format related products
    const formattedRelatedProducts = (product.relatedProducts || []).map((rp: any) => ({
      id: rp.relatedProduct.id,
      name: rp.relatedProduct.name,
      slug: rp.relatedProduct.slug,
      brandId: rp.relatedProduct.brandId,
      brand: rp.relatedProduct.brand.name,
      image: rp.relatedProduct.image,
      prices: rp.relatedProduct.prices as Record<string, number>,
      shortDescription: rp.relatedProduct.shortDescription,
      category: rp.relatedProduct.category,
      subCategory: rp.relatedProduct.subCategory || null,
      sheenLevel: rp.relatedProduct.sheenLevel,
      description: rp.relatedProduct.description || '',
      surfaceType: rp.relatedProduct.surfaceType || '',
      usage: rp.relatedProduct.usage || '',
    }));

    // Format suggested blogs (only published ones)
    const formattedSuggestedBlogs = (product.suggestedBlogs || [])
      .filter((sb: any) => sb.blog.published)
      .map((sb: any) => ({
        id: sb.blog.id,
        slug: sb.blog.slug,
        title: sb.blog.title,
        excerpt: sb.blog.excerpt,
        coverImage: sb.blog.coverImage,
        author: sb.blog.author,
        readTime: sb.blog.readTime,
        categories: sb.blog.categories as string[],
        publishedAt: sb.blog.publishedAt ? sb.blog.publishedAt.toISOString() : null,
      }));

    return res.status(200).json({
      product: {
        ...formattedProduct,
        suggestedBlogs: formattedSuggestedBlogs,
      },
      relatedProducts: formattedRelatedProducts,
      brandSlug: brand,
    });
  } catch (error: any) {
    console.error('Error fetching product by slug:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch product',
      message: error?.message || 'Unknown error'
    });
  }
}

