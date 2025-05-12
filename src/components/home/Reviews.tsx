import React from 'react';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import CTAButton from './CTAButton';
const Reviews: React.FC = () => {
  // Sample data for reviews with updated review images
  const reviews = [{
    id: "review1",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/ef8e250bd483959c2ece9169925a09e6ff84e36a?placeholderIfAbsent=true",
    text: "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
    avatar: "/lovable-uploads/review-face-icon1.png",
    name: "Steve H.",
    position: "Marketing Manager"
  }, {
    id: "review2",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/26071b2435012144cf53a16107e61981d36120e4?placeholderIfAbsent=true",
    text: "I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!",
    avatar: "/lovable-uploads/review-face-icon2.png",
    name: "Emma Collins",
    position: "HR Specialist"
  }, {
    id: "review3",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/ef8e250bd483959c2ece9169925a09e6ff84e36a?placeholderIfAbsent=true",
    text: "The attention to detail and professionalism displayed was outstanding. The painters were punctual, courteous, and left my home spotless. I absolutely love the new look!",
    avatar: "/lovable-uploads/review-face-icon3.png",
    name: "John Doe",
    position: "Business Owner"
  }, {
    id: "review4",
    quoteIcon: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/26071b2435012144cf53a16107e61981d36120e4?placeholderIfAbsent=true",
    text: "Their color consultation service was incredibly helpful. The team helped me choose the perfect palette for my home office, and the execution was flawless. I'm already planning my next project with them!",
    avatar: "/lovable-uploads/review-face-icon2.png",
    name: "Sarah Wilson",
    position: "Architect"
  }];
  return <section className="w-full mt-[50px] py-[31px] max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/3 order-2 lg:order-1 my-auto">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium">
              Google Reviews
            </h2>
            <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-[18px]">
              See why our clients love our services!
            </p>
            <CTAButton to="/reviews" className="bg-[rgba(219,231,236,1)] flex min-h-[60px] w-60 max-w-full items-center gap-[13px] text-[21px] text-black font-normal text-center justify-center mt-7 pl-[18px] pr-[11px] py-[13px] rounded-[35px]">
              <span className="self-stretch my-auto">View All Reviews</span>
              <img alt="Arrow Icon" className="aspect-[1] object-contain w-[34px] self-stretch shrink-0 my-auto" src="/lovable-uploads/12a32754-91eb-4743-b4c9-43258abcf89f.png" />
            </CTAButton>
          </div>
        </div>
        
        <div className="w-full lg:w-2/3 order-1 lg:order-2">
          <SectionCarousel reviewsSection={true}>
            {reviews.map(review => <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/2">
                <div className="bg-white shadow-[0px_4px_9px_rgba(82,82,82,0.1)] w-full max-w-[500px] mx-auto p-7 rounded-[35px]">
                  <img src={review.quoteIcon} alt="Quote Icon" className="aspect-[1.56] object-contain w-[53px]" />
                  <p className="text-[rgba(44,44,44,1)] text-sm font-normal leading-[19px] mt-3.5">
                    &quot;{review.text}&quot;
                  </p>
                  <div className="flex items-center gap-3.5 mt-3.5">
                    <img src={review.avatar} alt={`${review.name} Avatar`} className="aspect-[1] object-contain w-[53px] h-[53px] rounded-[88px]" />
                    <div className="flex flex-col">
                      <div className="text-[rgba(237,39,110,1)] text-lg font-semibold">
                        {review.name}
                      </div>
                      <div className="text-[rgba(119,119,119,1)] text-sm font-normal mt-1">
                        {review.position}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>)}
          </SectionCarousel>
        </div>
      </div>
    </section>;
};
export default Reviews;