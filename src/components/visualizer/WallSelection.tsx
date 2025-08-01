import React from 'react';
import { VariantManifest } from '../../hooks/useVisualizer';
import Breadcrumbs from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  step: number;
  isActive?: boolean;
}

interface WallSelectionProps {
  variants: VariantManifest[];
  selectedVariantName: string | null;
  onSelectVariant: (variantName: string) => void;
  onBack: () => void;
  backButtonText?: string;
  breadcrumbs?: BreadcrumbItem[];
  onStepClick?: (step: number) => void;
}

const WallSelection: React.FC<WallSelectionProps> = ({
  variants,
  selectedVariantName,
  onSelectVariant,
  onBack,
  backButtonText = "Change Room Type",
  breadcrumbs = [],
  onStepClick,
}) => (
  <main className="min-h-screen bg-white pt-28 pb-8 flex flex-col items-center px-4 md:px-0">
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
    
    <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Step 2: Choose a Room Variant</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Pick a photo/variant that best matches your space.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
      {variants.map((variant) => (
        <div key={variant.name} className="flex flex-col items-center">
        <button
            className="w-full focus:outline-none focus:ring-2 focus:ring-[#299dd7] rounded-xl overflow-hidden"
          onClick={() => onSelectVariant(variant.name)}
          type="button"
        >
            <div className="w-full h-48 md:h-56 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
              <img src={variant.mainImage} alt={variant.label} className="object-cover w-full h-full rounded-lg" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Room')}/>
          </div>
        </button>
          <span className="text-lg font-semibold text-gray-800 text-center mt-3">{variant.label}</span>
        </div>
      ))}
    </div>
  </main>
);

export default WallSelection; 