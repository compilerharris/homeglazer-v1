
import React from "react";
import CTAButton from "@/components/home/CTAButton";

const ServicesHero: React.FC = () => {
  return (
    <div className="bg-[#f8f8f8] pt-32 pb-16 md:pt-40">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[rgba(237,39,110,1)] text-4xl md:text-5xl font-medium leading-tight mb-4">
            Our Professional Services
          </h1>
          <p className="text-[rgba(64,80,94,1)] text-lg md:text-xl max-w-3xl mx-auto mb-8">
            From classic elegance to contemporary chic, we have painting solutions that will elevate any space. Explore our comprehensive range of professional painting services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton to="/contact">Get Free Quote</CTAButton>
            <CTAButton to="/calculator" className="bg-white text-[rgba(237,39,110,1)] border border-[rgba(237,39,110,1)] hover:bg-[rgba(59,130,246,1)] hover:text-white hover:border-[rgba(59,130,246,1)]">
              Try Budget Calculator
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
