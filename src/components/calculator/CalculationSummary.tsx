import React from 'react';

interface CalculationSummaryProps {
  selectedPaintingType: string;
  workType: string;
  area: number;
  areaTypes: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  paintCategory: string;
  paintBrand: string;
  paintType: string;
  roofWorkType: string;
  roofArea: number;
  roofAreaTypes: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  roofPaintCategory: string;
  roofPaintBrand: string;
  roofPaintType: string;
  exteriorPaintCategory: string;
  exteriorPaintBrand: string;
  exteriorPaintType: string;
  samePaintForCeiling: boolean;
  ceilingPaintCategory: string;
  ceilingPaintBrand: string;
  ceilingPaintType: string;
  carpetAreaOptions: {
    label: string;
    value: number;
  }[];
  buildupAreaOptions: {
    label: string;
    value: number;
  }[];
}

const CalculationSummary: React.FC<CalculationSummaryProps> = ({
  selectedPaintingType,
  workType,
  area,
  areaTypes,
  paintCategory,
  paintBrand,
  paintType,
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
  ceilingPaintType,
  carpetAreaOptions,
  buildupAreaOptions
}) => {
  // Add function to calculate display area
  const getDisplayArea = () => {
    if (!area || !areaTypes) return 0;
    if (samePaintForCeiling) {
      let firstNumber = 0;
      if (areaTypes.find(type => type.id === 'carpet')?.selected) {
        const selectedOption = carpetAreaOptions.find(option => option.value === area);
        if (selectedOption) {
          firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
        }
      } else if (areaTypes.find(type => type.id === 'buildup')?.selected) {
        const selectedOption = buildupAreaOptions.find(option => option.value === area);
        if (selectedOption) {
          firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
        }
      }
      return area - firstNumber;
    }
    return area;
  };

  // Add calculation function
  const calculateInteriorPrice = () => {
    if (!area || !paintType || !areaTypes) return 0;
    // If different paint for ceiling is selected, subtract the first number from the range
    if (samePaintForCeiling) {
      // Get the first number from the selected area range
      let firstNumber = 0;
      if (areaTypes.find(type => type.id === 'carpet')?.selected) {
        const selectedOption = carpetAreaOptions.find(option => option.value === area);
        if (selectedOption) {
          firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
        }
      } else if (areaTypes.find(type => type.id === 'buildup')?.selected) {
        const selectedOption = buildupAreaOptions.find(option => option.value === area);
        if (selectedOption) {
          firstNumber = parseInt(selectedOption.label.split('-')[0].trim());
        }
      }
      // Calculate wall area by subtracting ceiling area (first number from range)
      const wallArea = area - firstNumber;
      return wallArea * Number(paintType);
    }
    return area * Number(paintType);
  };

  // Add calculation function for ceiling
  const calculateCeilingPrice = () => {
    if (!area || !ceilingPaintType || !areaTypes) return 0;
    // When different paint for ceiling is selected, use the first number from the range
    let ceilingArea = 0;
    if (areaTypes.find(type => type.id === 'carpet')?.selected) {
      const selectedOption = carpetAreaOptions.find(option => option.value === area);
      if (selectedOption) {
        ceilingArea = parseInt(selectedOption.label.split('-')[0].trim());
      }
    } else if (areaTypes.find(type => type.id === 'buildup')?.selected) {
      const selectedOption = buildupAreaOptions.find(option => option.value === area);
      if (selectedOption) {
        ceilingArea = parseInt(selectedOption.label.split('-')[0].trim());
      }
    }
    return ceilingArea * Number(ceilingPaintType);
  };

  // Get selected area type label
  const getSelectedAreaType = () => {
    if (!areaTypes) return '';
    const selectedType = areaTypes.find(type => type.selected);
    return selectedType ? selectedType.label : '';
  };

  // Get selected paint name
  const getSelectedPaintName = () => {
    if (!paintType) return '';
    
    type PaintOption = {
      value: string;
      name: string;
    };

    type PaintCategory = {
      [key: string]: PaintOption[];
    };

    type PaintOptions = {
      [key: string]: PaintCategory;
    };
    
    // Find the paint name based on category, brand and selected value
    const paintOptions: PaintOptions = {
      economical: {
        'asian-paints': [
          { value: '22', name: 'Tractor Emulsion (Recommended)' },
          { value: '23', name: 'Tractor Emulsion Advance' },
          { value: '23', name: 'Tractor Emulsion Shyne' },
          { value: '21', name: 'Tractor Emulsion Sparc' },
          { value: '21.5', name: 'Tractor Emulsion Sparc Advance' }
        ],
        'dulux': [
          { value: '22', name: 'Promise Interior (Recommended)' },
          { value: '21', name: 'Promise Interior Smart Choice' },
          { value: '23', name: 'Dulux Promise Sheen Interior' }
        ],
        'nerolac': [
          { value: '22', name: 'Nerolac Beauty Smooth Finish' },
          { value: '22', name: 'Nerolac Beauty Little Master' }
        ],
        'berger': [
          { value: '22', name: 'Berger Bison Acrylic Emulsion' },
          { value: '23', name: 'Berger Bison Glow Acrylic Emulsion' }
        ],
        'shalimar': [
          { value: '20', name: 'Shalimar Master Acrylic Emulsion' },
          { value: '20', name: 'Shalimar No. 1 Silk Acrylic Emulsion' }
        ],
        'jsw': [
          { value: '21', name: 'Pixa Joy Classic Interiors' },
          { value: '22', name: 'Pixa Elegant Interiors' },
          { value: '23', name: 'Pixa Elegant Interiors Silk' }
        ]
      },
      premium: {
        'asian-paints': [
          { value: '24', name: 'Apcolite Premium Emulsion (Recommended)' },
          { value: '24', name: 'Apcolite Premium Satin Emulsion' },
          { value: '26', name: 'Apcolite All Protek' },
          { value: '26', name: 'Apcolite Advance Shyne' },
          { value: '26', name: 'Apcolite Advanced Heavy Duty Emulsion' }
        ],
        'dulux': [
          { value: '24', name: 'Dulux Super Cover (Recommended)' },
          { value: '26', name: 'Dulux Super Clean' },
          { value: '27', name: 'Dulux Super Clean 3in1 (Recommended)' },
          { value: '26', name: 'Dulux Super Cover Sheen' }
        ],
        'nerolac': [
          { value: '24', name: 'Nerolac Pearls Emulsion' },
          { value: '24', name: 'Nerolac Pearls Luster Finish' },
          { value: '23', name: 'Nerolac Beauty Silver' },
          { value: '25', name: 'Nerolac Beauty Gold' },
          { value: '27', name: 'Nerolac Beauty Gold Washable (Recommended)' },
          { value: '26', name: 'Nerolac Beauty Sheen' },
          { value: '25', name: 'Nerolac Beauty Ceiling Emulsion' }
        ],
        'berger': [
          { value: '24', name: 'Berger Rangoli Total Care' }
        ],
        'shalimar': [
          { value: '22', name: 'Shalimar Superlac Advance' }
        ],
        'jsw': [
          { value: '24', name: 'Aurus Regal Interiors Lustre' },
          { value: '24', name: 'Aurus Regal Interiors' },
          { value: '26', name: 'Aurus Regal Interiors Silk' }
        ]
      },
      luxury: {
        'asian-paints': [
          { value: '34', name: 'Royale Luxury Emulsion (Recommended)' },
          { value: '35', name: 'Royale Lustre' },
          { value: '35', name: 'Royale Advanced' },
          { value: '34', name: 'Royale Matt (Recommended)' },
          { value: '36', name: 'Royale Shyne Luxury Emulsion' },
          { value: '38', name: 'Royale Health Shield' },
          { value: '40', name: 'Royale Aspira (Recommended)' },
          { value: '41', name: 'Royale Glitz' },
          { value: '38', name: 'Royale Atmos' }
        ],
        'dulux': [
          { value: '34', name: 'Dulux Velvet Touch Pearl Glo (Recommended)' },
          { value: '36', name: 'Dulux Velvet Touch Diamond Glo' },
          { value: '36', name: 'Dulux Velvet Touch Platinum Glo (Recommended)' },
          { value: '38', name: 'Dulux Ambiance Velvet Touch Elastoglo (Recommended)' },
          { value: '38', name: 'Dulux Better Living Air Biobased' }
        ],
        'nerolac': [
          { value: '34', name: 'Impressions Kashmir (Recommended)' },
          { value: '36', name: 'Impression Ultra HD' },
          { value: '36', name: 'Nerolac Impressions HD (Recommended)' },
          { value: '37', name: 'Impression Ultra Fresh' }
        ],
        'berger': [
          { value: '34', name: 'Berger Easy Clean (Recommended)' },
          { value: '36', name: 'Berger Easy Clean Fresh' },
          { value: '36', name: 'Berger Silk Glow' },
          { value: '38', name: 'Berger Silk Glamor Soft Sheen (Recommended)' },
          { value: '38', name: 'Berger Silk Glamor High Sheen' },
          { value: '38', name: 'Berger Silk Breathe Easy' }
        ],
        'shalimar': [
          { value: '31', name: 'Shalimar Superlac Stay Clean' },
          { value: '32', name: 'Shalimar Signature' }
        ],
        'jsw': [
          { value: '34', name: 'Vogue Astoniq' },
          { value: '38', name: 'Halo Majestic Interiors - Silk (Recommended)' },
          { value: '38', name: 'Halo Majestic Interiors Shine' }
        ]
      }
    };

    const paintList = paintOptions[paintCategory]?.[paintBrand] || [];
    const selectedPaint = paintList.find((paint: PaintOption) => paint.value === paintType);
    return selectedPaint?.name || '';
  };

  // Get selected paint brand name
  const getPaintBrandName = () => {
    const brandMap: { [key: string]: string } = {
      'asian-paints': 'Asian Paints',
      'dulux': 'Dulux',
      'nerolac': 'Nerolac',
      'berger': 'Berger',
      'shalimar': 'Shalimar',
      'jsw': 'JSW'
    };
    return brandMap[paintBrand] || '';
  };

  // Get selected ceiling paint name
  const getSelectedCeilingPaintName = () => {
    if (!ceilingPaintType) return '';
    
    type PaintOption = {
      value: string;
      name: string;
    };

    type PaintCategory = {
      [key: string]: PaintOption[];
    };

    type PaintOptions = {
      [key: string]: PaintCategory;
    };
    
    const paintOptions: PaintOptions = {
      economical: {
        'asian-paints': [
          { value: '22', name: 'Tractor Emulsion (Recommended)' },
          { value: '23', name: 'Tractor Emulsion Advance' },
          { value: '23', name: 'Tractor Emulsion Shyne' },
          { value: '21', name: 'Tractor Emulsion Sparc' },
          { value: '21.5', name: 'Tractor Emulsion Sparc Advance' }
        ],
        'dulux': [
          { value: '22', name: 'Promise Interior (Recommended)' },
          { value: '21', name: 'Promise Interior Smart Choice' },
          { value: '23', name: 'Dulux Promise Sheen Interior' }
        ],
        'nerolac': [
          { value: '22', name: 'Nerolac Beauty Smooth Finish' },
          { value: '22', name: 'Nerolac Beauty Little Master' }
        ],
        'berger': [
          { value: '22', name: 'Berger Bison Acrylic Emulsion' },
          { value: '23', name: 'Berger Bison Glow Acrylic Emulsion' }
        ],
        'shalimar': [
          { value: '20', name: 'Shalimar Master Acrylic Emulsion' },
          { value: '20', name: 'Shalimar No. 1 Silk Acrylic Emulsion' }
        ],
        'jsw': [
          { value: '21', name: 'Pixa Joy Classic Interiors' },
          { value: '22', name: 'Pixa Elegant Interiors' },
          { value: '23', name: 'Pixa Elegant Interiors Silk' }
        ]
      },
      premium: {
        'asian-paints': [
          { value: '24', name: 'Apcolite Premium Emulsion (Recommended)' },
          { value: '24', name: 'Apcolite Premium Satin Emulsion' },
          { value: '26', name: 'Apcolite All Protek' },
          { value: '26', name: 'Apcolite Advance Shyne' },
          { value: '26', name: 'Apcolite Advanced Heavy Duty Emulsion' }
        ],
        'dulux': [
          { value: '24', name: 'Dulux Super Cover (Recommended)' },
          { value: '26', name: 'Dulux Super Clean' },
          { value: '27', name: 'Dulux Super Clean 3in1 (Recommended)' },
          { value: '26', name: 'Dulux Super Cover Sheen' }
        ],
        'nerolac': [
          { value: '24', name: 'Nerolac Pearls Emulsion' },
          { value: '24', name: 'Nerolac Pearls Luster Finish' },
          { value: '23', name: 'Nerolac Beauty Silver' },
          { value: '25', name: 'Nerolac Beauty Gold' },
          { value: '27', name: 'Nerolac Beauty Gold Washable (Recommended)' },
          { value: '26', name: 'Nerolac Beauty Sheen' },
          { value: '25', name: 'Nerolac Beauty Ceiling Emulsion' }
        ],
        'berger': [
          { value: '24', name: 'Berger Rangoli Total Care' }
        ],
        'shalimar': [
          { value: '22', name: 'Shalimar Superlac Advance' }
        ],
        'jsw': [
          { value: '24', name: 'Aurus Regal Interiors Lustre' },
          { value: '24', name: 'Aurus Regal Interiors' },
          { value: '26', name: 'Aurus Regal Interiors Silk' }
        ]
      },
      luxury: {
        'asian-paints': [
          { value: '34', name: 'Royale Luxury Emulsion (Recommended)' },
          { value: '35', name: 'Royale Lustre' },
          { value: '35', name: 'Royale Advanced' },
          { value: '34', name: 'Royale Matt (Recommended)' },
          { value: '36', name: 'Royale Shyne Luxury Emulsion' },
          { value: '38', name: 'Royale Health Shield' },
          { value: '40', name: 'Royale Aspira (Recommended)' },
          { value: '41', name: 'Royale Glitz' },
          { value: '38', name: 'Royale Atmos' }
        ],
        'dulux': [
          { value: '34', name: 'Dulux Velvet Touch Pearl Glo (Recommended)' },
          { value: '36', name: 'Dulux Velvet Touch Diamond Glo' },
          { value: '36', name: 'Dulux Velvet Touch Platinum Glo (Recommended)' },
          { value: '38', name: 'Dulux Ambiance Velvet Touch Elastoglo (Recommended)' },
          { value: '38', name: 'Dulux Better Living Air Biobased' }
        ],
        'nerolac': [
          { value: '34', name: 'Impressions Kashmir (Recommended)' },
          { value: '36', name: 'Impression Ultra HD' },
          { value: '36', name: 'Nerolac Impressions HD (Recommended)' },
          { value: '37', name: 'Impression Ultra Fresh' }
        ],
        'berger': [
          { value: '34', name: 'Berger Easy Clean (Recommended)' },
          { value: '36', name: 'Berger Easy Clean Fresh' },
          { value: '36', name: 'Berger Silk Glow' },
          { value: '38', name: 'Berger Silk Glamor Soft Sheen (Recommended)' },
          { value: '38', name: 'Berger Silk Glamor High Sheen' },
          { value: '38', name: 'Berger Silk Breathe Easy' }
        ],
        'shalimar': [
          { value: '31', name: 'Shalimar Superlac Stay Clean' },
          { value: '32', name: 'Shalimar Signature' }
        ],
        'jsw': [
          { value: '34', name: 'Vogue Astoniq' },
          { value: '38', name: 'Halo Majestic Interiors - Silk (Recommended)' },
          { value: '38', name: 'Halo Majestic Interiors Shine' }
        ]
      }
    };

    const paintList = paintOptions[ceilingPaintCategory]?.[ceilingPaintBrand] || [];
    const selectedPaint = paintList.find((paint: PaintOption) => paint.value === ceilingPaintType);
    return selectedPaint?.name || '';
  };

  // Calculate total price including ceiling if applicable
  const calculateTotalPrice = () => {
    let total = calculateInteriorPrice();
    if (samePaintForCeiling && ceilingPaintType) {
      total += calculateCeilingPrice();
    }
    return total;
  };

  // Add calculation function for exterior
  const calculateExteriorPrice = () => {
    if (!area || !exteriorPaintType) return 0;
    return area * Number(exteriorPaintType);
  };

  // Calculate total price for exterior including roof if applicable
  const calculateExteriorTotalPrice = () => {
    let total = calculateExteriorPrice();
    if (roofPaintType) {
      total += calculateRoofPrice();
    }
    return total;
  };

  // Calculate roof price
  const calculateRoofPrice = () => {
    if (!roofArea || !roofPaintType) return 0;
    return roofArea * Number(roofPaintType);
  };

  // Get selected roof paint name
  const getSelectedRoofPaintName = () => {
    if (!roofPaintType) return '';
    
    type PaintOption = {
      value: string;
      name: string;
    };

    type PaintCategory = {
      [key: string]: PaintOption[];
    };

    type PaintOptions = {
      [key: string]: PaintCategory;
    };
    
    const paintOptions: PaintOptions = {
      economical: {
        'asian-paints': [
          { value: '22', name: 'Tractor Emulsion (Recommended)' },
          { value: '23', name: 'Tractor Emulsion Advance' },
          { value: '23', name: 'Tractor Emulsion Shyne' },
          { value: '21', name: 'Tractor Emulsion Sparc' },
          { value: '21.5', name: 'Tractor Emulsion Sparc Advance' }
        ],
        'dulux': [
          { value: '22', name: 'Promise Interior (Recommended)' },
          { value: '21', name: 'Promise Interior Smart Choice' },
          { value: '23', name: 'Dulux Promise Sheen Interior' }
        ],
        'nerolac': [
          { value: '22', name: 'Nerolac Beauty Smooth Finish' },
          { value: '22', name: 'Nerolac Beauty Little Master' }
        ],
        'berger': [
          { value: '22', name: 'Berger Bison Acrylic Emulsion' },
          { value: '23', name: 'Berger Bison Glow Acrylic Emulsion' }
        ],
        'shalimar': [
          { value: '20', name: 'Shalimar Master Acrylic Emulsion' },
          { value: '20', name: 'Shalimar No. 1 Silk Acrylic Emulsion' }
        ],
        'jsw': [
          { value: '21', name: 'Pixa Joy Classic Interiors' },
          { value: '22', name: 'Pixa Elegant Interiors' },
          { value: '23', name: 'Pixa Elegant Interiors Silk' }
        ]
      },
      premium: {
        'asian-paints': [
          { value: '24', name: 'Apcolite Premium Emulsion (Recommended)' },
          { value: '24', name: 'Apcolite Premium Satin Emulsion' },
          { value: '26', name: 'Apcolite All Protek' },
          { value: '26', name: 'Apcolite Advance Shyne' },
          { value: '26', name: 'Apcolite Advanced Heavy Duty Emulsion' }
        ],
        'dulux': [
          { value: '24', name: 'Dulux Super Cover (Recommended)' },
          { value: '26', name: 'Dulux Super Clean' },
          { value: '27', name: 'Dulux Super Clean 3in1 (Recommended)' },
          { value: '26', name: 'Dulux Super Cover Sheen' }
        ],
        'nerolac': [
          { value: '24', name: 'Nerolac Pearls Emulsion' },
          { value: '24', name: 'Nerolac Pearls Luster Finish' },
          { value: '23', name: 'Nerolac Beauty Silver' },
          { value: '25', name: 'Nerolac Beauty Gold' },
          { value: '27', name: 'Nerolac Beauty Gold Washable (Recommended)' },
          { value: '26', name: 'Nerolac Beauty Sheen' },
          { value: '25', name: 'Nerolac Beauty Ceiling Emulsion' }
        ],
        'berger': [
          { value: '24', name: 'Berger Rangoli Total Care' }
        ],
        'shalimar': [
          { value: '22', name: 'Shalimar Superlac Advance' }
        ],
        'jsw': [
          { value: '24', name: 'Aurus Regal Interiors Lustre' },
          { value: '24', name: 'Aurus Regal Interiors' },
          { value: '26', name: 'Aurus Regal Interiors Silk' }
        ]
      },
      luxury: {
        'asian-paints': [
          { value: '34', name: 'Royale Luxury Emulsion (Recommended)' },
          { value: '35', name: 'Royale Lustre' },
          { value: '35', name: 'Royale Advanced' },
          { value: '34', name: 'Royale Matt (Recommended)' },
          { value: '36', name: 'Royale Shyne Luxury Emulsion' },
          { value: '38', name: 'Royale Health Shield' },
          { value: '40', name: 'Royale Aspira (Recommended)' },
          { value: '41', name: 'Royale Glitz' },
          { value: '38', name: 'Royale Atmos' }
        ],
        'dulux': [
          { value: '34', name: 'Dulux Velvet Touch Pearl Glo (Recommended)' },
          { value: '36', name: 'Dulux Velvet Touch Diamond Glo' },
          { value: '36', name: 'Dulux Velvet Touch Platinum Glo (Recommended)' },
          { value: '38', name: 'Dulux Ambiance Velvet Touch Elastoglo (Recommended)' },
          { value: '38', name: 'Dulux Better Living Air Biobased' }
        ],
        'nerolac': [
          { value: '34', name: 'Impressions Kashmir (Recommended)' },
          { value: '36', name: 'Impression Ultra HD' },
          { value: '36', name: 'Nerolac Impressions HD (Recommended)' },
          { value: '37', name: 'Impression Ultra Fresh' }
        ],
        'berger': [
          { value: '34', name: 'Berger Easy Clean (Recommended)' },
          { value: '36', name: 'Berger Easy Clean Fresh' },
          { value: '36', name: 'Berger Silk Glow' },
          { value: '38', name: 'Berger Silk Glamor Soft Sheen (Recommended)' },
          { value: '38', name: 'Berger Silk Glamor High Sheen' },
          { value: '38', name: 'Berger Silk Breathe Easy' }
        ],
        'shalimar': [
          { value: '31', name: 'Shalimar Superlac Stay Clean' },
          { value: '32', name: 'Shalimar Signature' }
        ],
        'jsw': [
          { value: '34', name: 'Vogue Astoniq' },
          { value: '38', name: 'Halo Majestic Interiors - Silk (Recommended)' },
          { value: '38', name: 'Halo Majestic Interiors Shine' }
        ]
      }
    };

    const paintList = paintOptions[roofPaintCategory]?.[roofPaintBrand] || [];
    const selectedPaint = paintList.find((paint: PaintOption) => paint.value === roofPaintType);
    return selectedPaint?.name || '';
  };

  // Add Indian currency formatter function
  const formatIndianCurrency = (number: number): string => {
    const numStr = number.toString();
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
    return formatted;
  };

  // Calculate grand total for both interior and exterior
  const calculateGrandTotal = () => {
    let total = 0;
    if (selectedPaintingType === 'interior' || selectedPaintingType === 'both') {
      total += calculateTotalPrice();
    }
    if (selectedPaintingType === 'exterior' || selectedPaintingType === 'both') {
      total += calculateExteriorTotalPrice();
    }
    return total;
  };

  // Helper to determine if the ceiling paint checkbox should be hidden
  const isPaintingAreaSelected = areaTypes?.find(type => type.id === 'painting')?.selected || false;
  const isMainPaintingType = selectedPaintingType === 'interior' || selectedPaintingType === 'exterior' || selectedPaintingType === 'both';
  const showCeilingPaintCheckbox = !(isPaintingAreaSelected && isMainPaintingType);
  const showCeilingPaintSection = showCeilingPaintCheckbox && samePaintForCeiling;

  // Render summary for interior only
  if (selectedPaintingType === 'interior' && 
      workType && area > 0 && paintCategory && paintBrand && paintType) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-2xl font-semibold mb-6 text-[#ED276E] border-b-2 border-[#ED276E] pb-2">Calculation Summary</h3>
        {/* Wall Paint Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4 text-gray-800">Wall Paint Details</h4>
          <div className="space-y-3">
            <p><span className="font-medium">Work Type:</span> {workType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
            <p><span className="font-medium">Area Type:</span> {getSelectedAreaType()}</p>
            <p><span className="font-medium">Area Value:</span> {getDisplayArea()} sq.ft</p>
            <p><span className="font-medium">Paint Category:</span> {paintCategory.charAt(0).toUpperCase() + paintCategory.slice(1)}</p>
            <p><span className="font-medium">Paint Brand:</span> {getPaintBrandName()}</p>
            <p><span className="font-medium">Selected Paint:</span> {getSelectedPaintName()}</p>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Wall Paint Price:</span> ₹{formatIndianCurrency(calculateInteriorPrice())}
              </p>
            </div>
          </div>
        </div>
        {/* Ceiling Paint Section - Only show if different paint is selected */}
        {showCeilingPaintSection && (
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium mb-4 text-gray-800">Ceiling Paint Details</h4>
            <div className="space-y-3">
              <p><span className="font-medium">Paint Category:</span> {ceilingPaintCategory.charAt(0).toUpperCase() + ceilingPaintCategory.slice(1)}</p>
              <p><span className="font-medium">Paint Brand:</span> {getPaintBrandName()}</p>
              <p><span className="font-medium">Selected Paint:</span> {getSelectedCeilingPaintName()}</p>
              <p><span className="font-medium">Area Value:</span> {area - getDisplayArea()} sq.ft</p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-lg font-medium">
                  <span className="text-[#ED276E]">Ceiling Paint Price:</span> ₹{formatIndianCurrency(calculateCeilingPrice())}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Total Price Section */}
        <div className="pt-4 border-t-2 border-gray-200 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xl font-semibold">
            <span className="text-[#ED276E]">Total Price:</span> ₹{formatIndianCurrency(calculateTotalPrice())}
          </p>
        </div>
      </div>
    );
  }

  // Render summary for exterior only
  if (selectedPaintingType === 'exterior' && 
      roofWorkType && area > 0 && exteriorPaintCategory && exteriorPaintBrand && exteriorPaintType) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-2xl font-semibold mb-6 text-[#ED276E] border-b-2 border-[#ED276E] pb-2">Calculation Summary</h3>
        {/* Exterior Wall Paint Section */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-medium mb-4 text-gray-800">Exterior Wall Paint Details</h4>
          <div className="space-y-3">
            <p><span className="font-medium">Work Type:</span> {roofWorkType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
            <p><span className="font-medium">Area Type:</span> {getSelectedAreaType()}</p>
            <p><span className="font-medium">Area Value:</span> {area} sq.ft</p>
            <p><span className="font-medium">Paint Category:</span> {exteriorPaintCategory.charAt(0).toUpperCase() + exteriorPaintCategory.slice(1)}</p>
            <p><span className="font-medium">Paint Brand:</span> {exteriorPaintBrand}</p>
            <p><span className="font-medium">Selected Paint:</span> {exteriorPaintType}</p>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Exterior Wall Paint Price:</span> ₹{formatIndianCurrency(calculateExteriorPrice())}
              </p>
            </div>
          </div>
        </div>
        {/* Roof Paint Section - Only show if roof paint is selected */}
        {roofPaintType && (
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
            <h4 className="text-lg font-medium mb-4 text-gray-800">Roof Paint Details</h4>
            <div className="space-y-3">
              <p><span className="font-medium">Roof Area:</span> {roofArea} sq.ft</p>
              <p><span className="font-medium">Paint Category:</span> {roofPaintCategory.charAt(0).toUpperCase() + roofPaintCategory.slice(1)}</p>
              <p><span className="font-medium">Paint Brand:</span> {roofPaintBrand}</p>
              <p><span className="font-medium">Selected Paint:</span> {roofPaintType}</p>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-lg font-medium">
                  <span className="text-[#ED276E]">Roof Paint Price:</span> ₹{formatIndianCurrency(calculateRoofPrice())}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Total Price Section */}
        <div className="pt-4 border-t-2 border-gray-200 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-xl font-semibold">
            <span className="text-[#ED276E]">Total Price:</span> ₹{formatIndianCurrency(calculateExteriorTotalPrice())}
          </p>
        </div>
      </div>
    );
  }

  // Render summary for both interior and exterior
  if (selectedPaintingType === 'both' && 
      ((workType && area > 0 && paintCategory && paintBrand && paintType) || 
       (roofWorkType && area > 0 && paintCategory && paintBrand && paintType))) {
    return (
      <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-2xl font-semibold mb-6 text-[#ED276E] border-b-2 border-[#ED276E] pb-2">Complete Calculation Summary</h3>
        {/* Interior Section */}
        {workType && area > 0 && paintCategory && paintBrand && paintType && (
          <div className="mb-8">
            <h4 className="text-xl font-medium mb-4 text-[#ED276E]">Interior Work</h4>
            {/* Wall Paint Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-lg font-medium mb-4 text-gray-800">Wall Paint Details</h5>
              <div className="space-y-3">
                <p><span className="font-medium">Work Type:</span> {workType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
                <p><span className="font-medium">Area Type:</span> {getSelectedAreaType()}</p>
                <p><span className="font-medium">Area Value:</span> {area} sq.ft</p>
                <p><span className="font-medium">Paint Category:</span> {paintCategory.charAt(0).toUpperCase() + paintCategory.slice(1)}</p>
                <p><span className="font-medium">Paint Brand:</span> {getPaintBrandName()}</p>
                <p><span className="font-medium">Selected Paint:</span> {getSelectedPaintName()}</p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-lg font-medium">
                    <span className="text-[#ED276E]">Wall Paint Price:</span> ₹{formatIndianCurrency(calculateInteriorPrice())}
                  </p>
                </div>
              </div>
            </div>
            {/* Ceiling Paint Section - Only show if different paint is selected */}
            {showCeilingPaintSection && (
              <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                <h5 className="text-lg font-medium mb-4 text-gray-800">Ceiling Paint Details</h5>
                <div className="space-y-3">
                  <p><span className="font-medium">Paint Category:</span> {ceilingPaintCategory.charAt(0).toUpperCase() + ceilingPaintCategory.slice(1)}</p>
                  <p><span className="font-medium">Paint Brand:</span> {getPaintBrandName()}</p>
                  <p><span className="font-medium">Selected Paint:</span> {getSelectedCeilingPaintName()}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-lg font-medium">
                      <span className="text-[#ED276E]">Ceiling Paint Price:</span> ₹{formatIndianCurrency(calculateCeilingPrice())}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Interior Total Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Interior Total Price:</span> ₹{formatIndianCurrency(calculateTotalPrice())}
              </p>
            </div>
          </div>
        )}
        {/* Exterior Section */}
        {roofWorkType && area > 0 && paintCategory && paintBrand && paintType && (
          <div className="mb-8">
            <h4 className="text-xl font-medium mb-4 text-[#ED276E]">Exterior Work</h4>
            {/* Exterior Wall Paint Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <h5 className="text-lg font-medium mb-4 text-gray-800">Exterior Wall Paint Details</h5>
              <div className="space-y-3">
                <p><span className="font-medium">Work Type:</span> {roofWorkType === 'fresh' ? 'Fresh Painting' : 'Repainting'}</p>
                <p><span className="font-medium">Area Type:</span> {getSelectedAreaType()}</p>
                <p><span className="font-medium">Area Value:</span> {area} sq.ft</p>
                <p><span className="font-medium">Paint Category:</span> {paintCategory.charAt(0).toUpperCase() + paintCategory.slice(1)}</p>
                <p><span className="font-medium">Paint Brand:</span> {getPaintBrandName()}</p>
                <p><span className="font-medium">Selected Paint:</span> {getSelectedPaintName()}</p>
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-lg font-medium">
                    <span className="text-[#ED276E]">Exterior Wall Paint Price:</span> ₹{formatIndianCurrency(calculateExteriorPrice())}
                  </p>
                </div>
              </div>
            </div>
            {/* Roof Paint Section - Only show if roof paint is selected */}
            {roofPaintType && (
              <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
                <h5 className="text-lg font-medium mb-4 text-gray-800">Roof Paint Details</h5>
                <div className="space-y-3">
                  <p><span className="font-medium">Roof Area:</span> {roofArea} sq.ft</p>
                  <p><span className="font-medium">Paint Category:</span> {roofPaintCategory.charAt(0).toUpperCase() + roofPaintCategory.slice(1)}</p>
                  <p><span className="font-medium">Paint Brand:</span> {roofPaintBrand}</p>
                  <p><span className="font-medium">Selected Paint:</span> {roofPaintType}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-lg font-medium">
                      <span className="text-[#ED276E]">Roof Paint Price:</span> ₹{formatIndianCurrency(calculateRoofPrice())}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {/* Exterior Total Section */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
              <p className="text-lg font-medium">
                <span className="text-[#ED276E]">Exterior Total Price:</span> ₹{formatIndianCurrency(calculateExteriorTotalPrice())}
              </p>
            </div>
          </div>
        )}
        {/* Grand Total Section */}
        <div className="pt-4 border-t-2 border-gray-200 bg-white p-4 rounded-lg shadow-sm">
          <p className="text-2xl font-semibold">
            <span className="text-[#ED276E]">Grand Total Price:</span> ₹{formatIndianCurrency(calculateGrandTotal())}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default CalculationSummary;

