import React from 'react';
import Link from 'next/link';
import { House, Building2, Brush, Bed, Palmtree, PaintBucket } from 'lucide-react';
import { blogPosts } from '@/data/blogPosts';

interface BlogSidebarProps {
  currentPostId: string;
}

// Mini blog card for sidebar
const SidebarBlogCard: React.FC<{ 
  title: string; 
  date: string; 
  imageUrl: string;
  slug: string;
}> = ({ title, date, imageUrl, slug }) => {
  return (
    <Link href={`/blog/${slug}`} className="flex gap-3 mb-4 group">
      <div className="w-20 h-20 shrink-0">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-[#ED276E] transition-colors">
          {title}
        </h4>
        <p className="text-xs text-gray-500 mt-1">{date}</p>
      </div>
    </Link>
  );
};

// Service card for sidebar
const SidebarServiceCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  path: string;
}> = ({ title, icon, path }) => {
  return (
    <Link href={path} className="flex items-center p-3 hover:bg-gray-50 rounded-lg group">
      <div className="mr-3 text-[#ED276E] group-hover:text-[#299dd7] transition-colors">
        {icon}
      </div>
      <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#ED276E] transition-colors">
        {title}
      </h4>
    </Link>
  );
};

const BlogSidebar: React.FC<BlogSidebarProps> = ({ currentPostId }) => {
  // Get recent posts (excluding current)
  const recentPosts = blogPosts
    .filter(post => post.id !== currentPostId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
  
  // Get related posts (different from recent, by category match)
  const currentPost = blogPosts.find(post => post.id === currentPostId);
  const relatedPosts = currentPost 
    ? blogPosts
        .filter(post => 
          post.id !== currentPostId && 
          post.categories.some(cat => currentPost.categories.includes(cat))
        )
        .slice(0, 3)
    : [];

  // Best services
  const services = [
    {
      title: "Residential Painting",
      icon: <House size={20} />,
      path: "/services/painting/residential"
    },
    {
      title: "Commercial Painting",
      icon: <Building2 size={20} />,
      path: "/services/painting/commercial"
    },
    {
      title: "Wood Coating",
      icon: <Brush size={20} />,
      path: "/services/wood/wood-coating"
    },
    {
      title: "Wall Decor",
      icon: <Palmtree size={20} />,
      path: "/services/wall-decor"
    }
  ];

  return (
    <aside className="space-y-8">
      {/* Search */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Search</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E]"
          />
          <button 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ED276E]"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-3">
          {recentPosts.map((post) => (
            <SidebarBlogCard
              key={post.id}
              title={post.title}
              date={post.date}
              imageUrl={post.coverImage}
              slug={post.slug}
            />
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Related Posts</h3>
          <div className="space-y-3">
            {relatedPosts.map((post) => (
              <SidebarBlogCard
                key={post.id}
                title={post.title}
                date={post.date}
                imageUrl={post.coverImage}
                slug={post.slug}
              />
            ))}
          </div>
        </div>
      )}

      {/* Best Services */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Our Services</h3>
        <div className="divide-y divide-gray-100">
          {services.map((service, index) => (
            <SidebarServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              path={service.path}
            />
          ))}
        </div>
      </div>

      {/* Enquiry Form */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Get a Quote</h3>
        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E]"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E]"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E]"
                placeholder="Your phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED276E]/20 focus:border-[#ED276E] resize-none"
                rows={3}
                placeholder="Tell us about your project"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#ED276E] hover:bg-[#299dd7] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Submit Enquiry
            </button>
          </div>
        </form>
      </div>
    </aside>
  );
};

export default BlogSidebar; 