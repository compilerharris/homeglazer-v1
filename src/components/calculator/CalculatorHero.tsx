import React from 'react';

const CalculatorHero: React.FC = () => {
  return (
    <section className="relative bg-cover bg-center h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1562259949-e8e7689d7828" 
        alt="Budget Calculator Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-85 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Budget Calculator</h1>
        <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
          Estimate your painting and wood polishing costs in just a few clicks
        </p>
      </div>
    </section>
  );
};

export default CalculatorHero; 