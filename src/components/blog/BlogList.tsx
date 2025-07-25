import React, { useState } from 'react';
import BlogCard, { BlogPost } from './BlogCard';

interface BlogListProps {
  posts: BlogPost[];
  featured?: boolean;
}

// Sample categories for the filter
const categories = [
  'All',
  'Interior Painting',
  'Exterior Painting', 
  'Colour Ideas',
  'DIY Projects',
  'Trends',
  'Tips & Tricks'
];

const POSTS_PER_PAGE = 6;

const BlogList: React.FC<BlogListProps> = ({ posts, featured = false }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  
  // Filter posts by category
  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.categories.includes(activeCategory));

  // Get currently visible posts
  const postsToShow = filteredPosts.slice(0, visiblePosts);

  // Check if there are more posts to load
  const hasMorePosts = visiblePosts < filteredPosts.length;

  // Handle load more
  const handleLoadMore = () => {
    setVisiblePosts(prev => prev + POSTS_PER_PAGE);
  };

  // Reset visible posts when category changes
  React.useEffect(() => {
    setVisiblePosts(POSTS_PER_PAGE);
  }, [activeCategory]);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px]">
        {!featured && (
          <div className="mb-10 overflow-x-auto">
            <div className="flex min-w-max space-x-2 pb-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-[#ED276E] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {postsToShow.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {!featured && hasMorePosts && (
          <div className="mt-12 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="bg-[#ED276E] text-white rounded-full px-8 py-3 font-medium hover:bg-[#299dd7] transition-colors"
            >
              Load More
            </button>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <h3 className="text-2xl font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">No blog posts match your selected category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList; 