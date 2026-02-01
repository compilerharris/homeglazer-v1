import React from 'react';
import Link from 'next/link';
import { BlogPost } from './BlogCard';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
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
              src={post.coverImage} 
              alt={post.title} 
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="mb-4 flex items-center text-sm text-gray-500">
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime} min read</span>
            </div>
            
            <div className="mb-4 flex flex-wrap gap-2">
              {post.categories.map((category, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center rounded-full bg-[#F5F5F5] px-3 py-1 text-sm text-[#ED276E]"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <Link href={`/blog/${post.slug}`} className="block">
              <h3 className="mb-4 text-3xl font-medium hover:text-[var(--brand-pink)] transition-colors">
                {post.title}
              </h3>
            </Link>
            
            <p className="mb-6 text-gray-600">
              {post.excerpt}
            </p>
            
            <div className="flex items-center">
              <span className="text-gray-500">By {post.author}</span>
              <Link 
                href={`/blog/${post.slug}`} 
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