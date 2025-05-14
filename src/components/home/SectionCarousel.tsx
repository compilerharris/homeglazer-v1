import React, { useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { type EmblaOptionsType } from 'embla-carousel';

interface SectionCarouselProps {
  children: React.ReactNode;
  className?: string;
  activeSlideIndex?: number;
  setActiveSlideIndex?: (index: number) => void;
  slidesToShow?: number;
  reviewsSection?: boolean;
  teamSection?: boolean;
  paintBrandsSection?: boolean;
  roomMakeoverSection?: boolean;
  colorVisualizerSection?: boolean;
}

const SectionCarousel: React.FC<SectionCarouselProps> = ({ 
  children, 
  className,
  activeSlideIndex,
  setActiveSlideIndex,
  slidesToShow,
  reviewsSection = false,
  teamSection = false,
  paintBrandsSection = false,
  roomMakeoverSection = false,
  colorVisualizerSection = false
}) => {
  const isMobile = useIsMobile();
  
  // Create an API ref
  const [api, setApi] = React.useState<any>(null);
  // State to track if the delay has passed
  const [delayedBasis, setDelayedBasis] = useState<string | null>(null);

  // When activeSlideIndex changes externally (e.g., from color buttons), update the carousel
  useEffect(() => {
    if (api && activeSlideIndex !== undefined) {
      api.scrollTo(activeSlideIndex);
    }
  }, [api, activeSlideIndex]);

  // When the carousel changes, update the activeSlideIndex
  const handleSelect = React.useCallback(() => {
    if (api && setActiveSlideIndex) {
      const currentIndex = api.selectedScrollSnap();
      setActiveSlideIndex(currentIndex);
    }
  }, [api, setActiveSlideIndex]);

  useEffect(() => {
    if (!api) return;
    
    api.on("select", handleSelect);
    // Cleanup
    return () => {
      api.off("select", handleSelect);
    };
  }, [api, handleSelect]);

  // Determine perView based on screen width and section type
  const getPerView = () => {
    if (typeof window === 'undefined') return 1;
    
    // For Room Makeover and Color Visualizer sections specifically showing 1 at a time
    if (roomMakeoverSection || colorVisualizerSection) return 1;
    
    // For blog posts specifically showing 3 at a time above 1023px
    if (slidesToShow) return slidesToShow;
    
    // For reviews section showing 2 at a time above 1367px
    if (reviewsSection && window.innerWidth >= 1367) return 2;
    
    // For Team section showing 3 at a time above 1023px and centering
    if (teamSection && window.innerWidth >= 1023) return 3;
    
    // For Paint Brands section showing 3 on desktop, 2 on tablet, 1 on phone
    if (paintBrandsSection) {
      if (window.innerWidth >= 1024) return 3; // desktop
      if (window.innerWidth >= 768) return 2;  // tablet
      return 1; // phone
    }
    
    // Default responsive behavior
    if (window.innerWidth >= 1367) return 2;
    if (window.innerWidth >= 1023) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  // Calculate basis with delay
  useEffect(() => {
    const perView = getPerView();
    const basis = `${100 / perView}%`;
    
    // Set basis to null initially
    setDelayedBasis(null);
    
    // Apply the basis after a 1-second delay
    const timer = setTimeout(() => {
      setDelayedBasis(basis);
    }, 1000);
    
    // Clean up timer on unmount or when dependencies change
    return () => clearTimeout(timer);
  }, [isMobile, paintBrandsSection, reviewsSection, teamSection, roomMakeoverSection, colorVisualizerSection]);

  const carouselOptions: EmblaOptionsType = {
    align: "start",
    loop: true,
    slidesToScroll: 1,
    dragFree: true,
  };

  return (
    <Carousel
      className={`w-full max-w-screen-xl mx-auto ${className || ''}`}
      opts={carouselOptions}
      setApi={setApi}
    >
      <CarouselContent className={`-ml-4`}>
        {React.Children.map(children, (child, index) => {
          // Use the delayed basis if available, otherwise default to 100%
          const basis = delayedBasis || '100%';
          
          return React.isValidElement(child) 
            ? React.cloneElement(child as React.ReactElement<any>, {
                className: `${(child as React.ReactElement<any>).props.className || ''} pl-4`,
                style: { ...(child as React.ReactElement<any>).props.style, flexBasis: basis }
              })
            : child;
        })}
      </CarouselContent>
      <CarouselPrevious className="left-2 lg:left-4 bg-white/70 hover:bg-white lg:w-12 lg:h-12 transition-all duration-300" />
      <CarouselNext className="right-2 lg:right-4 bg-white/70 hover:bg-white lg:w-12 lg:h-12 transition-all duration-300" />
    </Carousel>
  );
};

export default SectionCarousel;
