
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const WallDecor: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-28">
        <div className="w-[90%] lg:w-[80%] mx-auto">
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
                <BreadcrumbLink href="/services/wall-decor">Wall Decor</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <section className="w-[90%] lg:w-[80%] mx-auto my-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-6">
            {/* First Row */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img 
                src="public/lovable-uploads/4fcf12de-9a11-4288-9d9e-69faccee2787.png" 
                alt="Graffiti Painting" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Graffiti Painting</h3>
                <p className="text-gray-600 mb-4">Bold, artistic statements that make your walls stand out.</p>
                <Link 
                  to="/services/wall-decor/graffiti-painting"
                  className="flex items-center justify-center bg-[#ed276e] hover:bg-[#3b82f6] text-white rounded-full py-3 px-6 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img 
                src="public/lovable-uploads/4fcf12de-9a11-4288-9d9e-69faccee2787.png" 
                alt="Texture Painting" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Texture Painting</h3>
                <p className="text-gray-600 mb-4">Add depth and dimension with stylish textured finishes.</p>
                <Link 
                  to="/services/wall-decor/texture-painting"
                  className="flex items-center justify-center bg-[#ed276e] hover:bg-[#3b82f6] text-white rounded-full py-3 px-6 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img 
                src="public/lovable-uploads/4fcf12de-9a11-4288-9d9e-69faccee2787.png" 
                alt="Stencil Art" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Stencil Art</h3>
                <p className="text-gray-600 mb-4">Clean, creative patterns for a sharp, modern look.</p>
                <Link 
                  to="/services/wall-decor/stencil-art"
                  className="flex items-center justify-center bg-[#ed276e] hover:bg-[#3b82f6] text-white rounded-full py-3 px-6 transition-colors"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <img 
                src="public/lovable-uploads/4fcf12de-9a11-4288-9d9e-69faccee2787.png" 
                alt="Wallpaper" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-2">Wallpaper</h3>
                <p className="text-gray-600 mb-4">Elegant designs with a flawless, bubble-free finish.</p>
                <Link 
                  to="/services/wall-decor/wallpaper"
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
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default WallDecor;
