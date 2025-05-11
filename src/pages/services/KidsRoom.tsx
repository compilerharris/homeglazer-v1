
import React from 'react';
import ServiceDetailLayout from '@/components/services/ServiceDetailLayout';

const KidsRoom: React.FC = () => {
  return <ServiceDetailLayout 
    title="Kids Room Painting" 
    path="/services/painting/kids-room" 
    parentCategory={{ title: "Painting Services", path: "/services/painting" }}
  />;
};

export default KidsRoom;
