import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/middleware';
import { prisma } from '@/lib/prisma';

// Validation function
function validateBlogPost(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

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

// GET /api/blogs/[id] - Get a single blog
async function getBlog(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const blog = await prisma.blogPost.findUnique({
      where: { id: id as string },
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id: id as string },
      data: { viewCount: { increment: 1 } },
    });

    return res.status(200).json(blog);
  } catch (error: any) {
    console.error('Get blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// PUT /api/blogs/[id] - Update a blog
async function updateBlog(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const validation = validateBlogPost(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    const data = req.body;

    // Check if blog exists
    const existingBlog = await prisma.blogPost.findUnique({
      where: { id: id as string },
    });

    if (!existingBlog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // If slug is being updated, check if it already exists
    if (data.slug && data.slug !== existingBlog.slug) {
      const existingSlug = await prisma.blogPost.findUnique({
        where: { slug: data.slug },
      });

      if (existingSlug) {
        return res.status(409).json({ error: 'Blog with this slug already exists' });
      }
    }

    // Update publishedAt if changing from unpublished to published
    let updateData = { ...data };
    if (data.published === true && !existingBlog.published) {
      updateData.publishedAt = new Date();
    } else if (data.published === false) {
      updateData.publishedAt = null;
    }

    const blog = await prisma.blogPost.update({
      where: { id: id as string },
      data: updateData,
    });

    return res.status(200).json(blog);
  } catch (error: any) {
    console.error('Update blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// DELETE /api/blogs/[id] - Delete a blog
async function deleteBlog(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const blog = await prisma.blogPost.findUnique({
      where: { id: id as string },
    });

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    await prisma.blogPost.delete({
      where: { id: id as string },
    });

    return res.status(200).json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete blog error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Public GET endpoint
  if (req.method === 'GET') {
    return getBlog(req, res);
  }
  
  // Protected endpoints
  return requireAuth(async (req, res) => {
    if (req.method === 'PUT') {
      return updateBlog(req, res);
    } else if (req.method === 'DELETE') {
      return deleteBlog(req, res);
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  })(req, res);
};

