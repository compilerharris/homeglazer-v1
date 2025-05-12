
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const Wallpaper: React.FC = () => {
  return <ServiceDetailLayout 
    title="Wallpaper" 
    path="/services/wall-decor/wallpaper" 
    parentCategory={{ title: "Wall Decor", path: "/services/wall-decor" }}
  />;
};

export default Wallpaper;
