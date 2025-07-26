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
  const [isButtonFixed, setIsButtonFixed] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Convert selectedColors to palette (hex values)
  const palette = selectedColors.map(color => color.colorHex);

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
  
  return (
    <main className={`min-h-screen bg-gray-50 pt-28 flex flex-col items-center px-4 md:px-0 relative ${isButtonFixed ? 'pb-8' : 'pb-32'}`}>
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
      {/* Room image */}
      <div className="w-full max-w-2xl mb-6 relative" style={{ aspectRatio: '16/9' }}>
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
                  <mask id={`wall-mask-${wallKey}`}>
                    <rect width="100%" height="100%" fill="black"/>
                    <path d={wallMasks[wallKey]} fill="white"/>
                  </mask>
                </defs>
                <rect 
                  width="100%" 
                  height="100%" 
                  fill={assignments[wallKey]}
                  opacity="0.7"
                  mask={`url(#wall-mask-${wallKey})`}
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
      <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Select wall to paint:</h2>
      {/* Wall sides grid */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl ${isButtonFixed ? 'mb-8' : 'mb-4'}`}>
        {wallKeys.map((wallKey) => (
          <button
            key={wallKey}
            className="flex flex-col items-center group"
            onClick={() => onOpenPalette(wallKey)}
            type="button"
          >
            <div
              className="w-28 h-20 rounded border-2 flex items-center justify-center mb-2 relative transition-all duration-200 overflow-hidden"
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
            <span className="text-base font-medium text-gray-700 text-center mt-1">{wallLabels[wallKey] || wallKey}</span>
          </button>
        ))}
      </div>
      {/* Mobile DOWNLOAD THIS LOOK Button - Full Width, Dynamic */}
      <div className={`md:hidden bg-white border-t border-gray-200 px-4 py-3 transition-all duration-300 ${
        isButtonFixed ? 'fixed left-0 right-0 bottom-[68px] z-50' : 'absolute left-0 right-0 bottom-8 z-40'
      }`}>
        <button
          className="w-full px-8 py-4 rounded-xl bg-[#299dd7] text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          onClick={onDownload}
        >
          DOWNLOAD THIS LOOK <span className="text-2xl">▼</span>
        </button>
      </div>

      {/* Desktop DOWNLOAD THIS LOOK Button */}
      <div className="hidden md:block">
        <div className={`transition-all duration-300 ${
          isButtonFixed ? 'fixed left-1/2 -translate-x-1/2 bottom-6 z-50' : 'absolute left-1/2 -translate-x-1/2 bottom-8 z-40'
        }`}>
          <button
            className="px-8 py-4 rounded-xl bg-white text-black font-bold text-lg shadow-lg border border-gray-200 flex items-center gap-2 z-50 mx-auto"
            style={{ minWidth: 280 }}
            onClick={onDownload}
          >
            DOWNLOAD THIS LOOK <span className="text-2xl">▼</span>
          </button>
        </div>
      </div>
      {/* Palette bottom sheet/modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40" onClick={onClosePalette}>
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
                    title={selectedColors[idx] ? `${selectedColors[idx].colorName} (${selectedColors[idx].colorCode})` : color}
                  />
                  {/* Colour name and code */}
                  {selectedColors[idx] && (
                    <div className="mt-1 text-xs text-gray-600 text-center max-w-20 truncate" title={`${capitalizeWords(selectedColors[idx].colorName)} (${selectedColors[idx].colorCode})`}>
                      {capitalizeWords(selectedColors[idx].colorName)}
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