import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';

// Validation function
function validateBlogPost(data: any, isUpdate = false): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields for create
  if (!isUpdate) {
    if (!data.title || typeof data.title !== 'string' || data.title.trim() === '') {
      errors.push('Title is required');
    }

    if (!data.slug || typeof data.slug !== 'string' || data.slug.trim() === '') {
      errors.push('Slug is required');
    } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
      errors.push('Slug must be lowercase alphanumeric with hyphens');
    }

    if (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.trim() === '') {
      errors.push('Excerpt is required');
    }

    if (!data.content || typeof data.content !== 'string' || data.content.trim() === '') {
      errors.push('Content is required');
    }

    if (!data.author || typeof data.author !== 'string' || data.author.trim() === '') {
      errors.push('Author is required');
    }
  } else {
    // Optional validation for updates
    if (data.title !== undefined && (typeof data.title !== 'string' || data.title.trim() === '')) {
      errors.push('Title must be a non-empty string');
    }

    if (data.slug !== undefined) {
      if (typeof data.slug !== 'string' || data.slug.trim() === '') {
        errors.push('Slug must be a non-empty string');
      } else if (!/^[a-z0-9-]+$/.test(data.slug)) {
        errors.push('Slug must be lowercase alphanumeric with hyphens');
      }
    }

    if (data.excerpt !== undefined && (typeof data.excerpt !== 'string' || data.excerpt.trim() === '')) {
      errors.push('Excerpt must be a non-empty string');
    }

    if (data.content !== undefined && (typeof data.content !== 'string' || data.content.trim() === '')) {
      errors.push('Content must be a non-empty string');
    }

    if (data.author !== undefined && (typeof data.author !== 'string' || data.author.trim() === '')) {
      errors.push('Author must be a non-empty string');
    }
  }

  // Optional fields validation
  if (data.coverImage !== undefined && typeof data.coverImage !== 'string') {
    errors.push('Cover image must be a string');
  }

  if (data.readTime !== undefined && typeof data.readTime !== 'string') {
    errors.push('Read time must be a string');
  }

  if (data.categories !== undefined && !Array.isArray(data.categories)) {
    errors.push('Categories must be an array');
  }

  if (data.published !== undefined && typeof data.published !== 'boolean') {
    errors.push('Published must be a boolean');
  }

  if (data.metaDescription !== undefined && typeof data.metaDescription !== 'string') {
    errors.push('Meta description must be a string');
  }

  if (data.metaKeywords !== undefined && typeof data.metaKeywords !== 'string') {
    errors.push('Meta keywords must be a string');
  }

  if (data.featuredOrder !== undefined) {
    const order = Number(data.featuredOrder);
    if (isNaN(order)) {
      errors.push('Featured order must be a number');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// GET /api/blogs - List all blogs
async function getBlogs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { published, limit, category } = req.query;

    let where: any = {};
    
    if (published === 'true') {
      where.published = true;
    }

    if (category) {
      // For JSON field search, we need to use raw query or filter in code
      // Filtering in code for simplicity
    }

    type BlogEntity = Awaited<ReturnType<typeof prisma.blogPost.findMany>>[number];

    const blogs: BlogEntity[] = await prisma.blogPost.findMany({
      where,
      orderBy: [
        { featuredOrder: 'asc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ],
      take: limit ? parseInt(limit as string) : undefined,
    });

    // Filter by category if provided
    let filteredBlogs = blogs;
    if (category) {
      filteredBlogs = blogs.filter(blog => {
        const cats = blog.categories as string[];
        return cats.includes(category as string);
      });
    }

    return res.status(200).json(filteredBlogs);
  } catch (error: any) {
    console.error('Get blogs error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// POST /api/blogs - Create a new blog
async function createBlog(req: NextApiRequest, res: NextApiResponse) {
  try {
    const validation = validateBlogPost(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    const data = req.body;

    // Check if slug already exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingBlog) {
      return res.status(409).json({ error: 'Blog with this slug already exists' });
    }

    // Set publishedAt if published is true
    const publishedAt = data.published ? new Date() : null;

    const blog = await prisma.blogPost.create({
      data: {
        ...data,
        categories: data.categories || [],
        publishedAt,
      },
    });

    return res.status(201).json(blog);
  } catch (error: any) {
    console.error('Create blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Public GET endpoint
  if (req.method === 'GET') {
    return getBlogs(req, res);
  }
  
  // Protected endpoints
  return requireAuth(async (req, res) => {
    if (req.method === 'POST') {
      return createBlog(req, res);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  })(req, res);
};

