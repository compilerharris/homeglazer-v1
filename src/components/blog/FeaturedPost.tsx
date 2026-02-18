import React from 'react';
import Link from 'next/link';
import { BlogPost } from './BlogCard';
import { getMediaUrl } from '@/lib/mediaUrl';

interface FeaturedPostProps {
  post: BlogPost | null | undefined;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  // Return null if no post is provided
  if (!post) {
    return null;
  }

  // Ensure required fields have defaults
  const safePost = {
    ...post,
    title: post.title || 'Untitled',
    excerpt: post.excerpt || '',
    author: post.author || 'Unknown',
    readTime: post.readTime || '5',
    date: post.date || '',
    coverImage: post.coverImage || '',
    categories: Array.isArray(post.categories) ? post.categories : [],
    slug: post.slug || '',
  };

  return (
    <section className="w-full bg-white py-8">
      <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px]">
        <div className="mb-6">
          <h2 className="text-3xl font-medium">Featured Article</h2>
          <div className="mt-2 h-1 w-20 bg-[#ED276E]"></div>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative h-[350px] w-full overflow-hidden rounded-lg shadow-sm">
            <img 
              src={safePost.coverImage?.startsWith('http') ? safePost.coverImage : getMediaUrl(safePost.coverImage || '')} 
              alt={safePost.title} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center text-sm text-gray-500">
              {safePost.date && <span>{safePost.date}</span>}
              {safePost.date && safePost.readTime && <span className="mx-2">•</span>}
              {safePost.readTime && <span>{safePost.readTime} min read</span>}
            </div>
            
            {safePost.categories.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {safePost.categories.map((category, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center rounded-full bg-[#F5F5F5] px-3 py-1 text-sm text-[#ED276E]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            
            <Link href={`/blog/${safePost.slug}`} className="block">
              <h3 className="mb-4 text-3xl font-medium hover:text-[var(--brand-pink)] transition-colors">
                {safePost.title}
              </h3>
            </Link>
            
            {safePost.excerpt && (
              <p className="mb-6 text-gray-600">
                {safePost.excerpt}
              </p>
            )}
            
            <div className="flex items-center">
              <span className="text-gray-500">By {safePost.author}</span>
              <Link 
                href={`/blog/${safePost.slug}`} 
                className="ml-auto inline-flex items-center rounded-full bg-[#ED276E] px-6 py-3 text-white hover:bg-[#299dd7] transition-colors"
              >
                Read Article
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost; 