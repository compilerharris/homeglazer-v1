import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getOgImageUrl } from '@/lib/mediaUrl';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const Calculator: React.FC = () => {
  return (
    <>
      <Head>
        <title>Paint Budget Calculator | HomeGlazer - Free Estimate</title>
        <meta name="description" content="Calculate your painting budget instantly with HomeGlazer's free paint budget calculator. Get accurate estimates for interior, exterior, and wood services." />
        <meta property="og:title" content="Paint Budget Calculator | HomeGlazer - Free Estimate" />
        <meta property="og:description" content="Calculate your painting budget instantly with our free calculator. Get accurate estimates for your painting project." />
        <meta property="og:image" content={getOgImageUrl("/uploads/consultation.png", SITE_URL)} />
        <meta name="twitter:title" content="Paint Budget Calculator | HomeGlazer" />
        <meta name="twitter:description" content="Calculate your painting budget instantly with our free calculator." />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/consultation.png", SITE_URL)} />
      </Head>
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
              <BreadcrumbLink href="/paint-budget-calculator">Budget Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
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
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
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
    </>
  );
};

export default Calculator;

