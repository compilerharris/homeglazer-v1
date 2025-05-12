
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const Commercial: React.FC = () => {
  return <ServiceDetailLayout 
    title="Commercial Painting" 
    path="/services/painting/commercial" 
    parentCategory={{ title: "Painting Services", path: "/services/painting" }}
  />;
};

export default Commercial;
