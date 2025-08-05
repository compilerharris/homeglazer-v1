import React, { useState, useRef, useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  step: number;
  isActive?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onStepClick?: (step: number) => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onStepClick }) => {
  const [showPrevArrow, setShowPrevArrow] = useState(false);
  const [showNextArrow, setShowNextArrow] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll overflow
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowPrevArrow(scrollLeft > 0);
        setShowNextArrow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', checkScroll);
    }
    
    return () => {
      window.removeEventListener('resize', checkScroll);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const scroll = (direction: 'prev' | 'next') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'prev' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mb-3 relative">
      {/* Previous Arrow */}
      {showPrevArrow && (
        <button
          onClick={() => scroll('prev')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
        >
          ‹
        </button>
      )}
      
      {/* Next Arrow */}
      {showNextArrow && (
        <button
          onClick={() => scroll('next')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
        >
          ›
        </button>
      )}
      
      <nav 
        ref={scrollContainerRef}
        className="flex items-center gap-1 text-xs overflow-x-auto scrollbar-hide px-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth'
        }}
      >
        {items.map((item, index) => (
          <React.Fragment key={item.step}>
            <button
              className={`px-2 py-1 rounded-md font-medium transition-all duration-200 flex-shrink-0 whitespace-nowrap ${
                item.isActive
                  ? 'bg-[#299dd7] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } ${onStepClick ? 'cursor-pointer' : 'cursor-default'}`}
              onClick={() => onStepClick && onStepClick(item.step)}
              disabled={!onStepClick}
            >
              {item.label}
            </button>
            {index < items.length - 1 && (
              <span className="text-gray-400 flex-shrink-0 text-xs">›</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumbs; 