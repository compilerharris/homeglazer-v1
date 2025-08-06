import React from 'react';
import Link from 'next/link';
import Header from '../src/components/home/Header';
import Footer from '../src/components/home/Footer';
import FAQ from '../src/components/home/FAQ';

const FAQPage: React.FC = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-12 pb-24">
        <FAQ />
      </main>
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default FAQPage; 