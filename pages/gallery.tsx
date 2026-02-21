import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { getOgImageUrl } from '@/lib/mediaUrl'
import Header from '@/components/home/Header'
import Footer from '@/components/home/Footer'
import WhatsAppButton from '@/components/home/WhatsAppButton'
import CTAButton from '@/components/home/CTAButton'
import GallerySection from '@/components/sections/GallerySection'
import { galleryData } from '@/lib/galleryData'
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Gallery - Before & After Room Transformations | HomeGlazer</title>
        <meta name="description" content="Explore our stunning before and after room transformations. See how professional painting can transform bedrooms, living rooms, kitchens, and outdoor spaces." />
        <meta name="keywords" content="room transformation, before after, painting gallery, bedroom makeover, living room painting, kitchen renovation" />
        <meta property="og:title" content="Gallery - Before & After Room Transformations | HomeGlazer" />
        <meta property="og:description" content="Explore our stunning before and after room transformations. See how professional painting can transform bedrooms, living rooms, kitchens, and outdoor spaces." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={getOgImageUrl("/uploads/before-after.png", SITE_URL)} />
        <meta name="twitter:title" content="Gallery - Before & After Room Transformations | HomeGlazer" />
        <meta name="twitter:description" content="Explore our stunning before and after room transformations." />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/before-after.png", SITE_URL)} />
      </Head>
      
      <div className="bg-white flex flex-col overflow-hidden items-center">
        <Header />
        
        {/* Breadcrumb */}
        <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/gallery">Gallery</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="w-full py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7]">
          <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px]">
            <div className="text-center">
              <h1 className="text-white text-[40px] md:text-[60px] font-bold mb-6">
                Transformation Gallery
              </h1>
              <p className="text-white text-xl font-light max-w-3xl mx-auto">
                Discover the power of professional painting through our before and after showcase
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Sections */}
        {galleryData.map((category) => (
          <GallerySection key={category.id} category={category} />
        ))}

        {/* CTA Section with brand gradient */}
        <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
          <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px] text-center">
            <h2 className="text-white text-[40px] font-medium mb-6">
              Ready for Your Transformation?
            </h2>
            <p className="text-white text-xl font-light mb-8 max-w-2xl mx-auto">
              Let us bring your vision to life with professional painting services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton to="/enquiry" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
                Get Free Quote
              </CTAButton>
              <CTAButton to="/paint-budget-calculator" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
                Budget Calculator
              </CTAButton>
            </div>
          </div>
        </section>
        
        {/* Mobile Action Buttons - Fixed at Bottom */}
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
    </>
  )
}
