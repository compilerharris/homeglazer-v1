import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../../components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { ContactUsSection } from "./sections/ContactUsSection";
import { CustomerTestimonialsSection } from "./sections/CustomerTestimonialsSection";
import { DesignInsightsSection } from "./sections/DesignInsightsSection";
import { FAQSection } from "./sections/FAQSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { GoogleReviewsSection } from "./sections/GoogleReviewsSection";
import { MainContentSection } from "./sections/MainContentSection";
import { OurServicesSection } from "./sections/OurServicesSection/OurServicesSection";
import { ProjectGallerySection } from "./sections/ProjectGallerySection";
import { QualityPointsSection } from "./sections/QualityPointsSection";
import { ReviewsSection } from "./sections/ReviewsSection";
import { RoomMakeoverSection } from "./sections/RoomMakeoverSection/RoomMakeoverSection";
import { WhyChooseUsSection } from "./sections/WhyChooseUsSection";

export const MacbookAir = (): JSX.Element => {
  // Navigation menu items
  const navItems = [
    "Home Page",
    "Our Services",
    "Painting Blogs",
    "About Us",
    "Enquire Now",
    "Budget Calculator",
  ];

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      image: "/assets/images/rectangle-94.png",
      title: "Expert Painting for Every Spaaace",
      buttonText: "Get in touch",
    },
    {
      id: 2,
      image: "/assets/images/rectangle-94.png",
      title: "Transform Your Space with Color",
      buttonText: "Get in touch",
    },
    {
      id: 3,
      image: "/assets/images/rectangle-94.png",
      title: "Professional Painting Services",
      buttonText: "Get in touch",
    },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-full relative">
        {/* Hero Section */}
        <div className="relative w-full">
          <Carousel className="w-full">
            <CarouselContent>
              {heroSlides.map((slide) => (
                <CarouselItem key={slide.id}>
                  <div className="relative">
                    <div className="relative w-full h-[605px]">
                      <Image
                        className="object-cover"
                        alt="Hero Background"
                        src={slide.image}
                        fill
                        priority
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                      <h1 className="font-['Quicksand',Helvetica] font-semibold text-white text-[56px] text-center tracking-[0] leading-normal mb-12 w-full max-w-[600px]">
                        {slide.title}
                      </h1>

                      <Button className="h-[60px] gap-[15px] px-[21px] py-[12px] bg-[#dbe7ec] rounded-[39.25px] text-black hover:bg-[#c5d6de]">
                        <span className="font-['Quicksand',Helvetica] font-[400] text-[24.2px]">
                          {slide.buttonText}
                        </span>
                        <div className="relative w-[39.25px] h-[39.25px]">
                          <Image
                            className="object-contain"
                            alt="Right arrow"
                            src="/assets/images/right-arrow-svgrepo-com-1.svg"
                            fill
                          />
                        </div>
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-4 z-50" />
            <CarouselNext className="absolute right-4 z-50" />
          </Carousel>

          {/* Navigation Bar */}
          <div className="fixed top-0 left-0 right-0 w-full h-[60px] bg-[#ffffffa6] shadow-[0px_4px_4px_#ffbdd51a] backdrop-blur-[2px] backdrop-brightness-[100%] z-50">
            <div className="container mx-auto flex items-center justify-between">
              <div className="relative w-24 h-[37px] my-3">
                <Image
                  className="object-cover"
                  alt="Home glazer logo"
                  src="/assets/images/home-glazer-logo-1.png"
                  fill
                />
              </div>

              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-[70px]">
                  {navItems.map((item, index) => (
                    <NavigationMenuItem key={index}>
                      <div className="font-['Quicksand',Helvetica] font-medium text-[#ed276e] text-lg text-center">
                        {item}
                      </div>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          {/* Bottom Image */}
          <div className="absolute w-[700px] h-[80px] bottom-[-75px] left-[36.6%] -translate-x-1/2">
            <Image
              className="object-cover"
              alt="Rectangle"
              src="/assets/images/banner-color.png"
              fill
            />
          </div>
        </div>

        {/* Our Services Section */}
        <div className="w-full mt-16">
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-['Quicksand',Helvetica] font-medium text-[#ed276e] text-[40px] text-center">
              Our Services
            </h2>
            <p className="font-['Quicksand',Helvetica] font-light text-[#3f505d] text-xl text-center">
              Painting Your Dreams with Every Brushstroke
            </p>
          </div>

          <div className="container mx-auto">
            <OurServicesSection />
            <MainContentSection />
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="w-full mt-16 relative">
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-['Quicksand',Helvetica] font-medium text-[#ed276e] text-[40px] text-center">
              Why Choose Us?
            </h2>
            <p className="font-['Quicksand',Helvetica] font-light text-[#3f505d] text-xl text-center">
              Tap a colour to see it on your bedroom wall.
            </p>
          </div>

          <div className="w-full pb-20 mt-8">
            <div className="container mx-auto relative">
              <div className="absolute left-0 bottom-[-110px] w-full">
                <div className="relative w-[771px] h-[500px]">
                  <Image
                    className="object-contain"
                    alt="Vector"
                    src="/assets/images/vector-17.svg"
                    fill
                  />
                </div>
                <div className="absolute w-[731px] h-[485px] top-0 right-0">
                  <Image
                    className="object-contain"
                    alt="Vector"
                    src="/assets/images/vector-23.svg"
                    fill
                  />
                </div>
              </div>
              <WhyChooseUsSection />
            </div>
          </div>
        </div>

        {/* Get in Touch Section */}
        <div className="w-full relative">
          <div className="bg-[#f6f6f6] w-full py-16">
            <div className="container mx-auto">
              <div className="flex items-center justify-center">
                <RoomMakeoverSection />
                <ContactUsSection />
              </div>
            </div>
          </div>
        </div>

        {/* Google Reviews Section */}
        <div className="w-full mt-16">
          <GoogleReviewsSection />
        </div>

        {/* Project Gallery Section */}
        <ProjectGallerySection />

        {/* Customer Testimonials Section */}
        <CustomerTestimonialsSection />

        {/* Quality Points Section */}
        <QualityPointsSection />

        {/* Reviews Section */}
        <ReviewsSection />

        {/* Design Insights Section */}
        <div className="w-full mt-16">
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-['Quicksand',Helvetica] font-medium text-[#ed276e] text-[40px] text-center">
              Design Insights
            </h2>
            <p className="font-['Quicksand',Helvetica] font-light text-[#3f505d] text-xl text-center">
              Everything you need to know about painting
            </p>
          </div>

          <div className="relative container mx-auto px-0">
            <DesignInsightsSection />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="w-full mt-16">
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-['Quicksand',Helvetica] font-medium text-[#ed276e] text-[40px] text-center">
              FAQ
            </h2>
            <p className="font-['Quicksand',Helvetica] font-light text-[#3f505d] text-[28px] text-center">
              Everything you need to know, answered!
            </p>
          </div>

          <FAQSection />
        </div>

        {/* Footer Section */}
        <FooterSection />

        {/* Fixed Color Picker */}
        <div className="fixed w-[55px] h-[55px] right-[50px] bottom-[50px] z-50">
          <div className="relative h-[55px]">
            <div className="absolute w-[35px] h-[35px] top-2.5 left-2.5 bg-white" />
            <div className="absolute w-[55px] h-[55px] top-0 left-0 bg-[url(/assets/images/color-.png)] bg-[100%_100%]" />
          </div>
        </div>
      </div>
    </div>
  );
};