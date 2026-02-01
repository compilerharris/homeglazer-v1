
import React from 'react';
import Link from "next/link";

const MoreServicesSection = () => {
  const services = [
    {
      title: "Commercial Service",
      description: "Professional finishes that elevate your business space.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3",
      path: "/services/commercial"
    },
    {
      title: "Kids Room",
      description: "Bright, playful colors made safe and fun for kids.",
      image: "https://images.unsplash.com/photo-1509059852496-f3822ae057bf?ixlib=rb-4.0.3",
      path: "/services/kids-room"
    },
    {
      title: "Interior Painting",
      description: "Transform your indoor spaces with premium finishes.",
      image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?ixlib=rb-4.0.3",
      path: "/services/interior-painting"
    },
    {
      title: "Texture Painting",
      description: "Unique textured finishes for added dimension.",
      image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3",
      path: "/services/texture-painting"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
        <h2 className="text-[40px] font-medium text-center mb-12">
          More Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-sm rounded-lg overflow-hidden flex">
              <div className="w-1/3 h-auto">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-6">
                <h3 className="font-medium text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href={service.path} 
                  className="inline-flex items-center text-[rgba(237,39,110,1)] hover:text-[rgba(59,130,246,1)] transition-colors"
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreServicesSection;
