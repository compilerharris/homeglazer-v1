import React, { useState } from 'react';

// Define the structure for wood finish options (should match MultiStepWoodPolishingCalculator.tsx)
interface WoodFinishOption {
  value: string;
  name: string;
}

interface WoodFinishBrand {
  [brand: string]: WoodFinishOption[];
}

interface WoodFinishOptions {
  [finishType: string]: WoodFinishBrand;
}

interface WoodPolishingStep1Props {
  workType: 'area' | 'items';
  onWorkTypeChange: (value: 'area' | 'items') => void;
  area: number;
  onAreaChange: (value: number) => void;
  itemCounts: {
    doors: number;
    windows: number;
    wallPanels: number;
    furnitureArea: number;
  };
  onItemCountChange: (item: string, value: number) => void;
  woodFinishOptions: WoodFinishOptions; // Added prop for wood finish data
  selectedWoodFinishType: string; // Added prop for selected finish type
  onWoodFinishTypeChange: (value: string) => void; // Added prop for finish type handler
  selectedWoodFinishBrand: string; // Added prop for selected brand
  onWoodFinishBrandChange: (value: string) => void; // Added prop for brand handler
  selectedWoodFinish: WoodFinishOption | null; // Added prop for selected finish
  onWoodFinishChange: (value: string) => void; // Added prop for finish handler
  onNext: () => void;
  onBack: () => void;
}

const WoodPolishingStep1: React.FC<WoodPolishingStep1Props> = ({
  workType,
  onWorkTypeChange,
  area,
  onAreaChange,
  itemCounts,
  onItemCountChange,
  woodFinishOptions, // Destructure new props
  selectedWoodFinishType,
  onWoodFinishTypeChange,
  selectedWoodFinishBrand,
  onWoodFinishBrandChange,
  selectedWoodFinish,
  onWoodFinishChange,
  onNext,
  onBack
}) => {
  const inputMethod = workType;
  const setInputMethod = onWorkTypeChange;

  const doorOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const windowOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const wallPanelOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Get available brands based on selected finish type
  const availableBrands = selectedWoodFinishType
    ? Object.keys(woodFinishOptions[selectedWoodFinishType])
    : [];

  // Get available finishes based on selected finish type and brand
  const availableFinishes = selectedWoodFinishType && selectedWoodFinishBrand
    ? woodFinishOptions[selectedWoodFinishType]?.[selectedWoodFinishBrand] || []
    : [];

  // Add Indian currency formatter function
  const formatIndianCurrency = (number: number): string => {
    const numStr = number.toString();
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
    return formatted;
  };

  // Calculate wood polishing estimate
  const calculateWoodPolishingEstimate = () => {
    if (!selectedWoodFinish) return 0;

    const finishValue = Number(selectedWoodFinish.value);
    let totalArea = 0;

    if (inputMethod === 'area') {
      totalArea = area;
    } else if (inputMethod === 'items') {
      const doorArea = itemCounts.doors * 65;
      const windowArea = itemCounts.windows * 30;
      const wallPanelArea = itemCounts.wallPanels * 80;
      const furnitureArea = itemCounts.furnitureArea;
      totalArea = doorArea + windowArea + wallPanelArea + furnitureArea;
    }

    return totalArea * finishValue;
  };

  const totalEstimate = calculateWoodPolishingEstimate();

  const isNextDisabled =
    (inputMethod === 'area' && area <= 0) ||
    (inputMethod === 'items' && (itemCounts.doors === 0 && itemCounts.windows === 0 && itemCounts.wallPanels === 0 && itemCounts.furnitureArea === 0)) ||
    !selectedWoodFinishType ||
    !selectedWoodFinishBrand ||
    !selectedWoodFinish;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-12">Work Details</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">

        {/* Input Method Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-6">
            How would you like to estimate your polishing work?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => setInputMethod('area')}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${inputMethod === 'area'
                ? 'border-[#299dd7] bg-[#299dd7] text-white'
                : 'border-gray-200 hover:border-[#299dd7]'
                }`}
            >
              <h4 className="font-medium mb-2">Enter quantity in sq. ft.</h4>
              <p className="text-sm opacity-80">For users who already know the total area</p>
            </button>

            <button
              onClick={() => setInputMethod('items')}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${inputMethod === 'items'
                ? 'border-[#299dd7] bg-[#299dd7] text-white'
                : 'border-gray-200 hover:border-[#299dd7]'
                }`}
            >
              <h4 className="font-medium mb-2">Estimate based on item count</h4>
              <p className="text-sm opacity-80">Doors, windows, wardrobes, furniture, etc.</p>
            </button>
          </div>
        </div>

        {/* Area Input */}
        {inputMethod === 'area' && (
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">
              Total Area (sq. ft.)
            </label>
            <input
              type="number"
              value={area || ''}
              onChange={(e) => onAreaChange(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ED276E]"
              placeholder="Enter total area"
              min="0"
            />
          </div>
        )}

        {/* Item Count Input */}
        {inputMethod === 'items' && (
          <>
            <div className="grid grid-cols-1 custom_xl:grid-cols-3 gap-6 mb-6">
              {/* Doors */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  No. of Doors
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onItemCountChange('doors', Math.max(0, itemCounts.doors - 1))}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-[#ED276E] text-white hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={itemCounts.doors}
                    onChange={(e) => onItemCountChange('doors', Number(e.target.value))}
                    className="w-16 text-center border border-gray-300 rounded-md px-2 py-1"
                  />
                  <button
                    onClick={() => onItemCountChange('doors', itemCounts.doors + 1)}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-[#ED276E] text-white hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Windows */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  No. of Windows
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onItemCountChange('windows', Math.max(0, itemCounts.windows - 1))}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-[#ED276E] text-white hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={itemCounts.windows}
                    onChange={(e) => onItemCountChange('windows', Number(e.target.value))}
                    className="w-16 text-center border border-gray-300 rounded-md px-2 py-1"
                  />
                  <button
                    onClick={() => onItemCountChange('windows', itemCounts.windows + 1)}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-[#ED276E] text-white hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Wall Panels & Wardrobes */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  No. of Wall Panels & Wardrobes
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onItemCountChange('wallPanels', Math.max(0, itemCounts.wallPanels - 1))}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-[#ED276E] text-white hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    value={itemCounts.wallPanels}
                    onChange={(e) => onItemCountChange('wallPanels', Number(e.target.value))}
                    className="w-16 text-center border border-gray-300 rounded-md px-2 py-1"
                  />
                  <button
                    onClick={() => onItemCountChange('wallPanels', itemCounts.wallPanels + 1)}
                    className="px-4 py-2 rounded-full border border-gray-300 bg-[#ED276E] text-white hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            {/* Furniture Area */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Tentative Area of Furniture (Sofa, Mandir, Console etc.)
              </label>
              <input
                type="number"
                value={itemCounts.furnitureArea || ''}
                onChange={(e) => onItemCountChange('furnitureArea', Number(e.target.value))}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
                placeholder="Enter area in sq. ft."
                min="0"
              />
            </div>
          </>
        )}

        {/* Wood Finish Selection */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-medium mb-6">Select Wood Finish</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Finish Type Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Finish Type
              </label>
              <select
                value={selectedWoodFinishType}
                onChange={(e) => onWoodFinishTypeChange(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED276E] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
              >
                <option value="">Select Finish Type</option>
                {Object.keys(woodFinishOptions).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Brand
              </label>
              <select
                value={selectedWoodFinishBrand}
                onChange={(e) => onWoodFinishBrandChange(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ED276E] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                disabled={!selectedWoodFinishType}
              >
                <option value="">Select Brand</option>
                {availableBrands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Calculation Summary - Hidden per requirement */}
        {/* {selectedWoodFinish && (inputMethod === 'area' && area > 0 || inputMethod === 'items' && (itemCounts.doors > 0 || itemCounts.windows > 0 || itemCounts.wallPanels > 0 || itemCounts.furnitureArea > 0)) && (
          <div className="mt-8 pt-8 border-t-2 border-[#ED276E]">
            <h3 className="text-2xl font-semibold mb-6">Calculation Summary</h3>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="space-y-3">
                <p><span className="font-medium">Input Method:</span> {inputMethod === 'area' ? 'Enter quantity in sq. ft.' : 'Estimate based on item count'}</p>
                {inputMethod === 'area' && (
                  <p><span className="font-medium">Total Area:</span> {area} sq.ft</p>
                )}
                {inputMethod === 'items' && (
                  <>
                    {itemCounts.doors > 0 && <p><span className="font-medium">No. of Doors:</span> {itemCounts.doors} ({itemCounts.doors * 65} sq.ft)</p>}
                    {itemCounts.windows > 0 && <p><span className="font-medium">No. of Windows:</span> {itemCounts.windows} ({itemCounts.windows * 30} sq.ft)</p>}
                    {itemCounts.wallPanels > 0 && <p><span className="font-medium">No. of Wall Panels & Wardrobes:</span> {itemCounts.wallPanels} ({itemCounts.wallPanels * 80} sq.ft)</p>}
                    {itemCounts.furnitureArea > 0 && <p><span className="font-medium">Tentative Furniture Area:</span> {itemCounts.furnitureArea} sq.ft</p>}
                    <p><span className="font-medium">Calculated Total Area:</span> {calculateWoodPolishingEstimate() / Number(selectedWoodFinish.value)} sq.ft</p>
                  </>
                )}
                <p><span className="font-medium">Selected Finish Type:</span> {selectedWoodFinishType}</p>
                <p><span className="font-medium">Selected Brand:</span> {selectedWoodFinishBrand}</p>
                
                <div className="pt-3 border-t border-gray-200 mt-4">
                  <p className="text-lg font-medium">
                    <span className="text-[#ED276E]">Estimated Cost:</span> ₹{formatIndianCurrency(totalEstimate)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )} */}

      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className={`px-6 py-3 rounded-lg text-white transition-colors ${isNextDisabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#299dd7] hover:bg-[#248ac2]'
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WoodPolishingStep1; 