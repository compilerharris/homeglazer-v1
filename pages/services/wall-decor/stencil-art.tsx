
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const StencilArt: React.FC = () => {
  return (
    <>
      <Head>
        <title>Stencil Painting Services | Wall Art & Design | Home Glazer</title>
        <meta name="description" content="Home Glazer offers professional stencil painting services for walls and ceilings. Expert stencil artists with 35+ years experience. Transform your space with beautiful stencil designs and patterns." />
        <meta name="keywords" content="stencil painting services, wall stenciling, ceiling stenciling, wall art, decorative painting, stencil designs, Delhi NCR" />
        <meta property="og:title" content="Stencil Painting Services | Wall Art & Design | Home Glazer" />
        <meta property="og:description" content="Professional stencil painting services for walls and ceilings. Expert stencil artists with 35+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/wall-decor/stencil-art" />
        <link rel="canonical" href="https://homeglazer.com/services/wall-decor/stencil-art" />
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
                <BreadcrumbLink href="/services/wall-decor/stencil-art">Stencil Art</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1560435650-7470a0b0eaa7?w=1200&h=800&fit=crop&q=80"
              alt="Stencil Painting Services - Professional Wall Art and Design"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                    Stencil Painting Services
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your walls with stunning stencil designs and patterns. Professional stencil artists at your doorstep.
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

        {/* 1. Home Glazer at Stencil Painting Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Home Glazer at Stencil Painting
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Every wall of your home should display the story behind it. Stencil painting is a fabulous way to produce designs and patterns on the walls or ceiling. Today, stencil painting is in high demand and people spend hours picking the right stencils for their dream home.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The purpose of stenciling in painting and interior design is enormous. According to your imagination and wish, one can choose the perfect stencil with fine color combinations for your wall. Stencil painting reflects your imagination on the wall.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The stencil painting on the wall can lighten the space with the fresh gasp of air, rejuvenating it with the refreshing aura. Our expert stencil artists use premium materials and techniques to create stunning wall art that transforms your space.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80" 
                    alt="Professional Stencil Painting Services"
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

        {/* 2. Our Stencil Painting Process Section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <h2 className="text-[#ED276E] text-4xl font-medium text-center mb-12">
              Our Stencil Painting Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Design Consultation</h3>
                <p className="text-gray-600">
                  We discuss your vision, space requirements, and design preferences to create the perfect stencil pattern for your space.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Surface Preparation</h3>
                <p className="text-gray-600">
                  We prepare your walls or ceilings by cleaning, repairing, and priming surfaces to ensure optimal stencil adhesion.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Stencil Application</h3>
                <p className="text-gray-600">
                  Our expert artists carefully apply stencils and paint with precision, ensuring crisp lines and perfect pattern alignment.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Final Touches</h3>
                <p className="text-gray-600">
                  We add finishing details, touch up any imperfections, and ensure your stencil design looks perfect and professional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What is Stencil Painting Process Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  What is Stencil Painting Process?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Stencil painting is a decorative painting technique that uses pre-cut templates to create precise designs and patterns on walls, ceilings, and other surfaces. This method allows for consistent, repeatable patterns and intricate designs that would be difficult to achieve freehand.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Unlike wallpaper, stencil designs are permanent and won't peel or fade over time. They're also easier to clean and maintain, making them perfect for high-traffic areas. Our stencil painting services provide endless design possibilities, from subtle borders to bold feature walls.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We work with you to create custom designs that perfectly match your style and space. From geometric patterns to floral designs, we can create any stencil pattern you desire, ensuring your walls tell your unique story.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&h=400&fit=crop&q=80" 
                    alt="Stencil Painting Process and Results"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#299dd7] mb-2">100%</div>
                    <div className="text-sm text-gray-600">Quality Assured</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Advantages of Stencil Painting Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Advantages of Stencil Painting
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the numerous benefits that make stencil painting an excellent choice for transforming your space
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Design Flexibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create unique patterns tailored to your style and space requirements, from simple borders to complex feature wall designs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Long-Lasting Durability</h3>
                <p className="text-gray-600 leading-relaxed">
                  Unlike wallpaper, stencil designs are permanent and won't peel or fade, providing years of beautiful wall art.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cost-Effective Solution</h3>
                <p className="text-gray-600 leading-relaxed">
                  Achieve high-end decorative results at a fraction of the cost of other wall treatment methods.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Maintenance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Stencil designs are easy to clean and maintain, making them perfect for high-traffic areas and busy households.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Versatile Applications</h3>
                <p className="text-gray-600 leading-relaxed">
                  Suitable for walls, ceilings, furniture, and various surfaces including drywall, wood, metal, and concrete.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Installation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional stencil application is fast and efficient, minimizing disruption to your daily routine.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why Choose HomeGlazer for the Stencil painting Service Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Why Choose HomeGlazer for the Stencil Painting Service?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  HomeGlazer is professionally perfect for making your space look fabulous with stencil painting. We use the best quality materials and our staff are trained in advanced stencil painting techniques.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our stencil painting services are already making good names in many homes and commercial spaces. We take care of all your needs, be it small or large projects, HomeGlazer will be with you every step of the way.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Many service providers use tools and paints below standards, but our team will make you trust in quality and standards. The stencil painting service we provide is not for months but for years. We make sure that we care about the aesthetic look of your space when we are working on any project.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560435650-7470a0b0eaa7?w=600&h=400&fit=crop&q=80" 
                    alt="Professional Stencil Painting Team"
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

        {/* Popular Stencil Patterns Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Popular Stencil Patterns
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most requested stencil designs that can transform any space
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Floral Patterns</h3>
                <p className="text-gray-600 text-sm">Elegant flower and leaf designs for a natural, organic feel</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Geometric Shapes</h3>
                <p className="text-gray-600 text-sm">Modern geometric patterns for contemporary spaces</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Borders & Frames</h3>
                <p className="text-gray-600 text-sm">Classic border designs to frame walls and ceilings</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Designs</h3>
                <p className="text-gray-600 text-sm">Unique patterns created specifically for your space</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stencil Painting Applications & Uses Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Stencil Painting Applications & Uses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the versatile applications of stencil painting across different spaces and surfaces
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Residential Applications</h3>
                <ul className="space-y-3 text-gray-600 mb-8">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Living Rooms:</strong> Feature walls, borders, and accent patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Bedrooms:</strong> Headboard designs, ceiling patterns, and wall art</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Kitchens:</strong> Backsplash designs and decorative borders</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Bathrooms:</strong> Wall patterns and ceiling designs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Children's Rooms:</strong> Themed designs and playful patterns</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Commercial Applications</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Offices:</strong> Brand elements and decorative accents</span>
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
                    <span><strong>Hotels:</strong> Lobby decorations and room accents</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80" 
                    alt="Stencil Painting Applications and Uses"
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
              Let our expert stencil artists create stunning wall art that reflects your style and personality
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

export default StencilArt;
