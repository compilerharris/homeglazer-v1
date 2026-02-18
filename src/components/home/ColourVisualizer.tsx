import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';
import CanvasRoomVisualiser from '../visualizer/CanvasRoomVisualiser';
import SvgRoomVisualiser from '../visualizer/SvgRoomVisualiser';
import { useIsDesktop } from '@/hooks/useIsDesktop';
import { embeddedWallMasks } from '../../data/embeddedWallMasks';
import { getMediaUrl } from '@/lib/mediaUrl';

const roomImage = '/assets/images/bedroom/bedroom6/bedroom6.jpg';
const wallKeys = ['left', 'right', 'window'];
const combinedWallPath = wallKeys
  .map((k) => embeddedWallMasks.bedroom6?.[k])
  .filter(Boolean)
  .join(' ');

const ColourVisualizer: React.FC = () => {
  const isDesktop = useIsDesktop();
  const [selectedColor, setSelectedColor] = useState<string>('#F9D07D');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Color options - just colors, no names or codes
  const colorOptions = [
    { color: "#F9D07D" }, // Sunny Yellow
    { color: "#81D4FA" }, // Sky Blue
    { color: "#A5D6A7" }, // Mint Green
    { color: "#CE93D8" }, // Lavender
    { color: "#FFAB91" }, // Coral Orange
    { color: "#F48FB1" }  // Bubblegum Pink
  ];

  // Auto-advance slides every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % colorOptions.length;
      setCurrentSlide(nextIndex);
      setSelectedColor(colorOptions[nextIndex].color);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentSlide, colorOptions.length]);

  const handleColorClick = (color: string, index: number) => {
    setSelectedColor(color);
    setCurrentSlide(index);
  };
  
  return (
    <section className="bg-[rgba(223,223,223,0.27)] w-full mt-0 py-[35px] max-md:mt-6">
      <div className="container mx-auto w-[80%] px-0 lg:px-8 flex flex-col lg:flex-row items-center gap-8 2xl:w-[1400px]">
        <div className="w-full lg:w-1/3 my-auto order-2 lg:order-1">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[40px] font-medium leading-[150%]">
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
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <div className="relative w-full h-full">
                {isDesktop ? (
                  <CanvasRoomVisualiser
                    imageSrc={getMediaUrl(roomImage)}
                    wallPath={combinedWallPath}
                    colorHex={selectedColor}
                    roomLabel="bedroom"
                  />
                ) : (
                  <SvgRoomVisualiser
                    imageSrc={getMediaUrl(roomImage)}
                    wallPath={combinedWallPath}
                    colorHex={selectedColor}
                    roomLabel="bedroom"
                  />
                )}
              </div>
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