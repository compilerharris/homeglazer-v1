
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const PaintingServices: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/painting">Painting Services</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <section className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto py-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
            {/* First Row */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img 
                src="/lovable-uploads/residential.png" 
                alt="Residential" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Residential</h3>
                <p className="text-gray-600 mb-4">Transform your home with smooth, lasting colour.</p>
                <Link 
                  href="/services/painting/residential"
                  className="flex items-center justify-center bg-[#ed276e] hover:bg-[#3b82f6] text-white rounded-full py-3 px-6 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img 
                src="/lovable-uploads/Commercial.png" 
                alt="Commercial" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Commercial</h3>
                <p className="text-gray-600 mb-4">Professional finishes that elevate your business space.</p>
                <Link 
                  href="/services/painting/commercial"
                  className="flex items-center justify-center bg-[#ed276e] hover:bg-[#3b82f6] text-white rounded-full py-3 px-6 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img 
                src="/lovable-uploads/kids.png" 
                alt="Kids Room" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Kids Room</h3>
                <p className="text-gray-600 mb-4">Bright, playful colours made safe and fun for kids.</p>
                <Link 
                  href="/services/painting/kids-room"
                  className="flex items-center justify-center bg-[#ed276e] hover:bg-[#3b82f6] text-white rounded-full py-3 px-6 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default PaintingServices;
