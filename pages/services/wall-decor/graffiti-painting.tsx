
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const GraffitiPainting: React.FC = () => {
  return <ServiceDetailLayout 
    title="Graffiti Painting" 
    path="/services/wall-decor/graffiti-painting" 
    parentCategory={{ title: "Wall Decor", path: "/services/wall-decor" }}
  />;
};

export default GraffitiPainting;
