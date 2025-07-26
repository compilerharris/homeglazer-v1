import React from 'react';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutWhoWeAre from '@/components/about/AboutWhoWeAre';
import AboutWhatWeDo from '@/components/about/AboutWhatWeDo';
import AboutWhyWeDoIt from '@/components/about/AboutWhyWeDoIt';
import AboutHowWeDoIt from '@/components/about/AboutHowWeDoIt';
import TeamSection from '@/components/home/TeamSection';
import Reviews from '@/components/home/Reviews';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import CTAButton from '@/components/home/CTAButton';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const About: React.FC = () => {
  return <div className="bg-white flex flex-col overflow-hidden items-center">
      <Header />
      
      <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/about">About</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <AboutHero />
      <AboutWhoWeAre />
      <AboutWhatWeDo />
      <AboutWhyWeDoIt />
      <AboutHowWeDoIt />
      
      {/* Reuse the TeamSection component */}
      <TeamSection />
      
      {/* CTA Section with pink background and white text/buttons */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Get a Free Quote
            </CTAButton>
            <CTAButton to="/calculator" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Try Our Budget Calculator
            </CTAButton>
          </div>
        </div>
      </section>
      
      {/* Reuse the Reviews component */}
      <Reviews />
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>;
};

export default About;
