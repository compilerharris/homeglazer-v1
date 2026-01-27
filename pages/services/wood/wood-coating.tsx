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

const WoodCoating: React.FC = () => {
  return (
    <>
      <Head>
        <title>Wood Coating Services | Professional Wood Finishing & Protection | Home Glazer</title>
        <meta name="description" content="Home Glazer offers professional wood coating services for furniture, doors, windows, and outdoor wood surfaces. Expert wood finishing with 35+ years experience." />
        <meta name="keywords" content="wood coating services, wood finishing, wood protection, furniture coating, outdoor wood protection, Delhi NCR" />
        <meta property="og:title" content="Wood Coating Services | Professional Wood Finishing & Protection | Home Glazer" />
        <meta property="og:description" content="Professional wood coating services for furniture, doors, windows, and outdoor wood surfaces. Expert wood finishing with 35+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/wood/wood-coating" />
        <meta property="og:image" content="https://homeglazer.com/uploads/wood-coating.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/wood/wood-coating" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wood Coating Services | Home Glazer" />
        <meta name="twitter:description" content="Professional wood coating services for furniture, doors, windows, and outdoor wood surfaces." />
        <meta name="twitter:image" content="https://homeglazer.com/uploads/wood-coating.png" />
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
                <BreadcrumbLink href="/services/wood/wood-coating">Wood Coating</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img
              src="/uploads/wood-coating.jpg"
              alt="Wood Coating Services - Professional Wood Finishing and Protection"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Wood Coating Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Professional wood coating and finishing services to protect and enhance your wooden surfaces. Expert craftsmanship for lasting beauty.
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
        
        {/* 1. Home Glazer at Wood Coating Services Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Home Glazer at Wood Coating Services
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At Home Glazer, we specialize in providing comprehensive wood coating services that protect and enhance the natural beauty of wooden surfaces. Our expertise spans from residential furniture to commercial wood installations, ensuring every project receives the attention it deserves.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  With over 35 years of experience in the industry, our team of skilled craftsmen understands the unique characteristics of different wood types and the best coating techniques for each. We use premium quality materials and advanced application methods to deliver results that exceed expectations.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our commitment to quality craftsmanship and customer satisfaction has made us the trusted choice for wood coating services across Delhi NCR. Whether you need protection for outdoor wood surfaces or want to enhance the beauty of your indoor furniture, Home Glazer delivers excellence in every project.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/wood-coating-home.jpg" 
                    alt="Professional Wood Coating Services by Home Glazer"
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

        {/* 2. What is Wood Coating Services? Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/wood-coating-what.jpg" 
                    alt="What is Wood Coating Services - Professional Wood Finishing"
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
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  What is Wood Coating Services?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Wood coating services involve the application of protective and decorative finishes to wooden surfaces to enhance their appearance, durability, and resistance to environmental factors. These services are essential for maintaining the beauty and longevity of wooden furniture, doors, windows, and other wooden structures.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The process typically includes surface preparation, cleaning, sanding, and the application of various types of coatings such as varnishes, lacquers, oils, and specialized protective finishes. Each coating type offers different levels of protection and aesthetic appeal, allowing homeowners to choose the best option for their specific needs.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Professional wood coating services ensure that the finish is applied correctly, providing optimal protection against moisture, UV damage, scratches, and wear while maintaining the natural beauty and texture of the wood. This service is particularly important for outdoor wood surfaces that are exposed to harsh weather conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Types of Wood Coating Services Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Types of Wood Coating Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our comprehensive range of wood coating solutions for every type of wooden surface
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Furniture Coating</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional finishing for wooden furniture including tables, chairs, cabinets, and decorative pieces with durable protective coatings.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Door & Window Coating</h3>
                <p className="text-gray-600 leading-relaxed">
                  Protective coatings for wooden doors and windows to enhance durability and resistance to weather elements and daily wear.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Outdoor Wood Protection</h3>
                <p className="text-gray-600 leading-relaxed">
                  Specialized coatings for outdoor wooden structures including decks, fences, pergolas, and garden furniture.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Commercial Wood Coating</h3>
                <p className="text-gray-600 leading-relaxed">
                  Large-scale wood coating projects for commercial spaces, offices, retail stores, and hospitality venues.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Restoration & Refinishing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Restoration services for antique furniture and wooden surfaces, bringing new life to cherished pieces.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Finishes</h3>
                <p className="text-gray-600 leading-relaxed">
                  Personalized coating solutions tailored to specific design requirements and aesthetic preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Benefits of Professional Wood Coating Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Benefits of Professional Wood Coating Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover why professional wood coating services are essential for protecting and enhancing your wooden surfaces
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Protection & Durability</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Enhanced resistance to moisture, humidity, and temperature changes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Protection against UV damage and fading</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Increased resistance to scratches, dents, and daily wear</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Longer lifespan for wooden surfaces and furniture</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Aesthetic Enhancement</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Enhanced natural wood grain and texture</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Custom color matching and finish options</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Professional appearance that adds value to your property</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Consistent finish across all wooden surfaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. How to Maintain Coated Wood Surfaces? Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  How to Maintain Coated Wood Surfaces?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Proper maintenance is crucial for preserving the beauty and longevity of your coated wood surfaces. Regular care ensures that your investment continues to look great and provides optimal protection for years to come.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Regular Cleaning</h3>
                    <p className="text-gray-600">Use a soft, damp cloth to remove dust and dirt. Avoid harsh chemicals that can damage the coating.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Avoid Direct Sunlight</h3>
                    <p className="text-gray-600">Protect wood surfaces from prolonged exposure to direct sunlight to prevent fading and damage.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Control Humidity</h3>
                    <p className="text-gray-600">Maintain consistent humidity levels to prevent wood expansion and contraction.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Professional Inspection</h3>
                    <p className="text-gray-600">Schedule regular professional inspections to identify and address any issues early.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/How%20to%20Maintain%20Coated%20Wood%20Surfaces.png" 
                    alt="Maintaining Coated Wood Surfaces - Professional Care Tips"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. What is the best way to protect my outdoor wood windows, balconies, and doors? Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/What%20is%20the%20best%20way%20to%20protect%20my%20outdoor%20wood%20windows,%20balconies,%20and%20doors.png" 
                    alt="Protecting Outdoor Wood Windows, Balconies, and Doors"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  What is the best way to protect my outdoor wood windows, balconies, and doors?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Outdoor wood surfaces require specialized protection due to constant exposure to weather elements. The best approach involves multiple layers of protection and regular maintenance to ensure long-lasting durability.
                </p>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">Weather-Resistant Coatings</h3>
                    <p className="text-gray-600">Use specialized outdoor wood coatings that provide UV protection, water resistance, and temperature stability.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">Regular Maintenance Schedule</h3>
                    <p className="text-gray-600">Implement a maintenance routine that includes cleaning, inspection, and re-coating as needed.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-2">Professional Application</h3>
                    <p className="text-gray-600">Ensure proper surface preparation and professional application for optimal protection and longevity.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. How Can I Select Wood Paint Finishes for My Home Furniture? Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  How Can I Select Wood Paint Finishes for My Home Furniture?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Choosing the right wood paint finish for your furniture involves considering several factors including the type of wood, intended use, desired appearance, and maintenance requirements. Professional guidance can help you make the best choice for your specific needs.
                </p>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Consider Wood Type</h3>
                    <p className="text-gray-600">Different wood species react differently to various finishes, affecting the final appearance and durability.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Assess Usage Requirements</h3>
                    <p className="text-gray-600">High-traffic areas need more durable finishes, while decorative pieces can use more delicate options.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Match Interior Design</h3>
                    <p className="text-gray-600">Choose finishes that complement your overall interior design theme and color scheme.</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Consult Professionals</h3>
                    <p className="text-gray-600">Seek expert advice to understand the best options for your specific furniture and requirements.</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/How Can I Select Wood Paint Finishes for My Home Furniture.png" 
                    alt="Selecting Wood Paint Finishes for Home Furniture"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. What makes Home Glazer unique and worthy? Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                What makes Home Glazer unique and worthy?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the unique qualities that set Home Glazer apart in the wood coating industry
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">35+ Years Experience</h3>
                <p className="text-gray-600">
                  Decades of expertise in wood coating and finishing techniques
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Premium Materials</h3>
                <p className="text-gray-600">
                  Use of high-quality coatings and materials for lasting results
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Expert Team</h3>
                <p className="text-gray-600">
                  Skilled craftsmen with specialized training in wood finishing
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Customer Satisfaction</h3>
                <p className="text-gray-600">
                  Proven track record of exceeding customer expectations
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional sections will be added here */}
        
        {/* Popular Wood Coating Patterns Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Popular Wood Coating Patterns
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our most requested wood coating patterns and finishes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Natural Wood Grain</h3>
                <p className="text-gray-600 text-sm">Enhance the natural beauty of wood with transparent finishes</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Distressed Finish</h3>
                <p className="text-sm text-gray-600">Vintage, weathered appearance for rustic charm</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">High Gloss</h3>
                <p className="text-sm text-gray-600">Sleek, modern finish with maximum shine</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Matte Finish</h3>
                <p className="text-sm text-gray-600">Subtle, elegant appearance without shine</p>
              </div>
            </div>
          </div>
        </section>

        {/* Wood Coating Applications & Uses Section */}
        <section className="py-20 bg-gray-50">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Wood Coating Applications & Uses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the versatile applications of wood coating across different spaces and surfaces
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Residential Applications</h3>
                <ul className="space-y-3 text-gray-600 mb-8">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Furniture:</strong> Tables, chairs, cabinets, bed frames, and decorative pieces</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Doors & Windows:</strong> Interior and exterior wooden doors and window frames</span>
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
                    <span><strong>Outdoor Structures:</strong> Decks, pergolas, fences, and garden furniture</span>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Commercial Applications</h3>
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
                    src="/uploads/services/Wood Coating Applications & Uses.png" 
                    alt="Wood Coating Applications and Uses"
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
              Let our expert wood coating specialists bring new life to your wooden surfaces with professional finishing and protection
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

export default WoodCoating;
