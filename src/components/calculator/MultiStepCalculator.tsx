import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import PaintingStep1 from './PaintingStep1';
import PaintingStep2 from './PaintingStep2';
import PaintingStep3 from './PaintingStep3';
import PaintingStep4 from './PaintingStep4';
import PaintingStep5 from './PaintingStep5';

const MultiStepCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 - Painting Type
  const [paintingOptions, setPaintingOptions] = useState([
    { id: 'interior', title: 'Interior', selected: false },
    { id: 'exterior', title: 'Exterior', selected: false },
    { id: 'both', title: 'Interior & Exterior', selected: false }
  ]);
  
  // Step 2 - Work Area Details
  const [workType, setWorkType] = useState('');
  const [area, setArea] = useState(0);
  const [areaTypes, setAreaTypes] = useState([
    { id: 'carpet', label: 'Carpet Area', checked: false },
    { id: 'buildup', label: 'Buildup Area', checked: false },
    { id: 'painting', label: 'Painting Area', checked: false }
  ]);
  
  // Step 3 - Personal Details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');
  
  // Step 4 - Paint Details
  const [paintCategory, setPaintCategory] = useState('');
  const [paintBrand, setPaintBrand] = useState('');
  const [paintType, setPaintType] = useState('');

  // Helper functions for step management
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const restart = () => {
    // Reset all state
    setCurrentStep(1);
    setPaintingOptions(paintingOptions.map(opt => ({ ...opt, selected: false })));
    setWorkType('');
    setArea(0);
    setAreaTypes(areaTypes.map(type => ({ ...type, checked: false })));
    setFullName('');
    setPhone('');
    setEmail('');
    setServiceType('');
    setLocation('');
    setPaintCategory('');
    setPaintBrand('');
    setPaintType('');
  };
  
  // Helper functions for step 1
  const handleOptionSelect = (id: string) => {
    setPaintingOptions(
      paintingOptions.map(option => ({
        ...option,
        selected: option.id === id
      }))
    );
  };
  
  // Helper functions for step 2
  const handleAreaTypeToggle = (id: string) => {
    setAreaTypes(
      areaTypes.map(type => ({
        ...type,
        checked: type.id === id ? !type.checked : type.checked
      }))
    );
  };

  // Get the selected painting type
  const selectedPaintingType = paintingOptions.find(option => option.selected)?.id || '';
  
  // Define steps for the indicator
  const steps = [
    { label: 'PAINTING WORK', completed: currentStep > 1 },
    { label: 'WORK AREA DETAILS', completed: currentStep > 2 },
    { label: 'PERSONAL DETAILS', completed: currentStep > 3 },
    { label: 'PAINTING DETAILS', completed: currentStep > 4 },
    { label: 'RESULT', completed: currentStep > 5 }
  ];

  return (
    <div className="w-full py-12">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <StepIndicator currentStep={currentStep} steps={steps} />
        
        <div className="mt-12">
          {currentStep === 1 && (
            <PaintingStep1 
              options={paintingOptions}
              onOptionSelect={handleOptionSelect}
              onNext={nextStep}
              onBack={() => {}}
            />
          )}
          
          {currentStep === 2 && (
            <PaintingStep2 
              paintingType={selectedPaintingType}
              workType={workType}
              onWorkTypeChange={setWorkType}
              area={area}
              onAreaChange={setArea}
              areaTypes={areaTypes}
              onAreaTypeToggle={handleAreaTypeToggle}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          
          {currentStep === 3 && (
            <PaintingStep3 
              fullName={fullName}
              onFullNameChange={setFullName}
              phone={phone}
              onPhoneChange={setPhone}
              email={email}
              onEmailChange={setEmail}
              workType={serviceType}
              onWorkTypeChange={setServiceType}
              location={location}
              onLocationChange={setLocation}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          
          {currentStep === 4 && (
            <PaintingStep4 
              paintCategory={paintCategory}
              onPaintCategoryChange={setPaintCategory}
              paintBrand={paintBrand}
              onPaintBrandChange={setPaintBrand}
              paintType={paintType}
              onPaintTypeChange={setPaintType}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          
          {currentStep === 5 && (
            <PaintingStep5 
              onBack={prevStep}
              onRestart={restart}
              fullName={fullName}
              email={email}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepCalculator; 