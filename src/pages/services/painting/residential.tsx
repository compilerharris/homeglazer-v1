
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const Residential: React.FC = () => {
  return <ServiceDetailLayout 
    title="Residential Painting" 
    path="/services/painting/residential" 
    parentCategory={{ title: "Painting Services", path: "/services/painting" }}
  />;
};

export default Residential;
