import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import PaintingStep1 from './PaintingStep1';
import PaintingStep3 from './PaintingStep3';
import PaintingStep5 from './PaintingStep5';
import PaintingStep2 from './PaintingStep2';

const MultiStepCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
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

  const carpetAreaOptions = [
    { label: '1000-1200 Sq. ft.', value: 2500 },
    { label: '1201 - 1500 Sq. Ft.', value: 3000 },
    { label: '1501 - 1800 Sq. ft.', value: 3500 },
    { label: '1800 - 2200 Sq. ft.', value: 4200 },
    { label: '2201 - 2600 Sq. ft.', value: 4900 },
    { label: '2601 - 3000 Sq. ft.', value: 5700 },
    { label: '3001 - 3500 Sq. ft.', value: 6400 },
    { label: '3501 - 4000 Sq. ft.', value: 7200 },
    { label: '4000 - 4500 Sq. ft.', value: 7900 },
    { label: '4501 - 5000 Sq. ft.', value: 8800 },
    { label: '5001 - 5500 Sq. ft.', value: 9600 },
    { label: '5501 - 6000 Sq. ft.', value: 10500 },
    { label: '6001 - 6500 Sq. ft.', value: 11400 },
    { label: '6501 - 7000 Sq. ft.', value: 12300 },
    { label: '7001 - 7500 Sq. ft.', value: 13100 },
    { label: '7501 - 8000 Sq. ft.', value: 14000 },
    { label: '8001 - 8500 Sq. ft.', value: 14800 },
    { label: '8500 - 9000 Sq. ft.', value: 15700 },
    { label: '9001 - 9500 Sq. ft.', value: 16600 },
    { label: '9501 - 10000 Sq. ft', value: 17500 },
    { label: '10001 - 11000 Sq. ft', value: 19000 },
    { label: '11001 - 12000 Sq. ft.', value: 21000 },
    { label: '12001 - 13000 Sq. ft.', value: 23000 },
    { label: '13001 - 14000 Sq. ft.', value: 25000 },
    { label: '14001 - 15000 Sq. ft.', value: 27000 },
    { label: '15001 - 16000 Sq. ft.', value: 29000 },
    { label: '16001 - 17000 Sq. ft.', value: 31000 },
    { label: '17001 - 18000 Sq. ft.', value: 32000 },
    { label: '18001 - 19000 Sq. ft.', value: 34000 },
    { label: '19001 - 20000 Sq. ft', value: 35000 }
  ];

  const buildupAreaOptions = [
    { label: '1000-1200 Sq. ft.', value: 2200 },
    { label: '1201 - 1500 Sq. Ft.', value: 2650 },
    { label: '1501 - 1800 Sq. ft.', value: 3100 },
    { label: '1800 - 2200 Sq. ft.', value: 3700 },
    { label: '2201 - 2600 Sq. ft.', value: 4200 },
    { label: '2601 - 3000 Sq. ft.', value: 4900 },
    { label: '3001 - 3500 Sq. ft.', value: 5600 },
    { label: '3501 - 4000 Sq. ft.', value: 6300 },
    { label: '4000 - 4500 Sq. ft.', value: 7000 },
    { label: '4501 - 5000 Sq. ft.', value: 7700 },
    { label: '5001 - 5500 Sq. ft.', value: 8500 },
    { label: '5501 - 6000 Sq. ft.', value: 9250 },
    { label: '6001 - 6500 Sq. ft.', value: 10000 },
    { label: '6501 - 7000 Sq. ft.', value: 10750 },
    { label: '7001 - 7500 Sq. ft.', value: 11550 },
    { label: '7501 - 8000 Sq. ft.', value: 12350 },
    { label: '8001 - 8500 Sq. ft.', value: 13100 },
    { label: '8500 - 9000 Sq. ft.', value: 13900 },
    { label: '9001 - 9500 Sq. ft.', value: 14700 },
    { label: '9501 - 10000 Sq. ft', value: 15550 },
    { label: '10001 - 11000 Sq. ft', value: 17000 },
    { label: '11001 - 12000 Sq. ft.', value: 18500 },
    { label: '12001 - 13000 Sq. ft.', value: 20000 },
    { label: '13001 - 14000 Sq. ft.', value: 21750 },
    { label: '14001 - 15000 Sq. ft.', value: 23300 },
    { label: '15001 - 16000 Sq. ft.', value: 25000 },
    { label: '16001 - 17000 Sq. ft.', value: 26550 },
    { label: '17001 - 18000 Sq. ft.', value: 28200 },
    { label: '18001 - 19000 Sq. ft.', value: 30000 },
    { label: '19001 - 20000 Sq. ft', value: 31500 }
  ];

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

  // Define steps for the indicator
  const steps = [
    { label: 'PAINTING DETAILS', completed: currentStep > 1 },
    { label: 'PERSONAL DETAILS', completed: currentStep > 2 },
    { label: 'RESULT', completed: currentStep > 3 }
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
              onNext={nextStep}
              onBack={prevStep}
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