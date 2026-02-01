import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

export const CustomerTestimonialsSection = (): JSX.Element => {
  // Data for paint brand cards
  const paintBrands = Array(9).fill({
    backgroundImage: "/assets/images/image-24-2.png",
    logoSrc: "/assets/images/80612d717e3e8d70fe1c456f2235a5dc-removebg-preview-1.png",
    logoAlt: "Paint brand logo",
  });

  return (
    <section className="flex flex-wrap w-full py-24 px-[84.86px] mt-16 bg-[#dedede45] gap-[100px]">
      <div className="flex items-center justify-center relative">
        <Carousel className="w-[709px]" opts={{ slidesToScroll: 3 }}>
          <CarouselPrevious className="absolute left-[-30px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d] border-none">
            <ChevronLeftIcon className="w-7 h-7" />
          </CarouselPrevious>

          <CarouselContent className="flex items-center">
            {paintBrands.map((brand, index) => (
              <CarouselItem key={index} className="basis-1/3 pl-[27px]">
                <Card className="border-none shadow-none">
                  <CardContent className="p-0 flex items-center justify-center">
                    <div
                      className="relative w-[143.23px] h-[197.16px] bg-cover bg-[50%_50%]"
                      style={{
                        backgroundImage: `url(${brand.backgroundImage})`,
                      }}
                    >
                      <img
                        className="absolute w-[78px] h-[67px] top-[109px] left-[34px] object-cover"
                        alt={brand.logoAlt}
                        src={brand.logoSrc}
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="absolute right-[-30px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d] border-none">
            <ChevronRightIcon className="w-7 h-7" />
          </CarouselNext>
        </Carousel>
      </div>

      <div className="flex flex-col items-start gap-7">
        <div className="flex flex-col max-w-[353.59px] w-[353.59px] items-start gap-[18px]">
          <h2 className="self-stretch mt-[-0.88px] font-['Quicksand',Helvetica] font-medium text-[40px] leading-normal">
            Quality Paints
          </h2>

          <div className="flex items-start gap-[42px] self-stretch w-full">
            <p className="w-[353px] mt-[-0.88px] font-['Quicksand',Helvetica] font-light text-[#595959] text-xl leading-normal">
              Discover the perfect paint for your next project.
            </p>
          </div>
        </div>

        <Button className="flex w-[297px] h-[60px] gap-[13.33px] px-[18.67px] py-[10.67px] bg-[#dbe7ec] rounded-[34.67px] items-center justify-center hover:bg-[#c5d8e0]">
          <span className="font-['Quicksand',Helvetica] font-normal text-black text-[21.3px] text-center leading-normal">
            View All Paint Brands
          </span>
          <img
            className="w-[34.67px] h-[34.67px]"
            alt="Right arrow"
            src="/assets/images/right-arrow-svgrepo-com-1.svg"
          />
        </Button>
      </div>
    </section>
  );
};