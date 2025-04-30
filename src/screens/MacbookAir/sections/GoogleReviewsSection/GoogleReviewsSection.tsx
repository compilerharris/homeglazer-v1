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

export const GoogleReviewsSection = (): JSX.Element => {
  // Data for the carousel images
  const carouselImages = Array(4).fill({
    images: [
      {
        src: "/assets/images/neutral-beauty-hairstyle-before-after-photo-collage-instagram-po-2.png",
        alt: "Neutral beauty before and after transformation",
      },
      {
        src: "/assets/images/neutral-beauty-hairstyle-before-after-photo-collage-instagram-po-3.png",
        alt: "Neutral beauty before and after transformation",
      },
    ],
  });

  return (
    <section className="flex flex-wrap w-full items-center gap-[42.43px] px-[84.86px] py-16 bg-[#dedede45]">
      <div className="w-[60%] justify-center relative flex items-center px-[50px]">
        <Carousel className="w-full" opts={{ align: "start" }}>
          <CarouselPrevious className="absolute left-[-58px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]">
            <ChevronLeftIcon className="w-7 h-7" />
          </CarouselPrevious>

          <CarouselContent>
            {carouselImages.map((slide, index) => (
              <CarouselItem key={index} className="flex justify-center gap-[0]">
                {slide.images.map((image: {src: string, alt:string}, imgIndex: number) => (
                  <Card key={imgIndex} className="border-none bg-transparent w-[50%]">
                    <CardContent className="p-0">
                      <img
                        className="w-[100%]"
                        alt={image.alt}
                        src={image.src}
                      />
                    </CardContent>
                  </Card>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="absolute right-[-58px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]">
            <ChevronRightIcon className="w-7 h-7" />
          </CarouselNext>
        </Carousel>
      </div>

      <div className="inline-flex flex-col items-start gap-7 relative flex-[0_0_auto]">
        <div className="flex flex-col max-w-[353.59px] w-[353.59px] items-start gap-[18px] relative flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-0.88px] font-['Quicksand',Helvetica] font-medium text-[#ed276e] text-[40px] tracking-[0] leading-normal">
            Room Makeover
          </h2>

          <div className="flex items-start gap-[42px] relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative w-[353px] mt-[-0.88px] font-['Quicksand',Helvetica] font-light text-[#595959] text-xl tracking-[0] leading-normal">
              See how we&nbsp;&nbsp;transform space.
            </p>
          </div>
        </div>

        <Button className="flex w-60 h-[60px] items-center justify-center gap-[13.33px] pl-[18.67px] pr-[10.67px] py-[10.67px] bg-[#dbe7ec] rounded-[34.67px] hover:bg-[#c5d8e0] text-black">
          <span className="font-['Quicksand',Helvetica] font-normal text-[21.3px] text-center tracking-[0] leading-normal">
            View All Gallery
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