
import React from 'react';
import { DollarSign, Hexagon, Bell, PaintRoller, Axe, LampWallDown } from 'lucide-react';

const AboutWhatWeDo: React.FC = () => {
  const services = [
    {
      title: "Wall Decor Services",
      description: "",
      icon: <LampWallDown className="text-red-500" size={24} />,
      bgColor: "bg-red-50"
    },
    {
      title: "Wood Services",
      description: "",
      icon: <Axe className="text-purple-500" size={24} />,
      bgColor: "bg-purple-100"
    },
    {
      title: "Customized Painting",
      description: "",
      icon: <Hexagon className="text-green-500" size={24} />,
      bgColor: "bg-green-50"
    },
    {
      title: "Painting Service",
      description: "",
      icon: <PaintRoller className="text-blue-500" size={24} />,
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-[40px] font-medium text-center mb-12">What do we do?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className={`${service.bgColor} p-8 rounded-lg`}>
              <div className="mb-6">
                {service.icon}
              </div>
              <h3 className="font-bold text-2xl mb-2">{service.title}</h3>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center max-w-4xl mx-auto">
          <p className="text-gray-700 mb-6">
            We are the team of the young painter, interior designer, architects. We all understand the importance 
            and need of painting services. Residential Painting and Commercial Painting is done by our team with 
            dedication, the site varies as per clients' choice.
          </p>
          
          <p className="text-gray-700">
            WOW Per Day Painting Services and WOW One Day Painting Services are special one-day services by 
            Home Glazer. This is convenient for those clients who have less time for all the painting and renovation 
            works. Our painting expert team finishes the work in just one day. Graffiti Paintings are attractive catchy 
            designs on the walls that catch our eyesight while we walk on the roads. Wood polishing is also one of 
            the services we offer to keep the wooden furniture strong for a long time by coating it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutWhatWeDo;
