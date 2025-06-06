import React from 'react';

interface WoodPolishingStep2Props {
  selectedWoodType: string;
  onWoodTypeChange: (value: string) => void;
  selectedFinishType: string;
  onFinishTypeChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const WoodPolishingStep2: React.FC<WoodPolishingStep2Props> = ({
  selectedWoodType,
  onWoodTypeChange,
  selectedFinishType,
  onFinishTypeChange,
  onNext,
  onBack,
}) => {
  const woodTypeOptions = [
    { id: 'natural', label: 'Natural' },
    { id: 'stained', label: 'Stained' },
    { id: 'painted', label: 'Painted' },
  ];

  const finishTypeOptions = [
    { id: 'matte', label: 'Matte' },
    { id: 'gloss', label: 'Gloss' },
    { id: 'satin', label: 'Satin' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl font-semibold mb-6 text-[#ED276E] text-center">Wood Type & Finish</h2>

      {/* Wood Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Select Wood Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {woodTypeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onWoodTypeChange(option.id)}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                selectedWoodType === option.id
                  ? 'border-[#ED276E] bg-[#ED276E] text-white'
                  : 'border-gray-200 hover:border-[#ED276E]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Finish Type Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-800">Select Finish Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {finishTypeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onFinishTypeChange(option.id)}
              className={`p-4 rounded-lg border-2 text-center transition-colors ${
                selectedFinishType === option.id
                  ? 'border-[#ED276E] bg-[#ED276E] text-white'
                  : 'border-gray-200 hover:border-[#ED276E]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-full border border-gray-300 hover:border-[#ED276E] transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-full bg-[#ED276E] text-white hover:bg-[#ED276E]/90 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WoodPolishingStep2; 