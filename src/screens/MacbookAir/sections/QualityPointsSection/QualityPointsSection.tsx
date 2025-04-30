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

export const QualityPointsSection = (): JSX.Element => {
  // Data for the carousel
  const carouselData = Array(4).fill({
    image: "/assets/images/image-16.png",
    title: "The Hands That Build",
    subtitle: "Meet the team that brings colour to life",
    buttonText: "View All Gallery",
  });

  return (
    <section className="w-full py-16 px-[84.86px] mt-16 bg-[#dedede45] flex flex-wrap items-center gap-[42.43px]">
      {/* Image Carousel */}
      <div className="flex items-center justify-center relative">
        <Carousel className="w-[709px] px-8">
          <CarouselPrevious className="absolute left-[-30px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]">
            <ChevronLeftIcon className="w-7 h-7" />
          </CarouselPrevious>

          <CarouselContent>
            {carouselData.map((slide, index) => (
              <CarouselItem key={index}>
                <Card className="w-full h-[350px] border-none bg-transparent">
                  <CardContent className="p-0 h-full">
                    <img
                      className="w-full h-[340px] object-cover mt-2.5"
                      alt="Team members working together"
                      src={slide.image}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="absolute right-[-30px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]">
            <ChevronRightIcon className="w-7 h-7" />
          </CarouselNext>
        </Carousel>
      </div>

      {/* Content Section */}
      <div className="flex flex-col items-start gap-7">
        <div className="flex flex-col w-[353.59px] items-start gap-[18px]">
          <h2 className="font-medium text-[40px] text-[#ed276e] font-['Quicksand',Helvetica] tracking-[0] leading-normal">
            {carouselData[0].title}
          </h2>

          <p className="font-light text-xl text-[#595959] font-['Quicksand',Helvetica] tracking-[0] leading-normal w-[353px]">
            {carouselData[0].subtitle}
          </p>
        </div>

        <Button className="h-[60px] pl-[18.67px] pr-[10.67px] py-[10.67px] bg-[#dbe7ec] rounded-[34.67px] text-black hover:bg-[#c5d8e0] flex items-center gap-[13.33px]">
          <span className="font-normal text-[21.3px] font-['Quicksand',Helvetica]">
            {carouselData[0].buttonText}
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