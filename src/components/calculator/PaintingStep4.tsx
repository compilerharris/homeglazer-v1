import React from 'react';

interface PaintingStep4Props {
  paintCategory: string;
  onPaintCategoryChange: (value: string) => void;
  paintBrand: string;
  onPaintBrandChange: (value: string) => void;
  paintType: string;
  onPaintTypeChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PaintingStep4: React.FC<PaintingStep4Props> = ({
  paintCategory,
  onPaintCategoryChange,
  paintBrand,
  onPaintBrandChange,
  paintType,
  onPaintTypeChange,
  onNext,
  onBack
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-8">
        Please Select Your Paint
      </h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-lg font-medium mb-3">
            Select Your Paint Category
          </label>
          <select
            value={paintCategory}
            onChange={(e) => onPaintCategoryChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          >
            <option value="">Select Category</option>
            <option value="economical">Economical</option>
            <option value="premium">Premium</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-3">
            Select Your Brands
          </label>
          <select
            value={paintBrand}
            onChange={(e) => onPaintBrandChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
            disabled={!paintCategory}
          >
            <option value="">Select Brands</option>
            {paintCategory === 'economical' && (
              <>
                <option value="asian-paints-tractor">Asian Paints Tractor</option>
                <option value="berger-bison">Berger Bison</option>
                <option value="nerolac-beauty">Nerolac Beauty</option>
              </>
            )}
            {paintCategory === 'premium' && (
              <>
                <option value="asian-paints-royal">Asian Paints Royal</option>
                <option value="berger-silk">Berger Silk</option>
                <option value="nerolac-impression">Nerolac Impression</option>
              </>
            )}
            {paintCategory === 'luxury' && (
              <>
                <option value="asian-paints-royale-luxury">Asian Paints Royale Luxury</option>
                <option value="berger-silk-luxury">Berger Silk Luxury</option>
                <option value="dulux-velvet-touch">Dulux Velvet Touch</option>
              </>
            )}
          </select>
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-3">
            Select Your Paints
          </label>
          <select
            value={paintType}
            onChange={(e) => onPaintTypeChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
            disabled={!paintBrand}
          >
            <option value="">Select Paint</option>
            <option value="interior">Interior Paint</option>
            <option value="exterior">Exterior Paint</option>
            <option value="primer">Primer</option>
            <option value="enamel">Enamel Paint</option>
            <option value="distemper">Distemper</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-between mt-12">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"
        >
          BACK
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-lg bg-[#ED276E] text-white hover:bg-[#d51e5f]"
          disabled={!paintCategory || !paintBrand || !paintType}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default PaintingStep4; 