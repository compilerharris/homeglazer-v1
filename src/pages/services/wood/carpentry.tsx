
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const Carpentry: React.FC = () => {
  return <ServiceDetailLayout 
    title="Carpentry" 
    path="/services/wood/carpentry" 
    parentCategory={{ title: "Wood Services", path: "/services/wood" }}
  />;
};

export default Carpentry;
