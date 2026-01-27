import React from 'react';
import { useEffect, useState } from "react";
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import CTAButton from './CTAButton';
import Link from 'next/link';
import { blogPosts } from '@/data/blogPosts';
import Image from 'next/image';

const DesignInsights: React.FC = () => {
  // Limit to 6 blog posts for the carousel to ensure smooth looping when slidesToShow is 3
  const featuredBlogPosts = blogPosts.slice(0, 6);

  // Responsive slidesToShow logic
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);  // Always show 3 items on desktop
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
    <section className="w-[100%] lg:w-[100%] mx-auto flex flex-col items-center mt-[50px] py-10 max-md:mt-10 2xl:w-[1400px]">
      <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium self-center leading-[150%] mb-4">
        Painting Blogs
      </h2>
      <p className="text-[rgba(64,80,94,1)] text-xl font-light text-center mb-10">
        Expert Tips & Trends for Your Space
      </p>
      <div className="w-full">
        <SectionCarousel slidesToShow={slidesToShow} blogSection={true}>
          {featuredBlogPosts.map((post) => (
            <CarouselItem key={post.id} className="basis-full md:basis-1/2 lg:basis-1/3" style={{ paddingRight: '1rem', paddingLeft: '0' }}>
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative flex flex-col h-[400px] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="h-[200px] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={`Blog Post - ${post.title}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col p-4 bg-white flex-grow">
                    <div className="h-4 mb-2 flex items-center text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <h3 className="h-12 text-[rgba(237,39,110,1)] text-lg font-medium line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    <p className="h-[60px] text-[rgba(64,80,94,1)] text-sm font-normal line-clamp-3 text-ellipsis mb-4">
                      {post.excerpt}
                    </p>
                    <div className="h-8 mt-auto flex justify-between items-center">
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
      <div className="flex justify-center">
        <CTAButton to="/blog">
          View All Articles
        </CTAButton>
      </div>
    </section>
  );
};

export default DesignInsights;
