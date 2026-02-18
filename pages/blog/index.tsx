import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import BlogHero from '@/components/blog/BlogHero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import BlogList from '@/components/blog/BlogList';
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
}

interface BlogProps {
  featuredPost: BlogPostData | null;
  regularPosts: BlogPostData[];
  error?: string;
}

const Blog: React.FC<BlogProps> = ({ featuredPost, regularPosts, error }) => {

  return (
    <>
      <Head>
        <title>Blog | HomeGlazer - Painting Tips & Inspiration</title>
        <meta name="description" content="Read our latest articles on painting tips, color trends, home decor ideas, and expert advice for your painting projects. Get inspired with HomeGlazer." />
        <meta name="keywords" content="painting blog, home painting tips, color trends, wall paint ideas, interior design blog" />
        <meta property="og:title" content="Blog | HomeGlazer - Painting Tips & Inspiration" />
        <meta property="og:description" content="Read our latest articles on painting tips, color trends, and expert advice." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/uploads/design-insight-thumb.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | HomeGlazer - Painting Tips & Inspiration" />
        <meta name="twitter:description" content="Painting tips, color trends, and expert advice." />
        <meta name="twitter:image" content={`${SITE_URL}/uploads/design-insight-thumb.png`} />
      </Head>
      <div className="bg-white flex flex-col overflow-hidden items-center">
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
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <BlogHero />
      {error && (
        <div className="w-full py-8">
          <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px]">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                Unable to load blog posts. Please try again later.
              </p>
            </div>
          </div>
        </div>
      )}
      {featuredPost && <FeaturedPost post={featuredPost} />}
      <BlogList posts={regularPosts} />
      
      {/* CTA Section with pink background and white text/buttons */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Have Questions About Your Project?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Our team is ready to help you with expert advice and tips for your next painting project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Contact Us
            </CTAButton>
            <CTAButton to="/services" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Explore Our Services
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BlogProps> = async () => {
  try {
    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
      console.error('[Blog] DATABASE_URL environment variable is not set');
      return {
        props: {
          featuredPost: null,
          regularPosts: [],
          error: 'Database configuration error. Please contact support.',
        },
      };
    }

    // Fetch all published blog posts from database, ordered by publishedAt desc
    const blogs = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
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
        featuredOrder: true,
      },
    });

    // Transform database records to match component interface
    const transformedPosts: BlogPostData[] = blogs.map((blog: {
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      author: string;
      readTime: string;
      coverImage: string;
      categories: any;
      content: string | null;
      publishedAt: Date | null;
      featuredOrder: number | null;
    }) => ({
      id: blog.id,
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      readTime: blog.readTime,
      coverImage: blog.coverImage,
      categories: blog.categories as string[],
      content: blog.content,
      date: blog.publishedAt 
        ? new Date(blog.publishedAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : '',
    }));

    // Get featured post (first one with featuredOrder or just the first post)
    const featuredPost = transformedPosts.find((p, idx) => idx === 0) || transformedPosts[0];
    const regularPosts = transformedPosts.filter((post) => post.id !== featuredPost?.id);

    console.log(`[Blog] Successfully fetched ${blogs.length} blog posts (${regularPosts.length} regular, ${featuredPost ? 1 : 0} featured)`);

    return {
      props: {
        featuredPost: featuredPost || null,
        regularPosts,
      },
    };
  } catch (error: any) {
    // Enhanced error logging
    console.error('[Blog] Error fetching blog posts:', {
      message: error?.message || 'Unknown error',
      code: error?.code,
      name: error?.name,
      stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    });

    // Check for specific error types
    let errorMessage = 'Unable to load blog posts. Please try again later.';
    if (error?.code === 'P1001' || error?.message?.includes('Can\'t reach database server')) {
      errorMessage = 'Database connection failed. Please check your database configuration.';
    } else if (error?.code === 'P1002' || error?.message?.includes('Connection timeout')) {
      errorMessage = 'Database connection timeout. Please try again later.';
    } else if (error?.message?.includes('DATABASE_URL')) {
      errorMessage = 'Database configuration error. Please contact support.';
    }

    return {
      props: {
        featuredPost: null,
        regularPosts: [],
        error: errorMessage,
      },
    };
  }
};

export default Blog; 