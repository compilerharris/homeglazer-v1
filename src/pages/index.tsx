
import React from 'react';
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
      <Footer />
      <WhatsAppButton />
    </div>
  );
}