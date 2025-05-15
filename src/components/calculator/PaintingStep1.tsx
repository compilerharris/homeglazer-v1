import React from 'react';

interface PaintingOption {
  id: string;
  title: string;
  selected: boolean;
}

interface PaintingStep1Props {
  options: PaintingOption[];
  onOptionSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PaintingStep1: React.FC<PaintingStep1Props> = ({ 
  options, 
  onOptionSelect, 
  onNext,
  onBack
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-12 text-[#ED276E]">
        Which Type Of Painting Work Do You Want
      </h2>
      
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {options.map((option) => (
          <div 
            key={option.id}
            className={`p-6 border rounded-lg cursor-pointer transition-all ${
              option.selected 
                ? 'border-[#009966] bg-white shadow-md' 
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            onClick={() => onOptionSelect(option.id)}
          >
            <div className="flex items-start">
              <div className={`w-6 h-6 rounded-full flex-shrink-0 border ${
                option.selected 
                  ? 'border-[#009966] bg-[#009966]' 
                  : 'border-gray-300'
              } flex items-center justify-center mr-3`}>
                {option.selected && (
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {option.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {option.id === 'interior' && 'Painting'}
                  {option.id === 'exterior' && 'Painting'}
                  {option.id === 'both' && 'Both Painting'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-10">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"
        >
          BACK
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-lg bg-[#ED276E] text-white hover:bg-[#d51e5f]"
          disabled={!options.some(option => option.selected)}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default PaintingStep1; 