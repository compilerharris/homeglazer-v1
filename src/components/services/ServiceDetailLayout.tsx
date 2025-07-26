import React from 'react';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import ResidentialPaintingSection from '@/components/services/ResidentialPaintingSection';
import ProcessSection from '@/components/services/ProcessSection';
import ComparisonSection from '@/components/services/ComparisonSection';
import MoreServicesSection from '@/components/services/MoreServicesSection';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

interface ServiceDetailLayoutProps {
  title: string;
  path: string;
  parentCategory?: {
    title: string;
    path: string;
  };
}

const ServiceDetailLayout: React.FC<ServiceDetailLayoutProps> = ({ title, path, parentCategory }) => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      
      <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/services">Services</BreadcrumbLink>
            </BreadcrumbItem>
            {parentCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={parentCategory.path}>{parentCategory.title}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={path}>{title}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <section className="relative bg-cover bg-center h-[500px] w-full flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
          alt="Service Detail Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-85 z-0"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto">
            We are passionate about transforming spaces with colors and craftsmanship
          </p>
        </div>
      </section>
      
      <ResidentialPaintingSection />
      <ProcessSection />
      <ComparisonSection />
      <MoreServicesSection />
      <WhyChooseUs />
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetailLayout;
