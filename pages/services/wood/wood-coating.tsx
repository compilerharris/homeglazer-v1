
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const WoodCoating: React.FC = () => {
  return <ServiceDetailLayout 
    title="Wood Coating" 
    path="/services/wood/wood-coating" 
    parentCategory={{ title: "Wood Services", path: "/services/wood" }}
  />;
};

export default WoodCoating;
