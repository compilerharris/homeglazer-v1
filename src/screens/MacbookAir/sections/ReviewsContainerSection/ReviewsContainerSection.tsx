import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";

export const ReviewsContainerSection = (): JSX.Element => {
  // Data for carousel images
  const carouselImages = [
    {
      src: "/assets/images/neutral-beauty-hairstyle-before-after-photo-collage-instagram-po.png",
      alt: "Neutral beauty",
    },
    {
      src: "/assets/images/neutral-beauty-hairstyle-before-after-photo-collage-instagram-po-1.png",
      alt: "Neutral beauty",
    },
  ];

  return (
    <section className="flex flex-wrap w-full items-center gap-[42px] px-[85px] py-[35px] bg-[#dedede45]">
      <div className="flex-1 flex items-center justify-center relative">
        <Carousel className="w-full max-w-[709px]">
          <CarouselPrevious className="w-[53px] h-[53px] bg-[#ffffffb2] shadow-[0px_3.54px_3.54px_#7878780d] left-[-19px]">
            <ChevronLeftIcon className="h-7 w-7" />
          </CarouselPrevious>

          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <img
                  className="w-[320px] h-[350px]"
                  alt={image.alt}
                  src={image.src}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="w-[53px] h-[53px] bg-[#ffffffb2] shadow-[0px_3.54px_3.54px_#7878780d] right-[-19px]">
            <ChevronRightIcon className="h-7 w-7" />
          </CarouselNext>
        </Carousel>
      </div>

      <div className="flex flex-col items-start gap-7">
        <div className="flex flex-col max-w-[354px] w-full items-start gap-[18px]">
          <h2 className="w-full mt-[-1px] font-['Quicksand',Helvetica] font-medium text-[40px]">
            Room Makeover
          </h2>

          <p className="w-full mt-[-1px] font-['Quicksand',Helvetica] font-light text-[#595959] text-xl">
            See how we&nbsp;&nbsp;transform space.
          </p>
        </div>

        <Button className="h-[60px] pl-[19px] pr-[11px] py-[11px] bg-[#dbe7ec] rounded-[35px] hover:bg-[#c5d8e0] text-black">
          <span className="font-['Quicksand',Helvetica] font-normal text-[21px]">
            View All Gallery
          </span>
          <img
            className="w-[35px] h-[35px] ml-[13px]"
            alt="Right arrow"
            src="/assets/images/right-arrow-svgrepo-com-1.svg"
          />
        </Button>
      </div>
    </section>
  );
};
