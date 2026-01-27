import React from 'react';
import BeforeAfterSlider from '@/components/ui/before-after-slider';
import CTAButton from './CTAButton';

const RoomMakeover: React.FC = () => {
  // Toggle visibility; keep markup (including CTA) intact for future enablement
  const showRoomMakeover = false;
  if (!showRoomMakeover) {
    return null;
  }

  // Sample data for before/after images using homeoffice images as placeholders
  const makeoverData = {
    beforeImage: "/assets/images/homeoffice/homeoffice1/homeoffice1.jpg",
    afterImage: "/assets/images/homeoffice/homeoffice2/homeoffice2.jpg",
    beforeAlt: "Room before painting service",
    afterAlt: "Room after painting service"
  };
  
  return (
    <section className="pb-[31px] w-full mt-[50px] max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-0 2xl:w-[1400px]">
        <div className="w-full lg:w-2/3 relative">
          <BeforeAfterSlider
            beforeImage={makeoverData.beforeImage}
            afterImage={makeoverData.afterImage}
            className="w-full"
          />
        </div>
        
        <div className="w-full lg:w-1/3 my-auto">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium">
              Room Makeover
            </h2>
            <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-[18px]">
              See how we transform space.
            </p>
            <CTAButton to="/gallery" className="bg-[#ED276E] hover:bg-[#299dd7] text-white flex min-h-[60px] w-60 max-w-full items-center gap-[13px] text-[21px] font-normal text-center justify-center mt-7 pl-[19px] pr-[11px] py-[13px] rounded-[35px]">
              <span className="self-stretch my-auto">View All Gallery</span>
              <img alt="Arrow Icon" className="aspect-[1] object-contain w-[34px] self-stretch shrink-0 my-auto brightness-0 invert" src="/uploads/12a32754-91eb-4743-b4c9-43258abcf89f.png" />
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomMakeover;