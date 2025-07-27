import React, { useState, useRef, useEffect } from 'react';
import { ColorSwatch } from '../../hooks/useVisualizer';
import Breadcrumbs from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  step: number;
  isActive?: boolean;
}

interface ColourSelectionProps {
  colorTypes: string[];
  selectedColorType: string | null;
  colorsForType: ColorSwatch[];
  selectedColors: ColorSwatch[];
  loadingBrandData: boolean;
  onSelectColorType: (colorType: string) => void;
  onAddColor: (color: ColorSwatch) => void;
  onRemoveColor: (colorHex: string) => void;
  onBack: () => void;
  onNext: () => void;
  backButtonText?: string;
  breadcrumbs?: BreadcrumbItem[];
  onStepClick?: (step: number) => void;
}

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Color mapping for category buttons
const CATEGORY_COLORS: Record<string, string> = {
  'Greys': '#808080',
  'Grays': '#808080',
  'Blues': '#0066CC',
  'Browns': '#8B4513',
  'Reds': '#FF0000',
  'Oranges': '#FF6600',
  'Yellows': '#FFD700',
  'Greens': '#228B22',
  'Purples': '#800080',
  'Violets': '#800080',
  'Pinks': '#FF69B4',
  'Neutrals': '#D3D3D3',
  'Whites': '#FFFFFF',
  'Blacks': '#000000',
  'Metallics': '#C0C0C0',
  'Pastels': '#FFB6C1',
  'Earth Tones': '#8B4513',
  'Classic Neutrals': '#D3D3D3',
  'Creams': '#FFFDD0',
  'Beige': '#F5F5DC',
  'Violet': '#800080',
};

const ColourSelection: React.FC<ColourSelectionProps> = ({
  colorTypes,
  selectedColorType,
  colorsForType,
  selectedColors,
  loadingBrandData,
  onSelectColorType,
  onAddColor,
  onRemoveColor,
  onBack,
  onNext,
  backButtonText = "Change Paint Brand",
  breadcrumbs = [],
  onStepClick,
}) => {
  const [showCategoryPrevArrow, setShowCategoryPrevArrow] = useState(false);
  const [showCategoryNextArrow, setShowCategoryNextArrow] = useState(false);
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [isButtonFixed, setIsButtonFixed] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check category scroll overflow
  useEffect(() => {
    const checkCategoryScroll = () => {
      if (categoryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
        setShowCategoryPrevArrow(scrollLeft > 0);
        setShowCategoryNextArrow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkCategoryScroll();
    window.addEventListener('resize', checkCategoryScroll);
    
    // Add scroll event listener to the category container
    if (categoryScrollRef.current) {
      categoryScrollRef.current.addEventListener('scroll', checkCategoryScroll);
    }
    
    return () => {
      window.removeEventListener('resize', checkCategoryScroll);
      if (categoryScrollRef.current) {
        categoryScrollRef.current.removeEventListener('scroll', checkCategoryScroll);
      }
    };
  }, [colorTypes]);

  // Handle dynamic button positioning based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Debounce the state change to prevent flickering
      scrollTimeoutRef.current = setTimeout(() => {
        // Switch to static when footer is approaching viewport with a larger buffer
        const shouldBeStatic = footerRect.top < viewportHeight - 150;
        setIsButtonFixed(!shouldBeStatic);
      }, 50); // 50ms debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const scrollCategory = (direction: 'prev' | 'next') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = categoryScrollRef.current.scrollLeft + (direction === 'next' ? scrollAmount : -scrollAmount);
      categoryScrollRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  if (loadingBrandData) {
    return (
      <main className="min-h-screen bg-gray-50 pt-28 pb-8 flex flex-col items-center px-4 md:px-0">
        <div className="w-full max-w-4xl flex items-center mb-6">
          <button
            className="text-[#299dd7] font-medium flex items-center gap-2 hover:underline"
            onClick={onBack}
          >
            <span className="text-lg">←</span> {backButtonText}
          </button>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading color data...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-8 flex flex-col items-center px-4 md:px-0">
      <div className="w-full max-w-4xl flex items-center mb-6">
        <button
          className="text-[#299dd7] font-medium flex items-center gap-2 hover:underline"
          onClick={onBack}
        >
          <span className="text-lg">←</span> {backButtonText}
        </button>
      </div>
      
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <Breadcrumbs items={breadcrumbs} onStepClick={onStepClick} />
      )}
      
      <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Step 4: Select Your Colours</h2>
      <p className="mb-6 text-gray-600 text-center max-w-xl">
        Choose colour types and select up to 12 colours for your room. You've selected {selectedColors.length}/12 colours.
      </p>

      {/* Selected Colours Display - Back to top */}
      <div className="w-full max-w-4xl mb-6" data-section="selected-colours">
        <h3 className="text-lg font-medium text-gray-700 mb-3 text-center">Selected Colours</h3>
        <div className="flex gap-2 justify-center flex-wrap">
          {Array.from({length: 12}).map((_, idx) => (
            <div key={idx} className="w-16 h-16 border-2 border-gray-200 rounded-lg flex items-center justify-center bg-white relative flex-shrink-0">
              {selectedColors[idx] ? (
                <>
                  <div 
                    className="w-12 h-12 rounded border-2 border-white shadow-sm" 
                    style={{ background: selectedColors[idx].colorHex }}
                    title={`${capitalizeWords(selectedColors[idx].colorName)} (${selectedColors[idx].colorCode})`}
                  />
                  <button
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 z-10"
                    onClick={() => onRemoveColor(selectedColors[idx].colorHex)}
                    aria-label="Remove color"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="w-12 h-12 rounded border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                  +
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Colour Type Categories - Desktop Only */}
      <div className="hidden md:block">
        {colorTypes.length > 0 && (
          <div className="w-full max-w-4xl mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-3 text-center">Colour Types</h3>
            <div className="relative">
              {showCategoryPrevArrow && (
                <button
                  onClick={() => scrollCategory('prev')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                >
                  ‹
                </button>
              )}
              
              <div
                ref={categoryScrollRef}
                className="overflow-x-auto scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth'
                }}
              >
                <div className="flex gap-3 min-w-max px-4">
                  {colorTypes.map((colorType) => {
                    const categoryColor = CATEGORY_COLORS[colorType] || '#ED276E';
                    return (
                      <button
                        key={colorType}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap text-sm flex-shrink-0 ${
                          selectedColorType === colorType 
                            ? 'bg-white shadow-md border-2' 
                            : 'bg-white hover:bg-gray-50 border-2'
                        }`}
                        style={{
                          borderColor: selectedColorType === colorType ? categoryColor : '#e5e7eb',
                        }}
                        onClick={() => onSelectColorType(colorType)}
                      >
                        <div 
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColor }}
                        />
                        <span className="text-gray-700 font-semibold tracking-wide">
                          {colorType.toUpperCase()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {showCategoryNextArrow && (
                <button
                  onClick={() => scrollCategory('next')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50"
                >
                  ›
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Colour Swatches Grid - Center aligned */}
      {selectedColorType && colorsForType.length > 0 && (
        <div className={`w-full max-w-4xl md:mb-32 ${isButtonFixed ? 'mb-66' : 'mb-8'}`}>
          <h3 className="text-lg font-medium text-gray-700 mb-3 text-center">
            {selectedColorType} Colours ({colorsForType.length} available)
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 justify-items-center">
            {colorsForType.map((color) => {
              const isSelected = selectedColors.some(c => c.colorHex === color.colorHex);
              const selectionIndex = selectedColors.findIndex(c => c.colorHex === color.colorHex);
              
              return (
                <div key={color.colorHex} className="relative">
                  <button
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-[#299dd7] shadow-lg hover:border-red-400 hover:shadow-xl'
                        : 'border-gray-300 hover:border-[#299dd7] hover:shadow-md'
                    }`}
                    style={{ backgroundColor: color.colorHex }}
                    onClick={() => onAddColor(color)}
                    title={`${isSelected ? 'Click to remove' : 'Click to select'} ${capitalizeWords(color.colorName)} (${color.colorCode})`}
                  >
                    {/* Selection number indicator */}
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#299dd7] text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                        {selectionIndex + 1}
                      </div>
                    )}
                  </button>
                  <p className="text-sm text-gray-600 mt-2 text-center max-w-16 md:max-w-20 leading-tight">
                    {capitalizeWords(color.colorName)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 text-center max-w-16 md:max-w-20 leading-tight">
                    {color.colorCode}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fallback for no colour types */}
      {colorTypes.length === 0 && !loadingBrandData && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No colour types found for this brand.</p>
          <p className="text-sm text-gray-500 mb-4">Debug: Colour types count: {colorTypes.length}</p>
          <button
            onClick={onBack}
            className="px-6 py-2 bg-[#299dd7] text-white rounded-lg hover:bg-[#237bb0] transition-colors"
          >
            Choose Different Brand
          </button>
        </div>
      )}

      {/* Mobile Fixed Bottom Section - Colour Types */}
      {colorTypes.length > 0 && (
        <div className={`md:hidden bg-white border-t border-gray-200 z-40 transition-all duration-300 ${
          isButtonFixed ? 'fixed left-0 right-0 bottom-[150px]' : 'static mt-4 w-full max-w-screen-xl mx-auto px-4'
        }`}>
          <div className="py-3 px-4">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 min-w-max">
                {colorTypes.map((colorType) => (
                  <button
                    key={colorType}
                    className={`px-4 py-2 rounded-full font-medium border transition-all duration-200 whitespace-nowrap text-sm flex-shrink-0 ${
                      selectedColorType === colorType 
                        ? 'bg-[#299dd7] text-white border-[#299dd7]' 
                        : 'bg-white text-[#299dd7] border-[#299dd7] hover:bg-[#e6f2fa]'
                    }`}
                    onClick={() => onSelectColorType(colorType)}
                  >
                    {colorType}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COLOUR YOUR ROOM Button - Full Width, Dynamic */}
      <div className={`md:hidden bg-white border-t border-gray-200 px-4 py-3 transition-all duration-300 ${
        isButtonFixed ? 'fixed left-0 right-0 bottom-[68px] z-50' : 'absolute left-0 right-0 bottom-0 z-40'
      }`}>
        <button
          className="w-full px-8 py-4 rounded-xl bg-[#299dd7] text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedColors.length === 0}
          onClick={onNext}
        >
          COLOUR YOUR ROOM <span className="text-2xl">→</span>
        </button>
      </div>

      {/* Desktop COLOUR YOUR ROOM Button */}
      <div className="hidden md:block">
        <div className={`transition-all duration-300 ${
          isButtonFixed ? 'fixed left-1/2 -translate-x-1/2 bottom-6 z-50' : 'absolute left-1/2 -translate-x-1/2 bottom-6 z-40'
        }`}>
          <button
            className="px-8 py-4 rounded-xl bg-white text-black font-bold text-lg shadow-lg border border-gray-200 flex items-center gap-2 z-50 disabled:opacity-50 mx-auto"
            style={{ minWidth: 280 }}
            disabled={selectedColors.length === 0}
            onClick={onNext}
          >
            COLOUR YOUR ROOM <span className="text-2xl">→</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default ColourSelection; 