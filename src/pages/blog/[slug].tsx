import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import BlogContent from '@/components/blog/BlogContent';
import BlogSidebar from '@/components/blog/BlogSidebar';
import CTAButton from '@/components/home/CTAButton';
import { blogPosts, getPostBySlug, getRelatedPosts } from '@/data/blogPosts';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const BlogPost: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  // Handle loading state or when slug is not yet available
  if (router.isFallback || !slug) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#ED276E]"></div>
      </div>
    );
  }
  
  // Get the post by slug
  const post = getPostBySlug(slug as string);
  
  // If post doesn't exist, redirect to blog index
  if (!post) {
    // In a real app, we might want to handle this with a 404 page
    if (typeof window !== 'undefined') {
      router.push('/blog');
    }
    return null;
  }
  
  // Get related posts
  const relatedPosts = getRelatedPosts(post.id);

  return (
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
              <BlogSidebar currentPostId={post.id} />
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default BlogPost; 