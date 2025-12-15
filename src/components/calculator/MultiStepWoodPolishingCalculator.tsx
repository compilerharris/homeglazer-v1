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

interface Step {
  label: string;
  completed: boolean;
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
  const [inputMethod, setInputMethod] = useState<'area' | 'items'>('area');
  const [quantity, setQuantity] = useState(0);
  const [doorCount, setDoorCount] = useState(0);
  const [windowCount, setWindowCount] = useState(0);
  const [wallPanelCount, setWallPanelCount] = useState(0);
  const [furnitureArea, setFurnitureArea] = useState(0);
  const [selectedWoodFinishType, setSelectedWoodFinishType] = useState<string>('');
  const [selectedWoodFinishBrand, setSelectedWoodFinishBrand] = useState<string>('');
  const [selectedWoodFinish, setSelectedWoodFinish] = useState<WoodFinishOption | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('');

  const steps: Step[] = [
    { label: 'Work Details', completed: currentStep > 1 },
    { label: 'Personal Details', completed: currentStep > 2 },
    { label: 'Summary', completed: currentStep > 3 }
  ];

  const handleInputMethodChange = (method: 'area' | 'items') => {
    setInputMethod(method);
    setQuantity(0);
    setDoorCount(0);
    setWindowCount(0);
    setWallPanelCount(0);
    setFurnitureArea(0);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  const handleDoorCountChange = (value: number) => {
    setDoorCount(value);
  };

  const handleWindowCountChange = (value: number) => {
    setWindowCount(value);
  };

  const handleWallPanelCountChange = (value: number) => {
    setWallPanelCount(value);
  };

  const handleFurnitureAreaChange = (value: number) => {
    setFurnitureArea(value);
  };

  const handleWoodFinishTypeChange = (value: string) => {
    setSelectedWoodFinishType(value);
    setSelectedWoodFinishBrand('');
    setSelectedWoodFinish(null);
  };

  const handleWoodFinishBrandChange = (value: string) => {
    setSelectedWoodFinishBrand(value);
    const selectedFinish = woodFinishOptions[selectedWoodFinishType]?.[value]?.[0] || null;
    setSelectedWoodFinish(selectedFinish);
  };

  const handleWoodFinishChange = (value: string) => {
    // This handler is not needed as there is no separate finish name dropdown
    // but keeping it for potential future use or if needed elsewhere.
    // For now, selectedWoodFinish is set in handleWoodFinishBrandChange
  };

  const handleFullNameChange = (value: string) => {
    setFullName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const handleServiceTypeChange = (value: string) => {
    setServiceType(value);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const restartCalculator = () => {
    setCurrentStep(1);
    setInputMethod('area');
    setQuantity(0);
    setDoorCount(0);
    setWindowCount(0);
    setWallPanelCount(0);
    setFurnitureArea(0);
    setSelectedWoodFinishType('');
    setSelectedWoodFinishBrand('');
    setSelectedWoodFinish(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setLocation('');
    setServiceType('');
  };

  const calculateTotalEstimate = () => {
    if (!selectedWoodFinish) return 0;

    const finishValue = Number(selectedWoodFinish.value);
    let totalArea = 0;

    if (inputMethod === 'area') {
      totalArea = quantity;
    } else if (inputMethod === 'items') {
      const doorArea = doorCount * 65;
      const windowArea = windowCount * 30;
      const wallPanelArea = wallPanelCount * 80;
      const furnitureAreaValue = furnitureArea;
      totalArea = doorArea + windowArea + wallPanelArea + furnitureAreaValue;
    }

    return totalArea * finishValue;
  };

  const totalEstimate = calculateTotalEstimate();

  switch (currentStep) {
    case 1:
      return (
        <WoodPolishingStep1
          workType={inputMethod}
          onWorkTypeChange={handleInputMethodChange}
          area={quantity}
          onAreaChange={handleQuantityChange}
          itemCounts={{
            doors: doorCount,
            windows: windowCount,
            wallPanels: wallPanelCount,
            furnitureArea: furnitureArea
          }}
          onItemCountChange={(item: string, value: number) => {
            switch (item) {
              case 'doors':
                handleDoorCountChange(value);
                break;
              case 'windows':
                handleWindowCountChange(value);
                break;
              case 'wallPanels':
                handleWallPanelCountChange(value);
                break;
              case 'furnitureArea':
                handleFurnitureAreaChange(value);
                break;
            }
          }}
          woodFinishOptions={woodFinishOptions}
          selectedWoodFinishType={selectedWoodFinishType}
          onWoodFinishTypeChange={handleWoodFinishTypeChange}
          selectedWoodFinishBrand={selectedWoodFinishBrand}
          onWoodFinishBrandChange={handleWoodFinishBrandChange}
          selectedWoodFinish={selectedWoodFinish}
          onWoodFinishChange={handleWoodFinishChange}
          onNext={nextStep}
          onBack={prevStep}
        />
      );
    case 2:
      return (
        <PaintingStep2
          fullName={fullName}
          onFullNameChange={handleFullNameChange}
          email={email}
          onEmailChange={handleEmailChange}
          phone={phone}
          onPhoneChange={handlePhoneChange}
          location={location}
          onLocationChange={handleLocationChange}
          serviceType="Wood Polishing"
          onServiceTypeChange={handleServiceTypeChange}
          onNext={nextStep}
          onBack={prevStep}
          hideServiceType={true}
        />
      );
    case 3:
      return (
        <PaintingStep5
          fullName={fullName}
          email={email}
          onBack={prevStep}
          onRestart={restartCalculator}
          inputMethod={inputMethod}
          woodPolishingArea={quantity}
          itemCounts={{
            doors: doorCount,
            windows: windowCount,
            wallPanels: wallPanelCount,
            furnitureArea: furnitureArea
          }}
          selectedWoodFinishType={selectedWoodFinishType}
          selectedWoodFinishBrand={selectedWoodFinishBrand}
          selectedWoodFinish={selectedWoodFinish}
          woodPolishingTotalEstimate={totalEstimate}
        />
      );
    default:
      return null;
  }
};

export default MultiStepWoodPolishingCalculator; 