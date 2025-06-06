import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import WoodPolishingStep1 from './WoodPolishingStep1';
import PaintingStep2 from './PaintingStep2';
import PaintingStep5 from './PaintingStep5';

// Define the structure for wood finish options
interface WoodFinishOption {
  value: string;
  name: string;
}

interface WoodFinishBrand {
  [brand: string]: WoodFinishOption[];
}

interface WoodFinishOptions {
  [finishType: string]: WoodFinishBrand;
}

// Wood finish data
const woodFinishOptions: WoodFinishOptions = {
  Lacquer: {
    'Wembley': [{ value: '80', name: 'Wembley' }],
    'Asian Paints': [{ value: '80', name: 'Asian Paints' }],
  },
  'Melamine Matt': {
    'Jubliant': [{ value: '180', name: 'Jubliant' }],
    'Dulux': [{ value: '180', name: 'Dulux' }],
    'Asian Paints': [{ value: '180', name: 'Asian Paints' }],
    'Berger': [{ value: '180', name: 'Berger' }],
  },
  'Melamine Gloss': {
    'Jubliant': [{ value: '180', name: 'Jubliant' }],
    'Dulux': [{ value: '180', name: 'Dulux' }],
    'Asian Paints': [{ value: '180', name: 'Asian Paints' }],
    'Berger': [{ value: '180', name: 'Berger' }],
  },
  'PU Clear Matt': {
    'Asian Paints WoodTech PU Luxury Clear': [{ value: '320', name: 'Asian Paints WoodTech PU Luxury Clear' }],
    'Asian Paints WoodTech Emporio PU Clear': [{ value: '350', name: 'Asian Paints WoodTech Emporio PU Clear' }],
    'ICA Coatings': [{ value: '350', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '350', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '300', name: 'Woodver' }],
    'Kapci': [{ value: '310', name: 'Kapci' }],
    'MRF': [{ value: '340', name: 'MRF' }],
    'Nerolac': [{ value: '330', name: 'Nerolac' }],
    'Berger': [{ value: '330', name: 'Berger' }],
    'Akzonobel': [{ value: '330', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '320', name: 'Sherim Willams' }],
    'Unico Sirca': [{ value: '300', name: 'Unico Sirca' }],
  },
  'PU Clear High Gloss': {
    'Asian Paints Luxury WoodTech PU Clear': [{ value: '375', name: 'Asian Paints Luxury WoodTech PU Clear' }],
    'Asian Paints WoodTech Emporio PU Clear': [{ value: '420', name: 'Asian Paints WoodTech Emporio PU Clear' }],
    'ICA Coatings': [{ value: '420', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '420', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '370', name: 'Woodver' }],
    'Kapci': [{ value: '380', name: 'Kapci' }],
    'MRF': [{ value: '400', name: 'MRF' }],
    'Nerolac': [{ value: '400', name: 'Nerolac' }],
    'Berger': [{ value: '400', name: 'Berger' }],
    'Akzonobel': [{ value: '400', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '400', name: 'Sherim Willams' }],
    'Unico Sirca': [{ value: '370', name: 'Unico Sirca' }],
  },
  'Water Based Clear PU': {
    'Asian Paints': [{ value: '200', name: 'Asian Paints' }],
    'Dulux': [{ value: '200', name: 'Dulux' }],
    'MRF': [{ value: '200', name: 'MRF' }],
  },
  'DUCO Paint': {
    'AkzoNobel': [{ value: '200', name: 'AkzoNobel' }],
  },
  'PU Paint Matt (Pigment)': {
    'Asian Paints PU Palette Interior': [{ value: '340', name: 'Asian Paints PU Palette Interior' }],
    'ICA Coatings': [{ value: '370', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '370', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '330', name: 'Woodver' }],
    'Kapci': [{ value: '340', name: 'Kapci' }],
    'MRF': [{ value: '350', name: 'MRF' }],
    'Nerolac': [{ value: '350', name: 'Nerolac' }],
    'Berger': [{ value: '350', name: 'Berger' }],
    'Akzonobel': [{ value: '350', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '350', name: 'Sherim Willams' }],
    'Asian Paints EMPORIO PU Palette': [{ value: '370', name: 'Asian Paints EMPORIO PU Palette' }],
    'UNICO Sirca': [{ value: '330', name: 'UNICO Sirca' }],
  },
  'PU High Gloss Paint (Pigment)': {
    'Asian Paints PU Palette Interior': [{ value: '380', name: 'Asian Paints PU Palette Interior' }],
    'ICA Coatings': [{ value: '420', name: 'ICA Coatings' }],
    'Sirca Coatings': [{ value: '420', name: 'Sirca Coatings' }],
    'Woodver': [{ value: '380', name: 'Woodver' }],
    'Kapci': [{ value: '390', name: 'Kapci' }],
    'MRF': [{ value: '395', name: 'MRF' }],
    'Nerolac': [{ value: '395', name: 'Nerolac' }],
    'Berger': [{ value: '395', name: 'Berger' }],
    'Akzonobel': [{ value: '395', name: 'Akzonobel' }],
    'Sherim Willams': [{ value: '395', name: 'Sherim Willams' }],
    'Asian Paints EMPORIO PU Palette': [{ value: '420', name: 'Asian Paints EMPORIO PU Palette' }],
    'UNICO Sirca': [{ value: '380', name: 'UNICO Sirca' }],
  },
  'Polyester Clear': {
    'ICA': [{ value: '550', name: 'ICA' }],
    'Sirca': [{ value: '550', name: 'Sirca' }],
    'Asian Paints': [{ value: '550', name: 'Asian Paints' }],
  },
  'Polyester Pigment': {
    'ICA': [{ value: '650', name: 'ICA' }],
    'Sirca': [{ value: '650', name: 'Sirca' }],
    'Asian Paints': [{ value: '650', name: 'Asian Paints' }],
  },
  'Enamel Paint (Satin or Gloss)': {
    'Asian Paints': [{ value: '30', name: 'Asian Paints' }],
    'Berger': [{ value: '30', name: 'Berger' }],
    'Dulux': [{ value: '30', name: 'Dulux' }],
    'Nerolac': [{ value: '30', name: 'Nerolac' }],
    'Shalimar': [{ value: '30', name: 'Shalimar' }],
  },
};

const MultiStepWoodPolishingCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 - Wood Polishing Details
  const [workType, setWorkType] = useState('');
  const [area, setArea] = useState(0);
  const [itemCounts, setItemCounts] = useState({
    doors: 0,
    windows: 0,
    wallPanels: 0,
    furnitureArea: 0
  });

  // Wood finish selection state
  const [selectedWoodFinishType, setSelectedWoodFinishType] = useState('');
  const [selectedWoodFinishBrand, setSelectedWoodFinishBrand] = useState('');
  const [selectedWoodFinish, setSelectedWoodFinish] = useState<
    WoodFinishOption | null
  >(null);

  // Step 2 - Personal Details (from Painting Calculator's Step 2)
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState('Wood Polishing'); // Default service type
  const [location, setLocation] = useState('');

  const [steps, setSteps] = useState([
    { label: 'Work Details', completed: false },
    { label: 'Personal Details', completed: false }, // Using PaintingStep2
    { label: 'Result', completed: false } // Using PaintingStep5
  ]);

  const nextStep = () => {
    setSteps(prevSteps => 
      prevSteps.map((step, index) => 
        index === currentStep - 1 ? { ...step, completed: true } : step
      )
    );
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setSteps(prevSteps => 
        prevSteps.map((step, index) => 
          index === currentStep - 2 ? { ...step, completed: false } : step
        )
      );
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleWorkTypeChange = (value: string) => {
    setWorkType(value);
  };

  const handleAreaChange = (value: number) => {
    setArea(value);
  };

  const handleItemCountChange = (item: string, value: number) => {
    setItemCounts(prev => ({
      ...prev,
      [item]: value
    }));
  };

  const handleWoodFinishTypeChange = (value: string) => {
    setSelectedWoodFinishType(value);
    setSelectedWoodFinishBrand(''); // Reset brand and finish when type changes
    setSelectedWoodFinish(null);
  };

  const handleWoodFinishBrandChange = (value: string) => {
    setSelectedWoodFinishBrand(value);
    // Find the first available finish option for the selected brand and set it
    const finishOptionsForBrand = woodFinishOptions[selectedWoodFinishType]?.[value];
    if (finishOptionsForBrand && finishOptionsForBrand.length > 0) {
      setSelectedWoodFinish(finishOptionsForBrand[0]);
    } else {
      setSelectedWoodFinish(null);
    }
  };

  // Handlers for Step 2 (Personal Details)
  const handleFullNameChange = (value: string) => {
    setFullName(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleServiceTypeChange = (value: string) => {
    setServiceType(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  // Although PaintingStep5 does not display the total estimate,
  // we keep this function in case future steps require it or for logging/submission.
  const calculateTotalEstimate = () => {
    if (!selectedWoodFinish) return 0;

    const finishValue = Number(selectedWoodFinish.value);
    let totalArea = 0;

    // Determine total area based on input method
    // This logic assumes input mode is tracked elsewhere or derived from state
    // For now, let's assume 'area' state being non-zero means area input was used
    if (workType === 'area') {
      totalArea = area;
    } else { // Assuming item count input was used
      const doorArea = itemCounts.doors * 65;
      const windowArea = itemCounts.windows * 30;
      const wallPanelArea = itemCounts.wallPanels * 80;
      const furnitureArea = itemCounts.furnitureArea;
      totalArea = doorArea + windowArea + wallPanelArea + furnitureArea;
    }

    return totalArea * finishValue;
  };

  return (
    <div className="w-full py-12">
      <div className="w-[90%] lg:w-[80%] container mx-auto">
        <StepIndicator currentStep={currentStep} steps={steps} />
        
        <div className="mt-12">
          {currentStep === 1 && (
            <WoodPolishingStep1 
              workType={workType}
              onWorkTypeChange={handleWorkTypeChange}
              area={area}
              onAreaChange={handleAreaChange}
              itemCounts={itemCounts}
              onItemCountChange={handleItemCountChange}
              woodFinishOptions={woodFinishOptions} // Pass down wood finish data
              selectedWoodFinishType={selectedWoodFinishType}
              onWoodFinishTypeChange={handleWoodFinishTypeChange}
              selectedWoodFinishBrand={selectedWoodFinishBrand}
              onWoodFinishBrandChange={handleWoodFinishBrandChange}
              selectedWoodFinish={selectedWoodFinish}
              onWoodFinishChange={setSelectedWoodFinish} // Keep this handler for completeness, though not used in UI anymore
              onNext={nextStep}
              onBack={prevStep} // Step 1 does not have a back button
            />
          )}

          {currentStep === 2 && (
            <PaintingStep2
               fullName={fullName}
               onFullNameChange={handleFullNameChange}
               phone={phone}
               onPhoneChange={handlePhoneChange}
               email={email}
               onEmailChange={handleEmailChange}
               serviceType={serviceType}
               onServiceTypeChange={handleServiceTypeChange}
               location={location}
               onLocationChange={handleLocationChange}
               onNext={nextStep}
               onBack={prevStep}
               hideServiceType={true}
            />
          )}

          {currentStep === 3 && (
            <PaintingStep5
               fullName={fullName}
               email={email}
               onRestart={() => setCurrentStep(1)}
               onBack={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepWoodPolishingCalculator; 