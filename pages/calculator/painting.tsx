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
import Link from 'next/link';

const PaintingCalculator: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      
      <div className="w-[90%] lg:w-[80%] mx-auto pt-20 md:pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/paint-budget-calculator">Budget Calculator</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculator/painting">Painting Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="w-full bg-white my-0">
        <MultiStepCalculator />
      </div>
      
      {/* Mobile Action Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Enquire Now
          </Link>
          <Link href="/colour-visualiser" className="flex-1 bg-[#299dd7] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Color Visualiser
          </Link>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PaintingCalculator; 