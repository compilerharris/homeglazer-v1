
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

export default function CarpentryServices() {
  return (
    <>
      <Head>
        <title>Carpentry Services - Home Glazer | Professional Woodworking & Carpentry</title>
        <meta name="description" content="Professional carpentry services in Delhi NCR. Expert interior & exterior carpentry, custom woodworking, home renovation, and repair services. Get free consultation today." />
        <meta name="keywords" content="carpentry services, woodworking, interior carpentry, exterior carpentry, home renovation, carpenter contractor, Delhi NCR" />
        <meta property="og:title" content="Carpentry Services - Home Glazer" />
        <meta property="og:description" content="Professional carpentry services in Delhi NCR. Expert interior & exterior carpentry, custom woodworking, home renovation, and repair services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/wood/carpentry" />
        <meta property="og:image" content="https://homeglazer.com/uploads/carpentry.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/wood/carpentry" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Carpentry Services | Home Glazer" />
        <meta name="twitter:description" content="Professional carpentry services in Delhi NCR. Expert interior & exterior carpentry." />
        <meta name="twitter:image" content="https://homeglazer.com/uploads/carpentry.png" />
      </Head>

      <div className="bg-white flex flex-col overflow-hidden">
        <Header />
        
        {/* Breadcrumbs */}
        <div className="w-[90%] lg:w-[80%] mx-auto pt-28 pb-8">
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
                <BreadcrumbLink href="/services/wood">Wood Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/wood/carpentry">Carpentry Services</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img 
              src="/uploads/services/carpentary.jpg" 
              alt="Professional Carpentry Services - Expert Woodworking and Custom Furniture"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Carpentry Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your space with expert carpentry services. From custom furniture to complete home renovations, our skilled craftsmen deliver quality workmanship that exceeds expectations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/enquiry" 
                      className="bg-white text-[#ED276E] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center"
                    >
                      Get Free Quote
                    </Link>
                    <Link 
                      href="/contact" 
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#ED276E] transition duration-300 text-center"
                    >
                      Contact Us
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="grid grid-cols-2 gap-6 text-center">
                      <div className="text-white">
                        <div className="text-3xl font-bold text-[#ED276E] mb-2">500+</div>
                        <div className="text-sm text-gray-200">Projects Completed</div>
                      </div>
                      <div className="text-white">
                        <div className="text-3xl font-bold text-[#ED276E] mb-2">15+</div>
                        <div className="text-sm text-gray-200">Years Experience</div>
                      </div>
                      <div className="text-white">
                        <div className="text-3xl font-bold text-[#ED276E] mb-2">100%</div>
                        <div className="text-sm text-gray-200">Client Satisfaction</div>
                      </div>
                      <div className="text-white">
                        <div className="text-3xl font-bold text-[#ED276E] mb-2">24/7</div>
                        <div className="text-sm text-gray-200">Support Available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* 1. Home Glazer at Carpentry Services Section */}
      <section className="py-20">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Home Glazer at Carpentry Services
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At Home Glazer, we take pride in delivering exceptional carpentry services that transform your living spaces into beautiful, functional environments. Our team of skilled craftsmen combines traditional woodworking techniques with modern innovation to create custom solutions that meet your unique requirements.
                </p>
                <p>
                  With years of experience in the industry, we understand that every project is different and requires a personalized approach. Whether you need custom furniture, home renovations, or repair services, our dedicated team ensures quality workmanship and attention to detail in every project we undertake.
                </p>
                <p>
                  We believe in building lasting relationships with our clients through transparent communication, reliable service, and superior results. Our commitment to excellence has made us the preferred choice for carpentry services in Delhi NCR and surrounding areas.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/uploads/services/Home%20Glazer%20at%20Carpentry%20Services.png"
                alt="Home Glazer Carpentry Team - Skilled Craftsmen at Work"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ED276E]">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HomeGlazer Carpentry Services Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              HomeGlazer Carpentry Services Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures every carpentry project is completed with precision, quality, and attention to detail.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Consultation</h3>
              <p className="text-gray-600 leading-relaxed">
                Initial meeting to understand your requirements, budget, and timeline for the project.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Planning</h3>
              <p className="text-gray-600 leading-relaxed">
                Detailed project planning including material selection, design approval, and timeline creation.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Execution</h3>
              <p className="text-gray-600 leading-relaxed">
                Skilled craftsmen execute the project with precision, maintaining quality standards throughout.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Check</h3>
              <p className="text-gray-600 leading-relaxed">
                Final inspection and quality assurance to ensure the project meets our high standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interior Carpentry Services Section */}
      <section className="py-20">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/uploads/services/Interior%20Carpentry%20Services.png"
                alt="Interior Carpentry Services - Custom Furniture and Woodwork"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Interior Carpentry Services
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our interior carpentry services cover a wide range of woodworking needs for your home's interior spaces. We specialize in creating custom solutions that enhance both the functionality and aesthetics of your living areas.
                </p>
                <p>
                  From custom furniture pieces to built-in storage solutions, our skilled craftsmen work with precision to bring your vision to life. We use high-quality materials and advanced techniques to ensure durability and beauty in every project.
                </p>
                <p>
                  Whether you need kitchen cabinets, wardrobes, bookshelves, or decorative elements, our team has the expertise to deliver exceptional results that exceed your expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Exterior Carpentry Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Exterior Carpentry Services
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Our exterior carpentry services focus on creating durable, weather-resistant wooden structures that enhance your home's curb appeal and functionality. We understand the challenges of outdoor environments and use appropriate materials and techniques.
                </p>
                <p>
                  From deck construction to pergolas, outdoor furniture to garden structures, our team ensures that every exterior project is built to withstand the elements while maintaining its beauty and structural integrity.
                </p>
                <p>
                  We use treated lumber, weather-resistant finishes, and proper construction methods to ensure longevity and performance in all weather conditions.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="/uploads/services/Exterior%20Carpentry%20Services.png"
                alt="Exterior Carpentry Services - Outdoor Wooden Structures and Decks"
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#ED276E]">100%</div>
                  <div className="text-sm text-gray-600">Weather Resistant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How Contractors Provide Light Carpentry Section */}
      <section className="py-20">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              How Contractors Provide Light Carpentry
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Light carpentry involves smaller projects that can be completed quickly without major disruption to your daily routine.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Quick Repairs</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Fast fixes for minor issues like loose hinges, broken drawer handles, or small repairs that restore functionality.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Installation</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Professional installation of pre-made items like shelves, hooks, or small decorative elements.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Customization</h3>
              <p className="text-gray-600 leading-relaxed text-center">
                Minor modifications to existing furniture or structures to better suit your needs and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Benefits of Using Skilled Carpentry Contractor Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              The Benefits of Using a Skilled Carpentry Contractor for Home Repair Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choosing a professional carpentry contractor ensures quality workmanship, reliability, and peace of mind for your home projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Expertise</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Years of experience and specialized training in carpentry techniques</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Knowledge of building codes and safety regulations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Access to professional tools and equipment</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Problem-solving skills for complex carpentry challenges</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Guaranteed workmanship and materials</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Proper finishing and attention to detail</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Long-lasting results that add value to your home</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Professional standards that exceed DIY expectations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. How to Choose Best Professional Carpenter Company Section */}
      <section className="py-20">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              How to Choose the Best Professional Carpenter Company
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecting the right carpentry company is crucial for ensuring quality work and a smooth project experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Check Credentials</h3>
              <p className="text-gray-600 leading-relaxed">
                Verify licenses, insurance, and certifications to ensure the company meets industry standards.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Review Portfolio</h3>
              <p className="text-gray-600 leading-relaxed">
                Examine previous work samples and client testimonials to assess quality and style.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Get References</h3>
              <p className="text-gray-600 leading-relaxed">
                Request references from recent clients to verify satisfaction and work quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Different Types of Carpentry Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              What are the Different Types of Carpentry Work
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Carpentry encompasses various specialized areas, each requiring specific skills and expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rough Carpentry</h3>
                <p className="text-gray-600 leading-relaxed">
                  Structural work including framing, roofing, and foundation elements. This type focuses on the skeleton of buildings and structures.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Finish Carpentry</h3>
                <p className="text-gray-600 leading-relaxed">
                  Detailed work including trim, molding, doors, and windows. This type focuses on the final touches that enhance aesthetics.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cabinet Making</h3>
                <p className="text-gray-600 leading-relaxed">
                  Specialized furniture construction including kitchen cabinets, wardrobes, and custom storage solutions.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Furniture Making</h3>
                <p className="text-gray-600 leading-relaxed">
                  Custom furniture construction from tables and chairs to specialized pieces designed for specific needs.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Restoration</h3>
                <p className="text-gray-600 leading-relaxed">
                  Repair and restoration of antique furniture and wooden structures, preserving their historical value.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Outdoor Carpentry</h3>
                <p className="text-gray-600 leading-relaxed">
                  Construction of decks, pergolas, outdoor furniture, and garden structures designed for outdoor use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Tips for Working with Carpenter Section */}
      <section className="py-20">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              Tips for Working with a Carpenter during your Home Renovation Project
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Effective communication and planning are key to ensuring a successful carpentry project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Communication Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Clearly communicate your vision and requirements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ask questions and seek clarification when needed</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Provide feedback throughout the process</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Establish regular check-in schedules</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Planning Considerations</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Set realistic timelines and expectations</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Prepare the workspace for the carpenter</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Have materials and decisions ready</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Consider the impact on daily routines</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Carpentry Projects Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              Popular Carpentry Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most requested carpentry services that can transform your living spaces.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <img
                src="/uploads/services/Custom%20Kitchen%20Cabinets.png"
                alt="Custom Kitchen Cabinets - Professional Carpentry Services"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Kitchen Cabinets</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored storage solutions that maximize space and enhance your kitchen's functionality and style.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <img
                src="/uploads/services/Built-in%20Wardrobes.png"
                alt="Built-in Wardrobes - Custom Storage Solutions"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Built-in Wardrobes</h3>
              <p className="text-gray-600 leading-relaxed">
                Custom closet systems designed to fit your space perfectly and organize your belongings efficiently.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <img
                src="/uploads/services/Outdoor%20Decks.png"
                alt="Outdoor Deck Construction - Exterior Carpentry"
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Outdoor Decks</h3>
              <p className="text-gray-600 leading-relaxed">
                Beautiful outdoor living spaces that extend your home's functionality and increase property value.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Carpentry Applications & Uses Section */}
      <section className="py-20">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
              Carpentry Applications & Uses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Carpentry services find applications across various sectors, from residential to commercial projects.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Residential Applications</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Home renovations and remodeling projects</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Custom furniture and built-in storage</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Kitchen and bathroom improvements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Outdoor living space construction</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Commercial Applications</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Office furniture and fixtures</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Retail display and shelving systems</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Restaurant and hospitality furniture</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                  <span>Industrial and warehouse structures</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Transform Your Space Section */}
      <section className="py-20 bg-gradient-to-r from-[#ED276E] to-[#299dd7]">
        <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Let our expert carpenters bring your vision to life with quality craftsmanship and attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enquiry" className="bg-white text-[#ED276E] hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Free Quote
            </Link>
            <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-[#ED276E] font-semibold py-4 px-8 rounded-xl transition-all duration-300">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
      
      {/* Mobile Action Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/contact" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Contact Us
          </Link>
        </div>
      </div>
      
      <Footer />
      <WhatsAppButton />
    </div>
    </>
  );
}
