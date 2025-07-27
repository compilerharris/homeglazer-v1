import React from 'react';
import { BRAND_CONFIG } from '../../hooks/useVisualizer';
import Breadcrumbs from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  step: number;
  isActive?: boolean;
}

interface ProductSelectionProps {
  selectedBrandId: string | null;
  onSelectBrand: (brandId: string) => void;
  onBack: () => void;
  backButtonText?: string;
  breadcrumbs?: BreadcrumbItem[];
  onStepClick?: (step: number) => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
  selectedBrandId,
  onSelectBrand,
  onBack,
  backButtonText = "Change Room Variant",
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
    
    <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Step 3: Choose a Paint Brand</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Select your preferred paint brand to see their color options.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5xl">
      {BRAND_CONFIG.map((brand) => (
        <div key={brand.id} className="flex flex-col items-center">
          <button
            className="w-full focus:outline-none focus:ring-2 focus:ring-[#299dd7] rounded-xl overflow-hidden"
            onClick={() => onSelectBrand(brand.id)}
            type="button"
          >
            <div className="w-full h-48 md:h-56 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center p-8 overflow-hidden">
              <img src={brand.logo} alt={brand.name} className="object-contain w-full h-full rounded-lg" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Logo')} />
            </div>
          </button>
          <span className="text-lg font-semibold text-gray-800 text-center mt-3">{brand.name}</span>
        </div>
      ))}
    </div>
  </main>
);

export default ProductSelection; 