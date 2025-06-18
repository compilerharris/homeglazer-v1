import React from 'react';
import CTAButton from './CTAButton';
const Hero: React.FC = () => {
  return <div className="w-full relative h-[60vh] lg:h-[80vh] text-center mt-0 py-[120px] max-md:py-[80px]">
      <img alt="Hero Background" src="/lovable-uploads/hero-banner.png" className="absolute h-full w-full inset-0 object-cover sm:object-scale-down md:object-fill" />
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 mt-0 2xl:mt-10">
        <h1 className="text-white text-[30px] lg:text-[56px] font-semibold max-md:text-[30px] leading-[150%]">
          Expert Painting for <br />
          Every Spaaace
        </h1>
        <CTAButton to="/contact" isHeroButton={true} className="min-h-[60px] flex items-center gap-[15px] text-[20px] lg:text-2xl font-normal justify-center mt-0 md:mt-5 pl-[21px] pr-3 py-[5px] lg:py-[11px] rounded-[39px] max-md:mt-5 max-md:pl-5 bg-[#ED276E] hover:bg-[#299dd7] text-white transition-all duration-250">
          <span className="self-stretch w-[152px] my-auto">Get in touch</span>
          <img src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/f1c36d400c5cf4300348e5b5cfdcb4501952ad14?placeholderIfAbsent=true" alt="Arrow Icon" className="aspect-[1] object-contain w-[39px] self-stretch shrink-0 my-auto brightness-0 invert" />
        </CTAButton>
      </div>
    </div>;
};
export default Hero;