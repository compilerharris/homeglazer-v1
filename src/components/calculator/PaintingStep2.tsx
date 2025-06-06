import React from 'react';

interface PaintingStep2Props {
  fullName: string;
  onFullNameChange: (value: string) => void;
  phone: string;
  onPhoneChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  serviceType: string;
  onServiceTypeChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  hideServiceType?: boolean;
}

const PaintingStep2: React.FC<PaintingStep2Props> = ({
  fullName,
  onFullNameChange,
  phone,
  onPhoneChange,
  email,
  onEmailChange,
  serviceType,
  onServiceTypeChange,
  location,
  onLocationChange,
  onNext,
  onBack,
  hideServiceType = false
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-8 text-[#ED276E]">
        Enter Your Details
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium mb-3">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            placeholder="Enter your full name"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
        </div>

        <div>
          <label className="block text-lg font-medium mb-3">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email address"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
          />
        </div>

        {!hideServiceType && (
          <div>
            <label className="block text-lg font-medium mb-3">
              Service Type
            </label>
            <select
              value={serviceType}
              onChange={(e) => onServiceTypeChange(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
            >
              <option value="">Select Service Type</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-lg font-medium mb-3">
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            placeholder="Enter your location"
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
          disabled={!fullName || !phone || !email || (!hideServiceType && !serviceType) || !location}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default PaintingStep2; 