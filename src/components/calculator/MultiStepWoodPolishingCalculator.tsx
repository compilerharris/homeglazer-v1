import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import WoodPolishingStep1 from './WoodPolishingStep1';
import PaintingStep2 from './PaintingStep2';
import PaintingStep5 from './PaintingStep5';

import { woodFinishOptions } from '../../lib/calculator-constants';
import { calculateWoodPolishingEstimate } from '../../lib/calculator-utils';

interface Step {
  label: string;
  completed: boolean;
}

const MultiStepWoodPolishingCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [inputMethod, setInputMethod] = useState<'area' | 'items'>('area');
  const [quantity, setQuantity] = useState(0);
  const [doorCount, setDoorCount] = useState(0);
  const [windowCount, setWindowCount] = useState(0);
  const [wallPanelCount, setWallPanelCount] = useState(0);
  const [furnitureArea, setFurnitureArea] = useState(0);
  const [selectedWoodFinishBrand, setSelectedWoodFinishBrand] = useState<string>('');
  const [selectedWoodFinishType, setSelectedWoodFinishType] = useState<string>('');
  const [selectedWoodFinish, setSelectedWoodFinish] = useState<{ value: string; name: string } | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [serviceType, setServiceType] = useState('');

  const steps: Step[] = [
    { label: 'WORK DETAILS', completed: currentStep > 1 },
    { label: 'PERSONAL DETAILS', completed: currentStep > 2 },
    { label: 'RESULT', completed: isFormSubmitted || currentStep > 3 }
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

  const handleSendSummary = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/calculator-wood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          serviceType: 'Wood Polishing',
          location,
          inputMethod,
          area: quantity,
          itemCounts: {
            doors: doorCount,
            windows: windowCount,
            wallPanels: wallPanelCount,
            furnitureArea: furnitureArea
          },
          selectedWoodFinishType,
          selectedWoodFinishBrand,
          selectedWoodFinish,
          woodPolishingTotalEstimate: calculateTotalEstimate()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send summary');
      }

      setIsFormSubmitted(true);
      nextStep();
    } catch (error) {
      console.error('Error sending wood polishing summary:', error);
      alert('Failed to send summary. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const restartCalculator = () => {
    setCurrentStep(1);
    setIsFormSubmitted(false);
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
    return calculateWoodPolishingEstimate(
      inputMethod,
      quantity,
      {
        doors: doorCount,
        windows: windowCount,
        wallPanels: wallPanelCount,
        furnitureArea: furnitureArea
      },
      Number(selectedWoodFinish.value)
    );
  };

  const totalEstimate = calculateTotalEstimate();

  const renderCurrentStep = () => {
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
            onNext={handleSendSummary}
            onBack={prevStep}
            hideServiceType={true}
            isLoading={isSending}
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

  return (
    <div className="w-full pb-12 pt-0">
      <div className="w-full container mx-auto">
        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="mt-0">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default MultiStepWoodPolishingCalculator; 