import React from 'react';

interface PaintingStep2Props {
  paintingType: string;
  workType: string;
  onWorkTypeChange: (value: string) => void;
  area: number;
  onAreaChange: (value: number) => void;
  areaTypes: {
    id: string;
    label: string;
    checked: boolean;
  }[];
  onAreaTypeToggle: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PaintingStep2: React.FC<PaintingStep2Props> = ({
  paintingType,
  workType,
  onWorkTypeChange,
  area,
  onAreaChange,
  areaTypes,
  onAreaTypeToggle,
  onNext,
  onBack
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-8 text-[#ED276E]">
        Please select the Option Below
      </h2>
      
      <div className="space-y-8">
        <div>
          <label className="block text-lg font-medium mb-3">
            Which Kind Of Painting Work Will Be?
          </label>
          <select
            value={workType}
            onChange={(e) => onWorkTypeChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          >
            <option value="">Select Work Type</option>
            <option value="fresh">Fresh Painting</option>
            <option value="repainting">Repainting</option>
            <option value="touch-up">Touch-Up</option>
          </select>
        </div>
        
        <div>
          <label className="block text-lg font-medium">
            Enter The Required Measurement
          </label>
          <p className="text-gray-500 mb-3">*Enter The Area in Square Feet</p>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Check Before Entering The Area
            </label>
            <div className="flex flex-wrap gap-8">
              {areaTypes.map((type) => (
                <label 
                  key={type.id} 
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={type.checked}
                    onChange={() => onAreaTypeToggle(type.id)}
                    className="w-5 h-5 mr-2"
                  />
                  {type.label}
                </label>
              ))}
            </div>
          </div>
          
          <input
            type="number"
            value={area || ''}
            onChange={(e) => onAreaChange(Number(e.target.value))}
            placeholder="Enter The Area in Square Feet"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
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
          disabled={!workType || area <= 0 || !areaTypes.some(type => type.checked)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default PaintingStep2; 