import React from 'react';
import {
  getDisplayArea,
  calculateInteriorPrice,
  calculateCeilingPrice,
  calculateExteriorPrice,
  calculateRoofPrice,
  formatIndianCurrency,
  getSelectedAreaType,
  getPaintName,
  getBrandName
} from '../../lib/calculator-utils';
import { carpetAreaOptions, buildupAreaOptions } from '../../lib/calculator-constants';

interface CalculationSummaryProps {
  selectedPaintingType: string;
  workType: string;
  area: number;
  areaTypes: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  paintCategory: string;
  paintBrand: string;
  paintType: string;
  roofWorkType: string;
  roofArea: number;
  roofAreaTypes: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  roofPaintCategory: string;
  roofPaintBrand: string;
  roofPaintType: string;
  exteriorPaintCategory: string;
  exteriorPaintBrand: string;
  exteriorPaintType: string;
  samePaintForCeiling: boolean;
  ceilingPaintCategory: string;
  ceilingPaintBrand: string;
  ceilingPaintType: string;
  carpetAreaOptions: {
    label: string;
    value: number;
  }[];
  buildupAreaOptions: {
    label: string;
    value: number;
  }[];
}

const CalculationSummary: React.FC<CalculationSummaryProps> = ({
  selectedPaintingType,
  workType,
  area,
  areaTypes,
  paintCategory,
  paintBrand,
  paintType,
  roofWorkType,
  roofArea,
  roofAreaTypes,
  roofPaintCategory,
  roofPaintBrand,
  roofPaintType,
  exteriorPaintCategory,
  exteriorPaintBrand,
  exteriorPaintType,
  samePaintForCeiling,
  ceilingPaintCategory,
  ceilingPaintBrand,
  ceilingPaintType
}) => {

  // Calculate total price including ceiling if applicable
  const calculateTotalPrice = () => {
    let total = calculateInteriorPrice(area, paintType, areaTypes, samePaintForCeiling);
    if (samePaintForCeiling && ceilingPaintType) {
      total += calculateCeilingPrice(area, ceilingPaintType, areaTypes);
    }
    return total;
  };

  // Calculate total price for exterior including roof if applicable
  const calculateExteriorTotalPrice = () => {
    let total = calculateExteriorPrice(area, exteriorPaintType);
    if (roofPaintType) {
      total += calculateRoofPrice(roofArea, roofPaintType);
    }
    return total;
  };

  // Helper to determine if the ceiling paint checkbox should be hidden
  const isPaintingAreaSelected = areaTypes?.find(type => type.id === 'painting')?.selected || false;
  const isMainPaintingType = selectedPaintingType === 'interior' || selectedPaintingType === 'exterior' || selectedPaintingType === 'both';
  const showCeilingPaintCheckbox = !(isPaintingAreaSelected && isMainPaintingType);
  const showCeilingPaintSection = showCeilingPaintCheckbox && samePaintForCeiling;

  // Render summary for interior only
  if (selectedPaintingType === 'interior' &&
    workType && area > 0 && paintCategory && paintBrand && paintType) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-2xl font-semibold mb-6 text-[#ED276E] border-b-2 border-[#ED276E] pb-2">Calculation Summary</h3>
        {/* Wall Paint Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4 text-gray-800">Wall Paint Details</h4>
          <div className="space-y-3">
            <p><span className="font-medium">Work Type:</span> {workType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
            <p><span className="font-medium">Area Type:</span> {getSelectedAreaType(areaTypes)}</p>
            <p><span className="font-medium">Area Value:</span> {getDisplayArea(area, areaTypes, samePaintForCeiling)} sq.ft</p>
            <p><span className="font-medium">Paint Category:</span> {paintCategory.charAt(0).toUpperCase() + paintCategory.slice(1)}</p>
            <p><span className="font-medium">Paint Brand:</span> {getBrandName(paintBrand)}</p>
            <p><span className="font-medium">Selected Paint:</span> {getPaintName(paintCategory, paintBrand, paintType)}</p>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Wall Paint Price:</span> ₹{formatIndianCurrency(calculateInteriorPrice(area, paintType, areaTypes, samePaintForCeiling))}
              </p>
            </div>
          </div>
        </div>
        {/* Ceiling Paint Section - Only show if different paint is selected */}
        {showCeilingPaintSection && (
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium mb-4 text-gray-800">Ceiling Paint Details</h4>
            <div className="space-y-3">
              <p><span className="font-medium">Paint Category:</span> {ceilingPaintCategory.charAt(0).toUpperCase() + ceilingPaintCategory.slice(1)}</p>
              <p><span className="font-medium">Paint Brand:</span> {getBrandName(ceilingPaintBrand)}</p>
              <p><span className="font-medium">Selected Paint:</span> {getPaintName(ceilingPaintCategory, ceilingPaintBrand, ceilingPaintType)}</p>
              <p><span className="font-medium">Area Value:</span> {area - getDisplayArea(area, areaTypes, samePaintForCeiling)} sq.ft</p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-lg font-medium">
                  <span className="text-[#ED276E]">Ceiling Paint Price:</span> ₹{formatIndianCurrency(calculateCeilingPrice(area, ceilingPaintType, areaTypes))}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Total Price Section */}
        <div className="pt-4 border-t-2 border-gray-200 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xl font-semibold">
            <span className="text-[#ED276E]">Total Price:</span> ₹{formatIndianCurrency(calculateTotalPrice())}
          </p>
        </div>
      </div>
    );
  }

  // Render summary for exterior only
  if (selectedPaintingType === 'exterior' &&
    roofWorkType && area > 0 && exteriorPaintCategory && exteriorPaintBrand && exteriorPaintType) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-2xl font-semibold mb-6 text-[#ED276E] border-b-2 border-[#ED276E] pb-2">Calculation Summary</h3>
        {/* Exterior Wall Paint Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4 text-gray-800">Exterior Wall Paint Details</h4>
          <div className="space-y-3">
            <p><span className="font-medium">Work Type:</span> {roofWorkType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
            <p><span className="font-medium">Area Type:</span> {getSelectedAreaType(areaTypes)}</p>
            <p><span className="font-medium">Area Value:</span> {area} sq.ft</p>
            <p><span className="font-medium">Paint Category:</span> {exteriorPaintCategory.charAt(0).toUpperCase() + exteriorPaintCategory.slice(1)}</p>
            <p><span className="font-medium">Paint Brand:</span> {exteriorPaintBrand}</p>
            <p><span className="font-medium">Selected Paint:</span> {exteriorPaintType}</p>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Exterior Wall Paint Price:</span> ₹{formatIndianCurrency(calculateExteriorPrice(area, exteriorPaintType))}
              </p>
            </div>
          </div>
        </div>
        {/* Roof Paint Section - Only show if roof paint is selected */}
        {roofPaintType && (
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium mb-4 text-gray-800">Roof Paint Details</h4>
            <div className="space-y-3">
              <p><span className="font-medium">Roof Area:</span> {roofArea} sq.ft</p>
              <p><span className="font-medium">Paint Category:</span> {roofPaintCategory.charAt(0).toUpperCase() + roofPaintCategory.slice(1)}</p>
              <p><span className="font-medium">Paint Brand:</span> {roofPaintBrand}</p>
              <p><span className="font-medium">Selected Paint:</span> {roofPaintType}</p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-lg font-medium">
                  <span className="text-[#ED276E]">Roof Paint Price:</span> ₹{formatIndianCurrency(calculateRoofPrice(roofArea, roofPaintType))}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Total Price Section */}
        <div className="pt-4 border-t-2 border-gray-200 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xl font-semibold">
            <span className="text-[#ED276E]">Total Price:</span> ₹{formatIndianCurrency(calculateExteriorTotalPrice())}
          </p>
        </div>
      </div>
    );
  }

  // Render summary for both interior and exterior
  if (selectedPaintingType === 'both' &&
    ((workType && area > 0 && paintCategory && paintBrand && paintType) ||
      (roofWorkType && area > 0 && paintCategory && paintBrand && paintType))) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-2xl font-semibold mb-6 text-[#ED276E] border-b-2 border-[#ED276E] pb-2">Complete Calculation Summary</h3>
        {/* Interior Section */}
        {workType && area > 0 && paintCategory && paintBrand && paintType && (
          <div className="mb-8">
            <h4 className="text-xl font-medium mb-4 text-[#ED276E]">Interior Work</h4>
            {/* Wall Paint Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-lg font-medium mb-4 text-gray-800">Wall Paint Details</h5>
              <div className="space-y-3">
                <p><span className="font-medium">Work Type:</span> {workType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
                <p><span className="font-medium">Area Type:</span> {getSelectedAreaType(areaTypes)}</p>
                <p><span className="font-medium">Area Value:</span> {area} sq.ft</p>
                <p><span className="font-medium">Paint Category:</span> {paintCategory.charAt(0).toUpperCase() + paintCategory.slice(1)}</p>
                <p><span className="font-medium">Paint Brand:</span> {getBrandName(paintBrand)}</p>
                <p><span className="font-medium">Selected Paint:</span> {getPaintName(paintCategory, paintBrand, paintType)}</p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-lg font-medium">
                    <span className="text-[#ED276E]">Wall Paint Price:</span> ₹{formatIndianCurrency(calculateInteriorPrice(area, paintType, areaTypes, samePaintForCeiling))}
                  </p>
                </div>
              </div>
            </div>
            {/* Ceiling Paint Section - Only show if different paint is selected */}
            {showCeilingPaintSection && (
              <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                <h5 className="text-lg font-medium mb-4 text-gray-800">Ceiling Paint Details</h5>
                <div className="space-y-3">
                  <p><span className="font-medium">Paint Category:</span> {ceilingPaintCategory.charAt(0).toUpperCase() + ceilingPaintCategory.slice(1)}</p>
                  <p><span className="font-medium">Paint Brand:</span> {getBrandName(ceilingPaintBrand)}</p>
                  <p><span className="font-medium">Selected Paint:</span> {getPaintName(ceilingPaintCategory, ceilingPaintBrand, ceilingPaintType)}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-lg font-medium">
                      <span className="text-[#ED276E]">Ceiling Paint Price:</span> ₹{formatIndianCurrency(calculateCeilingPrice(area, ceilingPaintType, areaTypes))}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Interior Total Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Interior Total Price:</span> ₹{formatIndianCurrency(calculateTotalPrice())}
              </p>
            </div>
          </div>
        )}
        {/* Exterior Section */}
        {roofWorkType && area > 0 && exteriorPaintCategory && exteriorPaintBrand && exteriorPaintType && (
          <div className="mb-8">
            <h4 className="text-xl font-medium mb-4 text-[#ED276E]">Exterior Work</h4>
            {/* Exterior Wall Paint Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-lg font-medium mb-4 text-gray-800">Exterior Wall Paint Details</h5>
              <div className="space-y-3">
                <p><span className="font-medium">Work Type:</span> {roofWorkType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
                <p><span className="font-medium">Area Type:</span> {getSelectedAreaType(areaTypes)}</p>
                <p><span className="font-medium">Area Value:</span> {area} sq.ft</p>
                <p><span className="font-medium">Paint Category:</span> {exteriorPaintCategory.charAt(0).toUpperCase() + exteriorPaintCategory.slice(1)}</p>
                <p><span className="font-medium">Paint Brand:</span> {getBrandName(exteriorPaintBrand)}</p>
                <p><span className="font-medium">Selected Paint:</span> {getPaintName(exteriorPaintCategory, exteriorPaintBrand, exteriorPaintType)}</p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-lg font-medium">
                    <span className="text-[#ED276E]">Exterior Wall Paint Price:</span> ₹{formatIndianCurrency(calculateExteriorPrice(area, exteriorPaintType))}
                  </p>
                </div>
              </div>
            </div>
            {/* Roof Paint Section - Only show if roof paint is selected */}
            {roofPaintType && (
              <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                <h5 className="text-lg font-medium mb-4 text-gray-800">Roof Paint Details</h5>
                <div className="space-y-3">
                  <p><span className="font-medium">Roof Area:</span> {roofArea} sq.ft</p>
                  <p><span className="font-medium">Paint Category:</span> {roofPaintCategory.charAt(0).toUpperCase() + roofPaintCategory.slice(1)}</p>
                  <p><span className="font-medium">Paint Brand:</span> {roofPaintBrand}</p>
                  <p><span className="font-medium">Selected Paint:</span> {roofPaintType}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-lg font-medium">
                      <span className="text-[#ED276E]">Roof Paint Price:</span> ₹{formatIndianCurrency(calculateRoofPrice(roofArea, roofPaintType))}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Exterior Total Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Exterior Total Price:</span> ₹{formatIndianCurrency(calculateExteriorTotalPrice())}
              </p>
            </div>
            {/* Grand Total Section */}
            <div className="pt-4 border-t-2 border-gray-200 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-xl font-semibold">
                <span className="text-[#ED276E]">Grand Total:</span> ₹{formatIndianCurrency(calculateTotalPrice() + calculateExteriorTotalPrice())}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
  return null;
};
export default CalculationSummary;
