
import React from 'react';
import { House, Building2, Brush, Bed, Palmtree, PaintBucket } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  icon: React.ReactNode;
  path: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageUrl, icon, path }) => {
  return (
    <Link 
      href={path}
      className="group flex flex-col relative aspect-[1.683] min-w-60 overflow-hidden grow shrink w-[355px] rounded-[20px] cursor-pointer transition-all duration-250 hover:shadow-lg w-full"
    >
      <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/60 duration-250" />
      <img
        src={imageUrl}
        alt={title}
        className="absolute h-full w-full object-cover inset-0"
      />
      <div className="relative z-20 flex flex-col h-full justify-end p-5 text-white transition-all duration-250">
        <div className="flex items-center mb-2 mt-auto">
          <div className="mr-3 text-white">
            {icon}
          </div>
          <h3 className="text-2xl md:text-3xl font-medium">{title}</h3>
        </div>
        <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-250 max-h-0 group-hover:max-h-20 overflow-hidden">{description}</p>
      </div>
    </Link>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      title: "Residential",
      description: "Transform your home with our premium residential painting services tailored to your style and preferences.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/feb90153e0e003c64ec5c51f88adb9c53c5665d0?placeholderIfAbsent=true",
      icon: <House size={24} />,
      path: "/services/painting/residential"
    },
    {
      title: "Commercial",
      description: "Professional painting solutions for offices, retail spaces, and commercial buildings to enhance your business image.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/3abc0d3433dc7ccb1a71887419241b5ee4eca153?placeholderIfAbsent=true",
      icon: <Building2 size={24} />,
      path: "/services/painting/commercial"
    },
    {
      title: "Wood Coating",
      description: "Preserve and beautify your wooden surfaces with our specialized wood coating and finishing techniques.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/d7c8dd1a8cd5163299aa1b5d6926da8cc6670bdc?placeholderIfAbsent=true",
      icon: <Brush size={24} />,
      path: "/services/wood/wood-coating"
    },
    {
      title: "Kids Room",
      description: "Create magical spaces for children with our themed designs, safe paints, and creative wall treatments.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/cf15213242b2344e311ec56bf353a7bf7802b92f?placeholderIfAbsent=true",
      icon: <Bed size={24} />,
      path: "/services/painting/kids-room"
    },
    {
      title: "Wall Decor",
      description: "Elevate your interiors with custom wall treatments, textures, and artistic finishes that make a statement.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/9e91d008b3071a2670d49ebc416751206f4467a5?placeholderIfAbsent=true",
      icon: <Palmtree size={24} />,
      path: "/services/wall-decor"
    },
    {
      title: "Customised Painting",
      description: "Bring your vision to life with personalized painting solutions tailored to your unique requirements.",
      imageUrl: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/3d065c1c5f706ca914effd1e3edf4b8121b322ce?placeholderIfAbsent=true",
      icon: <PaintBucket size={24} />,
      path: "/services/customized-painting"
    }
  ];

  return (
    <section className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto flex flex-col items-stretch mt-[50px] max-md:mt-10">
      <div className="self-center flex w-full max-w-[409px] flex-col items-stretch text-center">
        <h2 className="text-[rgba(237,39,110,1)] text-[40px] font-medium self-center leading-[150%]">
          Our Services
        </h2>
        <p className="text-[rgba(64,80,94,1)] text-xl font-light mt-[9px]">
          Painting Your Dreams with Every Brushstroke
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            icon={service.icon}
            path={service.path}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
