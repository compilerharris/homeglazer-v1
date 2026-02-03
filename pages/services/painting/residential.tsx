
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';
const RESIDENTIAL_HERO_IMAGE = "/uploads/services/residential-painting.jpg";

const Residential: React.FC = () => {
  return (
    <>
      <Head>
        <title>Residential Painting Services | Professional House Painters | Home Glazer</title>
        <meta name="description" content="Transform your home with our professional residential painting services. Expert house painters delivering quality interior & exterior painting with 35+ years of experience. Get free consultation today!" />
        <meta name="keywords" content="residential painting, house painters, interior painting, exterior painting, home painting services, professional painters" />
        <meta property="og:title" content="Residential Painting Services | Professional House Painters | Home Glazer" />
        <meta property="og:description" content="Transform your home with our professional residential painting services. Expert house painters delivering quality interior & exterior painting with 35+ years of experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/painting/residential" />
        <meta property="og:image" content={`${SITE_URL}${RESIDENTIAL_HERO_IMAGE}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/painting/residential" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Residential Painting Services | Home Glazer" />
        <meta name="twitter:description" content="Transform your home with professional residential painting services." />
        <meta name="twitter:image" content={`${SITE_URL}${RESIDENTIAL_HERO_IMAGE}`} />
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
                <BreadcrumbLink href="/services/painting">Painting Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/painting/residential">Residential Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img 
              src={RESIDENTIAL_HERO_IMAGE} 
              alt="Residential Painting Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
                    Residential Painting Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your home with professional painting services that bring your vision to life
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
                      <div className="text-4xl font-bold mb-2">4.9</div>
                      <div className="text-lg mb-4">★ RATING</div>
                      <p className="text-sm opacity-90">Trusted by 1000+ homeowners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section - Split Layout */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  ABOUT HOME GLAZER
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Home Glazer Residential Painting
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    In today's time, everyone dreams of their beautiful house. Finding the correct contrast of colors for your home and staying current with the latest trends is a significant undertaking. With Home Glazer, this dream can be accomplished easily.
                  </p>
                  <p>
                    With over 35 years of experience, we serve our customers with full dedication and warmth. Whatever your friends and neighbors suggest, you want your own taste because it's your house where you live.
                  </p>
                  <p>
                    Not only are our house painting services well-known, but our house painters are also well-trained and experienced. We take pride wherever we work, ensuring every project reflects our commitment to excellence and customer satisfaction.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-xl">
                  <img 
                    src="/uploads/actual-residential-painting.png" 
                    alt="Professional Residential Painting"
                    className="w-full h-auto rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[#ED276E] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">35+</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Years of Experience</div>
                      <div className="text-sm text-gray-600">Trusted by thousands</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview - Modern Card Grid */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                OUR SERVICES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Residential Painting Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive painting solutions designed to transform your living spaces with professional expertise and quality materials.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Interior Painting */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/services/interior-painting-service.jpg" 
                    alt="Interior Painting"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Interior Painting</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Transform your living spaces with our professional interior painting services. From living rooms to bedrooms, we ensure perfect finishes.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Living room & bedroom painting
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Kitchen & bathroom painting
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Ceiling & trim work
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Color consultation
                    </li>
                  </ul>
                </div>
              </div>

              {/* Exterior Painting */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/exterior-painting.png" 
                    alt="Exterior Painting"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Exterior Painting</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Protect and beautify your home's exterior with our weather-resistant painting solutions and professional techniques.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      House exterior painting
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Weather-resistant coatings
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Surface preparation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Long-lasting finishes
                    </li>
                  </ul>
                </div>
              </div>

              {/* Specialized Finishes */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="h-56 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/services/texture-painting-service.jpg" 
                    alt="Specialized Finishes"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Specialized Finishes</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Add character and style to your home with our specialized painting techniques and textured finishes.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Textured wall finishes
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Faux painting techniques
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Stenciling & patterns
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Custom color mixing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section - Horizontal Cards */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                WHY CHOOSE US
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Benefits of Professional Painting Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover why professional painting services are the smart choice for your home transformation project.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      They Have The Experience And Expertise
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Exterior painting can be a daunting task – it's not as easy as it may seem! Professional painters have the knowledge and skills necessary to guarantee a good painting job. A professional painter will also be able to help you select the right paint colors and finishes for your home.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      They Have The Right Tools And Supplies
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Professional painters also have access to the best tools and supplies. This means that you won't have to worry about buying expensive equipment or materials. The painters will take care of everything.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      It Can Save You Time
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Painting your home can be time-consuming, especially if you're not familiar with the best techniques. Professional painters can do the job quickly and efficiently, so you can spend your time doing what's important to you.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 4 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">
                      It Will Boosts Your Mood And Mental Health
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Studies have shown that our surroundings play a role in our mental health, which is especially true for our homes. A well-painted home can boost your mood and make you feel happier, while a poorly painted home can have the opposite effect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Residential vs Commercial Section - Modern Grid */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                COMPARISON
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Residential Painting vs. Commercial Painting
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Painting your residential painting or commercial property are two very different tasks, each requiring a different set of tools and skills. The increased square footage of a commercial building makes the painting more complicated, not to mention the presence of employees, inventory, and customers in the space.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Size of the Project */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/residential.png" 
                    alt="Residential Project Size"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block bg-[#ED276E] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">1</div>
                  <h3 className="text-xl font-bold mb-4">Size of the Project</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    The scope of a painting project is an indication of the type of painting service needed. Residential painting projects include houses, townhouses, condominiums, and other living spaces.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Commercial painting focuses on larger projects. The types of buildings range from retail shops and shopping malls to industrial buildings and airports.
                  </p>
                </div>
              </div>

              {/* Number of Painters */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/team-pic.png" 
                    alt="Team of Painters"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block bg-[#ED276E] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">2</div>
                  <h3 className="text-xl font-bold mb-4">Number of Painters</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Larger commercial buildings require more painters to cover the area of the building and meet deadlines. Commercial painting companies employ more people so that they can finish commercial painting projects on time.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Residential painting projects are smaller in scope and thus does not require that many painters on site.
                  </p>
                </div>
              </div>

              {/* Materials and Equipment */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/scope-of-work.png" 
                    alt="Painting Materials"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block bg-[#ED276E] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">3</div>
                  <h3 className="text-xl font-bold mb-4">Materials and Equipment</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Residential painting contractors are focused solely on smaller residential projects. For this reason, the materials and equipment they use are not too different from paint supplies you can get on your own.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Materials such as paintbrushes, rollers, painting trays, step ladders, drop cloths, and cleaning materials are typical of what a residential painter will use on the job.
                  </p>
                </div>
              </div>

              {/* Services Provided */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/Commercial.png" 
                    alt="Commercial Services"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block bg-[#ED276E] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">4</div>
                  <h3 className="text-xl font-bold mb-4">Services Provided</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Commercial painting contractors usually offer additional services than residential painting contractors. Some services include industrial painting and coating, special surface preparation, metalizing, epoxy coatings, sandblasting, and various other services related to businesses.
                  </p>
                </div>
              </div>

              {/* Scheduling */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/consultation.png" 
                    alt="Project Scheduling"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block bg-[#ED276E] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">5</div>
                  <h3 className="text-xl font-bold mb-4">Scheduling</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Commercial painting is done according to the schedule of business owners and operations. Scheduling can be quite challenging for businesses, as most want to stay open for the customers as their establishments go through a renovation project at the same time.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Some commercial building owners request that painters work around these issues and not interfere with their working hours.
                  </p>
                </div>
              </div>

              {/* Home Value */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/studies-shows.png" 
                    alt="Home Value Increase"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <div className="inline-block bg-[#ED276E] text-white px-3 py-1 rounded-full text-sm font-medium mb-4">6</div>
                  <h3 className="text-xl font-bold mb-4">Increase Your Home Value</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    A well-painted home looks great and is much more likely to sell quickly and for a higher price than a home that hasn't been painted.
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    If you're interested in selling your home shortly, it might be worth considering investing in a fresh coat of paint.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - Modern Timeline */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                OUR PROCESS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Painting Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Some steps we have made and wish that our clients also understand this so that they have nothing to worry about:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/consultation.png" 
                    alt="Consultation Process"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Consultation</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When you contact us then our representative will meet the client to discuss the project. The main aim of this is to find what type of taste has a client. What he wants in his dream house. Here we talk about trendy colours, the latest paints and discuss your ideas.
                  </p>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/scope-of-work.png" 
                    alt="Scope of Work"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Scope of Work</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Before house winter comes to your house is a roadmap for good initiation. It contains the list of documentation warranty details which type of paint you want, primer, etc. The "Colour Schedule" lists the room colours and is prepared by a colour consultant or designer.
                  </p>
                </div>
              </div>
              
              <div className="group bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/services/The Actual Residential Painting Work.png" 
                    alt="Actual Painting Work"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">The Actual Residential Painting Work</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When our house painters start the work they properly ensure that all your belongings are safe. If not, they first cover all the things with plastic or cloth. They always ask your preference like Which room you want to go to first.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* CTA Section - Full Width Gradient */}
        <section className="py-20 bg-gradient-to-r from-[#ED276E] to-[#299dd7] w-full mt-16">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Let our experienced team bring your vision to life with professional residential painting services. Contact us today for a free consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                href="/enquiry" 
                className="bg-white text-[#ED276E] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-lg"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/colour-visualiser" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#ED276E] transition duration-300 text-lg"
              >
                Try Color Visualizer
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
            <Link href="/colour-visualiser" className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
              Color Visualiser
            </Link>
          </div>
        </div>
        
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Residential;
