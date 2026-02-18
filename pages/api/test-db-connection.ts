import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const diagnostics: any = {
    timestamp: new Date().toISOString(),
    databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    databaseUrlPreview: process.env.DATABASE_URL 
      ? `${process.env.DATABASE_URL.substring(0, 30)}...` 
      : 'Not set',
    nodeEnv: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
  };

  try {
    // Test basic connection
    await prisma.$connect();
    diagnostics.connection = 'Connected';

    // Test query - count blog posts
    const blogCount = await prisma.blogPost.count({
      where: { published: true },
    });
    diagnostics.blogPostsCount = blogCount;

    // Test query - get first blog post
    const firstPost = await prisma.blogPost.findFirst({
      where: { published: true },
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
    diagnostics.firstPost = firstPost;

    await prisma.$disconnect();

    return res.status(200).json({
      success: true,
      message: 'Database connection successful',
      diagnostics,
    });
  } catch (error: any) {
    diagnostics.error = {
      message: error?.message || 'Unknown error',
      code: error?.code,
      name: error?.name,
    };

    // Try to disconnect even on error
    try {
      await prisma.$disconnect();
    } catch (disconnectError) {
      // Ignore disconnect errors
    }

    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      diagnostics,
    });
  }
}
