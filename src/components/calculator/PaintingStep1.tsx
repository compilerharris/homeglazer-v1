import React, { useRef, useState } from 'react';

interface PaintingOption {
  id: string;
  title: string;
  selected: boolean;
}

interface PaintingStep1Props {
  options: PaintingOption[];
  onOptionSelect: (id: string) => void;
  workType: string;
  onWorkTypeChange: (value: string) => void;
  area: number;
  onAreaChange: (value: number) => void;
  areaTypes: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  onAreaTypeToggle: (id: string) => void;
  carpetAreaOptions: {
    label: string;
    value: number;
  }[];
  buildupAreaOptions: {
    label: string;
    value: number;
  }[];
  paintCategory: string;
  onPaintCategoryChange: (value: string) => void;
  paintBrand: string;
  onPaintBrandChange: (value: string) => void;
  paintType: string;
  onPaintTypeChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  selectedPaintingType: string;
  roofWorkType: string;
  onRoofWorkTypeChange: (value: string) => void;
  roofArea: number;
  onRoofAreaChange: (value: number) => void;
  roofAreaTypes: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  onRoofAreaTypeToggle: (id: string) => void;
  roofPaintCategory: string;
  onRoofPaintCategoryChange: (value: string) => void;
  roofPaintBrand: string;
  onRoofPaintBrandChange: (value: string) => void;
  roofPaintType: string;
  onRoofPaintTypeChange: (value: string) => void;
  samePaintForCeiling: boolean;
  onSamePaintForCeilingChange: (value: boolean) => void;
  ceilingPaintCategory: string;
  onCeilingPaintCategoryChange: (value: string) => void;
  ceilingPaintBrand: string;
  onCeilingPaintBrandChange: (value: string) => void;
  ceilingPaintType: string;
  onCeilingPaintTypeChange: (value: string) => void;
}

const PaintingStep1: React.FC<PaintingStep1Props> = ({ 
  options, 
  onOptionSelect,
  workType,
  onWorkTypeChange,
  area,
  onAreaChange,
  areaTypes,
  onAreaTypeToggle,
  carpetAreaOptions,
  buildupAreaOptions,
  paintCategory,
  onPaintCategoryChange,
  paintBrand,
  onPaintBrandChange,
  paintType,
  onPaintTypeChange,
  onNext,
  onBack,
  selectedPaintingType,
  roofWorkType,
  onRoofWorkTypeChange,
  roofArea,
  onRoofAreaChange,
  roofAreaTypes,
  onRoofAreaTypeToggle,
  roofPaintCategory,
  onRoofPaintCategoryChange,
  roofPaintBrand,
  onRoofPaintBrandChange,
  roofPaintType,
  onRoofPaintTypeChange,
  samePaintForCeiling,
  onSamePaintForCeilingChange,
  ceilingPaintCategory,
  onCeilingPaintCategoryChange,
  ceilingPaintBrand,
  onCeilingPaintBrandChange,
  ceilingPaintType,
  onCeilingPaintTypeChange
}) => {
  const workDetailsRef = useRef<HTMLDivElement>(null);
  const exteriorWorkDetailsRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [inputMethod, setInputMethod] = useState<'area' | 'items'>('area');
  const [localArea, setLocalArea] = useState<number>(0);
  const [selectedPaint, setSelectedPaint] = useState<string>('');
  const [itemCounts, setItemCounts] = useState({
    doors: 0,
    windows: 0,
    wallPanels: 0,
    furnitureArea: 0
  });

  const calculateTotalEstimate = () => {
    let totalArea = 0;
    if (inputMethod === 'area') {
      totalArea = area || localArea;
    } else {
      totalArea = (itemCounts.doors * 65) + (itemCounts.windows * 30) + 
                 (itemCounts.wallPanels * 80) + itemCounts.furnitureArea;
    }
    return totalArea * Number(paintType);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onOptionSelect(option);
    setInputMethod('area');
    setLocalArea(0);
    setSelectedPaint('');
    setItemCounts({
      doors: 0,
      windows: 0,
      wallPanels: 0,
      furnitureArea: 0
    });
    // Add delay before smooth scrolling to work details section on tablet and below screens
    if (window.innerWidth < 1024) {
      // Use a slightly longer delay to ensure DOM updates are complete
      setTimeout(() => {
        let targetRef = null;
        if (option === 'interior' || option === 'both') {
          targetRef = workDetailsRef.current;
        } else if (option === 'exterior') {
          targetRef = exteriorWorkDetailsRef.current;
        }

        if (targetRef) {
          // Add a small offset to ensure the element is fully visible
          const yOffset = -20;
          const y = targetRef.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleInputMethodChange = (method: 'area' | 'items') => {
    setInputMethod(method);
    if (method === 'area') {
      setItemCounts({
        doors: 0,
        windows: 0,
        wallPanels: 0,
        furnitureArea: 0
      });
    } else {
      setLocalArea(0);
      onAreaChange(0);
    }
  };

  // Add calculation function
  const calculateInteriorPrice = () => {
    if (!area && !localArea || !paintType) return 0;
    // If different ceiling paint is selected, subtract ceiling area (40% of total area)
    const totalArea = area || localArea;
    const wallArea = samePaintForCeiling ? totalArea : Math.floor(totalArea * 0.60);
    return wallArea * Number(paintType);
  };

  // Add calculation function for ceiling
  const calculateCeilingPrice = () => {
    if (!area && !localArea || !ceilingPaintType) return 0;
    // Ceiling area is 40% of total area
    const totalArea = area || localArea;
    const ceilingArea = Math.floor(totalArea * 0.40);
    return ceilingArea * Number(ceilingPaintType);
  };

  // Get selected area type label
  const getSelectedAreaType = () => {
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
    if (!localArea || !paintType) return 0;
    return localArea * Number(paintType);
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-medium text-center mb-6 md:mb-12 text-[#ED276E]">
        Painting Work Details
      </h2>
      
      <div className="space-y-8">
        {/* Painting Type Selection */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-6 md:mb-12">
          <h3 className="text-xl font-medium mb-6 text-[#ED276E]">
            Which Type Of Painting Work Do You Want?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`p-6 rounded-lg border-2 text-center transition-colors font-medium mb-2 ${
                  option.selected
                    ? 'border-[#299dd7] bg-[#299dd7] text-white'
                    : 'border-gray-200 hover:border-[#299dd7]'
                }`}
              >
                {option.title}
              </button>
            ))}
          </div>
        </div>

        {/* Work Details Section - Show based on selection */}
        {(selectedPaintingType === 'interior' || selectedPaintingType === 'both') && (
          <div ref={workDetailsRef} className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-medium mb-6 text-[#ED276E]">
              Interior Work Details
            </h3>
            <div className="space-y-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-3">
                    Which Kind Of Painting Work Will Be?
                  </label>
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="interiorWorkType"
                        value="fresh"
                        checked={workType === 'fresh'}
                        onChange={(e) => onWorkTypeChange(e.target.value)}
                        className="w-5 h-5 mr-2"
                      />
                      Fresh Painting
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="interiorWorkType"
                        value="repainting"
                        checked={workType === 'repainting'}
                        onChange={(e) => onWorkTypeChange(e.target.value)}
                        className="w-5 h-5 mr-2"
                      />
                      Repainting
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-medium">
                    Enter The Required Measurement
                  </label>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Select Area Type
                    </label>
                    <div className="flex flex-wrap gap-4 md:gap-8">
                      {areaTypes.map((type) => (
                        <label 
                          key={type.id} 
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="interiorAreaType"
                            checked={type.selected}
                            onChange={() => onAreaTypeToggle(type.id)}
                            className="w-5 h-5 mr-2"
                          />
                          {type.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {areaTypes.find(type => type.id === 'carpet')?.selected && (
                    <select
                      value={area || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        onAreaChange(value);
                        setLocalArea(value);
                      }}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                    >
                      <option value="">Select Area Range</option>
                      {carpetAreaOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {areaTypes.find(type => type.id === 'buildup')?.selected && (
                    <select
                      value={area || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        onAreaChange(value);
                        setLocalArea(value);
                      }}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                    >
                      <option value="">Select Area Range</option>
                      {buildupAreaOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {!areaTypes.find(type => type.id === 'carpet')?.selected && 
                   !areaTypes.find(type => type.id === 'buildup')?.selected && (
                    <input
                      type="number"
                      value={area || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        onAreaChange(value);
                        setLocalArea(value);
                      }}
                      placeholder="Enter The Area in Square Feet"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
                    />
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 border-b border-gray-200"></div>

              {/* Interior Paint Selection */}
              <div>
                <h4 className="text-lg font-medium mb-6 text-[#ED276E]">
                  Interior Paint Selection
                </h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      Select Your Paint Category
                    </label>
                    <div className="flex flex-wrap gap-4 md:gap-8">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="interiorPaintCategory"
                          value="economical"
                          checked={paintCategory === 'economical'}
                          onChange={(e) => onPaintCategoryChange(e.target.value)}
                          className="w-5 h-5 mr-2"
                        />
                        Economical
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="interiorPaintCategory"
                          value="premium"
                          checked={paintCategory === 'premium'}
                          onChange={(e) => onPaintCategoryChange(e.target.value)}
                          className="w-5 h-5 mr-2"
                        />
                        Premium
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="interiorPaintCategory"
                          value="luxury"
                          checked={paintCategory === 'luxury'}
                          onChange={(e) => onPaintCategoryChange(e.target.value)}
                          className="w-5 h-5 mr-2"
                        />
                        Luxury
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      Select Your Brands
                    </label>
                    <select
                      value={paintBrand}
                      onChange={(e) => onPaintBrandChange(e.target.value)}
                      className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                      disabled={!paintCategory}
                    >
                      <option value="">Select Brands</option>
                      <option value="asian-paints">Asian Paints</option>
                      <option value="dulux">Dulux</option>
                      <option value="nerolac">Nerolac</option>
                      <option value="berger">Berger</option>
                      <option value="shalimar">Shalimar</option>
                      <option value="jsw">JSW</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      Select Your Paints
                    </label>
                    <select
                      value={paintType}
                      onChange={(e) => onPaintTypeChange(e.target.value)}
                      className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                      disabled={!paintBrand}
                    >
                      <option value="">Select Paint</option>
                      {paintCategory === 'economical' && (
                        <>
                          {paintBrand === 'asian-paints' && (
                            <>
                              <option value="22">Tractor Emulsion (Recommended)</option>
                              <option value="23">Tractor Emulsion Advance</option>
                              <option value="23">Tractor Emulsion Shyne</option>
                              <option value="21">Tractor Emulsion Sparc</option>
                              <option value="21.5">Tractor Emulsion Sparc Advance</option>
                            </>
                          )}
                          {paintBrand === 'dulux' && (
                            <>
                              <option value="22">Promise Interior (Recommended)</option>
                              <option value="21">Promise Interior Smart Choice</option>
                              <option value="23">Dulux Promise Sheen Interior</option>
                            </>
                          )}
                          {paintBrand === 'nerolac' && (
                            <>
                              <option value="22">Nerolac Beauty Smooth Finish</option>
                              <option value="22">Nerolac Beauty Little Master</option>
                            </>
                          )}
                          {paintBrand === 'berger' && (
                            <>
                              <option value="22">Berger Bison Acrylic Emulsion</option>
                              <option value="23">Berger Bison Glow Acrylic Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'shalimar' && (
                            <>
                              <option value="20">Shalimar Master Acrylic Emulsion</option>
                              <option value="20">Shalimar No. 1 Silk Acrylic Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'jsw' && (
                            <>
                              <option value="21">Pixa Joy Classic Interiors</option>
                              <option value="22">Pixa Elegant Interiors</option>
                              <option value="23">Pixa Elegant Interiors Silk</option>
                            </>
                          )}
                        </>
                      )}
                      {paintCategory === 'premium' && (
                        <>
                          {paintBrand === 'asian-paints' && (
                            <>
                              <option value="24">Apcolite Premium Emulsion (Recommended)</option>
                              <option value="24">Apcolite Premium Satin Emulsion</option>
                              <option value="26">Apcolite All Protek</option>
                              <option value="26">Apcolite Advance Shyne</option>
                              <option value="26">Apcolite Advanced Heavy Duty Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'dulux' && (
                            <>
                              <option value="24">Dulux Super Cover (Recommended)</option>
                              <option value="26">Dulux Super Clean</option>
                              <option value="27">Dulux Super Clean 3in1 (Recommended)</option>
                              <option value="26">Dulux Super Cover Sheen</option>
                            </>
                          )}
                          {paintBrand === 'nerolac' && (
                            <>
                              <option value="24">Nerolac Pearls Emulsion</option>
                              <option value="24">Nerolac Pearls Luster Finish</option>
                              <option value="23">Nerolac Beauty Silver</option>
                              <option value="25">Nerolac Beauty Gold</option>
                              <option value="27">Nerolac Beauty Gold Washable (Recommended)</option>
                              <option value="26">Nerolac Beauty Sheen</option>
                              <option value="25">Nerolac Beauty Ceiling Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'berger' && (
                            <>
                              <option value="24">Berger Rangoli Total Care</option>
                            </>
                          )}
                          {paintBrand === 'shalimar' && (
                            <>
                              <option value="22">Shalimar Superlac Advance</option>
                            </>
                          )}
                          {paintBrand === 'jsw' && (
                            <>
                              <option value="24">Aurus Regal Interiors Lustre</option>
                              <option value="24">Aurus Regal Interiors</option>
                              <option value="26">Aurus Regal Interiors Silk</option>
                            </>
                          )}
                        </>
                      )}
                      {paintCategory === 'luxury' && (
                        <>
                          {paintBrand === 'asian-paints' && (
                            <>
                              <option value="34">Royale Luxury Emulsion (Recommended)</option>
                              <option value="35">Royale Lustre</option>
                              <option value="35">Royale Advanced</option>
                              <option value="34">Royale Matt (Recommended)</option>
                              <option value="36">Royale Shyne Luxury Emulsion</option>
                              <option value="38">Royale Health Shield</option>
                              <option value="40">Royale Aspira (Recommended)</option>
                              <option value="41">Royale Glitz</option>
                              <option value="38">Royale Atmos</option>
                            </>
                          )}
                          {paintBrand === 'dulux' && (
                            <>
                              <option value="34">Dulux Velvet Touch Pearl Glo (Recommended)</option>
                              <option value="36">Dulux Velvet Touch Diamond Glo</option>
                              <option value="36">Dulux Velvet Touch Platinum Glo (Recommended)</option>
                              <option value="38">Dulux Ambiance Velvet Touch Elastoglo (Recommended)</option>
                              <option value="38">Dulux Better Living Air Biobased</option>
                            </>
                          )}
                          {paintBrand === 'nerolac' && (
                            <>
                              <option value="34">Impressions Kashmir (Recommended)</option>
                              <option value="36">Impression Ultra HD</option>
                              <option value="36">Nerolac Impressions HD (Recommended)</option>
                              <option value="37">Impression Ultra Fresh</option>
                            </>
                          )}
                          {paintBrand === 'berger' && (
                            <>
                              <option value="34">Berger Easy Clean (Recommended)</option>
                              <option value="36">Berger Easy Clean Fresh</option>
                              <option value="36">Berger Silk Glow</option>
                              <option value="38">Berger Silk Glamor Soft Sheen (Recommended)</option>
                              <option value="38">Berger Silk Glamor High Sheen</option>
                              <option value="38">Berger Silk Breathe Easy</option>
                            </>
                          )}
                          {paintBrand === 'shalimar' && (
                            <>
                              <option value="31">Shalimar Superlac Stay Clean</option>
                              <option value="32">Shalimar Signature</option>
                            </>
                          )}
                          {paintBrand === 'jsw' && (
                            <>
                              <option value="34">Vogue Astoniq</option>
                              <option value="38">Halo Majestic Interiors - Silk (Recommended)</option>
                              <option value="38">Halo Majestic Interiors Shine</option>
                            </>
                          )}
                        </>
                      )}
                    </select>
                  </div>

                  {/* Ceiling Paint Selection Checkbox */}
                  <div className="mt-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={samePaintForCeiling === true}
                        onChange={(e) => onSamePaintForCeilingChange(e.target.checked)}
                        className="w-5 h-5 mr-2"
                      />
                      <span className="text-lg">Select if you want a <strong>different</strong> paint for ceiling</span>
                    </label>
                  </div>

                  {/* Ceiling Paint Selection - Only show when checkbox is checked */}
                  {samePaintForCeiling && (
                    <div className="mt-8 space-y-6">
                      <h4 className="text-lg font-medium text-[#ED276E]">
                        Ceiling Paint Selection
                      </h4>
                      
                      <div>
                        <label className="block text-lg font-medium mb-3">
                          Select Your Paint Category
                        </label>
                        <div className="flex flex-wrap gap-4 md:gap-8">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="ceilingPaintCategory"
                              value="economical"
                              checked={ceilingPaintCategory === 'economical'}
                              onChange={(e) => onCeilingPaintCategoryChange(e.target.value)}
                              className="w-5 h-5 mr-2"
                            />
                            Economical
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="ceilingPaintCategory"
                              value="premium"
                              checked={ceilingPaintCategory === 'premium'}
                              onChange={(e) => onCeilingPaintCategoryChange(e.target.value)}
                              className="w-5 h-5 mr-2"
                            />
                            Premium
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="ceilingPaintCategory"
                              value="luxury"
                              checked={ceilingPaintCategory === 'luxury'}
                              onChange={(e) => onCeilingPaintCategoryChange(e.target.value)}
                              className="w-5 h-5 mr-2"
                            />
                            Luxury
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-medium mb-3">
                          Select Your Brands
                        </label>
                        <select
                          value={ceilingPaintBrand}
                          onChange={(e) => onCeilingPaintBrandChange(e.target.value)}
                          className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                          disabled={!ceilingPaintCategory}
                        >
                          <option value="">Select Brands</option>
                          <option value="asian-paints">Asian Paints</option>
                          <option value="dulux">Dulux</option>
                          <option value="nerolac">Nerolac</option>
                          <option value="berger">Berger</option>
                          <option value="shalimar">Shalimar</option>
                          <option value="jsw">JSW</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-lg font-medium mb-3">
                          Select Your Paints
                        </label>
                        <select
                          value={ceilingPaintType}
                          onChange={(e) => onCeilingPaintTypeChange(e.target.value)}
                          className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                          disabled={!ceilingPaintBrand}
                        >
                          <option value="">Select Paint</option>
                          {ceilingPaintCategory === 'economical' && (
                            <>
                              {ceilingPaintBrand === 'asian-paints' && (
                                <>
                                  <option value="22">Tractor Emulsion (Recommended)</option>
                                  <option value="23">Tractor Emulsion Advance</option>
                                  <option value="23">Tractor Emulsion Shyne</option>
                                  <option value="21">Tractor Emulsion Sparc</option>
                                  <option value="21.5">Tractor Emulsion Sparc Advance</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'dulux' && (
                                <>
                                  <option value="22">Promise Interior (Recommended)</option>
                                  <option value="21">Promise Interior Smart Choice</option>
                                  <option value="23">Dulux Promise Sheen Interior</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'nerolac' && (
                                <>
                                  <option value="22">Nerolac Beauty Smooth Finish</option>
                                  <option value="22">Nerolac Beauty Little Master</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'berger' && (
                                <>
                                  <option value="22">Berger Bison Acrylic Emulsion</option>
                                  <option value="23">Berger Bison Glow Acrylic Emulsion</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'shalimar' && (
                                <>
                                  <option value="20">Shalimar Master Acrylic Emulsion</option>
                                  <option value="20">Shalimar No. 1 Silk Acrylic Emulsion</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'jsw' && (
                                <>
                                  <option value="21">Pixa Joy Classic Interiors</option>
                                  <option value="22">Pixa Elegant Interiors</option>
                                  <option value="23">Pixa Elegant Interiors Silk</option>
                                </>
                              )}
                            </>
                          )}
                          {ceilingPaintCategory === 'premium' && (
                            <>
                              {ceilingPaintBrand === 'asian-paints' && (
                                <>
                                  <option value="24">Apcolite Premium Emulsion (Recommended)</option>
                                  <option value="24">Apcolite Premium Satin Emulsion</option>
                                  <option value="26">Apcolite All Protek</option>
                                  <option value="26">Apcolite Advance Shyne</option>
                                  <option value="26">Apcolite Advanced Heavy Duty Emulsion</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'dulux' && (
                                <>
                                  <option value="24">Dulux Super Cover (Recommended)</option>
                                  <option value="26">Dulux Super Clean</option>
                                  <option value="27">Dulux Super Clean 3in1 (Recommended)</option>
                                  <option value="26">Dulux Super Cover Sheen</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'nerolac' && (
                                <>
                                  <option value="24">Nerolac Pearls Emulsion</option>
                                  <option value="24">Nerolac Pearls Luster Finish</option>
                                  <option value="23">Nerolac Beauty Silver</option>
                                  <option value="25">Nerolac Beauty Gold</option>
                                  <option value="27">Nerolac Beauty Gold Washable (Recommended)</option>
                                  <option value="26">Nerolac Beauty Sheen</option>
                                  <option value="25">Nerolac Beauty Ceiling Emulsion</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'berger' && (
                                <>
                                  <option value="24">Berger Rangoli Total Care</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'shalimar' && (
                                <>
                                  <option value="22">Shalimar Superlac Advance</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'jsw' && (
                                <>
                                  <option value="24">Aurus Regal Interiors Lustre</option>
                                  <option value="24">Aurus Regal Interiors</option>
                                  <option value="26">Aurus Regal Interiors Silk</option>
                                </>
                              )}
                            </>
                          )}
                          {ceilingPaintCategory === 'luxury' && (
                            <>
                              {ceilingPaintBrand === 'asian-paints' && (
                                <>
                                  <option value="34">Royale Luxury Emulsion (Recommended)</option>
                                  <option value="35">Royale Lustre</option>
                                  <option value="35">Royale Advanced</option>
                                  <option value="34">Royale Matt (Recommended)</option>
                                  <option value="36">Royale Shyne Luxury Emulsion</option>
                                  <option value="38">Royale Health Shield</option>
                                  <option value="40">Royale Aspira (Recommended)</option>
                                  <option value="41">Royale Glitz</option>
                                  <option value="38">Royale Atmos</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'dulux' && (
                                <>
                                  <option value="34">Dulux Velvet Touch Pearl Glo (Recommended)</option>
                                  <option value="36">Dulux Velvet Touch Diamond Glo</option>
                                  <option value="36">Dulux Velvet Touch Platinum Glo (Recommended)</option>
                                  <option value="38">Dulux Ambiance Velvet Touch Elastoglo (Recommended)</option>
                                  <option value="38">Dulux Better Living Air Biobased</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'nerolac' && (
                                <>
                                  <option value="34">Impressions Kashmir (Recommended)</option>
                                  <option value="36">Impression Ultra HD</option>
                                  <option value="36">Nerolac Impressions HD (Recommended)</option>
                                  <option value="37">Impression Ultra Fresh</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'berger' && (
                                <>
                                  <option value="34">Berger Easy Clean (Recommended)</option>
                                  <option value="36">Berger Easy Clean Fresh</option>
                                  <option value="36">Berger Silk Glow</option>
                                  <option value="38">Berger Silk Glamor Soft Sheen (Recommended)</option>
                                  <option value="38">Berger Silk Glamor High Sheen</option>
                                  <option value="38">Berger Silk Breathe Easy</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'shalimar' && (
                                <>
                                  <option value="31">Shalimar Superlac Stay Clean</option>
                                  <option value="32">Shalimar Signature</option>
                                </>
                              )}
                              {ceilingPaintBrand === 'jsw' && (
                                <>
                                  <option value="34">Vogue Astoniq</option>
                                  <option value="38">Halo Majestic Interiors - Silk (Recommended)</option>
                                  <option value="38">Halo Majestic Interiors Shine</option>
                                </>
                              )}
                            </>
                          )}
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {(selectedPaintingType === 'exterior' || selectedPaintingType === 'both') && (
          <div ref={exteriorWorkDetailsRef} className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h3 className="text-xl font-medium mb-6 text-[#ED276E]">
              Exterior Work Details
            </h3>
            <div className="space-y-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-3">
                    Which Kind Of Painting Work Will Be?
                  </label>
                  <div className="flex flex-wrap gap-4 md:gap-8">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="exteriorWorkType"
                        value="fresh"
                        checked={roofWorkType === 'fresh'}
                        onChange={(e) => onRoofWorkTypeChange(e.target.value)}
                        className="w-5 h-5 mr-2"
                      />
                      Fresh Painting
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="exteriorWorkType"
                        value="repainting"
                        checked={roofWorkType === 'repainting'}
                        onChange={(e) => onRoofWorkTypeChange(e.target.value)}
                        className="w-5 h-5 mr-2"
                      />
                      Repainting
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-lg font-medium">
                    Enter The Required Measurement
                  </label>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Select Area Type
                    </label>
                    <div className="flex flex-wrap gap-4 md:gap-8">
                      {areaTypes.map((type) => (
                        <label 
                          key={type.id} 
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="exteriorAreaType"
                            checked={type.selected}
                            onChange={() => onAreaTypeToggle(type.id)}
                            className="w-5 h-5 mr-2"
                          />
                          {type.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {areaTypes.find(type => type.id === 'carpet')?.selected && (
                    <select
                      value={area || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        onAreaChange(value);
                        setLocalArea(value);
                      }}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                    >
                      <option value="">Select Area Range</option>
                      {carpetAreaOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {areaTypes.find(type => type.id === 'buildup')?.selected && (
                    <select
                      value={area || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        onAreaChange(value);
                        setLocalArea(value);
                      }}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                    >
                      <option value="">Select Area Range</option>
                      {buildupAreaOptions.map((option) => (
                        <option key={option.label} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                  
                  {!areaTypes.find(type => type.id === 'carpet')?.selected && 
                   !areaTypes.find(type => type.id === 'buildup')?.selected && (
                    <input
                      type="number"
                      value={area || ''}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        onAreaChange(value);
                        setLocalArea(value);
                      }}
                      placeholder="Enter The Area in Square Feet"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966]"
                    />
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="my-8 border-b border-gray-200"></div>

              {/* Exterior Paint Selection */}
              <div>
                <h4 className="text-lg font-medium mb-6 text-[#ED276E]">
                  Exterior Paint Selection
                </h4>
                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      Select Your Paint Category
                    </label>
                    <div className="flex flex-wrap gap-4 md:gap-8">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="exteriorPaintCategory"
                          value="economical"
                          checked={paintCategory === 'economical'}
                          onChange={(e) => onPaintCategoryChange(e.target.value)}
                          className="w-5 h-5 mr-2"
                        />
                        Economical
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="exteriorPaintCategory"
                          value="premium"
                          checked={paintCategory === 'premium'}
                          onChange={(e) => onPaintCategoryChange(e.target.value)}
                          className="w-5 h-5 mr-2"
                        />
                        Premium
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="exteriorPaintCategory"
                          value="luxury"
                          checked={paintCategory === 'luxury'}
                          onChange={(e) => onPaintCategoryChange(e.target.value)}
                          className="w-5 h-5 mr-2"
                        />
                        Luxury
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      Select Your Brands
                    </label>
                    <select
                      value={paintBrand}
                      onChange={(e) => onPaintBrandChange(e.target.value)}
                      className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                      disabled={!paintCategory}
                    >
                      <option value="">Select Brands</option>
                      <option value="asian-paints">Asian Paints</option>
                      <option value="dulux">Dulux</option>
                      <option value="nerolac">Nerolac</option>
                      <option value="berger">Berger</option>
                      <option value="shalimar">Shalimar</option>
                      <option value="jsw">JSW</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-lg font-medium mb-3">
                      Select Your Paints
                    </label>
                    <select
                      value={paintType}
                      onChange={(e) => onPaintTypeChange(e.target.value)}
                      className="w-full p-4 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#009966] appearance-none bg-white bg-no-repeat bg-[length:20px] bg-[right_1rem_center] bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]"
                      disabled={!paintBrand}
                    >
                      <option value="">Select Paint</option>
                      {paintCategory === 'economical' && (
                        <>
                          {paintBrand === 'asian-paints' && (
                            <>
                              <option value="22">Tractor Emulsion (Recommended)</option>
                              <option value="23">Tractor Emulsion Advance</option>
                              <option value="23">Tractor Emulsion Shyne</option>
                              <option value="21">Tractor Emulsion Sparc</option>
                              <option value="21.5">Tractor Emulsion Sparc Advance</option>
                            </>
                          )}
                          {paintBrand === 'dulux' && (
                            <>
                              <option value="22">Promise Interior (Recommended)</option>
                              <option value="21">Promise Interior Smart Choice</option>
                              <option value="23">Dulux Promise Sheen Interior</option>
                            </>
                          )}
                          {paintBrand === 'nerolac' && (
                            <>
                              <option value="22">Nerolac Beauty Smooth Finish</option>
                              <option value="22">Nerolac Beauty Little Master</option>
                            </>
                          )}
                          {paintBrand === 'berger' && (
                            <>
                              <option value="22">Berger Bison Acrylic Emulsion</option>
                              <option value="23">Berger Bison Glow Acrylic Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'shalimar' && (
                            <>
                              <option value="20">Shalimar Master Acrylic Emulsion</option>
                              <option value="20">Shalimar No. 1 Silk Acrylic Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'jsw' && (
                            <>
                              <option value="21">Pixa Joy Classic Interiors</option>
                              <option value="22">Pixa Elegant Interiors</option>
                              <option value="23">Pixa Elegant Interiors Silk</option>
                            </>
                          )}
                        </>
                      )}
                      {paintCategory === 'premium' && (
                        <>
                          {paintBrand === 'asian-paints' && (
                            <>
                              <option value="24">Apcolite Premium Emulsion (Recommended)</option>
                              <option value="24">Apcolite Premium Satin Emulsion</option>
                              <option value="26">Apcolite All Protek</option>
                              <option value="26">Apcolite Advance Shyne</option>
                              <option value="26">Apcolite Advanced Heavy Duty Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'dulux' && (
                            <>
                              <option value="24">Dulux Super Cover (Recommended)</option>
                              <option value="26">Dulux Super Clean</option>
                              <option value="27">Dulux Super Clean 3in1 (Recommended)</option>
                              <option value="26">Dulux Super Cover Sheen</option>
                            </>
                          )}
                          {paintBrand === 'nerolac' && (
                            <>
                              <option value="24">Nerolac Pearls Emulsion</option>
                              <option value="24">Nerolac Pearls Luster Finish</option>
                              <option value="23">Nerolac Beauty Silver</option>
                              <option value="25">Nerolac Beauty Gold</option>
                              <option value="27">Nerolac Beauty Gold Washable (Recommended)</option>
                              <option value="26">Nerolac Beauty Sheen</option>
                              <option value="25">Nerolac Beauty Ceiling Emulsion</option>
                            </>
                          )}
                          {paintBrand === 'berger' && (
                            <>
                              <option value="24">Berger Rangoli Total Care</option>
                            </>
                          )}
                          {paintBrand === 'shalimar' && (
                            <>
                              <option value="22">Shalimar Superlac Advance</option>
                            </>
                          )}
                          {paintBrand === 'jsw' && (
                            <>
                              <option value="24">Aurus Regal Interiors Lustre</option>
                              <option value="24">Aurus Regal Interiors</option>
                              <option value="26">Aurus Regal Interiors Silk</option>
                            </>
                          )}
                        </>
                      )}
                      {paintCategory === 'luxury' && (
                        <>
                          {paintBrand === 'asian-paints' && (
                            <>
                              <option value="34">Royale Luxury Emulsion (Recommended)</option>
                              <option value="35">Royale Lustre</option>
                              <option value="35">Royale Advanced</option>
                              <option value="34">Royale Matt (Recommended)</option>
                              <option value="36">Royale Shyne Luxury Emulsion</option>
                              <option value="38">Royale Health Shield</option>
                              <option value="40">Royale Aspira (Recommended)</option>
                              <option value="41">Royale Glitz</option>
                              <option value="38">Royale Atmos</option>
                            </>
                          )}
                          {paintBrand === 'dulux' && (
                            <>
                              <option value="34">Dulux Velvet Touch Pearl Glo (Recommended)</option>
                              <option value="36">Dulux Velvet Touch Diamond Glo</option>
                              <option value="36">Dulux Velvet Touch Platinum Glo (Recommended)</option>
                              <option value="38">Dulux Ambiance Velvet Touch Elastoglo (Recommended)</option>
                              <option value="38">Dulux Better Living Air Biobased</option>
                            </>
                          )}
                          {paintBrand === 'nerolac' && (
                            <>
                              <option value="34">Impressions Kashmir (Recommended)</option>
                              <option value="36">Impression Ultra HD</option>
                              <option value="36">Nerolac Impressions HD (Recommended)</option>
                              <option value="37">Impression Ultra Fresh</option>
                            </>
                          )}
                          {paintBrand === 'berger' && (
                            <>
                              <option value="34">Berger Easy Clean (Recommended)</option>
                              <option value="36">Berger Easy Clean Fresh</option>
                              <option value="36">Berger Silk Glow</option>
                              <option value="38">Berger Silk Glamor Soft Sheen (Recommended)</option>
                              <option value="38">Berger Silk Glamor High Sheen</option>
                              <option value="38">Berger Silk Breathe Easy</option>
                            </>
                          )}
                          {paintBrand === 'shalimar' && (
                            <>
                              <option value="31">Shalimar Superlac Stay Clean</option>
                              <option value="32">Shalimar Signature</option>
                            </>
                          )}
                          {paintBrand === 'jsw' && (
                            <>
                              <option value="34">Vogue Astoniq</option>
                              <option value="38">Halo Majestic Interiors - Silk (Recommended)</option>
                              <option value="38">Halo Majestic Interiors Shine</option>
                            </>
                          )}
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

                </div>
                
      {/* Calculation Summary */}
      {selectedOption && (inputMethod === 'area' && localArea > 0 || inputMethod === 'items' && (itemCounts.doors > 0 || itemCounts.windows > 0 || itemCounts.wallPanels > 0 || itemCounts.furnitureArea > 0)) && (
        <div className="mt-8 pt-8 border-t-2 border-[#ED276E]">
          <h3 className="text-2xl font-semibold mb-6 text-[#ED276E]">Calculation Summary</h3>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <span className="font-medium text-gray-600">Input Method:</span>
                <span className="text-gray-800">{inputMethod === 'area' ? 'Enter quantity in sq. ft.' : 'Estimate based on item count'}</span>
              </div>
              
              {inputMethod === 'area' && (
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="font-medium text-gray-600">Total Area:</span>
                  <span className="text-gray-800">{localArea} sq.ft</span>
                </div>
              )}
              
              {inputMethod === 'items' && (
                <>
                  {itemCounts.doors > 0 && (
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <span className="font-medium text-gray-600">No. of Doors:</span>
                      <span className="text-gray-800">{itemCounts.doors} ({itemCounts.doors * 65} sq.ft)</span>
                    </div>
                  )}
                  {itemCounts.windows > 0 && (
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <span className="font-medium text-gray-600">No. of Windows:</span>
                      <span className="text-gray-800">{itemCounts.windows} ({itemCounts.windows * 30} sq.ft)</span>
                    </div>
                  )}
                  {itemCounts.wallPanels > 0 && (
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <span className="font-medium text-gray-600">No. of Wall Panels & Wardrobes:</span>
                      <span className="text-gray-800">{itemCounts.wallPanels} ({itemCounts.wallPanels * 80} sq.ft)</span>
                    </div>
                  )}
                  {itemCounts.furnitureArea > 0 && (
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <span className="font-medium text-gray-600">Tentative Furniture Area:</span>
                      <span className="text-gray-800">{itemCounts.furnitureArea} sq.ft</span>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="font-medium text-gray-600">Calculated Total Area:</span>
                    <span className="text-gray-800">{calculateTotalEstimate() / Number(paintType)} sq.ft</span>
                  </div>
                </>
              )}
              
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                <span className="font-medium text-gray-600">Selected Paint Type:</span>
                <span className="text-gray-800">{paintType}</span>
              </div>
              
              <div className="pt-3 border-t border-gray-200 mt-4">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <span className="text-lg font-medium text-[#ED276E]">Estimated Cost:</span>
                  <span className="text-lg font-medium">₹{formatIndianCurrency(calculateTotalEstimate())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={onNext}
          disabled={!localArea || !paintCategory || !paintBrand || !paintType || (selectedPaintingType === 'interior-exterior' && (!roofWorkType || !roofArea || !roofPaintCategory || !roofPaintBrand || !roofPaintType))}
          className={`px-6 py-3 rounded-lg text-white transition-colors ${!localArea || !paintCategory || !paintBrand || !paintType || (selectedPaintingType === 'interior-exterior' && (!roofWorkType || !roofArea || !roofPaintCategory || !roofPaintBrand || !roofPaintType)) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#299dd7] hover:bg-[#248ac2]'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaintingStep1; 