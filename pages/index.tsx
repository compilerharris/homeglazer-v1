
import React from 'react';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ContactForm from '@/components/home/ContactForm';
import RoomMakeover from '@/components/home/RoomMakeover';
import ColourVisualizer from '@/components/home/ColourVisualizer';
import PaintBrands from '@/components/home/PaintBrands';
import TeamSection from '@/components/home/TeamSection';
import Reviews from '@/components/home/Reviews';
import DesignInsights from '@/components/home/DesignInsights';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';

export default function Home() {
  // return <MacbookAir />;
  return (
    <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <ContactForm />
      <RoomMakeover />
      <ColourVisualizer />
      <PaintBrands />
      <TeamSection />
      <Reviews />
      <DesignInsights />
      <FAQ />
      
      {/* Mobile & Tablet Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/paint-budget-calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}