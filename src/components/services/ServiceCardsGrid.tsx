
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  path: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  image,
  path
}) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm h-full">
      <div className="h-64 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col p-6 bg-[rgba(223,223,223,0.27)] flex-grow">
        <h3 className="text-2xl font-medium text-gray-800">{title}</h3>
        <p className="mt-2 text-gray-600 flex-grow">{description}</p>
        <Link 
          href={path} 
          className="mt-4 flex w-full items-center justify-center rounded-full bg-[rgba(237,39,110,1)] py-3 text-white transition-all hover:bg-[rgba(59,130,246,1)]"
        >
          Explore <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>
    </div>
  );
};

const ServiceCardsGrid: React.FC = () => {
  const services = [
    {
      title: "Painting Services",
      description: "From interiors to exteriors, flawless finishes that last.",
      image: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/feb90153e0e003c64ec5c51f88adb9c53c5665d0",
      path: "/services/painting"
    }, 
    {
      title: "Customized Painting",
      description: "Personalised art, murals, and creative wall concepts.",
      image: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/3abc0d3433dc7ccb1a71887419241b5ee4eca153",
      path: "/services/customized-painting"
    }, 
    {
      title: "Wall Decor",
      description: "Stylish wall treatments, textures, stencils, and wallpapers.",
      image: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/9e91d008b3071a2670d49ebc416751206f4467a5",
      path: "/services/wall-decor"
    }, 
    {
      title: "Wood Services",
      description: "Coating, polishing, and carpentry for timeless woodwork.",
      image: "https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/3d065c1c5f706ca914effd1e3edf4b8121b322ce",
      path: "/services/wood-services"
    }
  ];

  return (
    <section className="py-1">
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              title={service.title} 
              description={service.description} 
              image={service.image} 
              path={service.path} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCardsGrid;
