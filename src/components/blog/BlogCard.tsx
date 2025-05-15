import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  coverImage: string;
  categories: string[];
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-md h-full">
      <div className="relative h-60 w-full overflow-hidden">
        <Link href={`/blog/${post.slug}`} className="block h-full">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>
      <CardContent className="flex flex-col p-6">
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime} min read</span>
        </div>
        
        <div className="mb-3 flex flex-wrap gap-2">
          {post.categories.map((category, index) => (
            <span 
              key={index} 
              className="inline-flex items-center rounded-full bg-[#F5F5F5] px-2.5 py-0.5 text-xs text-[#ED276E]"
            >
              {category}
            </span>
          ))}
        </div>
        
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="mb-2 text-xl font-medium text-[#ED276E] hover:text-[#d51e5f] transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="mb-4 text-gray-600 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="mt-auto pt-4 flex items-center border-t border-gray-100">
          <span className="text-sm text-gray-500">By {post.author}</span>
          <div className="ml-auto">
            <Link 
              href={`/blog/${post.slug}`} 
              className="inline-flex items-center rounded-full bg-[#ED276E] px-4 py-2 text-sm text-white hover:bg-[#d51e5f] transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard; 