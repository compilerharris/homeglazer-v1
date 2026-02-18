import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import CTAButton from '@/components/home/CTAButton';
import { prisma } from '@/lib/prisma';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

// Define the BlogPost type for the component
interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  coverImage: string;
  categories: string[];
  content?: string;
  metaDescription?: string | null;
  metaKeywords?: string | null;
}

interface BlogPostPageProps {
  post: BlogPostData;
  recentPosts: BlogPostData[];
}

const BlogPost: React.FC<BlogPostPageProps> = ({ post, recentPosts }) => {

  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Head>
        <title>{post.title} | HomeGlazer</title>
        <meta
          name="description"
          content={post.metaDescription || post.excerpt || ''}
        />
        {post.metaKeywords && (
          <meta name="keywords" content={post.metaKeywords} />
        )}
        <link rel="canonical" href={`${SITE_URL}/blog/${post.slug}`} />
        <meta property="og:title" content={`${post.title} | HomeGlazer`} />
        <meta
          property="og:description"
          content={post.metaDescription || post.excerpt || ''}
        />
        <meta property="og:url" content={`${SITE_URL}/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="HomeGlazer" />
        <meta property="og:locale" content="en_US" />
        {post.coverImage && (
          <meta
            property="og:image"
            content={post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`}
          />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post.title} | HomeGlazer`} />
        <meta
          name="twitter:description"
          content={post.metaDescription || post.excerpt || ''}
        />
        {post.coverImage && (
          <meta
            name="twitter:image"
            content={post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`}
          />
        )}
      </Head>
      <Header />
      
      <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/blog/${post.slug}`}>{post.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <main className="w-full py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content column (left, larger) */}
            <div className="w-full lg:w-2/3">
              <BlogContent post={post} />
            </div>
            
            {/* Sidebar column (right, smaller) */}
            <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
              <BlogSidebar currentPostId={post.id} recentPosts={recentPosts} />
            </div>
          </div>
        </div>
      </main>
      
      {/* CTA Section with pink background and white text/buttons */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Get a Free Quote
            </CTAButton>
            <CTAButton to="/blog" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Back to Blog
            </CTAButton>
          </div>
        </div>
      </section>
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/paint-budget-calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BlogPostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;

  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error(`[Blog Post] DATABASE_URL environment variable is not set for slug: ${slug}`);
      return { notFound: true };
    }

    // Fetch the blog post by slug from database
    const blog = await prisma.blogPost.findUnique({
      where: { slug, published: true },
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        author: true,
        readTime: true,
        coverImage: true,
        categories: true,
        content: true,
        publishedAt: true,
        metaDescription: true,
        metaKeywords: true,
      },
    });

    if (!blog) {
      console.log(`[Blog Post] Blog post not found for slug: ${slug}`);
      return { notFound: true };
    }

    // Fetch recent posts for sidebar (excluding current post)
    const recentBlogs = await prisma.blogPost.findMany({
      where: { 
        published: true,
        id: { not: blog.id }
      },
      orderBy: { publishedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        author: true,
        readTime: true,
        coverImage: true,
        categories: true,
        publishedAt: true,
      },
    });

    // Transform database records to match component interface
    const post: BlogPostData = {
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      readTime: blog.readTime,
      coverImage: blog.coverImage,
      categories: blog.categories as string[],
      content: blog.content,
      metaDescription: blog.metaDescription,
      metaKeywords: blog.metaKeywords,
      date: blog.publishedAt 
        ? new Date(blog.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : '',
    };

    const recentPosts: BlogPostData[] = recentBlogs.map((b: {
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      author: string;
      readTime: string;
      coverImage: string;
      categories: any;
      publishedAt: Date | null;
    }) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      author: b.author,
      readTime: b.readTime,
      coverImage: b.coverImage,
      categories: b.categories as string[],
      date: b.publishedAt 
        ? new Date(b.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : '',
    }));

    console.log(`[Blog Post] Successfully fetched blog post: ${slug} with ${recentPosts.length} recent posts`);

    return {
      props: {
        post,
        recentPosts,
      },
    };
  } catch (error: any) {
    // Enhanced error logging
    console.error(`[Blog Post] Error fetching blog post for slug: ${slug}`, {
      message: error?.message || 'Unknown error',
      code: error?.code,
      name: error?.name,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    });

    // Check for specific error types
    if (error?.code === 'P1001' || error?.message?.includes('Can\'t reach database server')) {
      console.error(`[Blog Post] Database connection failed for slug: ${slug}`);
    } else if (error?.code === 'P1002' || error?.message?.includes('Connection timeout')) {
      console.error(`[Blog Post] Database connection timeout for slug: ${slug}`);
    } else if (error?.message?.includes('DATABASE_URL')) {
      console.error(`[Blog Post] Database configuration error for slug: ${slug}`);
    }

    return { notFound: true };
  }
};

export default BlogPost; 