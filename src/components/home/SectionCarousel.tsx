import React, { useEffect, useState } from 'react';
import { 
  Carousel, 
  CarouselContent, 
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
  blogSection?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  showDots?: boolean;
  hideArrows?: boolean;
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
  colorVisualizerSection = false,
  blogSection = false,
  autoplay = false,
  autoplayInterval = 4000,
  loop = false,
  showDots = false,
  hideArrows = false
}) => {
  const isMobile = useIsMobile();
  
  // Create an API ref
  const [api, setApi] = React.useState<any>(null);
  // State to track if the delay has passed
  const [delayedBasis, setDelayedBasis] = useState<string | null>(null);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  // When activeSlideIndex changes externally (e.g., from color buttons), update the carousel
  useEffect(() => {
    if (api && activeSlideIndex !== undefined) {
      api.scrollTo(activeSlideIndex);
    }
  }, [api, activeSlideIndex]);

  // Update scroll buttons state
  useEffect(() => {
    if (!api) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setCurrentIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
    };

    api.on('select', updateScrollButtons);
    api.on('reInit', updateScrollButtons);
    updateScrollButtons();

    return () => {
      api.off('select', updateScrollButtons);
      api.off('reInit', updateScrollButtons);
    };
  }, [api]);

  // When the carousel changes, update the activeSlideIndex
  const handleSelect = React.useCallback(() => {
    if (api && setActiveSlideIndex) {
      const currentIndex = api.selectedScrollSnap();
      setActiveSlideIndex(currentIndex);
    }
    if (api) {
      setCurrentIndex(api.selectedScrollSnap());
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
    
    // For reviews section showing 2 on desktop, 1 on mobile
    if (reviewsSection) {
      if (window.innerWidth >= 1024) return 2; // desktop
      if (window.innerWidth >= 768) return 2;  // tablet
      return 1; // mobile
    }
    
    // For Team section showing 4 on desktop, 3 on tablet, 1 on mobile
    if (teamSection) {
      if (window.innerWidth >= 1024) return 4; // desktop
      if (window.innerWidth >= 768) return 3;  // tablet
      return 1; // mobile
    }
    
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

  // Calculate basis immediately (no delay)
  useEffect(() => {
    const perView = getPerView();
    const basis = `${100 / perView}%`;
    setDelayedBasis(basis);
  }, [isMobile, paintBrandsSection, reviewsSection, teamSection, roomMakeoverSection, colorVisualizerSection, slidesToShow]);

  const carouselOptions: EmblaOptionsType = {
    align: teamSection ? "start" : reviewsSection ? "start" : slidesToShow ? "start" : "center",
    loop,
    slidesToScroll: (teamSection || reviewsSection || paintBrandsSection) ? 1 : (slidesToShow ? slidesToShow : 1),
    dragFree: (teamSection || reviewsSection || paintBrandsSection) ? false : true,
    containScroll: "trimSnaps",
    skipSnaps: false,
    inViewThreshold: 0.7,
    duration: 5
  };

  // Simple autoplay when enabled
  useEffect(() => {
    if (!api || !autoplay) return;
    const interval = setInterval(() => {
      if (!api) return;
      if (api.canScrollNext()) {
        api.scrollNext();
      } else if (loop) {
        api.scrollTo(0);
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [api, autoplay, autoplayInterval, loop]);

  const renderDots = () => {
    if (!showDots || snapCount <= 1) return null;
    return (
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: snapCount }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-[#ED276E] scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`w-full max-w-[1400px] mx-auto ${roomMakeoverSection ? 'pb-8' : paintBrandsSection ? 'pb-16' : colorVisualizerSection ? 'pb-0' : 'pb-20'} px-4 overflow-x-hidden relative`}>
      <Carousel
        opts={carouselOptions}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {children}
        </CarouselContent>
        {!colorVisualizerSection && !hideArrows && (
          <div className={`w-full flex justify-center gap-4 ${roomMakeoverSection ? 'relative mt-4' : paintBrandsSection ? 'absolute left-0 right-0 -bottom-15' : teamSection ? 'absolute left-0 right-0 -bottom-20' : slidesToShow ? 'absolute left-0 right-0 -bottom-16' : reviewsSection ? 'absolute left-0 right-0 -bottom-16' : 'absolute left-0 right-0 bottom-6 md:bottom-10'} z-30 pointer-events-none`}>
            <div className="pointer-events-auto flex justify-center items-center">
              <CarouselPrevious className={`static bg-white/70 hover:bg-white w-10 h-10 md:w-12 md:h-12 transition-all duration-300 shadow-md rounded-full ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`} />
            </div>
            <div className="pointer-events-auto flex justify-center items-center">
              <CarouselNext className={`static bg-white/70 hover:bg-white w-10 h-10 md:w-12 md:h-12 transition-all duration-300 shadow-md rounded-full ${!canScrollNext ? 'opacity-50 cursor-not-allowed' : ''}`} />
            </div>
          </div>
        )}
      </Carousel>
      {renderDots()}
    </div>
  );
};

export default SectionCarousel;