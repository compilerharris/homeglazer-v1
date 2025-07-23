import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../../../components/home/Header';
import Footer from '../../../../components/home/Footer';

const BRANDS = [
  { id: 'asian-paints', name: 'Asian Paints' },
  { id: 'dulux', name: 'Dulux' },
  { id: 'nerolac', name: 'Nerolac' },
  { id: 'berger', name: 'Berger' },
  { id: 'shalimar', name: 'Shalimar' },
  { id: 'jsw', name: 'JSW' },
];

const COLOR_SWATCHES: { [brand: string]: { name: string; code: string }[] } = {
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

const ROOM_IMAGES = {
  bedroom: "/lovable-uploads/bedroom.jpg",
  living: "/lovable-uploads/living-room.jpg",
  kitchen: "/lovable-uploads/kitchen.jpg",
};

const BEDROOM_POLYLINE_PATH = "M0 0 L0 369 L9 374 L104 374 L149 360 L149 379.97 L197.32 379.97 L199.58 372.88 L214.07 379.97 L223.09 360 L237.59 365.15 L237.59 373.85 L244.36 379.97 L479.52 378.03 L504.97 369.01 L504.97 378.03 L559.42 378.03 L574.23 376.1 L574.23 379.97 L645.11 377.71 L646.72 615.46 L619.01 615.46 L670.56 688.91 L682.48 705.98 L688.27 720 L708.89 720 L708.89 711.78 L698.26 711.78 L689.24 682.14 L688.92 532.34 L832.92 532.02 L832.92 523.64 L846.13 521.07 L857.08 520.42 L858.37 515.27 L861.91 513.01 L906.05 511.4 L912.17 505.93 L916.03 494.65 L917 489.5 L915.71 296.53 L913.45 285.58 L907.66 273.66 L901.86 269.15 L868.35 263.67 L868.36 265.94 L876.4 266.09 L877.36 267.45 L877.21 285.84 L851.97 287.08 L852.09 266.21 L860.72 265.94 L860.6 252.29 L868.7 252.29 L868.94 257.24 L903.25 260.74 L910.86 265.21 L917.26 272.22 L921.97 281.76 L924.51 293.36 L924.51 304.84 L925.47 481.61 L924.81 491.16 L922.88 501.91 L918.77 509.7 L913.03 516.83 L907.84 521.06 L923.54 521.36 L934.9 523.41 L934.96 530.78 L948.49 530.14 L988.11 540.93 L988.11 709.09 L961.05 709.09 L965.24 720 L1280 720 L1280 0 L0 0 Z";
const LIVING_ROOM_PATH = "M21.93,0h1258.07v159.18l-1.94,5.32-5.07,7.49-6.04,3.62-.72,8.46,2.17,9.18-2.17,28.99-.48,22.47,7.01,7.25-.48,7.73-2.17,9.91,2.42,5.56,2.9,8.21,4.59.72v372.32l-141.34-67.17h-23.19l-2.9-9.66-1.93-12.08,2.17-7.97,3.62-9.91-1.45-8.94-3.14-3.62-4.59,1.45-3.62,6.28-2.9,7.73-2.66-1.93-.48-222.76,36.97.24,19.09-3.62v-56.3l-9.18-2.42-37.93-.24-31.41.97-36.48,3.87.48,54.6.48,2.9,51.46.24v221.07s-4.83,3.38-4.83,3.38l-7.25-.48-21.02-1.21-18.85,1.45-4.11-8.94-3.87-5.56-4.35-1.21-2.17,4.35,1.21,8.21,3.14,7.97,2.17,7.25-1.69,5.32-5.32,13.29-2.66,5.32h-17.64l1.69-109.45-43.25-16.19-16.67.97-9.42-9.42,6.77-17.15-14.5,3.38-27.06,4.11h-22.47l-14.26-2.17-12.56-4.59-13.05-5.56v16.91l-34.79.48-10.15-3.87v-7.25l-40.35-.24-4.59,3.38-10.63-3.38-12.81.97-3.87-3.62-3.87,1.93-8.21.72-5.56-2.9-6.04-1.69-5.56,4.59-16.19.72-4.35,7.73-24.16-.24-5.07-15.95-14.26,7.49-30.68,2.66-24.16.97v-8.7l-3.38.24-12.08,5.8-12.32-3.38-6.28-2.42,3.87,11.84h-12.81l-22.23-1.45-29.48-5.32h-3.62l7.01,20.3-28.27,1.69-37.21,17.64,4.59,108.48h-53.64l-1.21-118.15-2.42-1.69,2.66-7.01,3.38-6.52,6.04,6.77-.48-8.7,6.28-7.97,5.56-10.39,12.08-7.97,6.52-8.94,6.04-5.56-.97-12.56,5.8-4.83,6.04-6.52,3.38-3.38-.97-5.32,3.62-2.17,1.93-4.35.48-9.18,4.11-4.35,4.83-4.11.97-2.66-5.8-3.14-6.04-.72,2.66-7.49-.24-7.01-14.98,11.11-6.52,7.97-7.01,3.87,2.17-9.66,5.07-9.18-.48-8.94-4.59-3.62-2.66,5.32-3.62,7.73-4.35,13.53-13.05,19.33-2.42-7.25-.48-8.21,2.66-7.01,4.35-2.66-3.14-10.39,4.11-3.38,2.66-4.35-4.83-1.21,1.21-8.21,1.45-7.25,5.07-4.11-2.42-1.93-5.32.97.72-4.35-8.94-5.32,1.21-5.8-8.46,7.25-4.35,7.25-6.04,10.39-2.9-4.59-1.45-6.28,2.66-8.46-2.17-8.21.72-6.77-3.62,1.93-3.87,5.07-1.69,10.87-1.69,3.62-.72,10.15-6.77,1.21-3.62,3.62-4.11-1.45-.24-8.46-2.42-13.05-2.17-12.08-4.59-7.73.72,7.73-4.11,6.04,3.14,9.66-4.59,1.21v4.11l5.32,5.32.97,4.35-2.66,6.28-9.42-11.36v-7.49l-5.32-7.25-.24-5.56-12.56-8.94-3.14,3.38,3.38,4.35-5.32,4.11-3.87-2.17-4.83-1.21-5.56,6.04-1.21,4.35,7.97,7.01h3.38l2.42,3.62-1.93,3.62,4.11,13.05-5.56-2.9-4.83-1.21-6.52.72,6.28,6.77-5.32,2.17-2.17-.97-5.07-2.42-3.87-.72-3.38,5.56v9.18l9.42,9.66-.72,4.83,1.45,7.01,3.38,2.17,5.07,5.32-6.77,4.59,11.36,4.59,5.32,3.38-5.56,2.42-2.17,3.62,9.91-1.93v6.04l3.14,1.21,4.83,5.07-2.17,1.69-6.04,2.42-3.87,4.59.48,6.04,10.63-4.59,6.52-4.83,2.9,2.9-7.25,6.04-.48,7.25-11.6.97-5.32,4.83h10.63l9.91,6.04,7.25,12.56,7.97,8.21,1.93,6.28-4.59,9.42-1.21,57.74-60.4-7.73-1.21-6.28-2.66-7.97-4.35-5.32-7.25-7.25-7.73-5.4-7.97-.89h-20.54v-2.42l-4.35-4.83-8.21-6.04-7.01-3.38-10.15-2.66-14.01-3.62-15.14-2.58-22.87-.64-24.48,1.93-19.65,3.87-12.89,2.9-9.34,2.9-17.07,7.73-12.56,7.73L21.93,0M283.6,341.03l11.36,11.84h5.8l-2.66-5.92-14.5-5.92ZM352.21,459.18l3.87-7.25-3.38-8.7-3.62,5.32-5.56,2.17-2.17,7.25,3.62,8.7h7.73l-.48-7.49ZM1112.08,541.45h-2.9l-2.9,4.47-3.26,7.25-.97,3.62,8.58,5.44,1.45-8.82v-11.96ZM1030.05,541.45h-2.17v8.58l3.99,6.4,5.68,3.38h1.81l-1.21-4.23-3.74-8.7-4.35-5.44ZM789.17,90.36c-56.84,0-102.93,46.08-102.93,102.93s46.08,102.93,102.93,102.93,102.93-46.08,102.93-102.93-46.08-102.93-102.93-102.93ZM610.86,190.87c-56.84,0-102.93,46.08-102.93,102.93s46.08,102.93,102.93,102.93,102.93-46.08,102.93-102.93-46.08-102.93-102.93-102.93Z";
const KITCHEN_PATH = "M0,32.99V0h260.07l167.99,183.28,590.7,3.29,31.84-16.47,229.4-1.1v310.65l-18.83,1.45,3.38-281.88-142.71-1.29-4.19,305.4,52.19.64,2.26,5.15,4.51,6.77,6.44,4.51,1.29,5.48h-139.81l-20.94-7.09-2.58-53.48,2.58-27.06v-9.5l-42.64-3.5-86.38-.36v-31.65h-24.16v6.77l-6.52.48v24.4l-5.32,1.21v-3.14l2.17-.48.97-3.14-1.21-3.38-3.14-1.93v-13.53l-12.56.24v12.32l-2.66-2.66-3.14-.48-3.38,2.66-2.66-2.42-4.11,1.69-1.93,4.11,1.45,4.59,4.59,4.11h-145.69l-35.28-.48-1.21-39.87v-14.01l-4.11-11.6-3.38-6.28-6.04-3.38-5.56,1.21-4.83,4.83-3.87,9.18-1.69,14.74v34.07l-.48,7.25,2.9.72.97-2.17.24-16.43,21.74.97v21.5l-51.46.24-8.21.24-160.43.24,3.14-3.62,1.93-3.62-4.59-3.87-2.42-2.66-6.77.97-2.17,2.66-6.04.72-.48,4.59,5.32,5.07h-126.12l-27.06,2.9-3.38-251.76L0,32.99M646.92,400.97v-30.6l-2.26-8.7-3.22-6.44-3.87-2.26h-3.54l-3.54,3.7-3.38,5.8-2.26,5.48v32.38l22.07.64ZM793.98,183.39v40.11l-10.31,2.58v5.41l24.6.05-.28-5.94-2.58-2.9h-8.38v-39.3h-3.06ZM702.97,183.39l-.32,39.46-9.66,2.74-.13,5.64,24.12.11-.15-6.23-2.74-2.09h-8.21v-39.62h-2.9ZM611.16,183.39l-.16,39.3-8.7.16-2.42,2.42-.06,5.26,24.08.18-.17-5.28-3.06-2.26-6.93-.81v-38.98h-2.58ZM267.99,228.01l1.21,141.83,1.81,1.81h300.68v-36.93l130.15-1.61,1.61,38.54h297.99l1.61-139.69-299.92-.64-435.14-3.3ZM1023.83,527.36v11.11l19.17,7.73h149.64s2.42-3.7,2.42-3.7v-2.42l-8.21-1.13-4.67-2.9-2.9-2.42-136.75.32-18.68-6.6ZM1202.3,546.21h8.86l-3.06-3.06h-5.15l-.64,3.06ZM260.53,370.48h-108.59v58.95l109.37-.68-.78-58.27Z";
const WALL_SIDES = ["front", "left", "right", "back"];
const WALL_MASKS: Record<string, Record<string, string>> = {
  bedroom: {
    front: BEDROOM_POLYLINE_PATH,
    left: BEDROOM_POLYLINE_PATH,
    right: BEDROOM_POLYLINE_PATH,
    back: BEDROOM_POLYLINE_PATH,
  },
  living: {
    front: LIVING_ROOM_PATH,
    left: LIVING_ROOM_PATH,
    right: LIVING_ROOM_PATH,
    back: LIVING_ROOM_PATH,
  },
  kitchen: {
    front: KITCHEN_PATH,
    left: KITCHEN_PATH,
    right: KITCHEN_PATH,
    back: KITCHEN_PATH,
  },
};

// Utility functions for kebab-case conversion
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}
function fromKebabCase(str: string): string {
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

const BasicVisualiserPage: React.FC = () => {
  const router = useRouter();
  const { brand: brandParam, color: colorParam } = router.query;

  // Find brand and color from URL, fallback if not found
  const brandId = typeof brandParam === 'string' && BRANDS.some(b => b.id === brandParam) ? brandParam : BRANDS[0].id;
  const swatches = COLOR_SWATCHES[brandId];
  const colorName = typeof colorParam === 'string' ? fromKebabCase(colorParam) : swatches[0].name;
  const colorObj = swatches.find(s => toKebabCase(s.name) === toKebabCase(colorName)) || swatches[0];
  const selectedColor = colorObj.code;

  // Brand/color change handlers
  const handleBrandClick = (id: string) => {
    const firstColor = COLOR_SWATCHES[id][0];
    router.push(`/color-visualiser/basic/${id}/${toKebabCase(firstColor.name)}`);
  };
  const handleColorClick = (colorName: string) => {
    router.push(`/color-visualiser/basic/${brandId}/${toKebabCase(colorName)}`);
  };

  // Intersection observer logic (unchanged)
  const [swatchFixed, setSwatchFixed] = React.useState(true);
  const imagesRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);
  const footerSentinelRef = useRef<HTMLDivElement>(null);
  const [imagesSentinelVisible, setImagesSentinelVisible] = React.useState(false);
  const [footerSentinelVisible, setFooterSentinelVisible] = React.useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;
    const imagesObserver = new window.IntersectionObserver(
      (entries) => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
          setImagesSentinelVisible(true);
        } else {
          setImagesSentinelVisible(entries[0].isIntersecting);
        }
      },
      {
        root: null,
        threshold: 0.7,
        rootMargin: '0px 0px -10% 0px',
      }
    );
    const footerObserver = new window.IntersectionObserver(
      (entries) => {
        setFooterSentinelVisible(entries[0].isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      }
    );
    if (bottomSentinelRef.current) imagesObserver.observe(bottomSentinelRef.current);
    if (footerSentinelRef.current) footerObserver.observe(footerSentinelRef.current);
    return () => {
      if (bottomSentinelRef.current) imagesObserver.unobserve(bottomSentinelRef.current);
      if (footerSentinelRef.current) footerObserver.unobserve(footerSentinelRef.current);
    };
  }, [bottomSentinelRef.current, footerSentinelRef.current]);
  const swatchShouldBeFixed = !imagesSentinelVisible && !footerSentinelVisible;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-4 md:pt-16 pb-2 flex flex-col items-center px-4 md:px-0">
        <div className="block md:hidden" style={{ height: '80px' }} />
        <h1 className="mt-4 md:mt-12 text-3xl font-bold text-[#ED276E] mb-4 text-center">Basic Color Visualiser</h1>
        {/* Brand Tabs */}
        <div className="w-full flex justify-center mb-4">
          <div className="flex gap-4 w-full max-w-2xl overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent md:overflow-x-visible md:flex-nowrap md:w-auto md:max-w-fit md:justify-center">
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                className={`sm:px-6 px-3 sm:py-2 py-1 rounded-full font-medium border transition-all duration-200 whitespace-nowrap sm:text-base text-sm ${brandId === brand.id ? 'bg-[#299dd7] text-white border-[#299dd7]' : 'bg-white text-[#299dd7] border-[#299dd7] hover:bg-[#e6f2fa]'}`}
                onClick={() => handleBrandClick(brand.id)}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
        {/* 2-column layout: left = 3 images stacked vertically, right = swatches */}
        <div className="flex flex-col md:flex-row gap-0 w-full max-w-screen-xl">
          {/* Images and swatch bar container for observer */}
          <div ref={imagesContainerRef} className="flex-1 flex flex-col gap-8 relative">
            {Object.entries(ROOM_IMAGES).map(([label, src]) => (
              <div
                key={label}
                className="w-full flex flex-col border-2 rounded-lg transition-all duration-200"
              >
                <div className="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center relative">
                  <img src={src} alt={label} className="object-cover w-full h-full" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/1280x720?text='+label)} />
                  {/* SVG Mask Overlays for all wall sides */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
                    viewBox="0 0 1280 720"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {WALL_SIDES.map((side) => (
                      <path
                        key={side}
                        d={WALL_MASKS[label][side]}
                        fill={selectedColor}
                        fillOpacity="1"
                      />
                    ))}
                  </svg>
                </div>
                <span className="text-base font-medium text-gray-700 mb-2 text-center w-full">{label.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
              </div>
            ))}
            <div ref={bottomSentinelRef} className="block md:hidden w-full h-1" />
            <div
              className={`md:hidden w-full py-3 border-t border-gray-200 mt-4 bg-white shadow-lg z-30 ${swatchShouldBeFixed ? 'fixed left-0 right-0 bottom-20' : 'static'}`}
              style={swatchShouldBeFixed ? {maxWidth: '100vw'} : {}}
            >
              <div className="w-full flex flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-2">
                {swatches.map((swatch, idx) => (
                  <button
                    key={swatch.code+idx}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg border-2 transition-all duration-200 min-w-[90px] ${selectedColor === swatch.code ? 'border-[#299dd7] bg-blue-50' : 'border-gray-200 bg-white'}`}
                    onClick={() => handleColorClick(swatch.name)}
                  >
                    <div className="w-10 h-10 rounded-lg border-2 border-gray-200 flex-shrink-0 mb-1" style={{ background: swatch.code }} />
                    <span className="text-xs text-gray-600 text-center">{swatch.name}</span>
                  </button>
                ))}
              </div>
            </div>
            {swatchShouldBeFixed && (
              <div className="block md:hidden w-full" style={{ height: '80px' }} />
            )}
            <div ref={bottomSentinelRef} className="md:hidden w-full bg-blue-50 py-4 flex flex-col items-center rounded-xl shadow mt-4">
              <h2 className="text-xl font-bold text-[#299dd7] mb-2 text-center">Ready to Transform Your Space?</h2>
              <p className="text-gray-700 mb-4 text-center max-w-xs">Contact us now for a personalized quote or expert advice on your painting project!</p>
              <a
                href="/enquiry"
                className="inline-block px-8 py-3 rounded-full bg-[#299dd7] text-white font-semibold shadow hover:bg-[#217bb0] transition-colors duration-200 text-base"
              >
                Enquiry Now
              </a>
            </div>
          </div>
          <div className="flex-1 md:flex-[1] flex flex-col items-center">
            <div className="sticky top-24 w-full flex flex-col items-center">
              <h2 className="hidden md:block text-xl font-semibold text-[#299dd7] mb-4">{BRANDS.find(b => b.id === brandId)?.name} Colors</h2>
              <div className="hidden md:grid w-full max-w-xs grid-cols-2 gap-4 md:gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {swatches.map((swatch, idx) => (
                  <button
                    key={swatch.code+idx}
                    className={`flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3 p-2 rounded-lg border-2 transition-all duration-200 min-w-[110px] md:min-w-[150px] ${selectedColor === swatch.code ? 'border-[#299dd7] bg-blue-50' : 'border-gray-200 bg-white'}`}
                    onClick={() => handleColorClick(swatch.name)}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 border-gray-200 flex-shrink-0 mb-1 md:mb-0" style={{ background: swatch.code }} />
                    <span className="text-xs md:text-sm text-gray-600 text-center md:text-left">{swatch.name}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 w-full md:max-w-xs bg-white border-2 border-[#ED276E] rounded-xl shadow-md p-4 flex flex-col items-center text-center">
                <h3 className="text-lg font-bold text-[#ED276E] mb-2">Want More Power?</h3>
                <p className="text-gray-600 mb-4 text-sm">Try our <span className="font-semibold text-[#ED276E]">Advanced Visualiser</span> for more room types, wall selection, and custom color uploads!</p>
                <a
                  href="/color-visualiser/advanced"
                  className="inline-block px-5 py-2 rounded-full bg-[#ED276E] text-white font-semibold shadow hover:bg-[#c81e5d] transition-colors duration-200"
                >
                  Try Advanced Visualiser
                </a>
              </div>
              <div className="mt-4 w-full md:max-w-xs bg-blue-50 py-4 flex flex-col items-center rounded-xl shadow hidden md:flex">
                <h2 className="text-xl md:text-2xl font-bold text-[#299dd7] mb-2 text-center">Ready to Transform Your Space?</h2>
                <p className="text-gray-700 mb-4 text-center max-w-xs">Contact us now for a personalized quote or expert advice on your painting project!</p>
                <a
                  href="/enquiry"
                  className="inline-block px-8 py-3 rounded-full bg-[#299dd7] text-white font-semibold shadow hover:bg-[#217bb0] transition-colors duration-200 text-base md:text-lg"
                >
                  Enquiry Now
                </a>
              </div>
            </div>
          </div>
        </div>
      <div ref={footerSentinelRef} className="block md:hidden w-full h-0" />
      </main>
      <Footer />
    </>
  );
};

export default BasicVisualiserPage; 