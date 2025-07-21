import React from 'react';
import { BrandColor } from '../../hooks/useVisualizer';

interface ColorSelectionProps {
  palette: string[];
  swatches: BrandColor[];
  maxPalette: number;
  onAddColor: (color: string) => void;
  onRemoveColor: (idx: number) => void;
  onBack: () => void;
  onNext: () => void;
}

const ColorSelection: React.FC<ColorSelectionProps> = ({
  palette,
  swatches,
  maxPalette,
  onAddColor,
  onRemoveColor,
  onBack,
  onNext,
}) => {
  // For demo, repeat swatches to fill grid
  const allSwatches = Array(6).fill(swatches).flat();
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
      <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Step 4: Add Your Favourite Colors</h2>
      <p className="mb-6 text-gray-600 text-center max-w-xl">Tap colors to add them to your palette. You can add up to {maxPalette} colors.</p>
      {/* Palette row */}
      <div className="flex gap-2 mb-6 w-full max-w-2xl">
        {Array.from({length: maxPalette}).map((_, idx) => (
          <div key={idx} className="w-16 h-16 border flex items-center justify-center bg-white relative">
            {palette[idx] ? (
              <>
                <div className="w-12 h-12 rounded bg-white border-2" style={{ background: palette[idx] }} />
                <button
                  className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-xs text-gray-500 hover:bg-gray-100 z-10"
                  onClick={() => onRemoveColor(idx)}
                  aria-label="Remove color"
                >
                  ×
                </button>
              </>
            ) : (
              <button
                className="w-full h-full flex items-center justify-center text-3xl text-gray-300"
                onClick={() => {}}
                disabled
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Swatch grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2 w-full max-w-4xl mb-32">
        {allSwatches.map((swatch, idx) => (
          <button
            key={swatch.code + idx}
            className="w-12 h-12 rounded border-2 border-white hover:border-gray-400 focus:outline-none"
            style={{ background: swatch.code }}
            onClick={() => onAddColor(swatch.code)}
            disabled={palette.includes(swatch.code) || palette.length >= maxPalette}
            aria-label={swatch.name}
          />
        ))}
      </div>
      {/* Fixed bottom button */}
      <button
        className="fixed left-1/2 -translate-x-1/2 bottom-6 px-8 py-4 rounded-xl bg-white text-black font-bold text-lg shadow-lg border border-gray-200 flex items-center gap-2 z-50 disabled:opacity-50"
        style={{ minWidth: 280 }}
        disabled={palette.length === 0}
        onClick={onNext}
      >
        COLOR YOUR ROOM <span className="text-2xl">→</span>
      </button>
    </main>
  );
};

export default ColorSelection; 