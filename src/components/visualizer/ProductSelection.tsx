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
    
    <h2 className="text-xl font-semibold text-[#299dd7] mb-2 text-center">Step 3: Choose a Paint Brand</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Select your preferred paint brand to see their color options.</p>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full max-w-4xl">
      {BRAND_CONFIG.map((brand) => (
        <button
          key={brand.id}
          className={`flex flex-col items-center rounded-xl border-2 transition-all duration-200 p-3 bg-white shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#299dd7] ${selectedBrandId === brand.id ? 'border-[#299dd7] ring-2 ring-[#299dd7]' : 'border-gray-200'}`}
          onClick={() => onSelectBrand(brand.id)}
          type="button"
        >
          <div className="w-20 h-20 rounded-lg overflow-hidden mb-2 bg-gray-100 flex items-center justify-center">
            <img src={brand.logo} alt={brand.name} className="object-contain w-full h-full" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Logo')} />
          </div>
          <span className="text-base font-medium text-gray-700 text-center mt-1">{brand.name}</span>
        </button>
      ))}
    </div>
  </main>
);

export default ProductSelection; 