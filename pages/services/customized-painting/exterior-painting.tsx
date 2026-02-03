
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
const EXTERIOR_HERO_IMAGE = "/assets/images/outdoor/outdoor1/outdoor1.jpg";

const ExteriorPainting: React.FC = () => {
  return (
    <>
      <Head>
        <title>Exterior Painting Services | Professional House Exterior Painters | Home Glazer</title>
        <meta name="description" content="Transform your home's exterior with our professional exterior painting services. Expert house painters delivering quality exterior painting with 35+ years of experience. Get free consultation today!" />
        <meta name="keywords" content="exterior painting, house exterior painters, exterior house painting, home exterior painting services, professional exterior painters" />
        <meta property="og:title" content="Exterior Painting Services | Professional House Exterior Painters | Home Glazer" />
        <meta property="og:description" content="Transform your home's exterior with our professional exterior painting services. Expert house painters delivering quality exterior painting with 35+ years of experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/customized-painting/exterior-painting" />
        <meta property="og:image" content={`${SITE_URL}${EXTERIOR_HERO_IMAGE}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/customized-painting/exterior-painting" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Exterior Painting Services | Home Glazer" />
        <meta name="twitter:description" content="Professional exterior painting services for homes and buildings." />
        <meta name="twitter:image" content={`${SITE_URL}${EXTERIOR_HERO_IMAGE}`} />
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
                <BreadcrumbLink href="/services/customized-painting">Customized Painting</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/customized-painting/exterior-painting">Exterior Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img 
              src={EXTERIOR_HERO_IMAGE} 
              alt="Exterior Painting Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Exterior Painting Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your home's exterior with professional painting services that protect and beautify
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

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  ABOUT HOME GLAZER
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Home Glazer at Exterior Painting
                </h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    The exterior look of your house is critically important. The paint on a house is one of the first things people notice about it. After a time, the exterior painting of your house gets affected due to rain, cold, heat, and looks dull.
                  </p>
                  <p>
                    Exterior painting is completely different from interior painting. It requires more tools and equipment, and sometimes scaffolding could be required if the building is high.
                  </p>
                  <p>
                    An exterior paint makes your home look better. Your home will look younger and stronger. Nicely painted exterior walls of your home will also increase its curb appeal. A great looking paint job can make the kind of positive first lasting impression that sticks with people for long. A beautiful colour combination on your house's exterior can certainly catch more eyeballs and would be an absolute sparkle in your neighbourhood.
                  </p>
                  <p>
                    At Home Glazer, we are specialized in exterior painting, ensuring that you have a home that looks incredible all over. Our painters are trained in a manner to cater to all your exterior painting requirements. We at Home Glazer, can handle both types of work whether it is repainting or first time painting. We use high-quality materials and techniques. So, your home's exterior will maintain that "just painted" look for a longer period of time.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-xl">
                  <img 
                    src="/assets/images/outdoor/outdoor3/outdoor3.jpg" 
                    alt="Professional Exterior Painting"
                    className="w-full h-96 object-cover rounded-xl"
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

        {/* What is Exterior Painting Section - New Style */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                KNOWLEDGE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What is Exterior Painting?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Understanding the fundamentals of exterior painting and its importance for your home.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-6">Exterior Home Painting Definition</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Exterior home painting refers to the process of applying paint or protective coatings to the outer surfaces of a home or building. It involves coating the exterior walls, doors, windows, trims, and other outdoor elements with paint to enhance the appearance and protect the surfaces from weathering and damage.
                    </p>
                    <p>
                      The choice of exterior house colours is a crucial aspect of exterior painting as it can significantly impact the overall curb appeal and aesthetic appeal of a home. Exterior home painting typically requires durable and weather-resistant paints that can withstand exposure to sunlight, rain, wind, and other elements for an extended period.
                    </p>
                    <p>
                      Also exterior house colours play an important role to make your house standout and make it look aesthetic.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-6">
                    <img 
                      src="/assets/images/outdoor/outdoor2/outdoor2.jpg" 
                      alt="Exterior Painting Process"
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-[#ED276E] text-white rounded-xl p-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">35+</div>
                      <div className="text-sm">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Techniques Section - New Style */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                TECHNIQUES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Techniques for Exterior Painting
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Professional techniques and best practices for achieving beautiful and long-lasting exterior paint results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Prep the Surface</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Begin by thoroughly cleaning the exterior surface, and removing dirt, grime, and loose paint. Repair any cracks or holes and ensure a smooth surface.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Choose the Right Paint</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Opt for high-quality exterior paint that is specifically designed for outdoor use. Consider factors like weather resistance and durability.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-center">Proper Timing</h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Avoid painting in extreme temperatures or during rainy or humid weather as it can affect the drying and bonding process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Colors Section - New Style */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                COLOR GUIDE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Choose Best Colours for Home Exterior Walls
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Selecting the right exterior wall paint colour according to vastu can create a harmonious environment and positive energy flow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold mb-3">Earthy Tones</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Opt for earthy colours like beige, light yellow, or light brown for a warm and welcoming feel.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold mb-3">White</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  White is considered auspicious and brings purity and clarity. It is a versatile choice that goes well with any architectural style.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-blue-400 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold mb-3">Blues and Greens</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Shades of blue and green are associated with tranquillity and abundance. They promote a sense of peace and harmony.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-red-400 rounded-full"></div>
                </div>
                <h3 className="text-lg font-bold mb-3">Accent Colors</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Add pops of vibrant colours as accents on doors, windows, or other architectural features to create visual interest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Exterior Paint Section - New Style */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                PAINT TYPES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Types Of Exterior Paint
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                When it comes to choosing the right exterior paint for your home, there are several types to consider.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-400">
                <h3 className="text-2xl font-bold mb-4">Latex or Water-based</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Latex paint is a popular choice for exterior walls due to its durability, easy application, and quick drying time. It is also resistant to cracking, peeling, and fading.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Easy application
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Quick drying
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Resistant to cracking
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-green-400">
                <h3 className="text-2xl font-bold mb-4">Oil-based</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Oil-based paints provide a more durable finish and are ideal for surfaces that require extra protection, such as wood or metal. They are known for their long-lasting performance.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Durable finish
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Extra protection
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Long-lasting performance
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-400">
                <h3 className="text-2xl font-bold mb-4">Elastomeric</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Elastomeric paint is highly flexible and can expand and contract with temperature changes. It is ideal for areas prone to cracking, such as stucco or concrete walls.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Highly flexible
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Temperature resistant
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                    Excellent waterproofing
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tools and Equipment Section - New Style */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                TOOLS & EQUIPMENT
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Tools and Equipment for Exterior Painting
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Having the right tools and equipment is essential to achieve professional-looking results.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Essential Tools</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">Ladders and Scaffolding</h4>
                      <p className="text-gray-600 text-sm">Exterior painting often requires working at heights. Having sturdy ladders and scaffolding ensures safe access to all areas of the house.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">Paint Brushes and Rollers</h4>
                      <p className="text-gray-600 text-sm">A variety of paint brushes and rollers are available to cater to different surfaces and textures.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">Pressure Washers</h4>
                      <p className="text-gray-600 text-sm">Before starting any painting project, it's important to thoroughly clean the surface. Pressure washers help remove dirt, grime, and loose paint.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6">Professional Equipment</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">Airless Paint Sprayers</h4>
                      <p className="text-gray-600 text-sm">These powerful sprayers are ideal for large-scale painting projects, such as commercial buildings and warehouses.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">Sanding Tools</h4>
                      <p className="text-gray-600 text-sm">Sanding is necessary to create a smooth and even surface before painting. Tools such as sandpaper, sanding blocks, and electric sanders.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900">Paint Mixers</h4>
                      <p className="text-gray-600 text-sm">For large quantities of paint, paint mixers ensure thorough mixing and consistency throughout the project.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                OUR SERVICES
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Exterior Painting Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive exterior painting solutions designed to protect and beautify your home with professional expertise and quality materials.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Repainting */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/services/Exterior%20Repainting.png" 
                    alt="Exterior Repainting"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Repainting</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Professional repainting services to restore your home's exterior beauty and protection.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Surface preparation & repair
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Quality paint application
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Weather-resistant coatings
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Long-lasting finishes
                    </li>
                  </ul>
                  <Link 
                    href="/enquiry" 
                    className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#ED276E]/90 hover:to-[#299dd7]/90 transition duration-300 transform hover:scale-105"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>

              {/* First Time Painting */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/services/Exterior%20First%20Time%20Painting.png" 
                    alt="First Time Painting"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">First Time Painting</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Complete exterior painting solutions for new homes and first-time painting projects.
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Surface assessment
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Primer application
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Color consultation
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Professional finish
                    </li>
                  </ul>
                  <Link 
                    href="/enquiry" 
                    className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#ED276E]/90 hover:to-[#299dd7]/90 transition duration-300 transform hover:scale-105"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>

              {/* Texture Painting */}
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                <div className="h-56 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src="/uploads/services/Exterior%20Texture%20Painting.png" 
                    alt="Texture Painting"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Texture Painting</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Add character and dimension to your home's exterior with our texture painting services.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Custom textures
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Professional tools
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Weather resistance
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></div>
                      Unique finishes
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                WHY CHOOSE US
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Benefits of Exterior Painting Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover why professional exterior painting services are the smart choice for your home transformation project.
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
                      Makes Your House Stand Out
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Everyone wants their home to represent who they are - look as great as they are. The best way to achieve this and leave a lasting impression is by keeping the outside looking impressive. A great exterior paint job is a significant step towards creating an excellent curb appeal.
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
                      Increases Home Value
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      You have invested a lot to make your home valuable, but to ensure its value keeps rising, you must maintain its exterior looking fresh and sharp. An impressive surface will create an excellent first impression on visitors and home buyers, which means higher resale value.
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
                      Repairs Damages
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      When applying a coat of paint on the exterior, professional painters will look at other more significant issues you might not have noticed. With time, mold, mildew, rotting wood, and water stains can begin to eat into your walls, and regular painting will reveal such damages before they become apparent.
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
                      Protects from Elements
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      A fresh exterior house painting job does more than make your property look great; it adds a layer of protection from different elements such as weather damage, dust, and insects. Quality paints can also prevent the wood from rotting. This helps you to avoid more considerable exterior house painting costs in the future.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                OUR PROCESS
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Exterior Painting Process
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Professional steps we follow to ensure your exterior painting project is completed with excellence and attention to detail.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">Repainting Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#ED276E] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Covering the immovable items</h4>
                      <p className="text-gray-600 text-sm">We start with removing the removable and movable items from the exterior wall and cover the unmovable item such as AC, Plans, Geysers, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#ED276E] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Preparing the Surface</h4>
                      <p className="text-gray-600 text-sm">Because of the extreme weather condition the exterior walls could be damaged, so it is important to remove all the dust and flakes from the surface with necessary tools.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#ED276E] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Necessary Repair</h4>
                      <p className="text-gray-600 text-sm">It is seen that the exterior surface requires more repair than the interior. Fix those repairs with a putty and putty knife. Sometimes it requires waterproofing solutions to protect the wall from rain.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#ED276E] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Priming the surface</h4>
                      <p className="text-gray-600 text-sm">One coat of primer is necessary on the surface of exterior areas but before that ensure the repairs are sanded with grit paper and the dust is wiped off.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#ED276E] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">5</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Painting</h4>
                      <p className="text-gray-600 text-sm">If it is a plain exterior painting, it can be simply painted with a brush and roller, 2-3 coats of paint would give the smooth and good look to the exterior.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#ED276E] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">6</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Cleaning</h4>
                      <p className="text-gray-600 text-sm">After the painting work is finished, it is important to uncover all the covered items and clean all the spills and splatter of paint.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">First Time Painting Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#299dd7] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">2-3 Coat of putty</h4>
                      <p className="text-gray-600 text-sm">Putty is a compound mixture of some elements such as white cement, chalk, etc. 2-3 coats of putty provides the smooth base for paint.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#299dd7] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Sanding the surface</h4>
                      <p className="text-gray-600 text-sm">For exterior surface, we recommend 100-grit paper for the sanding process. Sanding must be done with gentle hands not with force.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#299dd7] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Priming the Surface</h4>
                      <p className="text-gray-600 text-sm">Apply one coat of primer on the surface with brush and roller. This creates a smooth base for the final paint colour.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#299dd7] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Texture or Paint</h4>
                      <p className="text-gray-600 text-sm">If the exterior wall needs to be textured, then the painter will use the necessary tool to create texture. And after texture 2-3 coats of paint would be applied.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-[#299dd7] text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">5</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Cleaning</h4>
                      <p className="text-gray-600 text-sm">Cleaning is the most important part of the painting process. Paint jobs would not look good until the area where painting has been done is not clean.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#ED276E] to-[#299dd7] w-full mt-16">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Home's Exterior?
            </h2>
            <p className="text-white text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Let our experienced team bring your vision to life with professional exterior painting services. Contact us today for a free consultation and quote.
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

export default ExteriorPainting;
