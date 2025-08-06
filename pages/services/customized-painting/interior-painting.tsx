
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const InteriorPainting: React.FC = () => {
  return <ServiceDetailLayout 
    title="Interior Painting" 
    path="/services/customized/interior-painting" 
    parentCategory={{ title: "Customized Painting", path: "/services/customized" }}
  />;
};

export default InteriorPainting;
