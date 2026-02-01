import React, { useCallback, useMemo } from 'react';
import { BlogPost } from './BlogCard';

interface BlogContentProps {
  post: BlogPost;
}

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  const fallbackShareUrl = useMemo(() => {
    const base =
      (process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com').replace(
        /\/$/,
        ''
      );
    return `${base}/blog/${post.slug}`;
  }, [post.slug]);

  const getEffectiveShareUrl = useCallback(() => {
    if (typeof window !== 'undefined' && window.location?.href) {
      const href = window.location.href;
      const host = window.location.hostname;
      const isLocalHost =
        host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
      if (!isLocalHost) {
        return href;
      }
      return fallbackShareUrl;
    }
    return fallbackShareUrl;
  }, [fallbackShareUrl]);

  const openShareWindow = useCallback((url: string) => {
    if (typeof window === 'undefined') return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleFacebookShare = useCallback(() => {
    const urlToShare = getEffectiveShareUrl();
    if (!urlToShare) return;
    openShareWindow(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        urlToShare
      )}&quote=${encodeURIComponent(post.title)}`
    );
  }, [getEffectiveShareUrl, openShareWindow, post.title]);

  const handleTwitterShare = useCallback(() => {
    const urlToShare = getEffectiveShareUrl();
    if (!urlToShare) return;
    openShareWindow(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        urlToShare
      )}&text=${encodeURIComponent(post.title)}`
    );
  }, [getEffectiveShareUrl, openShareWindow, post.title]);

  const handleLinkedInShare = useCallback(() => {
    const urlToShare = getEffectiveShareUrl();
    if (!urlToShare) return;
    openShareWindow(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        urlToShare
      )}&title=${encodeURIComponent(post.title)}`
    );
  }, [getEffectiveShareUrl, openShareWindow, post.title]);

  const handleCopyOnly = useCallback(async () => {
    const urlToShare = getEffectiveShareUrl();
    if (!urlToShare) return;

    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      try {
        await navigator.clipboard.writeText(urlToShare);
        if (typeof window !== 'undefined') {
          window.alert('Link copied to clipboard');
        }
        return;
      } catch (error) {
        // fall through to prompt
      }
    }

    if (typeof window !== 'undefined') {
      window.prompt('Copy link to clipboard', urlToShare);
    }
  }, [getEffectiveShareUrl]);

  return (
    <article className="prose prose-lg max-w-none">
      <h1 className="text-3xl md:text-4xl font-medium mb-6">{post.title}</h1>
      
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
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 sm:ml-auto">
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
          className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-sm" 
        />
      </div>

      {/* Blog content - render actual content if available, otherwise show placeholder */}
      <style jsx global>{`
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #374151;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-content p {
          color: #4b5563;
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }
        .blog-content li {
          color: #4b5563;
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }
        .blog-content blockquote {
          border-left: 4px solid #ED276E;
          padding-left: 1rem;
          font-style: italic;
          margin: 1.5rem 0;
          color: #6b7280;
        }
        .blog-content a {
          color: #ED276E;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #299dd7;
        }
        .blog-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        .blog-content h1,
        .blog-content h3,
        .blog-content h5 {
          color: var(--brand-pink);
        }
        .blog-content h2,
        .blog-content h4,
        .blog-content h6 {
          color: var(--brand-blue);
        }
      `}</style>
      {post.content ? (
        <div 
          className="blog-content max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      ) : (
        <div className="blog-content">
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
            urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl. Sed euismod, velit vel bibendum bibendum, 
            urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
          </p>
          
          <p className="text-gray-700">
            Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl. 
            Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
          </p>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">Key Points to Consider</h2>
          
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
            urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
          </p>
          
          <ul className="list-disc pl-5 mt-4 mb-6 text-gray-700">
            <li className="mb-2">First important point about painting</li>
            <li className="mb-2">Second crucial consideration for your project</li>
            <li className="mb-2">Third tip from our professional painters</li>
            <li className="mb-2">Fourth recommendation for best results</li>
          </ul>
          
          <h2 className="text-2xl font-medium mt-8 mb-4">Why This Matters</h2>
          
          <p className="text-gray-700">
            Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl. 
            Sed euismod, velit vel bibendum bibendum, urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
          </p>
          
          <blockquote className="border-l-4 border-[#ED276E] pl-4 italic my-6 text-gray-600">
            "The right color choice can completely transform a space and influence how you feel when you're in it."
          </blockquote>
          
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, velit vel bibendum bibendum, 
            urna nisl bibendum nunc, eget bibendum nisl nisl vel nisl.
          </p>
        </div>
      )}
      
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-medium mb-4">Share this article</h3>
        <div className="flex space-x-4">
          <button
            type="button"
            aria-label="Share on Facebook"
            onClick={handleFacebookShare}
            className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Share on Twitter"
            onClick={handleTwitterShare}
            className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Share on LinkedIn"
            onClick={handleLinkedInShare}
            className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </button>
          <button
            type="button"
            aria-label="Copy link"
            onClick={handleCopyOnly}
            className="p-2 rounded-full bg-[#F5F5F5] hover:bg-gray-200 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <rect x="9" y="9" width="13" height="13" rx="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogContent; 