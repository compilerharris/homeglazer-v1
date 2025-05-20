import React from 'react';
import { useEffect, useState } from "react";
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import CTAButton from './CTAButton';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';

const DesignInsights: React.FC = () => {
  // Limit to 4 blog posts for the carousel
  const featuredBlogPosts = blogPosts.slice(0, 4);

  // Responsive slidesToShow logic
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 767) {
        setSlidesToShow(1);
      } else if (width < 1023) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Call immediately on mount
    updateSlides();
    
    // Add resize listener
    window.addEventListener("resize", updateSlides);
    
    // Cleanup
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <section className="w-[90%] lg:w-[80%] mx-auto flex flex-col items-center mt-[50px] max-md:mt-10 2xl:w-[1400px]">
      <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium self-center leading-[150%] mb-4">
        Painting Blogs
      </h2>
      <p className="text-[rgba(64,80,94,1)] text-xl font-light text-center mb-10">
        Expert Tips & Trends for Your Space
      </p>
      <div className="w-full">
        <SectionCarousel slidesToShow={slidesToShow}>
          {featuredBlogPosts.map((post) => (
            <CarouselItem key={post.id} className="basis-full md:basis-1/2 lg:basis-1/3">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative flex flex-col min-h-[400px] w-full mx-2 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-[200px] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={`Blog Post - ${post.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col p-6 bg-white flex-grow">
                    <div className="mb-2 flex items-center text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <h3 className="text-[rgba(237,39,110,1)] text-lg font-medium line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-[rgba(64,80,94,1)] text-sm font-normal mt-2 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-[rgba(64,80,94,1)] text-sm">
                        By {post.author}
                      </span>
                      <span 
                        className="inline-flex items-center rounded-full bg-[#ED276E] px-4 py-2 text-sm text-white hover:bg-[#299dd7] transition-colors"
                      >
                        Read More
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </SectionCarousel>
      </div>
      <div className="mt-8 flex justify-center">
        <CTAButton to="/blog" className="mt-4">
          View All Articles
        </CTAButton>
      </div>
    </section>
  );
};

export default DesignInsights;
