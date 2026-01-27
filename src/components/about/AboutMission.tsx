
import React from 'react';

const AboutMission: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg mb-6">
              At Homeglazer, we believe that every space deserves to be beautiful. Our mission is to transform ordinary spaces into extraordinary environments through expert painting services that reflect your unique style and personality.
            </p>
            <p className="text-gray-700 text-lg">
              With over 15 years of experience, we've established ourselves as Delhi's premier painting service, committed to excellence, craftsmanship, and customer satisfaction.
            </p>
          </div>
          
          <div className="w-full md:w-1/2">
            <img 
              src="/uploads/before-after.png" 
              alt="Our Mission" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
