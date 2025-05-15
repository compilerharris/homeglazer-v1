import React, { useState } from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import Link from 'next/link';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface WoodCalculatorState {
  area: number;
  woodType: string;
  includesRepair: boolean;
  includesStaining: boolean;
}

const WoodPolishingCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<WoodCalculatorState>({
    area: 0,
    woodType: 'standard',
    includesRepair: false,
    includesStaining: false
  });
  
  const [showEstimate, setShowEstimate] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const inputValue = isCheckbox 
      ? (e.target as HTMLInputElement).checked 
      : type === 'number' 
        ? parseInt(value) || 0
        : value;
    
    setCalculatorState({
      ...calculatorState,
      [name]: inputValue
    });
    
    // Hide estimate when inputs change
    setShowEstimate(false);
  };

  const calculateEstimate = () => {
    // Calculate based on wood type
    const baseRatePerSqFt = calculatorState.woodType === 'premium' ? 10 : 
                           calculatorState.woodType === 'hardwood' ? 8 : 7;
    
    let totalCost = calculatorState.area * baseRatePerSqFt;
    
    // Add additional costs for options
    if (calculatorState.includesRepair) {
      totalCost += 250; // Flat fee for repairs
    }
    
    if (calculatorState.includesStaining) {
      totalCost += calculatorState.area * 2; // $2 extra per sq ft for staining
    }
    
    return totalCost;
  };
  
  const handleCalculate = () => {
    setShowEstimate(true);
  };

  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      
      <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculator">Budget Calculator</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculator/wood-polishing">Wood Polishing Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Wood Polishing Calculator Page Content */}
      <section className="w-[90%] lg:w-[80%] mx-auto my-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-[rgba(237,39,110,1)] text-[40px] font-medium mb-4">
              Wood Polishing Cost Calculator
            </h1>
            <p className="text-[rgba(64,80,94,1)] text-xl">
              Calculate an estimate for your wood polishing needs
            </p>
          </div>
          
          <div className="bg-[#f8f8f8] rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <div className="p-8">
              <div className="space-y-6">
                <div className="form-group">
                  <label className="block text-[rgba(64,80,94,1)] mb-2 font-medium">Approximate Wood Area (sq ft)</label>
                  <input
                    type="number"
                    name="area"
                    value={calculatorState.area}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(237,39,110,0.5)]"
                    min="0"
                    placeholder="Enter wood area in square feet"
                  />
                  <p className="text-sm text-[rgba(64,80,94,0.7)] mt-1">For flooring, multiply room length by width</p>
                </div>
                
                <div className="form-group">
                  <label className="block text-[rgba(64,80,94,1)] mb-2 font-medium">Wood Type</label>
                  <select
                    name="woodType"
                    value={calculatorState.woodType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgba(237,39,110,0.5)]"
                  >
                    <option value="standard">Standard Wood</option>
                    <option value="hardwood">Hardwood</option>
                    <option value="premium">Premium/Exotic Wood</option>
                  </select>
                  <p className="text-sm text-[rgba(64,80,94,0.7)] mt-1">Different wood types require different treatment</p>
                </div>
                
                <div className="form-group">
                  <label className="flex items-center text-[rgba(64,80,94,1)] font-medium">
                    <input
                      type="checkbox"
                      name="includesRepair"
                      checked={calculatorState.includesRepair}
                      onChange={handleInputChange}
                      className="mr-2 h-5 w-5"
                    />
                    Include Wood Repairs
                  </label>
                  <p className="text-sm text-[rgba(64,80,94,0.7)] mt-1 ml-7">Includes fixing cracks, holes, and damages</p>
                </div>
                
                <div className="form-group">
                  <label className="flex items-center text-[rgba(64,80,94,1)] font-medium">
                    <input
                      type="checkbox"
                      name="includesStaining"
                      checked={calculatorState.includesStaining}
                      onChange={handleInputChange}
                      className="mr-2 h-5 w-5"
                    />
                    Include Wood Staining
                  </label>
                  <p className="text-sm text-[rgba(64,80,94,0.7)] mt-1 ml-7">Adds color to enhance the wood appearance</p>
                </div>
                
                <div className="mt-8">
                  <button 
                    onClick={handleCalculate}
                    className="w-full bg-[rgba(237,39,110,1)] text-white font-medium py-3 rounded-full hover:bg-[rgba(237,39,110,0.9)] transition-colors"
                  >
                    Calculate Estimate
                  </button>
                </div>
                
                {showEstimate && (
                  <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-xl font-medium mb-4 text-[rgba(237,39,110,1)]">Your Estimate</h3>
                    <div className="flex justify-between items-center border-b border-gray-100 py-3">
                      <span className="text-[rgba(64,80,94,1)]">
                        {calculatorState.woodType.charAt(0).toUpperCase() + calculatorState.woodType.slice(1)} wood polishing 
                        ({calculatorState.area} sq ft)
                      </span>
                      <span className="font-medium">
                        ${calculatorState.area * (
                          calculatorState.woodType === 'premium' ? 10 : 
                          calculatorState.woodType === 'hardwood' ? 8 : 7
                        )}
                      </span>
                    </div>
                    
                    {calculatorState.includesRepair && (
                      <div className="flex justify-between items-center border-b border-gray-100 py-3">
                        <span className="text-[rgba(64,80,94,1)]">Wood repairs</span>
                        <span className="font-medium">$250</span>
                      </div>
                    )}
                    
                    {calculatorState.includesStaining && (
                      <div className="flex justify-between items-center border-b border-gray-100 py-3">
                        <span className="text-[rgba(64,80,94,1)]">Wood staining ({calculatorState.area} sq ft)</span>
                        <span className="font-medium">${calculatorState.area * 2}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center py-4 mt-2">
                      <span className="text-lg font-medium text-[rgba(64,80,94,1)]">Total Estimated Cost</span>
                      <span className="text-xl font-bold text-[rgba(237,39,110,1)]">${calculateEstimate()}</span>
                    </div>
                    <p className="text-sm text-[rgba(64,80,94,0.7)] mt-4">
                      This is an approximate estimate. Final costs may vary based on wood condition, specific requirements, and material quality.
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#ED276E] to-[#299dd7] p-8 text-center">
              <p className="text-white text-lg mb-4">Want a professional assessment?</p>
              <Link 
                href="/contact" 
                className="inline-flex items-center rounded-full bg-white text-[rgba(237,39,110,1)] px-6 py-3 hover:bg-gray-100 transition-colors font-medium"
              >
                Request an On-Site Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default WoodPolishingCalculator; 