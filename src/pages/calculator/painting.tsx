import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import MultiStepCalculator from '@/components/calculator/MultiStepCalculator';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const PaintingCalculator: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      
      <div className="w-full lg:w-[80%] mx-auto pt-20 lg:pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculator">Budget Calculator</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculator/painting">Painting Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="w-full bg-white my-8">
        <MultiStepCalculator />
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PaintingCalculator; 