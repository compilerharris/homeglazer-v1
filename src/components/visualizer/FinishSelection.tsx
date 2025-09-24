import React, { useState, useEffect, useRef } from 'react';
import { VariantManifest, ColorSwatch } from '../../hooks/useVisualizer';
import Breadcrumbs from './Breadcrumbs';
import PDFGenerationModal from './PDFGenerationModal';

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
  onBulkAssignColors?: (assignments: { [side: string]: string }) => void;
  onClosePalette: () => void;
  onBack: () => void;
  onDownload: () => void;
  backButtonText?: string;
  breadcrumbs?: BreadcrumbItem[];
  onStepClick?: (step: number) => void;
  selectedBrandId?: string | null;
  // PDF generation props
  showPDFModal?: boolean;
  isGeneratingPDF?: boolean;
  onGeneratePDF?: (clientName: string, dateOfDesign: string, roomPreviewRef: React.RefObject<HTMLDivElement>) => void;
  onClosePDFModal?: () => void;
}

const wallLabels: Record<string, string> = {
  front: 'Front Wall',
  left: 'Left Wall',
  right: 'Right Wall',
  roof: 'Roof',
  'roof-sides': 'Roof Sides',
  door: 'Door',
  window: 'Window',
  table: 'Table',
  chair: 'Chair',
  sofa: 'Sofa',
  edge: 'Edge',
};

// Utility function to capitalize first letter of each word
const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Utility function to get brand name from brand ID
const getBrandName = (brandId: string | null | undefined): string => {
  if (!brandId) return 'Not selected';
  
  const brandConfig = [
    { id: 'asian-paints', name: 'Asian Paints' },
    { id: 'nerolac', name: 'Nerolac' },
    { id: 'berger', name: 'Berger' },
    { id: 'jsw', name: 'JSW' },
    { id: 'birla-opus', name: 'Birla Opus' },
    { id: 'ncs', name: 'NCS' },
    { id: 'ral', name: 'RAL' }
  ].find(b => b.id === brandId);
  
  return brandConfig?.name || brandId;
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
  onBulkAssignColors,
  onClosePalette,
  onBack,
  onDownload,
  backButtonText = "Change Colours",
  breadcrumbs = [],
  onStepClick,
  selectedBrandId,
  // PDF generation props
  showPDFModal,
  isGeneratingPDF,
  onGeneratePDF,
  onClosePDFModal,
}) => {
  const wallKeys = Object.keys(variant.walls);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const previewImageRef = useRef<HTMLDivElement>(null);
  const mobilePreviewRef = useRef<HTMLDivElement>(null);
  const roomPreviewRef = useRef<HTMLDivElement>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isZoomed, setIsZoomed] = useState(() => {
    // Set zoom out (true) as default for tablet and mobile devices
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024; // lg breakpoint
    }
    return false; // Default for SSR
  });
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isButtonFixed, setIsButtonFixed] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isRecoloring, setIsRecoloring] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Debug log for showSwipeHint state
  console.log('Current showSwipeHint state:', showSwipeHint);
  console.log('Current isZoomed state:', isZoomed);

  // Reset image loading state when variant changes
  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [variant.mainImage]);

  // Check screen size for responsive width and zoom state
  useEffect(() => {
    const checkScreenSize = () => {
      const isLargeScreen = window.innerWidth >= 1400;
      const isDesktop = window.innerWidth >= 1024;
      
      setIsLargeScreen(isLargeScreen);
      
      // Set zoom out (true) for tablet and mobile, zoom in (false) for desktop
      setIsZoomed(!isDesktop);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Function to randomly assign colors to walls (excluding roof)
  const handleRandomRecolor = () => {
    if (selectedColors.length === 0) return; // No colors selected, nothing to do
    
    // Set recoloring state for visual feedback
    setIsRecoloring(true);
    
    // Get available colors (excluding white for more variety)
    const availableColors = selectedColors.map(color => color.colorHex);
    
    // Get walls that can be recolored (exclude roof)
    const recolorableWalls = wallKeys.filter(wallKey => wallKey !== 'roof');
    
    // Create new assignments object with random colors
    const newAssignments = { ...assignments };
    
    // Randomly assign colors to recolorable walls
    recolorableWalls.forEach(wallKey => {
      const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
      newAssignments[wallKey] = randomColor;
    });
    
    // Use bulk assignment if available, otherwise fall back to individual assignments
    if (onBulkAssignColors) {
      onBulkAssignColors(newAssignments);
    } else {
      // Fallback: assign colors individually without opening palette
      recolorableWalls.forEach(wallKey => {
        const randomColor = newAssignments[wallKey];
        // Directly assign color without opening palette
        onAssignColor(randomColor);
      });
    }
    
    // Reset recoloring state after a short delay
    setTimeout(() => {
      setIsRecoloring(false);
    }, 500);
  };

  // Spacebar key listener for random color assignment
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger on spacebar and when not in an input field and not currently recoloring
      if (event.code === 'Space' && 
          event.target instanceof HTMLElement && 
          event.target.tagName !== 'INPUT' && 
          event.target.tagName !== 'TEXTAREA' &&
          !isRecoloring) {
        event.preventDefault(); // Prevent page scroll
        handleRandomRecolor();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyPress);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedColors, assignments, isRecoloring]); // Dependencies to ensure fresh data

  // Convert selectedColors to palette (hex values) and add white color option
  const palette = [...selectedColors.map(color => color.colorHex), '#FFFFFF'];

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
    // Scroll to breadcrumbs section after a short delay to ensure palette is rendered (mobile only)
    setTimeout(() => {
      // Only scroll on mobile devices
      if (previewImageRef.current && window.innerWidth < 768) {
        previewImageRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  // Handle zoom toggle
  const handleZoomToggle = () => {
    const newZoomState = !isZoomed;
    setIsZoomed(newZoomState);
  };

  // Auto-scroll wiggle animation and swipe hint on first render (mobile only)
  useEffect(() => {
    console.log('Step 5 useEffect - previewScrollRef.current:', !!previewScrollRef.current);
    
    if (previewScrollRef.current) {
      console.log('Step 5 - Showing swipe hint');
      // Show swipe hint for 3 seconds
      setTimeout(() => {
        console.log('Step 5 - Hiding swipe hint after 3 seconds');
        setShowSwipeHint(false);
      }, 3000);
      
      // Perform wiggle animation after 1.5 seconds
      setTimeout(() => {
        console.log('Step 5 - Performing wiggle animation');
        if (previewScrollRef.current) {
          const container = previewScrollRef.current;
          container.scrollLeft += 50;
          setTimeout(() => {
            container.scrollLeft = 0;
          }, 500);
        }
      }, 1500);
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

  // Handle scroll for button positioning
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        const summarySection = document.querySelector('[data-section="summary"]');
        if (!summarySection) return;
        
        const summaryRect = summarySection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Switch button position when summary section is near the bottom of viewport
        // This makes it switch earlier, when summary is still partially visible
        if (summaryRect.bottom < windowHeight - 100) {
          setIsButtonFixed(false);
        } else {
          setIsButtonFixed(true);
        }
      }, 50); // Small delay to prevent rapid state changes
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
  
  const handleGeneratePDF = (clientName: string, dateOfDesign: string) => {
    if (onGeneratePDF) {
      onGeneratePDF(clientName, dateOfDesign, roomPreviewRef);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28 flex flex-col items-center px-4 lg:px-0 relative pb-8">
      {/* Breadcrumbs Section */}
      {breadcrumbs.length > 0 && (
        <div className="w-full mb-4" ref={previewImageRef}>
          <h3 className="text-sm font-medium text-gray-600 mb-2 text-center">
            Modify your selections here:
          </h3>
          <Breadcrumbs items={breadcrumbs} onStepClick={onStepClick} />
        </div>
      )}
      
      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:flex w-full max-w-6xl gap-8" style={{ maxWidth: isLargeScreen ? '1408px' : '1152px' }}>
        {/* Left Column - Room Preview */}
        <div className="flex-1 min-w-0">
          <div ref={roomPreviewRef} className="relative room-preview-container overflow-hidden rounded-lg" style={{ aspectRatio: '16/9', width: '100%', height: 'auto' }}>
        <img
          src={variant.mainImage}
          alt={variant.label}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: 'block', width: '100%', height: '100%' }}
          onError={(e) => {
            console.error('Failed to load image:', variant.mainImage);
            setImageError(true);
            setImageLoading(false);
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Room+Preview';
          }}
          onLoad={() => {
            console.log('Image loaded successfully:', variant.mainImage);
            setImageLoading(false);
            setImageError(false);
          }}
        />
            {/* SVG Overlay for wall masking */}
            <svg
              className="svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
              viewBox="0 0 1280 720"
              preserveAspectRatio="xMidYMid slice"
              style={{ width: '100%', height: '100%' }}
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
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <div className="text-gray-500">Loading image...</div>
          </div>
        )}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="text-sm">Image failed to load</div>
              <div className="text-xs mt-1">Using placeholder</div>
            </div>
          </div>
        )}
      </div>
          
          {/* Spacebar Feature Text - Desktop Only */}
          <div className="hidden lg:block text-center mt-4">
            <p className="text-sm italic text-gray-600 flex items-center justify-center gap-1">
              Press Spacebar for Magic
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 32 32">
                <g>
                  <path d="M12,17c0.8-4.2,1.9-5.3,6.1-6.1c0.5-0.1,0.8-0.5,0.8-1s-0.3-0.9-0.8-1C13.9,8.1,12.8,7,12,2.8C11.9,2.3,11.5,2,11,2
                    c-0.5,0-0.9,0.3-1,0.8C9.2,7,8.1,8.1,3.9,8.9C3.5,9,3.1,9.4,3.1,9.9s0.3,0.9,0.8,1c4.2,0.8,5.3,1.9,6.1,6.1c0.1,0.5,0.5,0.8,1,0.8
                    S11.9,17.4,12,17z"/>
                  <path d="M22,24c-2.8-0.6-3.4-1.2-4-4c-0.1-0.5-0.5-0.8-1-0.8s-0.9,0.3-1,0.8c-0.6,2.8-1.2,3.4-4,4c-0.5,0.1-0.8,0.5-0.8,1
                    s0.3,0.9,0.8,1c2.8,0.6,3.4,1.2,4,4c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c0.6-2.8,1.2-3.4,4-4c0.5-0.1,0.8-0.5,0.8-1
                    S22.4,24.1,22,24z"/>
                  <path d="M29.2,14c-2.2-0.4-2.7-0.9-3.1-3.1c-0.1-0.5-0.5-0.8-1-0.8c-0.5,0-0.9,0.3-1,0.8c-0.4,2.2-0.9,2.7-3.1,3.1
                    c-0.5,0.1-0.8,0.5-0.8,1s0.3,0.9,0.8,1c2.2,0.4,2.7,0.9,3.1,3.1c0.1,0.5,0.5,0.8,1,0.8c0.5,0,0.9-0.3,1-0.8
                    c0.4-2.2,0.9-2.7,3.1-3.1c0.5-0.1,0.8-0.5,0.8-1S29.7,14.1,29.2,14z"/>
                  <path d="M5.7,22.3C5.4,22,5,21.9,4.6,22.1c-0.1,0-0.2,0.1-0.3,0.2c-0.1,0.1-0.2,0.2-0.2,0.3C4,22.7,4,22.9,4,23s0,0.3,0.1,0.4
                    c0.1,0.1,0.1,0.2,0.2,0.3c0.1,0.1,0.2,0.2,0.3,0.2C4.7,24,4.9,24,5,24c0.1,0,0.3,0,0.4-0.1s0.2-0.1,0.3-0.2
                    c0.1-0.1,0.2-0.2,0.2-0.3C6,23.3,6,23.1,6,23s0-0.3-0.1-0.4C5.9,22.5,5.8,22.4,5.7,22.3z"/>
                  <path d="M28,7c0.3,0,0.5-0.1,0.7-0.3C28.9,6.5,29,6.3,29,6s-0.1-0.5-0.3-0.7c-0.1-0.1-0.2-0.2-0.3-0.2c-0.2-0.1-0.5-0.1-0.8,0
                    c-0.1,0-0.2,0.1-0.3,0.2C27.1,5.5,27,5.7,27,6c0,0.3,0.1,0.5,0.3,0.7C27.5,6.9,27.7,7,28,7z"/>
                </g>
              </svg>
            </p>
          </div>
        </div>
        
        {/* Right Column - Wall Selection - Fixed Width */}
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
                  className={`w-full h-24 rounded-lg border-2 flex items-center justify-center mb-2 relative transition-all duration-200 overflow-hidden ${
                    assignments[wallKey] === '#FFFFFF' ? 'border-gray-300' : ''
                  }`}
              style={{ 
                borderColor: assignments[wallKey] === '#FFFFFF' ? '#d1d5db' : (assignments[wallKey] || '#e5e7eb'), 
                background: assignments[wallKey] || '#fff' 
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
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">Brand:</span>
                <span className="text-sm text-gray-800">
                  {getBrandName(selectedBrandId)}
                </span>
              </div>
            </div>
            
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
                      <div 
                        className={`w-3 h-3 rounded-full ${color === '#FFFFFF' ? 'border border-gray-300' : ''}`} 
                        style={{ background: color }} 
                      />
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
                {palette.map((color, idx) => {
                  const isCurrentlySelected = activeSide && assignments[activeSide] === color;
                  return (
                    <div key={color + idx} className="flex flex-col items-center">
                      <div className="relative">
                        <button
                          className={`w-16 h-12 rounded border-2 focus:outline-none transition-all duration-200 ${
                            color === '#FFFFFF' 
                              ? 'border-gray-300 hover:border-gray-500' 
                              : 'border-white hover:border-gray-400'
                          }`}
                          style={{ background: color }}
                          onClick={() => onAssignColor(color)}
                          aria-label={`Apply color ${color}`}
                          title={selectedColors[idx] ? `${capitalizeWords(selectedColors[idx].colorName)} (${selectedColors[idx].colorCode})` : color === '#FFFFFF' ? 'White (#FFFFFF)' : color}
                        />
                        {/* Tick icon for currently selected color */}
                        {isCurrentlySelected && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#299dd7] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </div>
                    {/* Colour name and code */}
                    {selectedColors[idx] ? (
                      <div className="mt-1 text-xs text-gray-600 text-center w-full h-8 flex flex-col justify-center">
                        <div className="font-medium leading-tight">{capitalizeWords(selectedColors[idx].colorName)}</div>
                        <div className="text-gray-500 leading-tight">{selectedColors[idx].colorCode}</div>
                      </div>
                    ) : color === '#FFFFFF' ? (
                      <div className="mt-1 text-xs text-gray-600 text-center w-full h-8 flex flex-col justify-center">
                        <div className="font-medium leading-tight">White</div>
                        <div className="text-gray-500 leading-tight">#FFFFFF</div>
                      </div>
                    ) : null}
                    </div>
                  );
                })}
              </div>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden w-full">
        {/* Room image - with zoom functionality */}
        <div className={`${isZoomed ? 'h-auto' : 'h-[60vh]'} mb-3 relative overflow-hidden transition-all duration-500 ease-in-out`}>
          <div 
            ref={previewScrollRef}
            className={`${isZoomed ? 'h-auto' : 'h-full'} overflow-x-auto scrollbar-hide relative transition-all duration-500 ease-in-out`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            <div className={`${isZoomed ? 'w-full' : 'h-full flex items-center justify-center min-w-max'} transition-all duration-500 ease-in-out`}>
              <div ref={roomPreviewRef} className={`relative room-preview-container overflow-hidden rounded-lg ${isZoomed ? 'w-full' : 'h-full flex items-center justify-center'} transition-all duration-500 ease-in-out`} style={{ minHeight: isZoomed ? 'auto' : '100%', aspectRatio: isZoomed ? '16/9' : 'auto' }}>
                <img
                  src={variant.mainImage}
                  alt={variant.label}
                  className={`w-full h-full object-cover transition-all duration-500 ease-in-out transform`}
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  onError={(e) => {
                    console.error('Failed to load image:', variant.mainImage);
                    setImageError(true);
                    setImageLoading(false);
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Room+Preview';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', variant.mainImage);
                    setImageLoading(false);
                    setImageError(false);
                  }}
                />
                {/* SVG Overlay for wall masking */}
                <svg 
                  className="svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply transition-all duration-500 ease-in-out"
                  viewBox="0 0 1280 720"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ width: '100%', height: '100%' }}
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
                {imageLoading && !imageError && (
                  <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                    <div className="text-gray-500">Loading image...</div>
                  </div>
                )}
                {imageError && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <div className="text-sm">Image failed to load</div>
                      <div className="text-xs mt-1">Using placeholder</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Zoom Toggle Button */}
          <button
            onClick={handleZoomToggle}
            className="absolute bottom-4 right-4 z-20 rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? (
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
              </svg>
            )}
          </button>
          
          {/* Swipe hint overlay (original) - only show when not zoomed */}
          {showSwipeHint && !isZoomed && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20 transition-opacity duration-300">
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
        <div className="lg:hidden w-full max-w-2xl mb-6 relative pb-2">
          <button
            type="button"
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-200 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => {
              if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: window.innerWidth < 768 ? -112 : -160, behavior: 'smooth' });
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
                className={`flex flex-col items-center group flex-shrink-0 w-20 md:w-28 bg-white rounded-xl border-2 transition-all duration-200 ${assignments[wallKey] ? 'shadow-lg' : 'shadow'} ${
                  assignments[wallKey] === '#FFFFFF' ? 'border-gray-300' : ''
                }`}
                onClick={() => handleWallClick(wallKey)}
                type="button"
                style={{ 
                  minWidth: window.innerWidth < 768 ? '5rem' : '7rem',
                  borderColor: assignments[wallKey] === '#FFFFFF' ? '#d1d5db' : (assignments[wallKey] || '#e5e7eb')
                }}
              >
                <div
                  className="h-14 md:h-20 flex items-center justify-center relative overflow-hidden mx-auto"
                  style={{ 
                    background: assignments[wallKey] || '#fff',
                    width: window.innerWidth < 768 ? '4.8rem' : '6.8rem',
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
                <span className="text-sm md:text-base font-medium text-gray-700 text-center py-2 px-1">{wallLabels[wallKey] || wallKey}</span>
          </button>
        ))}
      </div>
          <button
            type="button"
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-opacity duration-200 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => {
              if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: window.innerWidth < 768 ? 112 : 160, behavior: 'smooth' });
            }}
            aria-label="Scroll right"
          >
            <span className="text-2xl">›</span>
          </button>
        </div>
        
        {/* Mobile/Tablet Information Box */}
        <div className="w-full lg:max-w-2xl mb-6" data-section="summary">
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
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-600">Brand:</span>
                <span className="text-sm text-gray-800">
                  {getBrandName(selectedBrandId)}
                </span>
              </div>
            </div>
            
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
                      <div 
                        className={`w-3 h-3 rounded-full ${color === '#FFFFFF' ? 'border border-gray-300' : ''}`} 
                        style={{ background: color }} 
                      />
                      <span className="text-xs text-gray-700">{wallLabels[wallKey] || wallKey}</span>
                      {colorInfo && (
                        <span className="text-xs text-gray-500">({capitalizeWords(colorInfo.colorName)} - {colorInfo.colorCode})</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Download Button - Desktop Only */}
            <div className="hidden lg:block">
              <button
                className="w-full px-4 py-3 bg-[#299dd7] text-white font-semibold rounded-lg hover:bg-[#1e7bb8] transition-colors duration-200 flex items-center justify-center gap-2"
                onClick={onDownload}
              >
                <span>DOWNLOAD THIS LOOK</span>
                <span className="text-lg">▼</span>
              </button>
            </div>
            
            {/* Download Button - Mobile/Tablet (Inside Summary) */}
            <div className="lg:hidden">
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
      </div>

      {/* Floating Magic Button - Mobile/Tablet Only */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        <button
          className="w-16 h-16 bg-[#ED276E] text-white rounded-full shadow-lg hover:bg-[#b81d5a] transition-colors duration-200 flex flex-col items-center justify-center"
          onClick={handleRandomRecolor}
          title="Press Spacebar for Magic"
        >
          <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 32 32">
            <g>
              <path d="M12,17c0.8-4.2,1.9-5.3,6.1-6.1c0.5-0.1,0.8-0.5,0.8-1s-0.3-0.9-0.8-1C13.9,8.1,12.8,7,12,2.8C11.9,2.3,11.5,2,11,2
                c-0.5,0-0.9,0.3-1,0.8C9.2,7,8.1,8.1,3.9,8.9C3.5,9,3.1,9.4,3.1,9.9s0.3,0.9,0.8,1c4.2,0.8,5.3,1.9,6.1,6.1c0.1,0.5,0.5,0.8,1,0.8
                S11.9,17.4,12,17z"/>
              <path d="M22,24c-2.8-0.6-3.4-1.2-4-4c-0.1-0.5-0.5-0.8-1-0.8s-0.9,0.3-1,0.8c-0.6,2.8-1.2,3.4-4,4c-0.5,0.1-0.8,0.5-0.8,1
                s0.3,0.9,0.8,1c2.8,0.6,3.4,1.2,4,4c0.1,0.5,0.5,0.8,1,0.8s0.9-0.3,1-0.8c0.6-2.8,1.2-3.4,4-4c0.5-0.1,0.8-0.5,0.8-1
                S22.4,24.1,22,24z"/>
              <path d="M29.2,14c-2.2-0.4-2.7-0.9-3.1-3.1c-0.1-0.5-0.5-0.8-1-0.8c-0.5,0-0.9,0.3-1,0.8c-0.4,2.2-0.9,2.7-3.1,3.1
                c-0.5,0.1-0.8,0.5-0.8,1s0.3,0.9,0.8,1c2.2,0.4,2.7,0.9,3.1,3.1c0.1,0.5,0.5,0.8,1,0.8c0.5,0,0.9-0.3,1-0.8
                c0.4-2.2,0.9-2.7,3.1-3.1c0.5-0.1,0.8-0.5,0.8-1S29.7,14.1,29.2,14z"/>
              <path d="M5.7,22.3C5.4,22,5,21.9,4.6,22.1c-0.1,0-0.2,0.1-0.3,0.2c-0.1,0.1-0.2,0.2-0.2,0.3C4,22.7,4,22.9,4,23s0,0.3,0.1,0.4
                c0.1,0.1,0.1,0.2,0.2,0.3c0.1,0.1,0.2,0.2,0.3,0.2C4.7,24,4.9,24,5,24c0.1,0,0.3,0,0.4-0.1s0.2-0.1,0.3-0.2
                c0.1-0.1,0.2-0.2,0.2-0.3C6,23.3,6,23.1,6,23s0-0.3-0.1-0.4C5.9,22.5,5.8,22.4,5.7,22.3z"/>
              <path d="M28,7c0.3,0,0.5-0.1,0.7-0.3C28.9,6.5,29,6.3,29,6s-0.1-0.5-0.3-0.7c-0.1-0.1-0.2-0.2-0.3-0.2c-0.2-0.1-0.5-0.1-0.8,0
                c-0.1,0-0.2,0.1-0.3,0.2C27.1,5.5,27,5.7,27,6c0,0.3,0.1,0.5,0.3,0.7C27.5,6.9,27.7,7,28,7z"/>
            </g>
          </svg>
          <span className="text-xs font-medium">Magic</span>
        </button>
      </div>

      {/* Mobile Palette bottom sheet/modal */}
      {showPalette && (
        <div className="lg:hidden fixed inset-0 z-[60] flex items-end justify-center bg-black bg-opacity-40" onClick={onClosePalette}>
          <div className="w-full max-w-md bg-white rounded-t-2xl p-6 pb-20 shadow-lg relative" style={{ minHeight: 260, maxHeight: '80vh' }} onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-center mb-4">Select colour to apply</h3>
            <div className="grid grid-cols-3 gap-4 mb-2">
              {palette.map((color, idx) => {
                const isCurrentlySelected = activeSide && assignments[activeSide] === color;
                return (
                  <div key={color + idx} className="flex flex-col items-center">
                    <div className="relative">
                      <button
                        className={`w-20 h-16 rounded border-2 focus:outline-none transition-all duration-200 ${
                          color === '#FFFFFF' 
                            ? 'border-gray-300 hover:border-gray-500' 
                            : 'border-white hover:border-gray-400'
                        }`}
                        style={{ background: color }}
                        onClick={() => onAssignColor(color)}
                        aria-label={`Apply color ${color}`}
                        title={selectedColors[idx] ? `${capitalizeWords(selectedColors[idx].colorName)} (${selectedColors[idx].colorCode})` : color === '#FFFFFF' ? 'White (#FFFFFF)' : color}
                      />
                      {/* Tick icon for currently selected color */}
                      {isCurrentlySelected && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#299dd7] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  {/* Colour name and code */}
                  {selectedColors[idx] ? (
                    <div className="mt-1 text-xs text-gray-600 text-center w-full h-8 flex flex-col justify-center">
                      <div className="font-medium leading-tight">{capitalizeWords(selectedColors[idx].colorName)}</div>
                      <div className="text-gray-500 leading-tight">{selectedColors[idx].colorCode}</div>
                    </div>
                  ) : color === '#FFFFFF' ? (
                    <div className="mt-1 text-xs text-gray-600 text-center w-full h-8 flex flex-col justify-center">
                      <div className="font-medium leading-tight">White</div>
                      <div className="text-gray-500 leading-tight">#FFFFFF</div>
                    </div>
                  ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      {/* PDF Generation Modal */}
      <PDFGenerationModal
        isOpen={showPDFModal || false}
        onClose={onClosePDFModal || (() => {})}
        onGenerate={handleGeneratePDF}
        isGenerating={isGeneratingPDF || false}
      />
    </main>
  );
};

export default FinishSelection; 