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

export const ReviewsSection = (): JSX.Element => {
  // Review data for mapping
  const reviews = [
    {
      id: 1,
      text: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
      author: "Steve H.",
      position: "Marketing Manager",
      avatar: "/assets/images/icon-strategy.png",
    },
    {
      id: 2,
      text: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
      author: "Emma Collins",
      position: "HR Specialist",
      avatar: "/assets/images/icon-strategy-1.png",
    },
    {
      id: 3,
      text: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
      author: "Michael Chen",
      position: "Business Owner",
      avatar: "/assets/images/icon-strategy.png",
    },
    {
      id: 4,
      text: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
      author: "Sarah Johnson",
      position: "Office Manager",
      avatar: "/assets/images/icon-strategy-1.png",
    },
    {
      id: 5,
      text: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
      author: "David Wilson",
      position: "Property Developer",
      avatar: "/assets/images/icon-strategy.png",
    },
    {
      id: 6,
      text: '"I\'ve been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"',
      author: "Lisa Anderson",
      position: "Interior Designer",
      avatar: "/assets/images/icon-strategy-1.png",
    },
  ];

  return (
    <section className="w-full py-[35px] px-[84.86px] bg-[#dedede45] flex flex-wrap items-center gap-[42.43px]">
      <div className="flex flex-col items-start gap-7">
        <div className="flex flex-col max-w-[353.59px] w-[353.59px] items-start gap-[18px]">
          <h2 className="w-full [font-family:'Quicksand',Helvetica] font-medium text-[#ed276e] text-[40px] leading-normal">
            Google Reviews
          </h2>

          <div className="flex items-start gap-[42px] w-full">
            <p className="w-[353px] [font-family:'Quicksand',Helvetica] font-light text-[#595959] text-xl leading-normal">
              See why our clients love our services!
            </p>
          </div>
        </div>

        <Button className="h-[60px] w-60 bg-[#dbe7ec] rounded-[34.67px] text-black hover:bg-[#c9d9df] flex items-center justify-center gap-[13.33px] px-[18.67px] py-[10.67px]">
          <span className="[font-family:'Quicksand',Helvetica] font-normal text-[21.3px] text-center">
            View All Reviews
          </span>
          <img
            className="w-[34.67px] h-[34.67px]"
            alt="Right arrow"
            src="/assets/images/right-arrow-svgrepo-com-1.svg"
          />
        </Button>
      </div>

      <div className="flex-1 min-w-[265.19px]">
        <Carousel className="w-full px-8" opts={{ slidesToScroll: 2 }}>
          <CarouselPrevious className="absolute left-[-30px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]">
            <ChevronLeftIcon className="h-7 w-7" />
          </CarouselPrevious>

          <CarouselContent className="gap-[28.29px] py-[7.07px] mx-0">
            {reviews.map((review, index) => (
              <CarouselItem key={review.id} className="basis-[48%] pl-0">
                <Card className="min-w-[265.19px] bg-white rounded-[35.36px] shadow-[0px_3.54px_8.84px_#5252521a]">
                  <CardContent className="flex flex-col items-start justify-center gap-[14.14px] p-[28.29px]">
                    <img
                      className="w-[53.04px] h-[34.41px]"
                      alt="Quotation mark"
                      src="/assets/images/-.svg"
                    />
                    <p className="self-stretch [font-family:'Inter',Helvetica] font-normal text-[#2b2b2b] text-[14.1px] leading-[19.2px]">
                      {review.text}
                    </p>
                    <div className="flex w-[226.3px] items-center gap-[14.14px]">
                      <div
                        className="w-[53.04px] h-[53.04px] rounded-[88.4px]"
                        style={{
                          background: `url(${review.avatar}) 50% 50% / cover`,
                        }}
                      />
                      <div className="inline-flex flex-col items-start justify-center gap-[3.54px]">
                        <h3 className="self-stretch mt-[-0.88px] [font-family:'Inter',Helvetica] text-[#2b2b2b] text-[17.7px] leading-normal font-semibold">
                          {review.author}
                        </h3>
                        <p className="self-stretch [font-family:'Inter',Helvetica] font-normal text-[#777777] text-[14.1px] leading-normal">
                          {review.position}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="absolute right-[-30px] w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]">
            <ChevronRightIcon className="h-7 w-7" />
          </CarouselNext>
        </Carousel>

        {/* <div className="flex justify-center mt-[26px] gap-[10.61px]">
          {Array.from({ length: Math.ceil(reviews.length / 2) }).map((_, index) => (
            <div
              key={index}
              className={`w-[7.07px] h-[7.07px] rounded-[3.54px] ${
                index === 0 ? "bg-[#777777]" : "bg-[#eaeaea]"
              }`}
            />
          ))}
        </div> */}
      </div>
    </section>
  );
};