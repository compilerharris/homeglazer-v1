import React from 'react';

interface PaintingStep3Props {
  fullName: string;
  onFullNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  workType: string;
  onWorkTypeChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const PaintingStep3: React.FC<PaintingStep3Props> = ({
  fullName,
  onFullNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  workType,
  onWorkTypeChange,
  location,
  onLocationChange,
  onNext,
  onBack
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-8">
        Enter Your Personal Information
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-2">
            Enter Your Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="Full Name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2">
            Enter Your Contact Information
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="+91 0000000000"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2">
            Enter Painting Area
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="example@mail.com"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2">
            Type of Work Needed
          </label>
          <select
            value={workType}
            onChange={(e) => onWorkTypeChange(e.target.value)}
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          >
            <option value="">Select Work Type</option>
            <option value="home">Home Painting</option>
            <option value="office">Office Painting</option>
            <option value="commercial">Commercial Painting</option>
            <option value="industrial">Industrial Painting</option>
          </select>
        </div>
        
        <div>
          <label className="block text-lg font-medium mb-2">
            Enter Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Bombay, India"
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
          className="px-6 py-3 rounded-lg bg-[#299dd7] text-white hover:bg-[#248ac2]"
          disabled={!fullName || !phone || !email || !workType || !location}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default PaintingStep3; 