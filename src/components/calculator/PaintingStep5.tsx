import React from 'react';

interface PaintingStep5Props {
  onBack: () => void;
  onRestart: () => void;
  fullName: string;
  email: string;
}

const PaintingStep5: React.FC<PaintingStep5Props> = ({
  onBack,
  onRestart,
  fullName,
  email
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-medium text-center mb-6 md:mb-12 text-[#ED276E]">
        Thank You For Your Time
      </h2>
      
      <p className="text-xl text-[#ED276E] mb-12">
        We will send you the mail for estimated wood polishing cost.
      </p>
      
      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200 mb-12">
        <div className="w-24 h-24 bg-[#009966] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-medium mb-4">Success!</h3>
        <p className="text-gray-600 mb-6">
          Dear {fullName}, your wood polishing estimate request has been successfully submitted. 
          We've sent a confirmation email to {email} with your estimate details.
        </p>
        
        <p className="text-gray-600 mb-4">
          Our team will review your request and may contact you for any additional information needed.
        </p>
        
        <p className="text-gray-800 font-medium">
          Thank you for choosing our services!
        </p>
      </div>
      
      <div className="flex justify-center gap-4">
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