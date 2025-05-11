import React from 'react';
const AboutWhyWeDoIt: React.FC = () => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium text-center mb-12">Why do we do it?</h2>
        
        <div className="flex flex-col sm:flex-row relative items-center justify-end">
          {/* Image Section */}
          <div className="w-full md:mb-8 md:mb-0">
            <div className="relative h-[500px]">
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2358&auto=format&fit=crop" alt="Interior with sofa and wall art" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          
          {/* Quote Section */}
          <div className="h-full w-full md:w-2/6 flex items-center z-9999 relative md:absolute">
            <div className="bg-white p-8 -ml-0 md:-ml-16 rounded-lg shadow-lg z-1">
              <blockquote className="text-3xl font-medium text-[rgba(237,39,110,1)]">
                "We paint more than walls — we paint possibilities."
              </blockquote>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <p className="text-gray-700 text-center">
            We provide the best of services by charging affordable prices. The aim of our company is to give real 
            colors to many dreams. Our focus is to look after the minute details of the requirements. Focusing on 
            little things makes us the best by separating us from the rest. We make quality and standard services 
            simple and worthy. Home Glazer has got really good feedback over the years which is an expensive 
            asset for us. We stay with our clients throughout the process of painting and related services. About us, 
            Our work finishes with the big smile of our clients.
          </p>
        </div>
      </div>
    </section>;
};
export default AboutWhyWeDoIt;