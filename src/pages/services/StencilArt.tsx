
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const StencilArt: React.FC = () => {
  return <ServiceDetailLayout 
    title="Stencil Art" 
    path="/services/wall-decor/stencil-art" 
    parentCategory={{ title: "Wall Decor", path: "/services/wall-decor" }}
  />;
};

export default StencilArt;
