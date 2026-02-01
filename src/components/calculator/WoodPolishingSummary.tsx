import React from 'react';

interface WoodPolishingSummaryProps {
  inputMethod: 'area' | 'items';
  area: number;
  itemCounts: {
    doors: number;
    windows: number;
    wallPanels: number;
    furnitureArea: number;
  };
  selectedWoodFinishType: string;
  selectedWoodFinishBrand: string;
  selectedWoodFinish: {
    value: string;
    name: string;
  } | null;
  totalEstimate: number;
}

const WoodPolishingSummary: React.FC<WoodPolishingSummaryProps> = ({
  inputMethod,
  area,
  itemCounts,
  selectedWoodFinishType,
  selectedWoodFinishBrand,
  selectedWoodFinish,
  totalEstimate
}) => {
  // Add Indian currency formatter function
  const formatIndianCurrency = (number: number): string => {
    const numStr = number.toString();
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
    return formatted;
  };

  // Calculate wood polishing estimate for display
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

  if (!selectedWoodFinish || (inputMethod === 'area' && area <= 0) || 
      (inputMethod === 'items' && itemCounts.doors === 0 && itemCounts.windows === 0 && 
       itemCounts.wallPanels === 0 && itemCounts.furnitureArea === 0)) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
      <h3 className="text-2xl font-semibold mb-6 border-b-2 border-[var(--brand-pink)] pb-2">Calculation Summary</h3>
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
  );
};

export default WoodPolishingSummary;

