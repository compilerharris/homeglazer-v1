import React from 'react';
import { BlogPost } from './BlogCard';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  currentPostId: string;
  posts: BlogPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostId, posts }) => {
  // Filter out the current post and get up to 3 related posts
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-medium text-gray-900">Related Articles</h2>
          <div className="mt-2 h-1 w-20 bg-[#ED276E]"></div>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts; 