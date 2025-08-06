
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const ExteriorPainting: React.FC = () => {
  return <ServiceDetailLayout 
    title="Exterior Painting" 
    path="/services/customized/exterior-painting" 
    parentCategory={{ title: "Customized Painting", path: "/services/customized" }}
  />;
};

export default ExteriorPainting;
