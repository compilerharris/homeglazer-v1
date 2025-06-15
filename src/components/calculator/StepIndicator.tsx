import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  steps: {
    label: string;
    completed: boolean;
  }[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full mb-12">
      <div className="relative">
        {/* Full progress track (background) */}
        <div className="absolute top-[24px] md:top-[32px] left-[12%] right-[8%] h-1 bg-gray-200 rounded z-0"></div>
        
        {/* Completed progress line */}
        {currentStep > 1 && (
          <div 
            className="absolute top-[24px] md:top-[32px] h-1 bg-[#70C9A0] rounded z-1"
            style={{
              left: '12%',
              width: `${((currentStep - 2) / (steps.length - 1)) * 80}%`
            }}
          />
        )}
        
        {/* Active progress line */}
        {currentStep > 1 && currentStep <= steps.length && (
          <div 
            className="absolute top-[24px] md:top-[32px] h-1 bg-[#299dd7] rounded z-1"
            style={{
              left: `${12 + ((currentStep - 2) / (steps.length - 1)) * 80}%`,
              width: `${80 / (steps.length - 1)}%`
            }}
          />
        )}
        
        {/* Steps */}
        <div className="flex items-start justify-between relative z-10">
          {steps.map((step, index) => {
            // Determine the status for each step
            let status = '';
            let statusClass = '';
            
            if (step.completed) {
              status = 'Completed';
              statusClass = 'bg-[#E3F6EF] text-[#70C9A0] border border-[#70C9A0]';
            } else if (currentStep === index + 1) {
              status = 'In Progress';
              statusClass = 'bg-[#E6EFFF] text-[#299dd7] border border-[#299dd7]';
            } else {
              status = 'Pending';
              statusClass = 'bg-white text-gray-400 border border-gray-300';
            }
            
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full ${
                    step.completed 
                      ? 'bg-[#70C9A0] text-white' 
                      : currentStep === index + 1 
                        ? 'bg-[#299dd7] text-white border-4 border-[#E6EFFF]' 
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step.completed ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-lg md:text-xl font-medium">{index + 1}</span>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs md:text-sm font-medium text-gray-500">STEP {index + 1}</p>
                  <h3 className="text-gray-800 text-sm md:text-base font-medium mt-1">{step.label}</h3>
                  <span className={`inline-block mt-2 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-xs font-medium ${statusClass}`}>{status}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator; 