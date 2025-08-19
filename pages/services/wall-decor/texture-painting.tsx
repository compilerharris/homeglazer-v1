
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

const TexturePainting: React.FC = () => {
  return (
    <>
      <Head>
        <title>Texture Painting Services | Wall Textures & Finishes | Home Glazer</title>
        <meta name="description" content="Home Glazer offers professional texture painting services for walls and ceilings. Expert texture painters with 35+ years experience. Transform your space with beautiful texture effects and dimensional finishes." />
        <meta name="keywords" content="texture painting services, wall textures, dimensional finishes, wall painting, Delhi NCR" />
        <meta property="og:title" content="Texture Painting Services | Wall Textures & Finishes | Home Glazer" />
        <meta property="og:description" content="Professional texture painting services for walls and ceilings. Expert texture painters with 35+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/wall-decor/texture-painting" />
        <link rel="canonical" href="https://homeglazer.com/services/wall-decor/texture-painting" />
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
                <BreadcrumbLink href="/services/wall-decor/texture-painting">Texture Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&h=800&fit=crop&q=80"
              alt="Texture Painting Services - Professional Wall Textures and Finishes"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                    Texture Painting Services
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your walls with stunning texture effects and dimensional finishes. Professional texture painting for unique wall designs.
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

        {/* 1. Home Glazer at Texture Painting Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Home Glazer at Texture Painting
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Texture painting is an advanced technique that adds depth, dimension, and visual interest to your walls. Unlike flat paint, texture painting creates surfaces that are not only beautiful to look at but also pleasant to touch.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At Home Glazer, we specialize in creating stunning texture effects that transform ordinary walls into extraordinary features. Our expert texture painters use specialized tools and techniques to create unique finishes that enhance the character of your space.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Whether you want a subtle texture for elegance or a bold, dramatic finish for impact, our texture painting services can achieve the exact look you desire. We work with you to understand your vision and create textures that complement your interior design perfectly.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&q=80" 
                    alt="Professional Texture Painting Services"
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

        {/* 2. Our Texture Painting Process Section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <h2 className="text-[#ED276E] text-4xl font-medium text-center mb-12">
              Our Texture Painting Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Surface Preparation</h3>
                <p className="text-gray-600">
                  We thoroughly clean, repair, and prime your walls to ensure the texture paint adheres properly and lasts for years.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Texture Application</h3>
                <p className="text-gray-600">
                  Using specialized tools and techniques, we apply the texture material to create the desired pattern and depth.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Pattern Creation</h3>
                <p className="text-gray-600">
                  We carefully craft the texture pattern using rollers, brushes, or trowels to achieve the exact finish you want.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Final Finishing</h3>
                <p className="text-gray-600">
                  We add final touches, ensure consistency across the surface, and clean up the work area completely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Is Texture Painting Good? Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Is Texture Painting Good?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Texture painting offers numerous benefits that make it an excellent choice for many spaces. It adds visual interest, hides imperfections, and creates a unique atmosphere that flat paint simply cannot achieve.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  One of the biggest advantages is that texture painting can effectively conceal minor wall imperfections like small cracks, uneven surfaces, or previous paint inconsistencies. This makes it ideal for older homes or walls that may not be perfectly smooth.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Texture painting also adds depth and dimension to your walls, creating a more sophisticated and professional look. It can make a room feel more cozy and inviting, while also serving as a conversation piece that showcases your unique style.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&q=80" 
                    alt="Texture Painting Benefits and Results"
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

        {/* 4. What is Texture Paint Used For? Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                What is Texture Paint Used For?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Texture paint serves multiple purposes in both residential and commercial spaces, offering both aesthetic and functional benefits
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Wall Enhancement</h3>
                <p className="text-gray-600 leading-relaxed">
                  Transform plain walls into textured surfaces that add visual interest and depth to any room.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Imperfection Concealment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Hide minor wall flaws, cracks, and uneven surfaces with textured finishes that mask imperfections.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Acoustic Benefits</h3>
                <p className="text-gray-600 leading-relaxed">
                  Improve room acoustics by reducing echo and sound reflection through textured surfaces.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Design Flexibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Create unique patterns and finishes that reflect your personal style and complement your decor.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Durability</h3>
                <p className="text-gray-600 leading-relaxed">
                  Provide long-lasting finishes that are resistant to wear, stains, and everyday damage.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Maintenance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Textured surfaces are easier to clean and maintain compared to flat painted walls.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Texture Paint Advantages and Disadvantages Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Texture Paint Advantages and Disadvantages
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding the pros and cons helps you make an informed decision about texture painting for your space
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-[#ED276E]">Advantages</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Visual Appeal:</strong> Adds depth, dimension, and character to walls</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Imperfection Hiding:</strong> Conceals minor wall flaws and uneven surfaces</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Durability:</strong> More resistant to wear, stains, and damage</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Acoustic Benefits:</strong> Improves room acoustics and reduces echo</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Unique Style:</strong> Creates distinctive, personalized wall finishes</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-[#299dd7]">Disadvantages</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Higher Cost:</strong> More expensive than standard flat paint</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Application Complexity:</strong> Requires specialized skills and tools</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Maintenance:</strong> Can be harder to clean and touch up</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Limited Repairability:</strong> Difficult to match existing texture for repairs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Style Commitment:</strong> Less flexible for future design changes</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Why Choose HomeGlazer for Texture Painting Service? Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Why Choose HomeGlazer for Texture Painting Service?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  HomeGlazer is your trusted partner for professional texture painting services. With over 35 years of experience, we have mastered the art of creating stunning textured finishes that transform ordinary walls into extraordinary features.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our team of expert texture painters uses only the highest quality materials and state-of-the-art tools to ensure exceptional results. We understand that every space is unique, which is why we work closely with you to create textures that perfectly complement your design vision.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From initial consultation to final completion, we maintain the highest standards of quality and professionalism. Our commitment to customer satisfaction means we won't consider the job complete until you're completely satisfied with the results.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1560435650-7470a0b0eaa7?w=600&h=400&fit=crop&q=80" 
                    alt="Professional Texture Painting Team"
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

        {/* Popular Texture Patterns Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Popular Texture Patterns
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most requested texture patterns that can transform any space
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Orange Peel</h3>
                <p className="text-gray-600 text-sm">Fine, subtle texture resembling orange peel surface</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Knockdown</h3>
                <p className="text-sm text-gray-600">Smooth, flattened texture with subtle peaks and valleys</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Popcorn</h3>
                <p className="text-sm text-gray-600">Heavy, bumpy texture perfect for ceilings</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Patterns</h3>
                <p className="text-sm text-gray-600">Unique textures designed specifically for your space</p>
              </div>
            </div>
          </div>
        </section>

        {/* Texture Painting Applications & Uses Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Texture Painting Applications & Uses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the versatile applications of texture painting across different spaces and surfaces
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
                    <span><strong>Bedrooms:</strong> Headboard walls, ceiling textures, and accent walls</span>
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
                    <span><strong>Entryways:</strong> First impressions with textured feature walls</span>
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
                    <span><strong>Restaurants:</strong> Ambiance-enhancing wall textures</span>
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
                    alt="Texture Painting Applications and Uses"
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
              Let our expert texture painters create stunning wall finishes that add depth and character to your space
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

export default TexturePainting;
