import React from 'react';
import Head from 'next/head';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import MultiStepWoodPolishingCalculator from '@/components/calculator/MultiStepWoodPolishingCalculator';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const WoodPolishingCalculator: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wood Polishing Cost Calculator | HomeGlazer - Free Estimate</title>
        <meta name="description" content="Calculate your wood polishing costs instantly with HomeGlazer's free calculator. Get accurate estimates for furniture, doors, and floor polishing projects." />
        <meta name="keywords" content="wood polishing calculator, wood polishing cost, furniture polishing estimate, Delhi NCR" />
        <meta property="og:title" content="Wood Polishing Cost Calculator | HomeGlazer" />
        <meta property="og:description" content="Calculate your wood polishing costs instantly with our free calculator." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${SITE_URL}/uploads/wood-polishing.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wood Polishing Cost Calculator | HomeGlazer" />
        <meta name="twitter:description" content="Calculate your wood polishing costs instantly." />
        <meta name="twitter:image" content={`${SITE_URL}/uploads/wood-polishing.png`} />
      </Head>
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
              <BreadcrumbLink href="/calculator/wood-polishing">Wood Polishing Calculator</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <div className="w-full bg-white my-0">
        <MultiStepWoodPolishingCalculator />
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
    </>
  );
};

export default WoodPolishingCalculator; 