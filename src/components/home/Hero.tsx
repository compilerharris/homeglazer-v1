import React, { useState, useEffect } from 'react';
import CTAButton from './CTAButton';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Pause auto-advance on hover
  const handleMouseEnter = () => {
    // Pause auto-advance by clearing the interval
    // The interval will be recreated when mouse leaves
  };

  const handleMouseLeave = () => {
    // Resume auto-advance
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  const slides = [
    {
      title: "Expert Painting for Every Space",
      buttonText: "Get in touch",
      backgroundImage: "/lovable-uploads/hero-banner.png"
    },
    {
      title: "Transform Your Home with Professional Painting",
      buttonText: "Get in touch",
      backgroundImage: "/lovable-uploads/hero-banner.png"
    },
    {
      title: "Quality Paint Solutions for Every Surface",
      buttonText: "Get in touch",
      backgroundImage: "/lovable-uploads/hero-banner.png"
    },
    {
      title: "Bring Your Vision to Life with Expert Painters",
      buttonText: "Get in touch",
      backgroundImage: "/lovable-uploads/hero-banner.png"
    }
  ];

  return (
    <div 
      className="w-full relative h-[60vh] lg:h-[80vh] text-center mt-0 py-[120px] max-md:py-[80px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            alt={`Hero Background ${index + 1}`} 
            src={slide.backgroundImage} 
            className="absolute h-full w-full inset-0 object-cover sm:object-scale-down md:object-fill" 
          />
          <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto px-4 mt-0 2xl:mt-10 h-full justify-center">
            <h1 className="text-white text-[30px] lg:text-[56px] font-semibold max-md:text-[30px] leading-[150%]">
              {slide.title}
            </h1>
            <CTAButton 
              to="/contact" 
              isHeroButton={true} 
              className="min-h-[60px] flex items-center gap-[15px] text-[20px] lg:text-2xl font-normal justify-center mt-0 md:mt-5 pl-[21px] pr-3 py-[5px] lg:py-[11px] rounded-[39px] max-md:mt-5 max-md:pl-5 bg-[#ED276E] hover:bg-[#299dd7] text-white transition-all duration-250"
            >
              <span className="self-stretch w-[152px] my-auto">{slide.buttonText}</span>
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/f1c36d400c5cf4300348e5b5cfdcb4501952ad14?placeholderIfAbsent=true" 
                alt="Arrow Icon" 
                className="aspect-[1] object-contain w-[39px] self-stretch shrink-0 my-auto brightness-0 invert" 
              />
            </CTAButton>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Hero;