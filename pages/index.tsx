import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getOgImageUrl } from '@/lib/mediaUrl';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ContactForm from '@/components/home/ContactForm';
import RoomMakeover from '@/components/home/RoomMakeover';
import ColourVisualizer from '@/components/home/ColourVisualizer';
import PaintBrands from '@/components/home/PaintBrands';
import TeamSection from '@/components/home/TeamSection';
import Certificates from '@/components/home/Certificates';
import Reviews from '@/components/home/Reviews';
import DesignInsights from '@/components/home/DesignInsights';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/home/Footer';
import { SECTION_CTA_CLASSES } from '@/components/home/CTAButton';
import WhatsAppButton from '@/components/home/WhatsAppButton';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

export default function Home() {
  // return <MacbookAir />;
  return (
    <>
      <Head>
        <title>HomeGlazer - Professional Painting Services in India</title>
        <meta name="description" content="Transform your space with HomeGlazer's professional painting services. Interior, exterior, texture painting, wall decor, and wood services. Get a free quote today!" />
        <meta property="og:title" content="HomeGlazer - Professional Painting Services in India" />
        <meta property="og:description" content="Transform your space with HomeGlazer's professional painting services. Interior, exterior, texture painting, wall decor, and wood services." />
        <meta property="og:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
        <meta property="og:image:type" content="image/png" />
        <meta name="twitter:title" content="HomeGlazer - Professional Painting Services in India" />
        <meta name="twitter:description" content="Transform your space with HomeGlazer's professional painting services. Interior, exterior, texture painting, wall decor, and wood services." />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
      </Head>
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
      <Certificates />
      <Reviews />
      <DesignInsights />
      <FAQ limit={5} />
      <div className="w-full flex justify-center px-4 mt-6 mb-12">
        <Link href="/faq" className={SECTION_CTA_CLASSES}>
          More FAQs
        </Link>
      </div>
      
      {/* Mobile & Tablet Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/colour-visualiser" className="flex-1 bg-[#299dd7] text-white py-3 px-2 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[13px]">
            Colour Visualiser
          </Link>
          <Link href="/paint-budget-calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}