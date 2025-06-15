import React from 'react';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import CalculatorHero from '@/components/calculator/CalculatorHero';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const Calculator: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      
      <div className="w-[90%] lg:w-[80%] mx-auto pt-20 lg:pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/calculator">Budget Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <CalculatorHero />
      <CalculatorForm />
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Need Personalized Assistance?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Our experts are ready to provide detailed estimates tailored to your specific requirements.
          </p>
          <div className="inline-block">
            <a 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] transition-colors duration-300 font-medium rounded-full px-8 py-4 text-lg"
            >
              Contact Our Team
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Calculator; 