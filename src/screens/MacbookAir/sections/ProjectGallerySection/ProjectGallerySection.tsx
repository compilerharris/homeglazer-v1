import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";

export const ProjectGallerySection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Project gallery data
  const galleryImages = Array(4).fill({ src: "/assets/images/image-21.png", alt: "Image" });

  // Thumbnail images data
  const thumbnailImages = [
    { src: "/assets/images/image-5.png", alt: "Thumbnail 1" },
    { src: "/assets/images/image-6.png", alt: "Thumbnail 2" },
    { src: "/assets/images/untitled-design--3--removebg-preview.png", alt: "Thumbnail 3" },
    { src: "/assets/images/untitled-design--1--removebg-preview.png", alt: "Thumbnail 4" },
  ];

  const handlePrevious = () => {
    setActiveIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  };

  const handleNext = () => {
    setActiveIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  };

  return (
    <section className="container w-full py-16 px-[84.86px] mt-16 bg-[#dedede45] flex flex-wrap items-center gap-[42.43px] relative">
      {/* Left content - Text and CTA */}
      <div className="flex flex-col items-start gap-7">
        <div className="flex flex-col max-w-[353.59px] items-start gap-[18px]">
          <h2 className="w-[353px] [font-family:'Quicksand',Helvetica] font-medium text-[40px] leading-normal">
                              Visualise Your Colour
          </h2>

          <div className="flex items-start gap-[42px] w-full">
            <p className="w-[353px] [font-family:'Quicksand',Helvetica] font-light text-[#7a8288] text-xl leading-normal">
              Meet the team that brings colour to life
            </p>
          </div>
        </div>

        <Button className="w-60 h-[60px] bg-[#fbd604] rounded-[34.67px] text-black hover:bg-[#fbd604]/90 flex items-center justify-center gap-[13.33px] px-[18.67px] py-[10.67px]">
          <span className="[font-family:'Quicksand',Helvetica] font-normal text-[21.3px] text-center leading-normal">
                            Explore All Colour
          </span>
          <img
            className="w-[34.67px] h-[34.67px]"
            alt="Right arrow svgrepo"
            src="/assets/images/right-arrow-svgrepo-com-1.svg"
          />
        </Button>
      </div>

      {/* Right content - Image carousel */}
      <div className="w-[709px] flex items-center justify-center relative">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          className="absolute left-[-30px] z-10 w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]"
        >
          <ChevronLeftIcon className="h-7 w-7" />
        </Button>

        <div className="w-[644px] h-[350px] relative">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
              alt={image.alt}
              src={image.src}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          className="absolute right-[-30px] z-10 w-[53.04px] h-[53.04px] bg-[#ffffffb2] rounded-[26.52px] shadow-[0px_3.54px_3.54px_#7878780d]"
        >
          <ChevronRightIcon className="h-7 w-7" />
        </Button>
      </div>

      {/* Thumbnail navigation */}
      <div className="absolute bottom-[35px] left-[63%] px-[20px] py-[10px] bg-[#F6F6F6] rounded-[16px] transform -translate-x-1/2 flex gap-4">
        {thumbnailImages.map((thumb, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative w-14 h-14 rounded-lg overflow-hidden ${
              index === activeIndex
                ? "border border-solid border-[#CBCBCB] shadow-[0px_2px_4px_0px_#00000040] after:content-[''] after:absolute after:top-[-6px] after:left-1/2 after:-translate-x-1/2 after:border-l-[6px] after:border-r-[6px] after:border-b-[6px] after:border-transparent after:border-b-[#777777]"
                : "opacity-50"
            }`}
          >
            <img
              src={thumb.src}
              alt={thumb.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </section>
  );
};