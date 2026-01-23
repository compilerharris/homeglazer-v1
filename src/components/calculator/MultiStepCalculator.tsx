import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import PaintingStep1 from './PaintingStep1';
import PaintingStep5 from './PaintingStep5';
import PaintingStep2 from './PaintingStep2';
import { carpetAreaOptions, buildupAreaOptions } from '../../lib/calculator-constants';

const MultiStepCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSending, setIsSending] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Step 1 - Combined Painting Details
  const [paintingOptions, setPaintingOptions] = useState([
    { id: 'interior', title: 'Interior', selected: false },
    { id: 'exterior', title: 'Exterior', selected: false },
    { id: 'both', title: 'Interior & Exterior', selected: false }
  ]);
  const [workType, setWorkType] = useState('');
  const [area, setArea] = useState(0);
  const [areaTypes, setAreaTypes] = useState([
    { id: 'carpet', label: 'Carpet Area', selected: true },
    { id: 'buildup', label: 'Buildup Area', selected: false },
    { id: 'painting', label: 'Painting Area', selected: false }
  ]);


  // Interior paint selection state
  const [interiorPaintCategory, setInteriorPaintCategory] = useState('');
  const [interiorPaintBrand, setInteriorPaintBrand] = useState('');
  const [interiorPaintType, setInteriorPaintType] = useState('');

  // Exterior paint selection state
  const [exteriorPaintCategory, setExteriorPaintCategory] = useState('');
  const [exteriorPaintBrand, setExteriorPaintBrand] = useState('');
  const [exteriorPaintType, setExteriorPaintType] = useState('');

  // Roof color selection state
  const [roofWorkType, setRoofWorkType] = useState('');
  const [roofArea, setRoofArea] = useState(0);
  const [roofAreaTypes, setRoofAreaTypes] = useState([
    { id: 'carpet', label: 'Carpet Area', selected: true },
    { id: 'buildup', label: 'Buildup Area', selected: false },
    { id: 'painting', label: 'Painting Area', selected: false }
  ]);
  const [roofPaintCategory, setRoofPaintCategory] = useState('');
  const [roofPaintBrand, setRoofPaintBrand] = useState('');
  const [roofPaintType, setRoofPaintType] = useState('');

  // Step 2 - Personal Details
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [location, setLocation] = useState('');

  // Ceiling paint selection states
  const [samePaintForCeiling, setSamePaintForCeiling] = useState(false);
  const [ceilingPaintCategory, setCeilingPaintCategory] = useState('');
  const [ceilingPaintBrand, setCeilingPaintBrand] = useState('');
  const [ceilingPaintType, setCeilingPaintType] = useState('');

  // Helper functions for step management
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const restart = () => {
    // Reset all state
    setCurrentStep(1);
    setIsFormSubmitted(false);
    setPaintingOptions(paintingOptions.map(opt => ({ ...opt, selected: false })));
    setWorkType('');
    setArea(0);
    setAreaTypes(areaTypes.map(type => ({ ...type, selected: false })));
    setInteriorPaintCategory('');
    setInteriorPaintBrand('');
    setInteriorPaintType('');
    setExteriorPaintCategory('');
    setExteriorPaintBrand('');
    setExteriorPaintType('');
    // Reset roof color selection state
    setRoofWorkType('');
    setRoofArea(0);
    setRoofAreaTypes(roofAreaTypes.map(type => ({ ...type, selected: false })));
    setRoofPaintCategory('');
    setRoofPaintBrand('');
    setRoofPaintType('');
    setFullName('');
    setPhone('');
    setEmail('');
    setServiceType('');
    setLocation('');
    // Reset ceiling paint selection state
    setSamePaintForCeiling(false);
    setCeilingPaintCategory('');
    setCeilingPaintBrand('');
    setCeilingPaintType('');
  };

  // Helper functions for step 1
  const handleOptionSelect = (id: string) => {
    setPaintingOptions(
      paintingOptions.map(option => ({
        ...option,
        selected: option.id === id
      }))
    );
    // Set Carpet Area as selected by default when any painting option is selected
    setAreaTypes(
      areaTypes.map(type => ({
        ...type,
        selected: type.id === 'carpet'
      }))
    );
    setRoofAreaTypes(
      roofAreaTypes.map(type => ({
        ...type,
        selected: type.id === 'carpet'
      }))
    );
    // Reset work types when painting option changes
    setWorkType('');
    setRoofWorkType('');
  };

  const handleAreaTypeToggle = (id: string) => {
    setAreaTypes(prevAreaTypes =>
      prevAreaTypes.map(type => ({
        ...type,
        selected: type.id === id
      }))
    );
    // Reset area value when switching area types
    setArea(0);
  };

  const handleRoofAreaTypeToggle = (id: string) => {
    setRoofAreaTypes(
      roofAreaTypes.map(type => ({
        ...type,
        selected: type.id === id
      }))
    );
    // Reset roof area value when switching area types
    setRoofArea(0);
  };

  const handleWorkTypeChange = (value: string) => {
    setWorkType(value);
    // Set Carpet Area as selected by default when work type is selected
    setAreaTypes(
      areaTypes.map(type => ({
        ...type,
        selected: type.id === 'carpet'
      }))
    );
  };

  const handleAreaChange = (value: number) => {
    setArea(value);
  };

  const handleRoofAreaChange = (value: number) => {
    setRoofArea(value);
  };

  const handleSendSummary = async () => {
    setIsSending(true);
    try {
      const payload = {
        fullName,
        email,
        phone,
        serviceType,
        location,
        selectedPaintingType: paintingOptions.find(option => option.selected)?.id || '',
        workType,
        area,
        areaTypes,
        paintCategory: interiorPaintCategory,
        paintBrand: interiorPaintBrand,
        paintType: interiorPaintType,
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
      };

      const response = await fetch('/api/calculator-painting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsFormSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        nextStep();
      } else {
        alert('Failed to send email. Please try again.');
        console.error('Failed to send email:', await response.text());
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  // Define steps for the indicator
  const steps = [
    { label: 'PAINTING DETAILS', completed: currentStep > 1 },
    { label: 'PERSONAL DETAILS', completed: currentStep > 2 },
    { label: 'RESULT', completed: isFormSubmitted || currentStep > 3 }
  ];

  return (
    <div className="w-full pb-12 pt-0">
      <div className="w-full container mx-auto">
        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="mt-0">
          {currentStep === 1 && (
            <PaintingStep1
              options={paintingOptions}
              onOptionSelect={handleOptionSelect}
              workType={workType}
              onWorkTypeChange={handleWorkTypeChange}
              area={area}
              onAreaChange={handleAreaChange}
              areaTypes={areaTypes}
              onAreaTypeToggle={handleAreaTypeToggle}
              carpetAreaOptions={carpetAreaOptions}
              buildupAreaOptions={buildupAreaOptions}
              // Interior paint props
              paintCategory={interiorPaintCategory}
              onPaintCategoryChange={setInteriorPaintCategory}
              paintBrand={interiorPaintBrand}
              onPaintBrandChange={setInteriorPaintBrand}
              paintType={interiorPaintType}
              onPaintTypeChange={setInteriorPaintType}
              // Exterior paint props
              exteriorPaintCategory={exteriorPaintCategory}
              onExteriorPaintCategoryChange={setExteriorPaintCategory}
              exteriorPaintBrand={exteriorPaintBrand}
              onExteriorPaintBrandChange={setExteriorPaintBrand}
              exteriorPaintType={exteriorPaintType}
              onExteriorPaintTypeChange={setExteriorPaintType}
              onNext={nextStep}
              onBack={prevStep}
              selectedPaintingType={paintingOptions.find(option => option.selected)?.id || ''}
              // Add roof color selection props
              roofWorkType={roofWorkType}
              onRoofWorkTypeChange={setRoofWorkType}
              roofArea={roofArea}
              onRoofAreaChange={handleRoofAreaChange}
              roofAreaTypes={roofAreaTypes}
              onRoofAreaTypeToggle={handleRoofAreaTypeToggle}
              roofPaintCategory={roofPaintCategory}
              onRoofPaintCategoryChange={setRoofPaintCategory}
              roofPaintBrand={roofPaintBrand}
              onRoofPaintBrandChange={setRoofPaintBrand}
              roofPaintType={roofPaintType}
              onRoofPaintTypeChange={setRoofPaintType}
              // New props for ceiling paint selection
              samePaintForCeiling={samePaintForCeiling}
              onSamePaintForCeilingChange={setSamePaintForCeiling}
              ceilingPaintCategory={ceilingPaintCategory}
              onCeilingPaintCategoryChange={setCeilingPaintCategory}
              ceilingPaintBrand={ceilingPaintBrand}
              onCeilingPaintBrandChange={setCeilingPaintBrand}
              ceilingPaintType={ceilingPaintType}
              onCeilingPaintTypeChange={setCeilingPaintType}
            />
          )}

          {currentStep === 2 && (
            <PaintingStep2
              fullName={fullName}
              onFullNameChange={setFullName}
              phone={phone}
              onPhoneChange={setPhone}
              email={email}
              onEmailChange={setEmail}
              serviceType={serviceType}
              onServiceTypeChange={setServiceType}
              location={location}
              onLocationChange={setLocation}
              onNext={handleSendSummary}
              onBack={prevStep}
              isLoading={isSending}
            />
          )}

          {currentStep === 3 && (
            <PaintingStep5
              onBack={prevStep}
              onRestart={restart}
              fullName={fullName}
              email={email}
              selectedPaintingType={paintingOptions.find(option => option.selected)?.id || ''}
              workType={workType}
              area={area}
              areaTypes={areaTypes}
              paintCategory={interiorPaintCategory}
              paintBrand={interiorPaintBrand}
              paintType={interiorPaintType}
              roofWorkType={roofWorkType}
              roofArea={roofArea}
              roofAreaTypes={roofAreaTypes}
              roofPaintCategory={roofPaintCategory}
              roofPaintBrand={roofPaintBrand}
              roofPaintType={roofPaintType}
              exteriorPaintCategory={exteriorPaintCategory}
              exteriorPaintBrand={exteriorPaintBrand}
              exteriorPaintType={exteriorPaintType}
              samePaintForCeiling={samePaintForCeiling}
              ceilingPaintCategory={ceilingPaintCategory}
              ceilingPaintBrand={ceilingPaintBrand}
              ceilingPaintType={ceilingPaintType}
              carpetAreaOptions={carpetAreaOptions}
              buildupAreaOptions={buildupAreaOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepCalculator; 