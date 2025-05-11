
import React from 'react';
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
        {/* Overlay with semi-transparent background */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        
        {/* Background image */}
        <img 
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
          alt="About Us Hero Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
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
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetailLayout;
