import React, { useState } from 'react';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import CTAButton from './CTAButton';
const ColorVisualizer: React.FC = () => {
  // Sample color data for carousel
  const colors = [{
    id: 1,
    name: "Seafoam",
    hex: "#5EBAB4"
  }, {
    id: 2,
    name: "Sky Blue",
    hex: "#9AC5F4"
  }, {
    id: 3,
    name: "Soft Pink",
    hex: "#F4AACD"
  }, {
    id: 4,
    name: "Sunshine",
    hex: "#FFDA55"
  }];
  const [activeColor, setActiveColor] = useState(0);

  // Updated visualizer data to use the new image for all slides
  const visualizers = [{
    id: 1,
    mainImage: "/lovable-uploads/98a9a6f1-c18e-4b25-bf85-9c63514218b1.png",
    colorName: "Seafoam"
  }, {
    id: 2,
    mainImage: "/lovable-uploads/98a9a6f1-c18e-4b25-bf85-9c63514218b1.png",
    colorName: "Sky Blue"
  }, {
    id: 3,
    mainImage: "/lovable-uploads/98a9a6f1-c18e-4b25-bf85-9c63514218b1.png",
    colorName: "Soft Pink"
  }, {
    id: 4,
    mainImage: "/lovable-uploads/98a9a6f1-c18e-4b25-bf85-9c63514218b1.png",
    colorName: "Sunshine"
  }];
  return <section className="bg-[rgba(223,223,223,0.27)] w-full mt-[50px] py-[35px] max-md:mt-10">
      <div className="container mx-auto w-[80%] px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/3 my-auto order-2 lg:order-1">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium leading-[150%]">
              Visualise Your Color
            </h2>
            <p className="text-xl text-[rgba(123,130,137,1)] font-light mt-[18px]">
              Meet the team that brings colour to life
            </p>
            <CTAButton to="/colors" className="flex min-h-[60px] w-60 max-w-full items-center gap-[13px] text-[21px] text-black font-normal text-center justify-center mt-7 pl-[19px] pr-[11px] py-[13px] rounded-[35px] transition-all duration-300" style={{
            backgroundColor: colors[activeColor].hex,
            color: "#000000" // Ensure text is black for all color variants
          }}>
              <span className="self-stretch my-auto">Explore All Color</span>
              <img src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/bbec7bbdc40c35a19214d20ad0710ac73ff6069d?placeholderIfAbsent=true" alt="Arrow Icon" className="aspect-[1] object-contain w-[34px] self-stretch shrink-0 my-auto" />
            </CTAButton>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <SectionCarousel setActiveSlideIndex={setActiveColor} activeSlideIndex={activeColor} colorVisualizerSection={true}>
            {visualizers.map((visualizer, index) => <CarouselItem key={visualizer.id} className="md:basis-full">
                <div className="flex flex-col items-center">
                  <img src={visualizer.mainImage} alt={`${visualizer.colorName} Visualizer Preview`} className="aspect-auto w-full max-w-[750px] rounded-lg" />
                </div>
              </CarouselItem>)}
          </SectionCarousel>
          
          {/* Color Circle Controllers - below the image */}
          <div className="flex justify-center mt-6 gap-2">
            {colors.map((color, index) => <button key={color.id} className={`mx-w-1/5 mx-h-1/5 w-12 h-12 rounded-full transition-all duration-300 border-2 ${activeColor === index ? 'border-gray-800 scale-110' : 'border-white'}`} style={{
            backgroundColor: color.hex
          }} onClick={() => setActiveColor(index)} aria-label={`Select ${color.name} color`} />)}
          </div>
        </div>
      </div>
    </section>;
};
export default ColorVisualizer;