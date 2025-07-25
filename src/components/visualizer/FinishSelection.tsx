import React from 'react';
import { VariantManifest } from '../../hooks/useVisualizer';

interface FinishSelectionProps {
  variant: VariantManifest;
  palette: string[];
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
}

const wallLabels: Record<string, string> = {
  front: 'Front Wall',
  left: 'Left Wall',
  right: 'Right Wall',
  roof: 'Roof',
};

const FinishSelection: React.FC<FinishSelectionProps> = ({
  variant,
  palette,
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
}) => {
  const wallKeys = Object.keys(variant.walls);
  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-8 flex flex-col items-center px-4 md:px-0 relative">
      <div className="w-full max-w-4xl flex items-center mb-6">
        <button
          className="text-[#299dd7] font-medium flex items-center gap-2 hover:underline"
          onClick={onBack}
        >
          <span className="text-lg">←</span> Back
        </button>
      </div>
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
          className="svg-overlay absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="wall-mask">
              <rect width="100%" height="100%" fill="black"/>
              {wallKeys.map((wallKey) => {
                if (!assignments[wallKey] || !wallMasks[wallKey]) return null;
                return <path key={wallKey} d={wallMasks[wallKey]} fill="white"/>;
              })}
            </mask>
          </defs>
          <rect 
            width="100%" 
            height="100%" 
            fill={wallKeys.map(wallKey => assignments[wallKey]).filter(Boolean)[0] || "#ffffff"} 
            opacity="0.7"
            mask="url(#wall-mask)"
            className="wall-path"
          />
        </svg>
        {loadingMasks && (
          <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
            <div className="text-gray-500">Loading masks...</div>
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Select wall to paint:</h2>
      {/* Wall sides grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl mb-8">
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
      {/* Fixed bottom button */}
      <button
        className="fixed left-1/2 -translate-x-1/2 bottom-6 px-8 py-4 rounded-xl bg-white text-black font-bold text-lg shadow-lg border border-gray-200 flex items-center gap-2 z-50"
        style={{ minWidth: 280 }}
        onClick={onDownload}
      >
        DOWNLOAD THIS LOOK <span className="text-2xl">▼</span>
      </button>
      {/* Palette bottom sheet/modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40" onClick={onClosePalette}>
          <div className="w-full max-w-md bg-white rounded-t-2xl p-6 pb-10 shadow-lg relative" style={{ minHeight: 260 }} onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-center mb-4">Select color to apply</h3>
            <div className="grid grid-cols-3 gap-4 mb-2">
              {palette.map((color, idx) => (
                <button
                  key={color + idx}
                  className="w-20 h-16 rounded border-2 border-white hover:border-gray-400 focus:outline-none"
                  style={{ background: color }}
                  onClick={() => onAssignColor(color)}
                  aria-label={`Apply color ${color}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FinishSelection; 