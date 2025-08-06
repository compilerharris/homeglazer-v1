
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const PerDayPainting: React.FC = () => {
  return <ServiceDetailLayout 
    title="Per Day Painting" 
    path="/services/customized/per-day-painting" 
    parentCategory={{ title: "Customized Painting", path: "/services/customized" }}
  />;
};

export default PerDayPainting;
