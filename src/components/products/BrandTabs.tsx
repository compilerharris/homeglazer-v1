import React, { useRef, useState, useEffect } from 'react';
import { Brand } from '../../data/products';

interface BrandTabsProps {
  brands: Brand[];
  selectedBrand: string | null;
  onBrandSelect: (brandId: string | null) => void;
}

const BrandTabs: React.FC<BrandTabsProps> = ({
  brands,
  selectedBrand,
  onBrandSelect
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll position for arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle scroll
  const scrollBrands = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', checkScrollPosition);
    }
    
    return () => {
      window.removeEventListener('resize', checkScrollPosition);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-[#299dd7] mb-4 text-center">Choose a Brand</h2>
      <p className="text-gray-600 text-center mb-6">Select your preferred paint brand to filter products</p>
      
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scrollBrands('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-200"
            aria-label="Scroll left"
          >
            <span className="text-lg">‹</span>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scrollBrands('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-200"
            aria-label="Scroll right"
          >
            <span className="text-lg">›</span>
          </button>
        )}

        {/* Brand Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide flex gap-4 px-4"
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          {/* All Brands Option */}
          <button
            onClick={() => onBrandSelect(null)}
            className={`flex flex-col items-center group flex-shrink-0 w-28 bg-white rounded-xl border-2 transition-all duration-200 ${
              selectedBrand === null 
                ? 'border-[#299dd7] shadow-lg' 
                : 'border-gray-200 shadow hover:border-[#299dd7]'
            }`}
            style={{ minWidth: '7rem' }}
          >
            <div className="w-full aspect-square bg-gray-50 rounded-xl flex items-center justify-center p-3 m-1">
              <span className="text-[#299dd7] font-semibold text-sm text-center">All Brands</span>
            </div>
            <span className="text-sm font-medium text-gray-700 text-center mb-2">All Brands</span>
          </button>

          {/* Brand Options */}
          {brands.map((brand) => (
            <button
              key={brand.id}
              onClick={() => onBrandSelect(brand.id)}
              className={`flex flex-col items-center group flex-shrink-0 w-28 bg-white rounded-xl border-2 transition-all duration-200 ${
                selectedBrand === brand.id 
                  ? 'border-[#299dd7] shadow-lg' 
                  : 'border-gray-200 shadow hover:border-[#299dd7]'
              }`}
              style={{ minWidth: '7rem' }}
            >
              <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center p-3 m-1 overflow-hidden">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Logo';
                  }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700 text-center mb-2">{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandTabs; 