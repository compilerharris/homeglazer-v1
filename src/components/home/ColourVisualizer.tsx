import React, { useState, useEffect, useRef } from 'react';
import CTAButton from './CTAButton';

const ColourVisualizer: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string>('#F9D07D');
  const [wallMasks, setWallMasks] = useState<Record<string, string>>({});
  const [loadingMasks, setLoadingMasks] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);

  // Color options - just colors, no names or codes
  const colorOptions = [
    { color: "#F9D07D" }, // Sunny Yellow
    { color: "#81D4FA" }, // Sky Blue
    { color: "#A5D6A7" }, // Mint Green
    { color: "#CE93D8" }, // Lavender
    { color: "#FFAB91" }, // Coral Orange
    { color: "#F48FB1" }  // Bubblegum Pink
  ];

  // Use existing bedroom6 assets
  const roomImage = '/assets/images/bedroom/bedroom6/bedroom6.jpg';
  const wallSvgs = {
    left: '/assets/images/bedroom/bedroom6/left-wall.svg',
    right: '/assets/images/bedroom/bedroom6/right-wall.svg',
    window: '/assets/images/bedroom/bedroom6/window.svg'
  };

  const wallKeys = ['left', 'right', 'window'];

  // Auto-advance slides every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % colorOptions.length;
      setCurrentSlide(nextIndex);
      setSelectedColor(colorOptions[nextIndex].color);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide, colorOptions.length]);

  // Load wall masks from existing bedroom1 assets
  useEffect(() => {
    const loadMasks = async () => {
      setLoadingMasks(true);
      
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
            } catch (e) {
              console.error('Error parsing SVG with DOMParser:', e);
            }
          }
          
          // Fallback: regex for d attribute
          const pathMatch = svgText.match(/<path[^>]*d=["']([^"']+)["'][^>]*>/i);
          if (pathMatch && pathMatch[1]) {
            return { key, d: pathMatch[1] };
          }
          
          return null;
        } catch (error) {
          console.error(`Error loading mask for ${key}:`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      const newMasks: Record<string, string> = {};
      
      results.forEach(result => {
        if (result) {
          newMasks[result.key] = result.d;
        }
      });
      
      setWallMasks(newMasks);
      setLoadingMasks(false);
    };

    loadMasks();
  }, []);

  const handleColorClick = (color: string, index: number) => {
    setSelectedColor(color);
    setCurrentSlide(index);
  };
  
  return (
    <section className="bg-[rgba(223,223,223,0.27)] w-full mt-[50px] py-[35px] max-md:mt-10">
      <div className="container mx-auto w-[80%] px-0 lg:px-8 flex flex-col lg:flex-row items-center gap-8 2xl:w-[1400px]">
        <div className="w-full lg:w-1/3 my-auto order-2 lg:order-1">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium leading-[150%]">
              Visualise Your Colour
            </h2>
            <p className="text-xl text-[rgba(123,130,137,1)] font-light mt-[18px]">
              See how different colours transform your space
            </p>
            <CTAButton 
              to="/colour-visualiser" 
              className="flex min-h-[60px] w-60 max-w-full items-center gap-[13px] text-[21px] text-black font-normal text-center justify-center mt-7 pl-[19px] pr-[11px] py-[13px] rounded-[35px] transition-all duration-300" 
              style={{
                backgroundColor: selectedColor,
                color: "#000000"
              }}
            >
              <span className="self-stretch my-auto">Explore All Colour</span>
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/bbec7bbdc40c35a19214d20ad0710ac73ff6069d?placeholderIfAbsent=true" 
                alt="Arrow Icon" 
                className="aspect-[1] object-contain w-[34px] self-stretch shrink-0 my-auto" 
              />
            </CTAButton>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          {/* Carousel-like Image Display */}
          <div className="relative">
            <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <img
                src={roomImage}
                alt="Room Preview"
                className="w-full h-full object-cover"
              />
              {/* SVG Overlay for wall masking */}
              <svg
                ref={svgRef}
                className="svg-overlay absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
                viewBox="0 0 1280 720"
                preserveAspectRatio="xMidYMid slice"
              >
                {wallKeys.map((wallKey) => {
                  if (!wallMasks[wallKey]) return null;
                  return (
                    <g key={wallKey}>
                      <defs>
                        <mask id={`wall-mask-${wallKey}`}>
                          <rect width="100%" height="100%" fill="black"/>
                          <path d={wallMasks[wallKey]} fill="white"/>
                        </mask>
                      </defs>
                      <rect 
                        width="100%" 
                        height="100%" 
                        fill={selectedColor || '#ffffff'} 
                        opacity="0.7"
                        mask={`url(#wall-mask-${wallKey})`}
                        className="wall-path"
                        data-wall={wallKey}
                      />
                    </g>
                  );
                })}
              </svg>
              {loadingMasks && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
                  <div className="text-gray-500">Loading...</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Colour Circle Controllers - below the image */}
          <div className="flex justify-center mt-6 gap-2 sm:gap-3">
            {colorOptions.map((colorOption, index) => (
              <button 
                key={index} 
                className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full transition-all duration-300 border-2 hover:scale-110 ${
                  currentSlide === index ? 'border-gray-800 scale-110' : 'border-white shadow-lg'
                }`} 
                style={{
                  backgroundColor: colorOption.color
                }} 
                onClick={() => handleColorClick(colorOption.color, index)} 
                aria-label={`Select color ${index + 1}`} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColourVisualizer; 