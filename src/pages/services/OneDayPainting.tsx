
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const OneDayPainting: React.FC = () => {
  return <ServiceDetailLayout 
    title="One-Day Painting" 
    path="/services/customized/one-day-painting" 
    parentCategory={{ title: "Customized Painting", path: "/services/customized" }}
  />;
};

export default OneDayPainting;
