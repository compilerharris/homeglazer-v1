import React from 'react';
import { BRAND_CONFIG } from '../../hooks/useVisualizer';
import { getMediaUrl } from '@/lib/mediaUrl';
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
    
    <h2 className="text-xl font-semibold mb-2 text-center">Step 3: Choose a Paint Brand</h2>
    <p className="mb-8 text-gray-600 text-center max-w-xl">Select your preferred paint brand to see their color options.</p>
    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4 w-full max-w-7xl mx-auto justify-items-center">
      {BRAND_CONFIG.map((brand) => {
        const resolvedLogoUrl = getMediaUrl(brand.logo);
        return (
          <div key={brand.id} className="flex flex-col items-center">
          <button
              className="w-full focus:outline-none focus:ring-2 focus:ring-[#299dd7] rounded-xl overflow-hidden"
            onClick={() => onSelectBrand(brand.id)}
            type="button"
          >
              <div className="w-full aspect-square bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center p-3 sm:p-4 overflow-hidden">
                <img 
                  src={resolvedLogoUrl} 
                  alt={brand.name} 
                  className="object-contain w-full h-full rounded-lg" 
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.dataset.errorHandled) {
                      console.error('[ProductSelection] Failed to load brand logo:', {
                        brandId: brand.id,
                        brandName: brand.name,
                        originalLogoPath: brand.logo,
                        resolvedLogoUrl: resolvedLogoUrl,
                      });
                      img.dataset.errorHandled = 'true';
                      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ELogo%3C/text%3E%3C/svg%3E';
                      img.onerror = () => { img.style.display = 'none'; };
                    }
                  }} 
                />
            </div>
          </button>
            <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center mt-2">{brand.name}</span>
          </div>
        );
      })}
    </div>
  </main>
);

export default ProductSelection; 