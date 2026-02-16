import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { embeddedWallMasks } from '../data/embeddedWallMasks';
// Import all color JSON files
import asianPaintsColors from '../data/colors/asian_paints_colors.json';
import nerolacColors from '../data/colors/nerolac_colors.json';
import bergerColors from '../data/colors/berger_colors.json';
import jswColors from '../data/colors/jsw_colors.json';
import birlaOpusColors from '../data/colors/birla_opus_colors.json';
import duluxColors from '../data/colors/dulux_colors.json';
import jkMaxxColors from '../data/colors/jk_maxx_colors.json';
import shalimarColors from '../data/colors/shalimar_colors.json';
import nipponColors from '../data/colors/nippon_colors.json';
import ncsColors from '../data/colors/ncs_colors.json';
import ralColors from '../data/colors/ral_colors.json';
import sherwinWilliamsColors from '../data/colors/sherwin_williams_colors.json';
import mrfColors from '../data/colors/mrf_colors.json';

export interface WallManifest {
  [wallKey: string]: string;
}
export interface VariantManifest {
  name: string;
  label: string;
  mainImage: string;
  walls: WallManifest;
}
export interface RoomManifest {
  roomType: string;
  label: string;
  variants: VariantManifest[];
}

// New interfaces for dynamic brand data
export interface ColorSwatch {
  colorName: string;
  colorCode: string;
  colorHex: string;
}

export interface BrandColorData {
  brand: string;
  totalColors: number;
  colorTypes: {
    [colorType: string]: ColorSwatch[];
  };
}

export interface BrandColor {
  name: string;
  code: string;
}
export interface BrandManifest {
  id: string;
  name: string;
  logo: string;
  colors: BrandColor[];
}

// Brand configuration interface
export interface BrandConfig {
  id: string;
  name: string;
  data: BrandColorData;
  logo: string;
}

// Brand configuration mapping with direct imports
export const BRAND_CONFIG: BrandConfig[] = [
  { id: 'asian-paints', name: 'Asian Paints', data: asianPaintsColors as BrandColorData, logo: '/assets/images/brand-logos/asian-paints-logo.webp' },
  { id: 'sherwin-williams', name: 'Sherwin Williams', data: sherwinWilliamsColors as BrandColorData, logo: '/assets/images/brand-logos/sherwin-williams-logo.webp' },
  { id: 'nerolac', name: 'Nerolac', data: nerolacColors as BrandColorData, logo: '/assets/images/brand-logos/nerolac-logo.webp' },
  { id: 'berger', name: 'Berger', data: bergerColors as BrandColorData, logo: '/assets/images/brand-logos/berger-logo.webp' },
  { id: 'jsw', name: 'JSW', data: jswColors as BrandColorData, logo: '/assets/images/brand-logos/jsw-logo.webp' },
  { id: 'birla-opus', name: 'Birla Opus', data: birlaOpusColors as BrandColorData, logo: '/assets/images/brand-logos/birla-opus-logo.webp' },
  { id: 'dulux', name: 'Dulux', data: duluxColors as BrandColorData, logo: '/assets/images/brand-logos/dulux-logo.webp' },
  { id: 'jk-maxx', name: 'JK Maxx', data: jkMaxxColors as BrandColorData, logo: '/assets/images/brand-logos/jk-logo.webp' },
  { id: 'shalimar', name: 'Shalimar', data: shalimarColors as BrandColorData, logo: '/assets/images/brand-logos/shalimar-logo.webp' },
  { id: 'nippon', name: 'Nippon', data: nipponColors as BrandColorData, logo: '/assets/images/brand-logos/nippon-logo.webp' },
  { id: 'mrf-paints', name: 'MRF Paints', data: mrfColors as BrandColorData, logo: '/assets/images/brand-logos/mrf-paint-logo.webp' },
  { id: 'ral', name: 'RAL', data: ralColors as BrandColorData, logo: '/assets/images/brand-logos/ral-logo.webp' },
  { id: 'ncs', name: 'NCS', data: ncsColors as BrandColorData, logo: '/assets/images/brand-logos/ncs-logo.webp' },
];

export const CATEGORIES = [
  { key: 'bedroom', label: 'Bedroom', img: '/uploads/bedroom.jpg' },
  { key: 'living-room', label: 'Living Room', img: '/uploads/living-room.jpg' },
  { key: 'kitchen', label: 'Kitchen', img: '/uploads/kitchen.jpg' },
  { key: 'bathroom', label: 'Bathroom', img: '/assets/images/image-21.png' },
  { key: 'home-office', label: 'Home Office', img: '/assets/images/image-16.png' },
  { key: 'kids-room', label: 'Kids Room', img: '/uploads/kids.png' },
  { key: 'office', label: 'Office', img: '/uploads/Commercial.png' },
  { key: 'home-exterior', label: 'Home Exterior', img: '/uploads/exterior-painting.png' },
];

export const CATEGORY_IMAGES: Record<string, string[]> = {
  'bedroom': [
    '/assets/images/bedroom/bedroom1/bedroom1.jpg',
    '/assets/images/bedroom/bedroom2/bedroom2.jpg',
    ...Array.from({length: 11}, (_, i) => `/uploads/bedroom.jpg`),
  ],
  'living-room': Array.from({length: 12}, (_, i) => `/uploads/living-room.jpg`),
  'kitchen': Array.from({length: 12}, (_, i) => `/uploads/kitchen.jpg`),
  'bathroom': Array.from({length: 12}, (_, i) => `/assets/images/image-21.png`),
  'home-office': Array.from({length: 12}, (_, i) => `/assets/images/image-16.png`),
  'kids-room': Array.from({length: 12}, (_, i) => `/uploads/kids.png`),
  'office': Array.from({length: 12}, (_, i) => `/uploads/Commercial.png`),
  'home-exterior': Array.from({length: 12}, (_, i) => `/uploads/exterior-painting.png`),
};

export const COLOR_SWATCHES: { [brand: string]: { name: string; code: string }[] } = {
  'asian-paints': [
    { name: 'Ivory White', code: '#F8F4E3' },
    { name: 'Peach Puff', code: '#FFDAB9' },
    { name: 'Lime Light', code: '#E6F9AF' },
    { name: 'Blue Charm', code: '#A7C7E7' },
    { name: 'Sunset Glow', code: '#FFB347' },
    { name: 'Coral Blush', code: '#F88379' },
    { name: 'Mint Whisper', code: '#B6E2D3' },
    { name: 'Lavender Dream', code: '#C3AED6' },
  ],
  'dulux': [
    { name: 'Soft Truffle', code: '#E6D3B3' },
    { name: 'Misty Lake', code: '#B7D7E8' },
    { name: 'Lemon Spirit', code: '#FFFACD' },
    { name: 'Rose Petal', code: '#F7CAC9' },
    { name: 'Olive Grove', code: '#B5B35C' },
    { name: 'Blue Lagoon', code: '#7EC8E3' },
    { name: 'Warm Taupe', code: '#D2B1A3' },
    { name: 'Cloudy Grey', code: '#D3D3D3' },
  ],
  'nerolac': [
    { name: 'Classic Ivory', code: '#F5E1A4' },
    { name: 'Sea Breeze', code: '#A2B9BC' },
    { name: 'Olive Green', code: '#B2AD7F' },
    { name: 'Steel Blue', code: '#878f99' },
    { name: 'Royal Purple', code: '#6B5B95' },
    { name: 'Lilac Mist', code: '#B8A9C9' },
    { name: 'Deep Plum', code: '#622569' },
    { name: 'Golden Sand', code: '#F6E3B4' },
  ],
  'berger': [
    { name: 'Pearl White', code: '#F7F7F7' },
    { name: 'Blush Pink', code: '#F7CAC9' },
    { name: 'Sky Blue', code: '#92A8D1' },
    { name: 'Sunshine', code: '#FFD700' },
    { name: 'Mint Green', code: '#B1CBBB' },
    { name: 'Coral Red', code: '#FF6F61' },
    { name: 'Lilac', code: '#C8A2C8' },
    { name: 'Sand Dune', code: '#E6E2D3' },
  ],
  'shalimar': [
    { name: 'Ivory', code: '#F8F4E3' },
    { name: 'Rose White', code: '#F7CAC9' },
    { name: 'Aqua Blue', code: '#A7C7E7' },
    { name: 'Lemon Yellow', code: '#FFFACD' },
    { name: 'Olive', code: '#B5B35C' },
    { name: 'Taupe', code: '#D2B1A3' },
    { name: 'Grey Mist', code: '#D3D3D3' },
    { name: 'Peach', code: '#FFDAB9' },
  ],
  'jsw': [
    { name: 'Classic White', code: '#F8F4E3' },
    { name: 'Sky Blue', code: '#A7C7E7' },
    { name: 'Mint', code: '#B6E2D3' },
    { name: 'Sunset', code: '#FFB347' },
    { name: 'Coral', code: '#F88379' },
    { name: 'Lavender', code: '#C3AED6' },
    { name: 'Olive', code: '#B5B35C' },
    { name: 'Grey', code: '#D3D3D3' },
  ],
  'jk-maxx': [
    { name: 'Sweet Jasmine', code: '#EFE19B' },
    { name: 'Sunscape', code: '#FDE287' },
    { name: 'Cheddar', code: '#E6A72D' },
    { name: 'Cornbread', code: '#FCE5AE' },
    { name: 'Sardonyx', code: '#F37B6A' },
    { name: 'Tapestry', code: '#E8907F' },
    { name: 'Pool Green', code: '#93CBC2' },
    { name: 'Emerald Forest', code: '#59987E' },
  ],
};

// Step name to step number mapping
const STEP_FROM_ROUTE: Record<string, number> = {
  'choose-a-room-type': 1,
  'choose-a-room-variant': 2,
  'choose-a-paint-brand': 3,
  'choose-colours': 4,
  'final-preview': 5,
};

// Step number to step name mapping
const STEP_ROUTES: Record<number, string> = {
  1: 'choose-a-room-type',
  2: 'choose-a-room-variant',
  3: 'choose-a-paint-brand',
  4: 'choose-colours',
  5: 'final-preview',
};

export function useVisualizer() {
  const router = useRouter();
  const [manifest, setManifest] = useState<RoomManifest[]>([]);
  const [brands, setBrands] = useState<BrandManifest[]>([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const [selectedVariantName, setSelectedVariantName] = useState<string | null>(null);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [palette, setPalette] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<{ [side: string]: string }>({});
  const [activeSide, setActiveSide] = useState<string | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const [wallMasks, setWallMasks] = useState<Record<string, string>>({});
  const [loadingMasks, setLoadingMasks] = useState(false);

  // New state for dynamic brand data
  const [brandData, setBrandData] = useState<BrandColorData | null>(null);
  const [loadingBrandData, setLoadingBrandData] = useState(false);
  const [selectedColourType, setSelectedColourType] = useState<string | null>(null);
  const [selectedColours, setSelectedColours] = useState<ColorSwatch[]>([]);
  const [colorTypeRefreshKey, setColorTypeRefreshKey] = useState(0);

  // Load manifest and brands on mount
  useEffect(() => {
    Promise.all([
      fetch('/visualizerManifest.json').then(res => res.json()),
      fetch('/visualizerColors.json').then(res => res.json()),
    ]).then(([roomData, brandData]) => {
      setManifest(roomData);
      setBrands(brandData);
      setLoading(false);
    });
  }, []);

  // Dynamic brand data loading function
  const loadBrandData = (brandId: string) => {
    const brandConfig = BRAND_CONFIG.find(b => b.id === brandId);
    if (!brandConfig) {
      console.error('Brand not found:', brandId);
      return;
    }

    setLoadingBrandData(true);
    try {
      // Use the imported data directly
      const data: BrandColorData = brandConfig.data;
      setBrandData(data);
      
      // Reset and auto-select the first colour type
      // This ensures swatches load properly when switching brands
      const colourTypeKeys = Object.keys(data.colorTypes);
      if (colourTypeKeys.length > 0) {
        // Always reset to first color type when loading new brand data
        // This ensures swatches are displayed even when returning to step 4
        setSelectedColourType(colourTypeKeys[0]);
        // Force refresh of color type to trigger re-render
        setColorTypeRefreshKey(prev => prev + 1);
      }
      
      // Don't clear selected colours - keep them persistent
      console.log('Brand data loaded, selected colours preserved:', selectedColours.length);
    } catch (error) {
      console.error('Error loading brand data:', error);
      setBrandData(null);
    } finally {
      setLoadingBrandData(false);
    }
  };

  // Get selected room/variant/brand objects
  const selectedRoom = manifest.find(r => r.roomType === selectedRoomType) || null;
  const selectedVariant = selectedRoom?.variants.find(v => v.name === selectedVariantName) || null;
  const selectedBrand = brands.find(b => b.id === selectedBrandId) || null;
  const swatches = selectedBrand ? selectedBrand.colors : [];

  // Get available colour types from brand data
  const colourTypes = brandData ? Object.keys(brandData.colorTypes) : [];
  
  // Get colours for selected colour type - use refresh key to force updates
  const coloursForType = React.useMemo(() => {
    if (!selectedColourType || !brandData) {
      return [];
    }
    return brandData.colorTypes[selectedColourType] || [];
  }, [selectedColourType, brandData, colorTypeRefreshKey]);

  // Ensure brand data is loaded when reaching step 4 or 5
  useEffect(() => {
    if ((step === 4 || step === 5) && selectedBrandId) {
      // Check if brand data needs to be loaded or reloaded
      // Reload if brandData is null OR if it doesn't match the current selectedBrandId
      const brandConfig = BRAND_CONFIG.find(b => b.id === selectedBrandId);
      const expectedBrandName = brandConfig?.name || '';
      const needsReload = !brandData || (brandData.brand !== expectedBrandName);
      
      if (needsReload) {
        console.log('Loading brand data for step', step, ':', selectedBrandId);
        loadBrandData(selectedBrandId);
      } else {
        console.log('Brand data already loaded for brand:', selectedBrandId, 'selected colours:', selectedColours.length);
      }
    }
  }, [step, selectedBrandId, brandData]);

  // Use embedded wall masks when variant changes (no fetch - data in bundle)
  useEffect(() => {
    if (!selectedVariant) {
      setWallMasks({});
      setLoadingMasks(false);
      return;
    }
    const masks = embeddedWallMasks[selectedVariant.name] ?? {};
    setWallMasks(masks);
    setLoadingMasks(false);
  }, [selectedVariant]);

  // Helper function to update URL when step changes
  // Use replace instead of push to avoid adding to history during programmatic navigation
  const updateStepURL = (newStep: number) => {
    if (typeof window !== 'undefined' && router.isReady) {
      const routeName = STEP_ROUTES[newStep];
      if (routeName) {
        const currentPath = router.asPath;
        const targetPath = `/colour-visualiser/advanced/${routeName}`;
        // Only update URL if it's different from current path
        if (currentPath !== targetPath) {
          // Use replace with shallow to avoid flickering and history pollution
          router.replace(targetPath, undefined, { shallow: true, scroll: false });
        }
      }
    }
  };

  // Handlers
  const handleSelectRoomType = (roomType: string) => {
    setSelectedRoomType(roomType);
    setSelectedVariantName(null);
    // Reset dependent state when changing room type
    setSelectedBrandId(null);
    setSelectedColours([]);
    setAssignments({});
    setPalette([]);
    setBrandData(null);
    setSelectedColourType(null);
    setStep(2);
    // Batch URL update to prevent flickering
    requestAnimationFrame(() => {
      updateStepURL(2);
    // Reset scroll to top when selecting a room type
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    });
  };
  const handleSelectVariant = (variantName: string) => {
    setSelectedVariantName(variantName);
    setStep(3);
    // Batch URL update to prevent flickering
    requestAnimationFrame(() => {
      updateStepURL(3);
    // Reset scroll to top when selecting a variant
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    });
  };
  const handleSelectBrand = (brandId: string) => {
    // Only clear selections if we're actually changing to a different brand
    if (selectedBrandId !== brandId) {
      setSelectedColours([]);
      setPalette([]); // reset palette on brand change
      setColorTypeRefreshKey(0); // reset refresh key for new brand
    }
    
    setSelectedBrandId(brandId);
    loadBrandData(brandId);
    setStep(4);
    // Batch URL update to prevent flickering
    requestAnimationFrame(() => {
      updateStepURL(4);
    // Reset scroll to top when selecting a brand
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    });
  };
  const handleSelectColourType = (colourType: string) => {
    // Force a state update to ensure colors refresh properly
    setSelectedColourType(colourType);
    
    // Force re-render by updating refresh key to prevent React batching issues
    setColorTypeRefreshKey(prev => prev + 1);
    
    // Scroll to selected colours section when changing colour type
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const selectedColoursSection = document.querySelector('[data-section="selected-colours"]');
        if (selectedColoursSection) {
          selectedColoursSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100); // Small delay to ensure DOM is updated
    }
  };
  const handleAddColour = (colour: ColorSwatch) => {
    const isAlreadySelected = selectedColours.find(c => c.colorHex === colour.colorHex);
    
    if (isAlreadySelected) {
      // If already selected, remove it (toggle off)
      setSelectedColours(selectedColours.filter(c => c.colorHex !== colour.colorHex));
    } else if (selectedColours.length < 12) {
      // If not selected and under limit, add it (toggle on)
      setSelectedColours([...selectedColours, colour]);
    }
  };
  const handleRemoveColour = (colourHex: string) => {
    setSelectedColours(selectedColours.filter(c => c.colorHex !== colourHex));
  };
  const handleAddColorToPalette = (color: string) => {
    if (palette.length < 6 && !palette.includes(color)) {
      setPalette([...palette, color]);
    }
  };
  const handleRemoveColorFromPalette = (idx: number) => {
    setPalette(palette.filter((_, i) => i !== idx));
  };
  const handleOpenPalette = (side: string) => {
    setActiveSide(side);
    setShowPalette(true);
  };
  const handleAssignColor = (color: string) => {
    if (activeSide) {
      setAssignments({ ...assignments, [activeSide]: color });
      setShowPalette(false);
      setActiveSide(null);
    }
  };

  const handleBulkAssignColors = (newAssignments: { [side: string]: string }) => {
    setAssignments(newAssignments);
    setShowPalette(false);
    setActiveSide(null);
  };

  const handleClosePalette = () => setShowPalette(false);
  const handleResetAssignments = () => {
    setAssignments({});
    setShowPalette(false);
    setActiveSide(null);
  };

  // Navigation
  const goToStep = (n: number) => {
    setStep(n);
    // Batch URL update to prevent flickering
    requestAnimationFrame(() => {
      updateStepURL(n);
    // Reset scroll to top when navigating between steps
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    });
  };
  const nextStep = () => {
    const newStep = step + 1;
    setStep(newStep);
    // Batch URL update to prevent flickering
    requestAnimationFrame(() => {
      updateStepURL(newStep);
    // Reset scroll to top when going to next step
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    });
  };
  const prevStep = () => {
    const newStep = step - 1;
    setStep(newStep);
    // Batch URL update to prevent flickering
    requestAnimationFrame(() => {
      updateStepURL(newStep);
    // Reset scroll to top when going to previous step
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    });
  };

  // Generate breadcrumbs based on current selections
  const generateBreadcrumbs = () => {
    const breadcrumbs = [];
    
    // Step 1: Room Type
    if (selectedRoomType) {
      const room = manifest.find(r => r.roomType === selectedRoomType);
      breadcrumbs.push({
        label: `Change Room Type (${room?.label || selectedRoomType})`,
        step: 1,
        isActive: step === 1
      });
    }
    
    // Step 2: Room Variant
    if (selectedVariantName && selectedRoom) {
      const variant = selectedRoom.variants.find(v => v.name === selectedVariantName);
      breadcrumbs.push({
        label: `Change Room Variant (${variant?.label || selectedVariantName})`,
        step: 2,
        isActive: step === 2
      });
    }
    
    // Step 3: Paint Brand
    if (selectedBrandId) {
      const brand = BRAND_CONFIG.find(b => b.id === selectedBrandId);
      breadcrumbs.push({
        label: `Change Paint Brand (${brand?.name || selectedBrandId})`,
        step: 3,
        isActive: step === 3
      });
    }
    
    // Step 4: Colour Selection
    if (selectedColours.length > 0) {
      breadcrumbs.push({
        label: `Change Colours (${selectedColours.length} Selected)`,
        step: 4,
        isActive: step === 4
      });
      
      // Step 5: Final Preview - Show on step 4 and step 5
      breadcrumbs.push({
        label: 'Final Preview',
        step: 5,
        isActive: step === 5
      });
    }
    
    return breadcrumbs;
  };

  return {
    manifest,
    brands,
    loading,
    step,
    setStep: goToStep,
    nextStep,
    prevStep,
    selectedRoomType,
    setSelectedRoomType: handleSelectRoomType,
    selectedVariantName,
    setSelectedVariantName: handleSelectVariant,
    selectedRoom,
    selectedVariant,
    selectedBrandId,
    setSelectedBrandId: handleSelectBrand,
    selectedBrand,
    swatches,
    palette,
    setPalette,
    assignments,
    setAssignments,
    activeSide,
    setActiveSide,
    showPalette,
    setShowPalette,
    wallMasks,
    loadingMasks,
    // New dynamic brand data
    brandData,
    loadingBrandData,
    colourTypes,
    selectedColourType,
    coloursForType,
    selectedColours,
    handleSelectRoomType,
    handleSelectVariant,
    handleSelectBrand,
    handleSelectColourType,
    handleAddColour,
    handleRemoveColour,
    handleAddColorToPalette,
    handleRemoveColorFromPalette,
    handleOpenPalette,
    handleAssignColor,
    handleBulkAssignColors,
    handleClosePalette,
    handleResetAssignments,
    // Breadcrumbs
    generateBreadcrumbs,
    // Color type refresh key for forcing re-renders
    colorTypeRefreshKey,
  };
} 