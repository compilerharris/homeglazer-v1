import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

export const DesignInsightsSection = (): JSX.Element => {
  // Data for carousel slides
  const slides = Array(4).fill({
    image: "/assets/images/image.png",
    title: "Why Choose Yellow for Your Bedroom?",
    description: "Yellow is often associated with sunshine, positivity, and creativity...",
  });

  return (
    <div className="w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="w-full h-[450px] bg-cover bg-center border-0 rounded-none overflow-hidden">
                <CardContent
                  className="p-0 h-full relative"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <div className="absolute bottom-14 left-[54px]">
                    <h2 className="font-['Quicksand',Helvetica] font-medium text-white text-[45px] max-w-[1113px]">
                      {slide.title}
                    </h2>

                    <p className="font-['Quicksand',Helvetica] font-medium text-[#ffffffbf] text-[25px] mt-3 max-w-[1046px]">
                      {slide.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]" />
        <CarouselNext className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]" />

        <div className="flex items-center gap-2.5 absolute bottom-[55px] left-1/2 transform -translate-x-1/2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-[12.5px] h-[12.5px] rounded-full cursor-pointer ${
                index === 0 ? "bg-[#777777]" : "bg-[#d8d8d81a]"
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};