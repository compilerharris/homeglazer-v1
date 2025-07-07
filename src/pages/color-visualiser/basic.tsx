import React, { useState } from 'react';
import Header from '../../components/home/Header';
import Footer from '../../components/home/Footer';

const BRANDS = [
  { id: 'asian-paints', name: 'Asian Paints' },
  { id: 'dulux', name: 'Dulux' },
  { id: 'nerolac', name: 'Nerolac' },
  { id: 'berger', name: 'Berger' },
  { id: 'shalimar', name: 'Shalimar' },
  { id: 'jsw', name: 'JSW' },
];

// Realistic color swatches for each brand (sampled from their popular palettes)
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
  bedroom:
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  living:
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  kitchen:
    "https://images.unsplash.com/photo-1569152811536-fb47aced8409?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// Visually estimated wall mask polygons for each room (now moved to the top area)
const WALL_MASKS: Record<string, string> = {
  bedroom: 'M60,40 L340,40 L340,120 L60,120 Z',   // Bedroom: top area
  living:  'M50,30 L350,30 L350,110 L50,110 Z',   // Living: top area
  kitchen: 'M70,20 L330,40 L330,100 L70,80 Z',    // Kitchen: top area, slanted
};

const BasicVisualiserPage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState(BRANDS[0].id);
  const [selectedColor, setSelectedColor] = useState(COLOR_SWATCHES[BRANDS[0].id][0].code);

  const swatches = COLOR_SWATCHES[selectedBrand];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-16 pb-24 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-[#ED276E] mb-8 text-center">Basic Color Visualiser</h1>
        {/* Brand Tabs */}
        <div className="w-full flex justify-center mb-10">
          <div className="flex gap-4 w-full max-w-2xl overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
            md:overflow-x-visible md:flex-nowrap md:w-auto md:max-w-fit md:justify-center">
            {BRANDS.map((brand) => (
              <button
                key={brand.id}
                className={`sm:px-6 px-3 sm:py-2 py-1 rounded-full font-medium border transition-all duration-200 whitespace-nowrap sm:text-base text-sm ${selectedBrand === brand.id ? 'bg-[#299dd7] text-white border-[#299dd7]' : 'bg-white text-[#299dd7] border-[#299dd7] hover:bg-[#e6f2fa]'}`}
                onClick={() => {
                  setSelectedBrand(brand.id);
                  setSelectedColor(COLOR_SWATCHES[brand.id][0].code);
                }}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
        {/* 2-column layout */}
        <div className="flex flex-col md:flex-row gap-10 w-full max-w-screen-xl">
          {/* Left: Room Images */}
          <div className="flex-[2] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Top image, spans both columns on desktop */}
            <div className="md:col-span-2 mb-6 w-full">
              {(() => {
                const [label, src] = Object.entries(ROOM_IMAGES)[0];
                return (
                  <div
                    key={label}
                    className="w-full flex flex-col border-2 rounded-lg transition-all duration-200"
                  >
                    <div className="w-full aspect-[4/2] bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center relative">
                      <img src={src} alt={label} className="object-cover w-full h-full" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/800x400?text='+label)} />
                      {/* SVG Mask Overlay for wall coloring */}
                      <svg
                        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
                        viewBox="0 0 400 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d={WALL_MASKS[label]}
                          fill={selectedColor}
                          fillOpacity="1"
                        />
                      </svg>
                    </div>
                    <span className="text-base font-medium text-gray-700 mb-2 text-center w-full">{label}</span>
                  </div>
                );
              })()}
            </div>
            {/* Bottom left image */}
            {(() => {
              const [label, src] = Object.entries(ROOM_IMAGES)[1];
              return (
                <div
                  key={label}
                  className="w-full flex flex-col border-2 rounded-lg transition-all duration-200"
                >
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center relative">
                    <img src={src} alt={label} className="object-cover w-full h-full" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text='+label)} />
                    {/* SVG Mask Overlay for wall coloring */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
                      viewBox="0 0 400 300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d={WALL_MASKS[label]}
                        fill={selectedColor}
                        fillOpacity="1"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-gray-700 mb-2 text-center w-full">{label}</span>
                </div>
              );
            })()}
            {/* Bottom right image */}
            {(() => {
              const [label, src] = Object.entries(ROOM_IMAGES)[2];
              return (
                <div
                  key={label}
                  className="w-full flex flex-col border-2 rounded-lg transition-all duration-200"
                >
                  <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden mb-2 flex items-center justify-center relative">
                    <img src={src} alt={label} className="object-cover w-full h-full" onError={e => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text='+label)} />
                    {/* SVG Mask Overlay for wall coloring */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
                      viewBox="0 0 400 300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d={WALL_MASKS[label]}
                        fill={selectedColor}
                        fillOpacity="1"
                      />
                    </svg>
                  </div>
                  <span className="text-base font-medium text-gray-700 mb-2 text-center w-full">{label}</span>
                </div>
              );
            })()}
          </div>
          {/* Right: Color Swatches */}
          <div className="flex-1 md:flex-[1] flex flex-col items-center">
            <h2 className="text-xl font-semibold text-[#299dd7] mb-4">{BRANDS.find(b => b.id === selectedBrand)?.name} Colors</h2>
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
              {swatches.map((swatch, idx) => (
                <button
                  key={swatch.code+idx}
                  className={`flex items-center gap-3 p-2 rounded-lg border-2 transition-all duration-200 min-w-[150px] ${selectedColor === swatch.code ? 'border-[#299dd7] bg-blue-50' : 'border-gray-200 bg-white'}`}
                  onClick={() => setSelectedColor(swatch.code)}
                >
                  <div className="w-12 h-12 rounded-lg border-2 border-gray-200 flex-shrink-0" style={{ background: swatch.code }} />
                  <span className="text-sm text-gray-600">{swatch.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default BasicVisualiserPage; 