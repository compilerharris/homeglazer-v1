import React from 'react';
import CalculationSummary from './CalculationSummary';
import WoodPolishingSummary from './WoodPolishingSummary';

interface PaintingStep5Props {
  onBack: () => void;
  onRestart: () => void;
  fullName: string;
  email: string;
  selectedPaintingType?: string;
  workType?: string;
  area?: number;
  areaTypes?: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  paintCategory?: string;
  paintBrand?: string;
  paintType?: string;
  roofWorkType?: string;
  roofArea?: number;
  roofAreaTypes?: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  roofPaintCategory?: string;
  roofPaintBrand?: string;
  roofPaintType?: string;
  exteriorPaintCategory?: string;
  exteriorPaintBrand?: string;
  exteriorPaintType?: string;
  samePaintForCeiling?: boolean;
  ceilingPaintCategory?: string;
  ceilingPaintBrand?: string;
  ceilingPaintType?: string;
  carpetAreaOptions?: {
    label: string;
    value: number;
  }[];
  buildupAreaOptions?: {
    label: string;
    value: number;
  }[];
  // Wood polishing summary props
  inputMethod?: 'area' | 'items';
  woodPolishingArea?: number;
  itemCounts?: {
    doors: number;
    windows: number;
    wallPanels: number;
    furnitureArea: number;
  };
  selectedWoodFinishType?: string;
  selectedWoodFinishBrand?: string;
  selectedWoodFinish?: {
    value: string;
    name: string;
  } | null;
  woodPolishingTotalEstimate?: number;
}

const PaintingStep5: React.FC<PaintingStep5Props> = ({
  onBack,
  onRestart,
  fullName,
  email,
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
  ceilingPaintType,
  carpetAreaOptions,
  buildupAreaOptions,
  inputMethod,
  woodPolishingArea,
  itemCounts,
  selectedWoodFinishType,
  selectedWoodFinishBrand,
  selectedWoodFinish,
  woodPolishingTotalEstimate
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-medium text-center mb-6">
        Thank You For Your Time
      </h2>

      <p className="text-xl text-[#ED276E] mb-12">
        We have sent you the mail for estimated {inputMethod && selectedWoodFinish ? 'wood polishing' : 'painting'} cost.
      </p>

      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-12">
        <div className="w-24 h-24 bg-[#009966] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 className="text-2xl font-medium mb-4">Success!</h3>
        <p className="text-gray-600 mb-6">
          Dear {fullName}, your {inputMethod && selectedWoodFinish ? 'wood polishing' : 'painting'} estimate request has been successfully submitted.
          We've sent a confirmation email to {email} with your estimate details.
        </p>

        <p className="text-gray-600 mb-4">
          Our team will review your request and may contact you for any additional information needed.
        </p>

        <p className="text-gray-800 font-medium">
          Thank you for choosing our services!
        </p>
      </div>

      {/* Calculation Summary - Only render if painting calculation data is provided */}
      <div className="text-left">
        {/* Summaries are hidden in UI and sent via email per requirement */}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"
        >
          BACK
        </button>
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-lg bg-[#299dd7] text-white hover:bg-[#248ac2]"
        >
          RESTART
        </button>
      </div>
    </div>
  );
};

export default PaintingStep5; 