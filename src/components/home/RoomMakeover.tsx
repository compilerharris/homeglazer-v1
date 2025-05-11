
import React, { useState } from 'react';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import CTAButton from './CTAButton';

const RoomMakeover: React.FC = () => {
  // State for active slide
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  
  // Sample data for carousel - using the before/after image provided
  const makeovers = [{
    id: 1,
    image: "/lovable-uploads/before-after.png",
    alt: "Room Makeover Before and After 1"
  }, {
    id: 2,
    image: "/lovable-uploads/before-after.png",
    alt: "Room Makeover Before and After 2"
  }, {
    id: 3,
    image: "/lovable-uploads/before-after.png",
    alt: "Room Makeover Before and After 3"
  }];
  
  return (
    <section className="py-[31px] w-full mt-[50px] max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-2/3 relative">
          <SectionCarousel 
            activeSlideIndex={activeSlideIndex}
            setActiveSlideIndex={setActiveSlideIndex}
            roomMakeoverSection={true}
          >
            {makeovers.map((makeover, index) => (
              <CarouselItem key={makeover.id} className="md:basis-full">
                <img 
                  src={makeover.image} 
                  alt={makeover.alt} 
                  className="aspect-[2.03] object-contain w-full min-h-[368px] rounded-lg" 
                />
              </CarouselItem>
            ))}
          </SectionCarousel>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {makeovers.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlideIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeSlideIndex === index 
                    ? 'bg-[rgba(237,39,110,1)] scale-125' 
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-1/3 my-auto">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium">
              Room Makeover
            </h2>
            <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-[18px]">
              See how we transform space.
            </p>
            <CTAButton to="/gallery" className="bg-[rgba(219,231,236,1)] flex min-h-[60px] w-60 max-w-full items-center gap-[13px] text-[21px] text-black font-normal text-center justify-center mt-7 pl-[19px] pr-[11px] py-[13px] rounded-[35px]">
              <span className="self-stretch my-auto">View All Gallery</span>
              <img alt="Arrow Icon" className="aspect-[1] object-contain w-[34px] self-stretch shrink-0 my-auto" src="/lovable-uploads/12a32754-91eb-4743-b4c9-43258abcf89f.png" />
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomMakeover;
