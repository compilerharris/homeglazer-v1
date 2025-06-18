import React, { useEffect, useState } from 'react';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import CTAButton from './CTAButton';

const PaintBrands: React.FC = () => {
  // Sample data for carousel - using the paint brands image provided
  const brands = [{
    id: "brand1",
    background: "/lovable-uploads/color-bucket1.png",
    logo: "/lovable-uploads/color-bucket1.png"
  }, {
    id: "brand2",
    background: "/lovable-uploads/color-bucket2.png",
    logo: "/lovable-uploads/color-bucket2.png"
  }, {
    id: "brand3",
    background: "/lovable-uploads/color-bucket3.png",
    logo: "/lovable-uploads/color-bucket3.png"
  }, {
    id: "brand2",
    background: "/lovable-uploads/color-bucket2.png",
    logo: "/lovable-uploads/color-bucket2.png"
  }, {
    id: "brand3",
    background: "/lovable-uploads/color-bucket3.png",
    logo: "/lovable-uploads/color-bucket3.png"
  }];

  // Responsive slidesToShow logic
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    // Call immediately on mount
    updateSlides();
    
    // Add resize listener
    window.addEventListener("resize", updateSlides);
    
    // Cleanup
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return <section className="w-full mt-[50px] pb-[31px] pt-0 max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-8 2xl:w-[1400px]">
        <div className="w-full lg:w-2/3">
          <SectionCarousel paintBrandsSection={true} slidesToShow={slidesToShow}>
            {brands.map(brand => <CarouselItem key={brand.id} className="pl-4">
                <div className="relative w-[180px] h-[250px] mx-auto">
                  <img src={brand.background} alt="Paint Brand" className="w-full h-full object-contain rounded-lg" />
                </div>
              </CarouselItem>)}
          </SectionCarousel>
        </div>
        
        <div className="w-full lg:w-1/3 my-auto">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium">
              Quality Paints
            </h2>
            <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-[18px]">
              Discover the perfect paint for your next project.
            </p>
            <CTAButton to="/brands" className="bg-[#ED276E] hover:bg-[#299dd7] text-white flex min-h-[60px] w-[297px] max-w-full items-center gap-[13px] text-[21px] font-normal text-center justify-center mt-7 pl-[19px] pr-[11px] py-[13px] rounded-[35px]">
              <span className="self-stretch my-auto">View All Paint Brands</span>
              <img alt="Arrow Icon" className="aspect-[0.97] object-contain w-[34px] self-stretch shrink-0 my-auto brightness-0 invert" src="/lovable-uploads/12a32754-91eb-4743-b4c9-43258abcf89f.png" />
            </CTAButton>
          </div>
        </div>
      </div>
    </section>;
};

export default PaintBrands;