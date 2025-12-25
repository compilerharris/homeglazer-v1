import React from "react";
import CTAButton from "@/components/home/CTAButton";

const ServicesHero: React.FC = () => {
  return (
    <div className="relative">
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
        alt="Services Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-85"></div>
      
      <div className="relative z-10 pt-32 pb-16 md:pt-40">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-white text-4xl md:text-5xl font-medium leading-tight mb-4">
              Our Professional Services
            </h1>
            <p className="text-white text-lg md:text-xl max-w-3xl mx-auto mb-8">
              From classic elegance to contemporary chic, we have painting solutions that will elevate any space. Explore our comprehensive range of professional painting services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#ED276E]">
                Get Free Quote
              </CTAButton>
              <CTAButton to="/paint-budget-calculator" className="bg-white text-[#ED276E] border border-white hover:bg-transparent hover:text-white">
                Try Budget Calculator
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesHero;
