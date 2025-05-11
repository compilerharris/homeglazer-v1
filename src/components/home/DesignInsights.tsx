
import React from 'react';
import { useEffect, useState } from "react";
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import CTAButton from './CTAButton';
import Link from 'next/link';

const DesignInsights: React.FC = () => {
  // Sample blog posts data with updated image
  const blogPosts = [
    {
      id: 1,
      backgroundImage: "/lovable-uploads/design-insight-thumb.png",
      title: "Why Choose Yellow for Your Bedroom?",
      excerpt: "Yellow is often associated with sunshine, positivity, and creativity...",
      slug: "why-choose-yellow-bedroom"
    },
    {
      id: 2,
      backgroundImage: "/lovable-uploads/design-insight-thumb.png",
      title: "Top 5 Color Trends This Year",
      excerpt: "Discover the most popular paint colors that homeowners are choosing this year...",
      slug: "top-5-color-trends"
    },
    {
      id: 3,
      backgroundImage: "/lovable-uploads/design-insight-thumb.png",
      title: "Creating a Cohesive Color Scheme",
      excerpt: "Learn how to choose complementary colors for a harmonious home...",
      slug: "creating-cohesive-color-scheme"
    },
    {
      id: 4,
      backgroundImage: "/lovable-uploads/design-insight-thumb.png",
      title: "The Psychology of Color in Interior Design",
      excerpt: "How different colors affect your mood and well-being at home...",
      slug: "psychology-color-interior-design"
    }
  ];

  // Responsive slidesToShow logic
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 767) {
        setSlidesToShow(1);
      } else if (width < 1200) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <section className="w-[90%] lg:w-[80%] mx-auto flex flex-col items-center mt-[50px] max-md:mt-10">
      <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium self-center leading-[150%] mb-4">
        Design Insights
      </h2>
      <p className="text-[rgba(64,80,94,1)] text-xl font-light text-center mb-10">
        Expert Tips & Trends for Your Space
      </p>
      <div className="w-full">
        <SectionCarousel slidesToShow={slidesToShow}>
          {blogPosts.map((post) => (
            <CarouselItem key={post.id} className="basis-1/3 md:basis-1/2 lg:basis-1/3">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="relative flex flex-col min-h-[350px] w-full m-2 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <img
                    src={post.backgroundImage}
                    alt={`Blog Post Background - ${post.title}`}
                    className="w-full h-[200px] object-cover"
                  />
                  <div className="flex flex-col p-6 bg-white">
                    <h3 className="text-[rgba(237,39,110,1)] text-[28px] font-medium">
                      {post.title}
                    </h3>
                    <p className="text-[rgba(64,80,94,1)] text-[18px] font-medium mt-[18px]">
                      {post.excerpt}
                    </p>
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
