import React, { useState, useEffect, useRef } from 'react';
import { VariantManifest, ColorSwatch } from '../../hooks/useVisualizer';
import Breadcrumbs from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  step: number;
  isActive?: boolean;
}

interface FinishSelectionProps {
  variant: VariantManifest;
  selectedColors: ColorSwatch[];
  assignments: { [side: string]: string };
  wallMasks: Record<string, string>;
  loadingMasks: boolean;
  activeSide: string | null;
  showPalette: boolean;
  onOpenPalette: (side: string) => void;
  onAssignColor: (color: string) => void;
  onClosePalette: () => void;
  onBack: () => void;
  onDownload: () => void;
  backButtonText?: string;
  breadcrumbs?: BreadcrumbItem[];
  onStepClick?: (step: number) => void;
}

const wallLabels: Record<string, string> = {
  front: 'Front Wall',
  left: 'Left Wall',
  right: 'Right Wall',
  roof: 'Roof',
};

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const FinishSelection: React.FC<FinishSelectionProps> = ({
  variant,
  selectedColors,
  assignments,
  wallMasks,
  loadingMasks,
  activeSide,
  showPalette,
  onOpenPalette,
  onAssignColor,
  onClosePalette,
  onBack,
  onDownload,
  backButtonText = "Change Colours",
  breadcrumbs = [],
  onStepClick,
}) => {
  const wallKeys = Object.keys(variant.walls);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const previewImageRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  // Convert selectedColors to palette (hex values)
  const palette = selectedColors.map(color => color.colorHex);

  // Check scroll position for arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Handle wall thumbnail click with scroll
  const handleWallClick = (wallKey: string) => {
    onOpenPalette(wallKey);
    // Scroll to breadcrumbs section after a short delay to ensure palette is rendered
    setTimeout(() => {
      // Scroll to the breadcrumbs section for both desktop and mobile
      if (previewImageRef.current) {
        previewImageRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  // Auto-scroll wiggle animation and swipe hint on first render (mobile only)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Show swipe hint for 3 seconds
      setShowSwipeHint(true);
      
      // Hide hint after 3 seconds
      const hideTimer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 3000);
      
      // Wiggle animation after a longer delay to ensure DOM is ready
      const wiggleTimer = setTimeout(() => {
        if (previewScrollRef.current) {
          const container = previewScrollRef.current;
          console.log('Performing wiggle animation'); // Debug log
          container.scrollLeft += 50;
          setTimeout(() => {
            container.scrollLeft = 0;
          }, 500);
        } else {
          console.log('Preview scroll container not found'); // Debug log
        }
      }, 1500);
      
      // Cleanup timers
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(wiggleTimer);
      };
    } else {
      setShowSwipeHint(false);
    }
  }, []);

  // Add scroll event listener for arrow visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollPosition();
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);
  
  return (
    <main className="min-h-screen bg-white pt-20 flex flex-col items-center px-4 md:px-0 relative pb-8">
      <div className="w-full max-w-6xl flex items-center mb-6">
        <button
          className="text-[#299dd7] font-medium flex items-center gap-2 hover:underline"
          onClick={onBack}
        >
          <span className="text-lg">←</span> {backButtonText}
        </button>
      </div>
      
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="w-full max-w-6xl flex justify-start" ref={previewImageRef}>
          <Breadcrumbs items={breadcrumbs} onStepClick={onStepClick} />
        </div>
      )}
      
      {/* Desktop Layout - Side by Side */}
      <div className="hidden md:flex w-full max-w-6xl gap-8">
        {/* Left Column - Room Preview */}
        <div className="flex-1">
          <div className="relative" style={{ aspectRatio: '16/9' }}>
            <img
              src={variant.mainImage}
              alt={variant.label}
              className="w-full h-full rounded-lg object-cover"
              style={{ display: 'block', width: '100%', height: '100%' }}
            />
            {/* SVG Overlay for wall masking */}
            <svg 
              className="svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
              viewBox="0 0 1280 720"
              preserveAspectRatio="xMidYMid slice"
            >
              {wallKeys.map((wallKey) => {
                if (!assignments[wallKey] || !wallMasks[wallKey]) return null;
                return (
                  <g key={wallKey}>
                    <defs>
                      <mask id={`wall-mask-desktop-${wallKey}`}>
                        <rect width="100%" height="100%" fill="black"/>
                        <path d={wallMasks[wallKey]} fill="white"/>
                      </mask>
                    </defs>
                    <rect 
                      width="100%" 
                      height="100%" 
                      fill={assignments[wallKey]}
                      opacity="0.7"
                      mask={`url(#wall-mask-desktop-${wallKey})`}
                      className="wall-path"
                    />
                  </g>
                );
              })}
            </svg>
            {loadingMasks && (
              <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                <div className="text-gray-500">Loading masks...</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Wall Selection */}
        <div className="w-80 flex-shrink-0 relative">
          <h2 className="text-xl font-semibold text-[#299dd7] mb-4">Select wall to paint:</h2>
          {/* Wall sides grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {wallKeys.map((wallKey) => (
              <button
                key={wallKey}
                className="flex flex-col items-center group"
                onClick={() => handleWallClick(wallKey)}
                type="button"
              >
                <div
                  className="w-full h-24 rounded-lg border-2 flex items-center justify-center mb-2 relative transition-all duration-200 overflow-hidden"
                  style={{ borderColor: assignments[wallKey] || '#e5e7eb', background: assignments[wallKey] || '#fff' }}
                >
                  {wallMasks[wallKey] ? (
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 1280 720"
                      style={{ opacity: assignments[wallKey] ? 1 : 0.2 }}
                    >
                      <path d={wallMasks[wallKey]} fill={assignments[wallKey] || '#f3f4f6'} />
                    </svg>
                  ) : (
                    <div className="text-xs text-gray-400">Loading...</div>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{wallLabels[wallKey] || wallKey}</span>
              </button>
            ))}
          </div>
          
          {/* Information Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Selection Summary</h3>
            
            {/* Room Information */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">Room:</span>
                <span className="text-sm text-gray-800">{variant.label}</span>
              </div>
            </div>
            
            {/* Brand Information */}
            {breadcrumbs.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">Brand:</span>
                  <span className="text-sm text-gray-800">
                    {breadcrumbs.find(item => item.label.includes('Paints') || item.label.includes('Berger') || item.label.includes('JSW') || item.label.includes('Birla') || item.label.includes('NCS') || item.label.includes('RAL'))?.label || 'Not selected'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Colours Applied */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">Colours Applied:</span>
                <span className="text-sm text-gray-800">{Object.keys(assignments).filter(key => assignments[key]).length} walls</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(assignments).map(([wallKey, color]) => {
                  if (!color) return null;
                  const colorInfo = selectedColors.find(c => c.colorHex === color);
                  return (
                    <div key={wallKey} className="flex items-center gap-1 bg-white px-2 py-1 rounded border">
                      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                      <span className="text-xs text-gray-700">{wallLabels[wallKey] || wallKey}</span>
                      {colorInfo && (
                        <span className="text-xs text-gray-500">({capitalizeWords(colorInfo.colorName)} - {colorInfo.colorCode})</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Download Button */}
            <button
              className="w-full px-4 py-3 bg-[#299dd7] text-white font-semibold rounded-lg hover:bg-[#1e7bb8] transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={onDownload}
            >
              <span>DOWNLOAD THIS LOOK</span>
              <span className="text-lg">▼</span>
            </button>
          </div>
          
          {/* Desktop Color Palette - Popup overlay with dark background */}
          {showPalette && (
            <>
              {/* Dark overlay */}
              <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={onClosePalette} />
              {/* Color palette popup */}
              <div className="absolute top-0 left-0 right-0 bg-white border-2 border-gray-200 rounded-lg p-4 shadow-lg z-50">
                <h3 className="text-lg font-semibold text-center mb-4">Select colour to apply</h3>
                              <div className="grid grid-cols-3 gap-3 mb-2">
                {palette.map((color, idx) => (
                  <div key={color + idx} className="flex flex-col items-center">
                    <button
                      className="w-16 h-12 rounded border-2 border-white hover:border-gray-400 focus:outline-none transition-all duration-200"
                      style={{ background: color }}
                      onClick={() => onAssignColor(color)}
                      aria-label={`Apply color ${color}`}
                      title={selectedColors[idx] ? `${capitalizeWords(selectedColors[idx].colorName)} (${selectedColors[idx].colorCode})` : color}
                    />
                    {/* Colour name and code */}
                    {selectedColors[idx] && (
                      <div className="mt-1 text-xs text-gray-600 text-center w-full h-8 flex flex-col justify-center">
                        <div className="font-medium leading-tight">{capitalizeWords(selectedColors[idx].colorName)}</div>
                        <div className="text-gray-500 leading-tight">{selectedColors[idx].colorCode}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Layout - Stacked */}
      <div className="md:hidden w-full">
        {/* Room image - 60% screen height with horizontal scroll */}
        <div className="h-[60vh] mb-3 relative overflow-hidden">
          <div 
            ref={previewScrollRef}
            className="h-full overflow-x-auto scrollbar-hide relative" 
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            <div className="h-full flex items-center justify-center min-w-max">
              <div className="relative h-full flex items-center justify-center">
                <img
                  src={variant.mainImage}
                  alt={variant.label}
                  className="h-full w-auto max-w-none rounded-lg object-contain"
                  style={{ display: 'block' }}
                />
                {/* SVG Overlay for wall masking */}
                <svg 
                  className="svg-overlay absolute inset-0 h-full w-auto max-w-none pointer-events-none mix-blend-multiply"
                  viewBox="0 0 1280 720"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {wallKeys.map((wallKey) => {
                    if (!assignments[wallKey] || !wallMasks[wallKey]) return null;
                    return (
                      <g key={wallKey}>
                        <defs>
                          <mask id={`wall-mask-mobile-${wallKey}`}>
                            <rect width="100%" height="100%" fill="black"/>
                            <path d={wallMasks[wallKey]} fill="white"/>
                          </mask>
                        </defs>
                        <rect 
                          width="100%" 
                          height="100%" 
                          fill={assignments[wallKey]}
                          opacity="0.7"
                          mask={`url(#wall-mask-mobile-${wallKey})`}
                          className="wall-path"
                        />
                      </g>
                    );
                  })}
                </svg>
                {loadingMasks && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                    <div className="text-gray-500">Loading masks...</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Swipe hint overlay */}
          {showSwipeHint && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center max-w-xs mx-4">
                <div className="mb-3 flex justify-center">
                  <img 
                    src="/assets/images/swipe-left-icon.svg" 
                    alt="Swipe gesture" 
                    className="w-12 h-12"
                  />
                </div>
                <p className="text-gray-800 font-semibold text-lg mb-2">Swipe left & right</p>
                <p className="text-gray-600 text-sm">for full preview</p>
              </div>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Select wall to paint:</h2>
        {/* Wall sides scrollable row - Mobile/Tablet */}
        <div className="md:hidden w-full max-w-2xl mb-6 relative pb-2">
          <button
            type="button"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => {
              if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: -160, behavior: 'smooth' });
            }}
            aria-label="Scroll left"
          >
            <span className="text-2xl">‹</span>
          </button>
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide flex gap-4 px-4"
            style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
          >
            {wallKeys.map((wallKey) => (
              <button
                key={wallKey}
                className={`flex flex-col items-center group flex-shrink-0 w-28 bg-white rounded-xl border-2 transition-all duration-200 ${assignments[wallKey] ? 'shadow-lg' : 'shadow'}`}
                onClick={() => handleWallClick(wallKey)}
                type="button"
                style={{ 
                  minWidth: '7rem',
                  borderColor: assignments[wallKey] || '#e5e7eb'
                }}
              >
                <div
                  className="h-20 flex items-center justify-center relative overflow-hidden mx-auto"
                  style={{ 
                    background: assignments[wallKey] || '#fff',
                    width: '6.8rem',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem'
                  }}
                >
                  {wallMasks[wallKey] ? (
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 1280 720"
                      style={{ opacity: assignments[wallKey] ? 1 : 0.2 }}
                    >
                      <path d={wallMasks[wallKey]} fill={assignments[wallKey] || '#f3f4f6'} />
                    </svg>
                  ) : (
                    <div className="text-xs text-gray-400">Loading...</div>
                  )}
                </div>
                <span className="text-base font-medium text-gray-700 text-center py-2 px-1">{wallLabels[wallKey] || wallKey}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => {
              if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: 160, behavior: 'smooth' });
            }}
            aria-label="Scroll right"
          >
            <span className="text-2xl">›</span>
          </button>
        </div>
        
        {/* Mobile/Tablet Information Box */}
        <div className="w-full max-w-2xl mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Selection Summary</h3>
            
            {/* Room Information */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">Room:</span>
                <span className="text-sm text-gray-800">{variant.label}</span>
              </div>
            </div>
            
            {/* Brand Information */}
            {breadcrumbs.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">Brand:</span>
                  <span className="text-sm text-gray-800">
                    {breadcrumbs.find(item => item.label.includes('Paints') || item.label.includes('Berger') || item.label.includes('JSW') || item.label.includes('Birla') || item.label.includes('NCS') || item.label.includes('RAL'))?.label || 'Not selected'}
                  </span>
                </div>
              </div>
            )}
            
            {/* Colours Applied */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-600">Colours Applied:</span>
                <span className="text-sm text-gray-800">{Object.keys(assignments).filter(key => assignments[key]).length} walls</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(assignments).map(([wallKey, color]) => {
                  if (!color) return null;
                  const colorInfo = selectedColors.find(c => c.colorHex === color);
                  return (
                    <div key={wallKey} className="flex items-center gap-1 bg-white px-2 py-1 rounded border">
                      <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                      <span className="text-xs text-gray-700">{wallLabels[wallKey] || wallKey}</span>
                      {colorInfo && (
                        <span className="text-xs text-gray-500">({capitalizeWords(colorInfo.colorName)} - {colorInfo.colorCode})</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Download Button */}
            <button
              className="w-full px-4 py-3 bg-[#299dd7] text-white font-semibold rounded-lg hover:bg-[#1e7bb8] transition-colors duration-200 flex items-center justify-center gap-2"
              onClick={onDownload}
            >
              <span>DOWNLOAD THIS LOOK</span>
              <span className="text-lg">▼</span>
            </button>
          </div>
        </div>
      </div>



      {/* Mobile Palette bottom sheet/modal */}
      {showPalette && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40" onClick={onClosePalette}>
          <div className="w-full max-w-md bg-white rounded-t-2xl p-6 pb-20 shadow-lg relative" style={{ minHeight: 260, maxHeight: '80vh' }} onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-center mb-4">Select colour to apply</h3>
            <div className="grid grid-cols-3 gap-4 mb-2">
              {palette.map((color, idx) => (
                <div key={color + idx} className="flex flex-col items-center">
                  <button
                    className="w-20 h-16 rounded border-2 border-white hover:border-gray-400 focus:outline-none transition-all duration-200"
                    style={{ background: color }}
                    onClick={() => onAssignColor(color)}
                    aria-label={`Apply color ${color}`}
                    title={selectedColors[idx] ? `${capitalizeWords(selectedColors[idx].colorName)} (${selectedColors[idx].colorCode})` : color}
                  />
                  {/* Colour name and code */}
                  {selectedColors[idx] && (
                    <div className="mt-1 text-xs text-gray-600 text-center w-full h-8 flex flex-col justify-center">
                      <div className="font-medium leading-tight">{capitalizeWords(selectedColors[idx].colorName)}</div>
                      <div className="text-gray-500 leading-tight">{selectedColors[idx].colorCode}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FinishSelection; 