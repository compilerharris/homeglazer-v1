import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const Wallpaper: React.FC = () => {
  return (
    <>
      <Head>
        <title>Customized Wallpaper Services | Wall Decor & Design | Home Glazer</title>
        <meta name="description" content="Home Glazer offers professional customized wallpaper services for walls and ceilings. Expert wallpaper installation with 35+ years experience. Transform your space with beautiful wallpaper designs." />
        <meta name="keywords" content="customized wallpaper services, wallpaper installation, wall decor, wall design, Delhi NCR" />
        <meta property="og:title" content="Customized Wallpaper Services | Wall Decor & Design | Home Glazer" />
        <meta property="og:description" content="Professional customized wallpaper services for walls and ceilings. Expert wallpaper installation with 35+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/wall-decor/wallpaper" />
        <link rel="canonical" href="https://homeglazer.com/services/wall-decor/wallpaper" />
      </Head>

      <div className="bg-white flex flex-col overflow-hidden">
        <Header />
        
        {/* Breadcrumbs */}
        <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/wall-decor">Wall Decor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/wall-decor/wallpaper">Wallpaper</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80"
              alt="Customized Wallpaper Services - Professional Wall Decor and Design"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                    Customized Wallpaper Services
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your walls with stunning customized wallpaper designs. Professional wallpaper installation for unique wall decor.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/enquiry"
                      className="bg-white text-[#ED276E] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center"
                    >
                      Get Free Quote
                    </Link>
                    <Link
                      href="/colour-visualiser"
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#ED276E] transition duration-300 text-center"
                    >
                      Try Color Visualizer
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="text-center text-white">
                      <div className="text-4xl font-bold mb-2">35+</div>
                      <div className="text-lg mb-4">YEARS EXPERIENCE</div>
                      <div className="flex justify-center space-x-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white/20"></div>
                        <div className="w-10 h-10 rounded-full bg-white/20"></div>
                        <div className="w-10 h-10 rounded-full bg-white/20"></div>
                      </div>
                      <p className="text-sm opacity-90">Trusted by thousands of customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Home Glazer at Customized Wallpaper Services Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Home Glazer at Customized Wallpaper Services
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Customized wallpaper services offer a unique way to transform your living spaces with personalized designs and patterns. At Home Glazer, we specialize in creating stunning wall decor that reflects your individual style and enhances the character of your home.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our expert wallpaper installers bring years of experience and craftsmanship to every project. We understand that wallpaper is not just about covering walls—it's about creating an atmosphere, telling a story, and making your space truly yours.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're looking for bold geometric patterns, elegant floral designs, or custom artwork, our customized wallpaper services can bring your vision to life. We work with premium materials and use advanced installation techniques to ensure flawless results that last for years.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80" 
                    alt="Professional Customized Wallpaper Services"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#ED276E] mb-2">35+</div>
                    <div className="text-sm text-gray-600">Years of Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Our Wallpaper Installation Process Section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <h2 className="text-[#ED276E] text-4xl font-medium text-center mb-12">
              Our Wallpaper Installation Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Design Consultation</h3>
                <p className="text-gray-600">
                  We discuss your vision, space requirements, and design preferences to select the perfect wallpaper for your space.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Surface Preparation</h3>
                <p className="text-gray-600">
                  We thoroughly clean, repair, and prime your walls to ensure optimal wallpaper adhesion and longevity.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Precise Installation</h3>
                <p className="text-gray-600">
                  Our experts carefully measure, cut, and install each wallpaper strip with precision for seamless results.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Final Finishing</h3>
                <p className="text-gray-600">
                  We trim edges, remove air bubbles, and ensure perfect alignment for a professional, finished look.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What are Customized Wallpapers? Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  What are Customized Wallpapers?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Customized wallpapers are personalized wall coverings designed specifically for your space and style preferences. Unlike standard wallpaper patterns, customized designs can incorporate your own artwork, photographs, or unique patterns that perfectly match your interior design vision.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  These wallpapers offer endless possibilities for personalization, from incorporating family photos and artwork to creating unique geometric patterns or themed designs. They can be tailored to specific room dimensions, color schemes, and architectural features.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Customized wallpapers provide a level of uniqueness that mass-produced options simply cannot match. They allow you to create truly one-of-a-kind spaces that reflect your personality, interests, and design aesthetic while maintaining professional quality and durability.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop&q=80" 
                    alt="Customized Wallpaper Designs and Patterns"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#299dd7] mb-2">100%</div>
                    <div className="text-sm text-gray-600">Custom Made</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Do You Need Customized Wallpaper Services? Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Do You Need Customized Wallpaper Services?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover when customized wallpaper services are the perfect solution for your space transformation needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Unique Design Requirements</h3>
                <p className="text-gray-600 leading-relaxed">
                  When you need patterns, colors, or designs that aren't available in standard wallpaper collections.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Personal Branding</h3>
                <p className="text-gray-600 leading-relaxed">
                  For commercial spaces where you want to incorporate your brand identity and company values.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Perfect Fit Requirements</h3>
                <p className="text-gray-600 leading-relaxed">
                  When you need wallpaper that fits perfectly with your room's dimensions and architectural features.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Special Occasions</h3>
                <p className="text-gray-600 leading-relaxed">
                  For events, celebrations, or temporary installations that require unique, themed designs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
                <p className="text-gray-600 leading-relaxed">
                  When you demand the highest quality materials and professional installation standards.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Time-Sensitive Projects</h3>
                <p className="text-gray-600 leading-relaxed">
                  For projects with specific deadlines that require expedited custom design and installation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Wallpapers Services - A perfect way to design your spaces! Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Wallpapers Services - A perfect way to design your spaces!
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Wallpaper services offer an exceptional way to transform your living spaces with style, personality, and visual impact. Unlike traditional paint, wallpaper provides texture, pattern, and depth that can completely change the atmosphere of any room.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our wallpaper services go beyond simple installation—we help you create cohesive design schemes that flow seamlessly throughout your home. From bold feature walls to subtle textured finishes, we offer solutions for every design preference and budget.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you're updating a single room or transforming your entire home, our wallpaper services provide the perfect foundation for creating spaces that inspire, comfort, and reflect your unique lifestyle. We work with you to select the right materials, patterns, and installation methods for lasting beauty and satisfaction.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560435650-7470a0b0eaa7?w=600&h=400&fit=crop&q=80" 
                    alt="Wallpaper Services for Perfect Space Design"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#ED276E] mb-2">1000+</div>
                    <div className="text-sm text-gray-600">Happy Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Wallpaper Material Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Wallpaper Material
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding different wallpaper materials helps you choose the perfect option for your space and lifestyle
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vinyl Wallpaper</h3>
                <p className="text-gray-600 leading-relaxed">
                  Durable, washable, and perfect for high-traffic areas like kitchens and bathrooms. Resistant to moisture and easy to clean.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Non-Woven Wallpaper</h3>
                <p className="text-gray-600 leading-relaxed">
                  Easy to install and remove, breathable, and perfect for bedrooms and living rooms. Excellent for DIY projects.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Textured Wallpaper</h3>
                <p className="text-gray-600 leading-relaxed">
                  Adds dimension and tactile interest to walls. Perfect for creating focal points and hiding minor imperfections.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Grasscloth Wallpaper</h3>
                <p className="text-gray-600 leading-relaxed">
                  Natural, eco-friendly option made from woven grasses. Adds organic texture and warmth to any space.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Fabric Wallpaper</h3>
                <p className="text-gray-600 leading-relaxed">
                  Luxurious, soft-textured option perfect for formal spaces. Excellent sound absorption and elegant appearance.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Digital</h3>
                <p className="text-gray-600 leading-relaxed">
                  High-resolution, personalized designs printed on demand. Perfect for creating unique, one-of-a-kind spaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional sections will be added here */}
        
        {/* Popular Wallpaper Patterns Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Popular Wallpaper Patterns
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most requested wallpaper patterns that can transform any space
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Geometric Patterns</h3>
                <p className="text-gray-600 text-sm">Modern geometric designs for contemporary spaces</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Floral Designs</h3>
                <p className="text-sm text-gray-600">Elegant flower and botanical patterns for classic elegance</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Abstract Art</h3>
                <p className="text-sm text-gray-600">Contemporary abstract designs for artistic expression</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Designs</h3>
                <p className="text-sm text-gray-600">Unique patterns created specifically for your space</p>
              </div>
            </div>
          </div>
        </section>

        {/* Wallpaper Applications & Uses Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Wallpaper Applications & Uses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the versatile applications of wallpaper across different spaces and surfaces
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Residential Applications</h3>
                <ul className="space-y-3 text-gray-600 mb-8">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Living Rooms:</strong> Feature walls, accent areas, and entire room coverage</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Bedrooms:</strong> Headboard walls, accent walls, and ceiling coverings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Kitchens:</strong> Backsplash areas and feature walls</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Bathrooms:</strong> Shower surrounds and accent walls</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Entryways:</strong> First impressions with dramatic wallpaper designs</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Commercial Applications</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Offices:</strong> Reception areas, conference rooms, and feature walls</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Retail Spaces:</strong> Store branding and visual merchandising</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Restaurants:</strong> Ambiance-enhancing wall designs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Hotels:</strong> Lobby features and room accents</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80" 
                    alt="Wallpaper Applications and Uses"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Transform Your Space? Section */}
        <section className="py-20 bg-gradient-to-r from-[#ED276E] to-[#299dd7]">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let our expert wallpaper installers create stunning wall designs that reflect your style and transform your space
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/enquiry"
                className="bg-white text-[#ED276E] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
              >
                Get Free Quote
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#ED276E] transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Wallpaper;
