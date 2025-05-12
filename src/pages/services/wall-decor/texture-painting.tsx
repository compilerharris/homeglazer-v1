
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const TexturePainting: React.FC = () => {
  return <ServiceDetailLayout 
    title="Texture Painting" 
    path="/services/wall-decor/texture-painting" 
    parentCategory={{ title: "Wall Decor", path: "/services/wall-decor" }}
  />;
};

export default TexturePainting;
