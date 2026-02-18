import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getMediaUrl, getAbsoluteMediaUrl } from '@/lib/mediaUrl';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';
const WOOD_POLISH_HERO_IMAGE = "/uploads/services/wood-polish.jpg";

const WoodPolishing: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wood Polishing Services | Professional Wood Restoration & Finishing | Home Glazer</title>
        <meta name="description" content="Home Glazer offers professional wood polishing services for furniture, floors, and wooden surfaces. Expert wood restoration with 35+ years experience in Delhi NCR." />
        <meta name="keywords" content="wood polishing services, wood restoration, wood finishing, furniture polishing, Delhi NCR" />
        <meta property="og:title" content="Wood Polishing Services | Professional Wood Restoration & Finishing | Home Glazer" />
        <meta property="og:description" content="Professional wood polishing services for furniture, floors, and wooden surfaces. Expert wood restoration with 35+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/wood/wood-polishing" />
        <meta property="og:image" content={getAbsoluteMediaUrl(WOOD_POLISH_HERO_IMAGE, SITE_URL)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/wood/wood-polishing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wood Polishing Services | Home Glazer" />
        <meta name="twitter:description" content="Professional wood polishing services for furniture, floors, and wooden surfaces." />
        <meta name="twitter:image" content={getAbsoluteMediaUrl(WOOD_POLISH_HERO_IMAGE, SITE_URL)} />
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
                <BreadcrumbLink href="/services/wood-services">Wood Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/wood/wood-polishing">Wood Polishing</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img
              src={getMediaUrl(WOOD_POLISH_HERO_IMAGE)}
              alt="Wood Polishing Services - Professional Wood Restoration and Finishing"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Wood Polishing Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Professional wood polishing and restoration services to bring new life to your wooden surfaces. Expert craftsmanship for lasting beauty.
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
                      <p className="text-sm opacity-90">Trusted by thousands of customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content sections will be added here */}
        
        {/* 1. Home Glazer at Wood Polishing Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Home Glazer at Wood Polishing
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At Home Glazer, we specialize in providing comprehensive wood polishing services that restore and enhance the natural beauty of wooden surfaces. Our expertise spans from residential furniture to commercial wood installations, ensuring every project receives the attention it deserves.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  With over 35 years of experience in the industry, our team of skilled craftsmen understands the unique characteristics of different wood types and the best polishing techniques for each. We use premium quality materials and advanced restoration methods to deliver results that exceed expectations.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our commitment to quality craftsmanship and customer satisfaction has made us the trusted choice for wood polishing services across Delhi NCR. Whether you need restoration for antique furniture or want to enhance the beauty of your wooden floors, Home Glazer delivers excellence in every project.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src={getMediaUrl("/uploads/services/Home Glazer at Wood Polishing.png")} 
                    alt="Professional Wood Polishing Services by Home Glazer"
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

        {/* 2. Unveiling the Artistry of Wood Polishing Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src={getMediaUrl("/uploads/services/Unveiling the Artistry of Wood Polishing.png")} 
                    alt="Unveiling the Artistry of Wood Polishing - Professional Craftsmanship"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -top-6 -right-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#299dd7] mb-2">100%</div>
                    <div className="text-sm text-gray-600">Artisan Quality</div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Unveiling the Artistry of Wood Polishing
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Wood polishing is an art form that requires skill, patience, and an understanding of the natural characteristics of different wood species. Our craftsmen approach each project with the dedication of artists, carefully revealing the hidden beauty within each wooden surface.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The process involves more than just applying polish—it's about understanding the wood's grain, texture, and history. We use traditional techniques combined with modern technology to achieve results that not only look beautiful but also preserve the wood's integrity for generations to come.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From selecting the right polishing compounds to applying the perfect finish, every step is executed with precision and care. Our artistry transforms worn, dull surfaces into stunning showcases of natural beauty that enhance any space.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Crafting Bespoke Solutions Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Crafting Bespoke Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every wooden surface has its own story and requirements. We create customized solutions that address your specific needs and exceed your expectations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Assessment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Thorough evaluation of your wooden surfaces to determine the best approach for restoration and polishing.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Tailored Techniques</h3>
                <p className="text-gray-600 leading-relaxed">
                  Selection of appropriate polishing methods and materials based on wood type, condition, and desired outcome.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Rigorous quality checks throughout the process to ensure the final result meets our high standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. A Legacy of Excellence Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  A Legacy of Excellence
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  For over three decades, Home Glazer has been at the forefront of wood polishing excellence in Delhi NCR. Our legacy is built on a foundation of unwavering commitment to quality, innovation, and customer satisfaction.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Throughout our journey, we have consistently delivered exceptional results that have earned us the trust and loyalty of thousands of satisfied customers. Our reputation for excellence extends beyond just the quality of our work—it encompasses our entire approach to service delivery.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  From humble beginnings to becoming the region's most trusted name in wood polishing, our legacy continues to grow with each project we undertake. We take pride in maintaining the high standards that have made us the preferred choice for discerning customers.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src={getMediaUrl("/uploads/services/A%20Legacy%20of%20Excellence.png")} 
                    alt="A Legacy of Excellence in Wood Polishing Services"
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

        {/* 5. Embracing Sustainability Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src={getMediaUrl("/uploads/services/Embracing Sustainability.png")} 
                    alt="Embracing Sustainability in Wood Polishing"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -top-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#299dd7] mb-2">Eco</div>
                    <div className="text-sm text-gray-600">Friendly</div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Embracing Sustainability
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At Home Glazer, we recognize our responsibility towards the environment and future generations. Our commitment to sustainability is reflected in every aspect of our wood polishing services, from material selection to waste management.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We use eco-friendly polishing compounds and natural oils that are safe for both the environment and your family. Our processes are designed to minimize waste and reduce our carbon footprint while maintaining the highest quality standards.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  By choosing sustainable practices, we not only protect the environment but also ensure that your wooden surfaces are treated with the most natural and safe products available. This commitment to sustainability sets us apart and demonstrates our dedication to responsible business practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Elevate Your Space with Home Glazer Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Elevate Your Space with Home Glazer
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform your living environment with our professional wood polishing services that bring out the natural beauty and elegance of wooden surfaces
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Residential Transformation</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Restore antique furniture to its former glory</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Enhance wooden floors and staircases</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Revitalize kitchen cabinets and countertops</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Polish wooden doors and window frames</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Commercial Enhancement</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Offices:</strong> Conference tables, reception areas, and wooden wall panels</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Retail Spaces:</strong> Display fixtures, shelving units, and store fittings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Restaurants:</strong> Tables, chairs, bar tops, and wooden accents</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Hotels:</strong> Lobby furniture, room fixtures, and wooden architectural elements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. How does Home Glazer Offers The Best Wood polishing services? Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  How does Home Glazer Offers The Best Wood polishing services?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Our commitment to excellence is reflected in every aspect of our wood polishing services. We combine traditional craftsmanship with modern techniques to deliver results that consistently exceed expectations.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Expert Team</h3>
                    <p className="text-gray-600">Highly skilled craftsmen with decades of experience in wood polishing and restoration techniques.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Premium Materials</h3>
                    <p className="text-gray-600">Use of high-quality, eco-friendly polishing compounds and natural oils for optimal results.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Advanced Techniques</h3>
                    <p className="text-gray-600">Combination of traditional methods and modern technology for superior finish quality.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Quality Assurance</h3>
                    <p className="text-gray-600">Rigorous quality checks and customer satisfaction guarantee for every project.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src={getMediaUrl("/uploads/services/How does Home Glazer Offers The Best Wood polishing services.png")} 
                    alt="How Home Glazer Offers The Best Wood Polishing Services"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Know about the type of wood polishing that you might need Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Know about the type of wood polishing that you might need
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Understanding different types of wood polishing helps you choose the right service for your specific needs. Each type offers unique benefits and finishes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Lacquer Polish */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Lacquer Polish</h3>
                    <p className="text-gray-600 text-sm font-medium">Fast-drying, durable finish</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Fast drying time for quick project completion</li>
                      <li>• Excellent durability and resistance to wear</li>
                      <li>• Smooth, professional finish</li>
                      <li>• Easy to repair and maintain</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Finish & Durability:</h4>
                    <p className="text-gray-600 text-sm">Provides a high-gloss to semi-gloss finish with excellent resistance to scratches, moisture, and daily wear. Perfect for furniture that needs frequent cleaning.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Use Cases:</h4>
                    <p className="text-gray-600 text-sm">Kitchen cabinets, dining tables, office furniture, and any wooden surface that requires a durable, easy-to-maintain finish.</p>
                  </div>
                </div>
              </div>

              {/* Melamine Polish */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Melamine Polish</h3>
                    <p className="text-gray-600 text-sm font-medium">Hard-wearing, moisture-resistant finish</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Superior moisture resistance</li>
                      <li>• Extremely hard and durable surface</li>
                      <li>• Chemical and heat resistance</li>
                      <li>• Long-lasting protection</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Finish & Durability:</h4>
                    <p className="text-gray-600 text-sm">Creates a tough, protective layer that withstands heavy use, moisture, and temperature changes. Offers excellent resistance to chemicals and cleaning agents.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Use Cases:</h4>
                    <p className="text-gray-600 text-sm">Kitchen countertops, bathroom vanities, commercial furniture, and any area exposed to moisture, heat, or heavy traffic.</p>
                  </div>
                </div>
              </div>

              {/* DUCO Paint */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">DUCO Paint</h3>
                    <p className="text-gray-600 text-sm font-medium">Automotive-grade finish for wood</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Automotive-grade durability</li>
                      <li>• High-gloss, mirror-like finish</li>
                      <li>• Excellent color retention</li>
                      <li>• UV and weather resistance</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Finish & Durability:</h4>
                    <p className="text-gray-600 text-sm">Provides a premium, high-gloss finish that rivals automotive paint quality. Offers superior resistance to fading, chipping, and environmental damage.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Use Cases:</h4>
                    <p className="text-gray-600 text-sm">Luxury furniture, musical instruments, high-end cabinetry, and any wooden surface where a premium, automotive-quality finish is desired.</p>
                  </div>
                </div>
              </div>

              {/* Clear PU Polish */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Clear PU Polish</h3>
                    <p className="text-gray-600 text-sm font-medium">Crystal clear, protective finish</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Crystal clear transparency</li>
                      <li>• Excellent water resistance</li>
                      <li>• UV protection for wood</li>
                      <li>• Long-lasting durability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Finish & Durability:</h4>
                    <p className="text-gray-600 text-sm">Creates an invisible protective layer that enhances natural wood beauty while providing superior protection against moisture, UV rays, and wear.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Use Cases:</h4>
                    <p className="text-gray-600 text-sm">Fine furniture, wooden floors, outdoor wooden structures, and any surface where you want to preserve natural wood appearance with maximum protection.</p>
                  </div>
                </div>
              </div>

              {/* PU Paint */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">PU Paint</h3>
                    <p className="text-gray-600 text-sm font-medium">Versatile, durable paint finish</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Wide range of color options</li>
                      <li>• Excellent adhesion to wood</li>
                      <li>• Good chemical resistance</li>
                      <li>• Cost-effective solution</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Finish & Durability:</h4>
                    <p className="text-gray-600 text-sm">Offers a smooth, even finish with good durability and resistance to moisture. Available in various sheens from matte to high-gloss.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Use Cases:</h4>
                    <p className="text-gray-600 text-sm">Children's furniture, decorative pieces, budget-friendly projects, and any wooden surface where color and affordability are priorities.</p>
                  </div>
                </div>
              </div>

              {/* Clear and Pigment Polyester Polish */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Clear & Pigment Polyester Polish</h3>
                    <p className="text-gray-600 text-sm font-medium">Industrial-grade, long-lasting finish</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Benefits:</h4>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Industrial-grade durability</li>
                      <li>• Excellent chemical resistance</li>
                      <li>• Superior scratch resistance</li>
                      <li>• Long service life</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Finish & Durability:</h4>
                    <p className="text-gray-600 text-sm">Provides the highest level of protection and durability among all wood finishes. Resistant to chemicals, abrasion, and extreme conditions.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Typical Use Cases:</h4>
                    <p className="text-gray-600 text-sm">Commercial furniture, industrial applications, high-traffic areas, and any wooden surface that requires maximum protection and longevity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Why You Should Hire Home Glazer? Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src={getMediaUrl("/uploads/services/Why You Should Hire Home Glazer.png")} 
                    alt="Why You Should Hire Home Glazer for Wood Polishing"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Why You Should Hire Home Glazer?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Choosing Home Glazer for your wood polishing needs means selecting a partner who understands the value of quality, reliability, and customer satisfaction. Our proven track record speaks for itself.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Proven Expertise</h3>
                    <p className="text-gray-600">35+ years of experience in wood polishing and restoration across Delhi NCR.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                    <p className="text-gray-600">We stand behind our work with comprehensive quality assurance and customer satisfaction guarantee.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Professional Team</h3>
                    <p className="text-gray-600">Skilled craftsmen who are passionate about their work and committed to delivering excellence.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Competitive Pricing</h3>
                    <p className="text-gray-600">Fair and transparent pricing for premium quality wood polishing services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Home Glazer, The Best Wood Polish Services In Delhi NCR Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Home Glazer, The Best Wood Polish Services In Delhi NCR
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our reputation as the leading wood polishing service provider in Delhi NCR is built on consistent delivery of exceptional results and unwavering commitment to customer satisfaction
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">35+ Years Experience</h3>
                <p className="text-gray-600">
                  Decades of expertise in wood polishing and restoration techniques
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Materials</h3>
                <p className="text-gray-600">
                  Use of high-quality, eco-friendly polishing compounds and materials
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
                <p className="text-gray-600">
                  Skilled craftsmen with specialized training in wood polishing
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  Proven track record of exceeding customer expectations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Wood Polishing Finishes Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Popular Wood Polishing Finishes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most requested wood polishing finishes that can transform any wooden surface
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Natural Finish</h3>
                <p className="text-gray-600 text-sm">Enhance wood's natural beauty with transparent polishing</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">High Gloss</h3>
                <p className="text-sm text-gray-600">Sleek, mirror-like finish for modern aesthetics</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Satin Finish</h3>
                <p className="text-sm text-gray-600">Elegant, low-sheen appearance for subtle beauty</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Distressed Look</h3>
                <p className="text-sm text-gray-600">Vintage, weathered appearance for rustic charm</p>
              </div>
            </div>
          </div>
        </section>

        {/* Wood Polishing Applications & Uses Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Wood Polishing Applications & Uses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the versatile applications of wood polishing across different spaces and surfaces
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Residential Applications</h3>
                <ul className="space-y-3 text-gray-600 mb-8">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Furniture:</strong> Tables, chairs, cabinets, bed frames, and decorative pieces</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Flooring:</strong> Hardwood floors, stairs, and wooden decking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Kitchen & Bath:</strong> Cabinets, countertops, and wooden fixtures</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Doors & Windows:</strong> Interior and exterior wooden doors and window frames</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Outdoor Structures:</strong> Decks, pergolas, fences, and garden furniture</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold mb-6">Commercial Applications</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Offices:</strong> Conference tables, reception areas, and wooden wall panels</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Retail Spaces:</strong> Display fixtures, shelving units, and store fittings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Restaurants:</strong> Tables, chairs, bar tops, and wooden accents</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Hotels:</strong> Lobby furniture, room fixtures, and wooden architectural elements</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src={getMediaUrl("/uploads/services/Wood Polishing Applications & Uses.png")} 
                    alt="Wood Polishing Applications and Uses"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ready to Transform Your Furniture? Section */}
        <section className="py-20 bg-gradient-to-r from-[#ED276E] to-[#299dd7]">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Furniture?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Let our expert wood polishing specialists bring new life to your wooden surfaces with professional restoration and finishing
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

export default WoodPolishing;
