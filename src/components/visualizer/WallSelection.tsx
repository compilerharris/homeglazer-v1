import React from 'react';
import { VariantManifest } from '../../hooks/useVisualizer';

interface WallSelectionProps {
  variants: VariantManifest[];
  selectedVariantName: string | null;
  onSelectVariant: (variantName: string) => void;
  onBack: () => void;
}

const WallSelection: React.FC<WallSelectionProps> = ({
  variants,
  selectedVariantName,
  onSelectVariant,
  onBack,
}) => (
  <main className="min-h-screen bg-gray-50 pt-28 pb-8 flex flex-col items-center px-4 md:px-0">
    <div className="w-full max-w-4xl flex items-center mb-6">
      <button
        className="text-[#299dd7] font-medium flex items-center gap-2 hover:underline"
        onClick={onBack}
      >
        <span className="text-lg">←</span> Back
      </button>
    </div>
    <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Step 2: Choose a Room Variant</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Pick a photo/variant that best matches your space.</p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
      {variants.map((variant) => (
        <button
          key={variant.name}
          className={`rounded-xl border-2 transition-all duration-200 p-2 bg-white shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#299dd7] ${selectedVariantName === variant.name ? 'border-[#299dd7] ring-2 ring-[#299dd7]' : 'border-gray-200'}`}
          onClick={() => onSelectVariant(variant.name)}
          type="button"
        >
          <div className="w-32 h-24 md:w-40 md:h-32 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            <img src={variant.mainImage} alt={variant.label} className="object-cover w-full h-full" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Room')}/>
          </div>
          <span className="text-base font-medium text-gray-700 text-center mt-1">{variant.label}</span>
        </button>
      ))}
    </div>
  </main>
);

export default WallSelection; 