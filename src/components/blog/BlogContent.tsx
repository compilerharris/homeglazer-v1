import React from 'react';
import { BlogPost } from './BlogCard';

interface BlogContentProps {
  post: BlogPost;
}

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-6">{post.title}</h1>
      
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-gray-500">By {post.author}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500">{post.date}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500">{post.readTime} min read</span>
        </div>
        <div className="flex flex-wrap gap-2 ml-auto">
          {post.categories.map((category, index) => (
            <span 
              key={index} 
              className="inline-flex items-center rounded-full bg-[#F5F5F5] px-3 py-1 text-xs text-[#ED276E]"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-[400px] object-cover rounded-lg" 
        />
      </div>

      {/* This would be the actual blog content */}
      <div className="blog-content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
          urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl. Sed euismod, velit vel bibendum bibendum, 
          urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
        </p>
        
        <p>
          Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl. 
          Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
        </p>
        
        <h2>Key Points to Consider</h2>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
          urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
        </p>
        
        <ul>
          <li>First important point about painting</li>
          <li>Second crucial consideration for your project</li>
          <li>Third tip from our professional painters</li>
          <li>Fourth recommendation for best results</li>
        </ul>
        
        <h2>Why This Matters</h2>
        
        <p>
          Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl. 
          Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
        </p>
        
        <blockquote>
          "The right color choice can completely transform a space and influence how you feel when you're in it."
        </blockquote>
        
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
          urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
        </p>
      </div>
      
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Share this article</h3>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </button>
          <button className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </button>
          <button className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </button>
          <button className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogContent; 