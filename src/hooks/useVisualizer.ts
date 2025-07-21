import { useState, useEffect } from 'react';

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

export const CATEGORIES = [
  { key: 'bedroom', label: 'Bedroom', img: '/lovable-uploads/bedroom.jpg' },
  { key: 'living-room', label: 'Living Room', img: '/lovable-uploads/living-room.jpg' },
  { key: 'kitchen', label: 'Kitchen', img: '/lovable-uploads/kitchen.jpg' },
  { key: 'bathroom', label: 'Bathroom', img: '/assets/images/image-21.png' },
  { key: 'home-office', label: 'Home Office', img: '/assets/images/image-16.png' },
  { key: 'kids-room', label: 'Kids Room', img: '/lovable-uploads/kids.png' },
  { key: 'office', label: 'Office', img: '/lovable-uploads/Commercial.png' },
  { key: 'home-exterior', label: 'Home Exterior', img: '/lovable-uploads/exterior-painting.png' },
];

export const CATEGORY_IMAGES: Record<string, string[]> = {
  'bedroom': [
    '/assets/images/bedroom/bedroom1/bedroom1.jpg',
    '/assets/images/bedroom/bedroom2/bedroom2.jpg',
    ...Array.from({length: 11}, (_, i) => `/lovable-uploads/bedroom.jpg`),
  ],
  'living-room': Array.from({length: 12}, (_, i) => `/lovable-uploads/living-room.jpg`),
  'kitchen': Array.from({length: 12}, (_, i) => `/lovable-uploads/kitchen.jpg`),
  'bathroom': Array.from({length: 12}, (_, i) => `/assets/images/image-21.png`),
  'home-office': Array.from({length: 12}, (_, i) => `/assets/images/image-16.png`),
  'kids-room': Array.from({length: 12}, (_, i) => `/lovable-uploads/kids.png`),
  'office': Array.from({length: 12}, (_, i) => `/lovable-uploads/Commercial.png`),
  'home-exterior': Array.from({length: 12}, (_, i) => `/lovable-uploads/exterior-painting.png`),
};

export const BRANDS = [
  { id: 'asian-paints', name: 'Asian Paints', logo: '/assets/images/home-glazer-logo-1.png' },
  { id: 'dulux', name: 'Dulux', logo: '/assets/images/icon-1.svg' },
  { id: 'nerolac', name: 'Nerolac', logo: '/assets/images/kansai-nerolac-paints-limited7357-removebg-preview.png' },
  { id: 'berger', name: 'Berger', logo: '/assets/images/icon-2.svg' },
  { id: 'shalimar', name: 'Shalimar', logo: '/assets/images/rectangle-94.png' },
  { id: 'jsw', name: 'JSW', logo: '/assets/images/nippon-paint-logo-png-seeklogo-353779-removebg-preview.png' },
];

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
};

export function useVisualizer() {
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

  // Get selected room/variant/brand objects
  const selectedRoom = manifest.find(r => r.roomType === selectedRoomType) || null;
  const selectedVariant = selectedRoom?.variants.find(v => v.name === selectedVariantName) || null;
  const selectedBrand = brands.find(b => b.id === selectedBrandId) || null;
  const swatches = selectedBrand ? selectedBrand.colors : [];

  // Fetch and parse wall masks when variant changes
  useEffect(() => {
    if (!selectedVariant) {
      setWallMasks({});
      return;
    }
    setLoadingMasks(true);
    const wallSvgs = selectedVariant.walls;
    const promises = Object.entries(wallSvgs).map(async ([key, url]) => {
      try {
        const res = await fetch(url);
        const svgText = await res.text();
        // Try DOMParser if available
        if (typeof window !== 'undefined' && 'DOMParser' in window) {
          try {
            const parser = new window.DOMParser();
            const doc = parser.parseFromString(svgText, 'image/svg+xml');
            const path = doc.querySelector('path');
            if (path && path.getAttribute('d')) {
              return { key, d: path.getAttribute('d') || '' };
            }
          } catch (e) {}
        }
        // Fallback: regex for d attribute in any <path ... d="..." ...>
        const pathMatch = svgText.match(/<path[^>]*d=["']([^"']+)["'][^>]*>/i);
        if (pathMatch) {
          return { key, d: pathMatch[1] };
        }
        // Fallback: try to find all <path ... d="..." ...> and use the first
        const allPaths = Array.from(svgText.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*>/gi));
        if (allPaths.length > 0) {
          return { key, d: allPaths[0][1] };
        }
        return { key, d: '' };
      } catch (err) {
        console.error(`Failed to fetch/parse SVG for ${key}:`, err);
        return { key, d: '' };
      }
    });
    Promise.all(promises).then(results => {
      const newWallMasks = results.reduce((acc, { key, d }) => {
        if (d) acc[key] = d;
        return acc;
      }, {} as Record<string, string>);
      setWallMasks(newWallMasks);
      setLoadingMasks(false);
    });
  }, [selectedVariant]);

  // Handlers
  const handleSelectRoomType = (roomType: string) => {
    setSelectedRoomType(roomType);
    setSelectedVariantName(null);
    setStep(2);
  };
  const handleSelectVariant = (variantName: string) => {
    setSelectedVariantName(variantName);
    setStep(3);
  };
  const handleSelectBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
    setStep(4);
    setPalette([]); // reset palette on brand change
  };
  const handleAddColor = (color: string) => {
    if (palette.length < 6 && !palette.includes(color)) {
      setPalette([...palette, color]);
    }
  };
  const handleRemoveColor = (idx: number) => {
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
  const handleClosePalette = () => setShowPalette(false);
  const handleDownload = () => {
    alert('Download functionality coming soon!');
  };

  // Navigation
  const goToStep = (n: number) => setStep(n);
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

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
    handleSelectRoomType,
    handleSelectVariant,
    handleSelectBrand,
    handleAddColor,
    handleRemoveColor,
    handleOpenPalette,
    handleAssignColor,
    handleClosePalette,
    handleDownload,
  };
} 