
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

const Commercial: React.FC = () => {
  return (
    <>
      <Head>
        <title>Commercial Painting Services | Office Painting Contractors | Shop Painters | Home Glazer</title>
        <meta name="description" content="Home Glazer offers professional commercial painting services for offices & shops. Expert office painting contractors with 35+ years experience. Call us for office color combination ideas and commercial painting solutions." />
        <meta name="keywords" content="commercial painting, office painting, shop painting, office painting contractors, commercial painters, office color combination" />
        <meta property="og:title" content="Commercial Painting Services | Office Painting Contractors | Shop Painters | Home Glazer" />
        <meta property="og:description" content="Home Glazer offers professional commercial painting services for offices & shops. Expert office painting contractors with 35+ years experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/painting/commercial" />
        <meta property="og:image" content="https://homeglazer.com/uploads/services/commercial-hero.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/painting/commercial" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Commercial Painting Services | Home Glazer" />
        <meta name="twitter:description" content="Professional commercial painting services for offices, retail, and industrial spaces." />
        <meta name="twitter:image" content="https://homeglazer.com/uploads/services/commercial-hero.jpg" />
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
                <BreadcrumbLink href="/services/painting">Painting Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/painting/commercial">Commercial Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img
              src="/uploads/services/commercial-hero.jpg"
              alt="Commercial Painting Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Commercial Painting Services
                  </h2>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Professional painting solutions for offices, shops, and commercial spaces
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
                      <p className="text-sm opacity-90">Trusted by 1000+ businesses</p>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Home Glazer at Commercial Painting Services
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Delhi NCR has been the hub of workplaces throughout the time and commercial painting is very important as colours make the difference between formal and informal. Commercial Painting is an art that speaks, we can always understand that the colour code of home and office is not the same. So, we provide commercial painting services to clients who want their workplaces to be painted with perfection.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Home Glazer is professionally perfect for making your workplace look fabulous. We use the best quality colours and staff are trained in commercial painting. Our commercial painting services are already making some good names in many workplaces. The commercial area includes business areas, cafeterias, office buildings and so on.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We are taking care of all your needs, be it small or big, Home Glazer will be with you. Many service providers' tools and paints are below the standards but our team will make you trust on quality and standards. The painting service we give is not for months but for years. The paint we use can withstand rough weather and is very much durable. We make sure that we care about the commercial look of the place when we are painting any site.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/commercial-intro.jpg" 
                    alt="Commercial Painting Services"
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

        {/* What Is a Commercial Painter Section */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/commercial-painter.jpg" 
                    alt="Commercial Painter"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  What Is a Commercial Painter?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  A commercial painter is skilled and trained in painting the interior and exterior of commercial properties. They typically work for a local company or a contractor. Commercial painters boast expertise in various painting techniques and materials, with extensive knowledge of different types of surfaces.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  These professionals are adept at using various tools and materials, consistently delivering professional results while working safely and efficiently, even at elevated heights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Is Commercial Painting Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  What Is Commercial Painting?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Commercial painting is a specialized field involving the painting of various commercial structures, such as office buildings, retail stores, restaurants, and warehouses.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  This process, typically larger in scale than residential painting, aims to enhance appearance, protect surfaces, and increase property value. It often requires specialized equipment, techniques, and expertise in job safety and color selection.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Professional commercial painters employ techniques like rolling, brushing, or spraying and understand the importance of surface preparation for a flawless final result. Their skill in selecting complementary colors creates an inviting atmosphere within the painted space, making hiring a professional commercial painter crucial for quality assurance and the successful completion of any commercial painting project.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/uploads/services/commercial-painting.jpg" 
                    alt="Commercial Painting"
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

        {/* What Does a Commercial Painter Do Section */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                What Does a Commercial Painter Do?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Commercial painters artfully tackle a spectrum of responsibilities, including selecting the perfect paint materials, meticulously preparing surfaces, and masterfully applying paint to achieve stunning finishes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Preparing the surfaces
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      As a commercial painter, the crew and all must first prepare the surfaces to be painted. This may involve cleaning the surfaces, removing peeling or damaged paint, filling holes, or repairing damaged areas.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Choosing the right paint or coating
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We also are responsible for selecting the right type of paint or coating for the job. Factors such as the surface material, the preferred appearance, and environmental conditions play a role in paint or coating selection.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Applying the paint or coating
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      As commercial painters, we employ a variety of specialized tools and methods, such as spray guns, rollers, or brushes, to expertly apply paint or coatings to surfaces.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Maintaining a clean workspace
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Following the completion of the painting job, we must ensure that the area is free of excess paint, tools, and debris, leaving it clean and tidy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Hire a Commercial Painter Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Why Hire a Commercial Painter?
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Hiring the services of a commercial painter is advantageous, as they have the knowledge and proficiency required to prepare and paint commercial properties expertly. We also have access to the specialized equipment and materials needed.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Commercial painters have extensive experience that enables them to make informed decisions about color and product selection, which results in a professional finish.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  HomeGlazer often have strong customer service skills and can work efficiently, respecting your business needs and schedule. Our meticulous attention to detail ensures a high-quality result, and their insurance coverage provides peace of mind for potential issues.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1587702068694-a909ef4aa346?w=800&q=80" 
                    alt="Commercial Painter Team"
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

        {/* Commercial Painting Services: When To Use Them Section */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Commercial Painting Services: When To Use Them And What To Expect
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                When you're looking for professionals to take care of your painting project, it can be difficult to distinguish between all the different painting companies. You might wonder why a company would advertise that they offer both residential and commercial painting services.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Residential vs Commercial Painting
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Painting contractors whose sole focus is working on residential projects primarily only have experience with homes and other living spaces. Commercial contractors, on the other hand, have both the capacity and experience to handle large-scale painting projects; they mainly work with businesses and commercial spaces.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Residential painting contractors work best with materials used in home-building like siding and wood. Commercial painters, however, deal with a variety of materials like concrete, metal, stucco, and materials used in homes. This said, when you're ready to paint your retails stores, restaurants, manufacturing sites, schools, hospitals or any other large-scale project, call a commercial painter.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <img 
                  src="/uploads/services/commercial-meeting.jpg" 
                  alt="Commercial vs Residential Painting"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What should you expect?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Because commercial painting companies employ a large number of painters, they can complete projects quickly, and in the case of urgent work, a commercial painting company can often respond on short notice. Once you hire the commercial painting company, you can expect them to work within your schedule and complete the project on time.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    A commercial painting company may also be able to offer you a wider range of services than a residential painter could.
                  </p>
                </div>
                <div>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Another difference between the two different kinds of contractors is that commercial painters have the equipment required for large-scale projects. Commercial painting requires cherry picker cranes and other specific industrial tools that a residential painter may not have access to.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The bottom line is that if you want your house painted, a residential painter will do a great job. However, if what you have at hand is a larger painting project, your best bet would be to source commercial painters. At HomeGlazer, we specialize in both residential and industrial painting services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Our Commercial Painting Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive painting solutions tailored for different types of commercial spaces and requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Office Painting */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-56 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
<img 
                  src="/uploads/services/commercial-intro.jpg" 
                    alt="Office Painting"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Office Painting</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Transform your office environment with professional painting services that create a productive and welcoming atmosphere for employees and clients.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Conference room painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Reception area painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Workspace painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Brand color integration
                    </li>
                  </ul>
                </div>
              </div>

              {/* Retail & Shop Painting */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-56 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
                  <img 
                    src="/uploads/services/commercial-intro.jpg" 
                    alt="Retail & Shop Painting"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Retail & Shop Painting</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Enhance your retail space with professional painting that attracts customers and creates an inviting shopping environment.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#299dd7] rounded-full mr-3"></span>
                      Storefront painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#299dd7] rounded-full mr-3"></span>
                      Display area painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#299dd7] rounded-full mr-3"></span>
                      Customer service areas
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#299dd7] rounded-full mr-3"></span>
                      Brand-consistent colors
                    </li>
                  </ul>
                </div>
              </div>

              {/* Industrial Painting */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-56 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
                  <img 
src="/uploads/services/commercial-painter.jpg"
                    alt="Industrial Painting"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Industrial Painting</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Durable painting solutions for warehouses, factories, and industrial facilities that withstand harsh conditions and heavy use.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Warehouse painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Factory floor painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Equipment painting
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#ED276E] rounded-full mr-3"></span>
                      Safety marking
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Benefits of Professional Commercial Painting
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover why professional commercial painting services are the smart choice for your business transformation project.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Professional Expertise
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Our experienced team understands commercial painting requirements and delivers results that meet industry standards and your specific needs.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 2 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Minimal Business Disruption
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We work efficiently and schedule projects to minimize disruption to your business operations, often working after hours when needed.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Premium Quality Materials
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      We use high-quality commercial-grade paints and materials that provide durability, easy maintenance, and long-lasting finishes.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Enhanced Brand Image
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Professional painting enhances your brand image, creates positive impressions on clients, and improves employee morale and productivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <h2 className="text-[#ED276E] text-4xl font-medium text-center mb-12">
              Our Commercial Painting Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Site Assessment</h3>
                <p className="text-gray-600">
                  We conduct a thorough assessment of your commercial space to understand the scope, requirements, and any specific challenges.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Planning & Scheduling</h3>
                <p className="text-gray-600">
                  We develop a detailed plan and schedule that minimizes disruption to your business operations and ensures timely completion.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Execution</h3>
                <p className="text-gray-600">
                  Our skilled team executes the painting project with precision, using commercial-grade materials and professional techniques.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Assurance</h3>
                <p className="text-gray-600">
                  We conduct thorough quality inspections to ensure the finished result meets commercial standards and your expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-[#ED276E] to-[#299dd7] w-full mt-16">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-white text-4xl font-medium mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Let our experienced team enhance your commercial space with professional painting services. Contact us today for a free consultation and quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/enquiry" 
                className="bg-white text-[#ED276E] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/colour-visualiser" 
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#ED276E] transition duration-300"
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

export default Commercial;
