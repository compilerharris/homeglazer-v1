import React from 'react';
import { VariantManifest } from '../../hooks/useVisualizer';
import { getMediaUrl } from '@/lib/mediaUrl';
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
  <main className="min-h-screen bg-white pt-28 pb-8 flex flex-col items-center px-4 lg:px-0">
    {/* Breadcrumbs Section */}
    {breadcrumbs.length > 0 && (
      <div className="w-full mb-4">
                  <h3 className="text-sm font-medium mb-2 text-center">
            Modify your selections here:
          </h3>
        <Breadcrumbs items={breadcrumbs} onStepClick={onStepClick} />
      </div>
    )}
    
    <h2 className="text-xl font-semibold mb-2 text-center">Step 2: Choose a Room Variant</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Pick a photo/variant that best matches your space.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
      {variants.map((variant) => (
        <div key={variant.name} className="flex flex-col items-center">
        <button
            className="w-full focus:outline-none focus:ring-2 focus:ring-[#299dd7] rounded-xl overflow-hidden"
          onClick={() => onSelectVariant(variant.name)}
          type="button"
        >
            <div className="w-full h-48 lg:h-56 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
              <img 
                src={getMediaUrl(variant.mainImage)} 
                alt={variant.label} 
                className="object-cover w-full h-full rounded-lg" 
                onError={(e) => {
                  const img = e.currentTarget;
                  if (!img.dataset.errorHandled) {
                    img.dataset.errorHandled = 'true';
                    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ERoom%3C/text%3E%3C/svg%3E';
                    img.onerror = () => { img.style.display = 'none'; };
                  }
                }}
              />
          </div>
        </button>
          <span className="text-lg font-semibold text-gray-800 text-center mt-3">{variant.label}</span>
        </div>
      ))}
    </div>
  </main>
);

export default WallSelection; 