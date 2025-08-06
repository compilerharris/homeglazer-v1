
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const WoodPolishing: React.FC = () => {
  return <ServiceDetailLayout 
    title="Wood Polishing" 
    path="/services/wood/wood-polishing" 
    parentCategory={{ title: "Wood Services", path: "/services/wood" }}
  />;
};

export default WoodPolishing;
