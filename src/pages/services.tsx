
import React from "react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import ServiceCardsGrid from "@/components/services/ServiceCardsGrid";
import WhatsAppButton from "@/components/home/WhatsAppButton";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const Services: React.FC = () => {
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
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <ServiceCardsGrid />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Services;
