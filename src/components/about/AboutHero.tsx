
import React from 'react';

const AboutHero: React.FC = () => {
  return (
    <section className="relative bg-cover bg-center h-[500px] w-full flex items-center justify-center overflow-hidden">
      {/* Overlay with semi-transparent background */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
        alt="About Us Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">About Us</h1>
        <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
          We are passionate about transforming spaces with colors and craftsmanship
        </p>
      </div>
    </section>
  );
};

export default AboutHero;
