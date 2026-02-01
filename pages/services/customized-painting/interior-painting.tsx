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

const InteriorPainting: React.FC = () => {
  return (
    <>
      <Head>
        <title>Interior Painting Services | Professional Interior Painters | Home Glazer</title>
        <meta name="description" content="Transform your home's interior with our professional interior painting services. Expert interior painters delivering quality painting with 35+ years of experience. Get free consultation today!" />
        <meta name="keywords" content="interior painting, interior painters, interior house painting, home interior painting services, professional interior painters" />
        <meta property="og:title" content="Interior Painting Services | Professional Interior Painters | Home Glazer" />
        <meta property="og:description" content="Transform your home's interior with our professional interior painting services. Expert interior painters delivering quality painting with 35+ years of experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/customized-painting/interior-painting" />
        <meta property="og:image" content="https://homeglazer.com/uploads/interior-painting.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/customized-painting/interior-painting" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Interior Painting Services | Home Glazer" />
        <meta name="twitter:description" content="Transform your home's interior with professional interior painting services." />
        <meta name="twitter:image" content="https://homeglazer.com/assets/images/bedroom/bedroom1/bedroom1.jpg" />
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
                <BreadcrumbLink href="/services/customized-painting/interior-painting">Interior Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img 
              src="/assets/images/bedroom/bedroom1/bedroom1.jpg" 
              alt="Interior Painting Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Interior Painting Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your home's interior with professional painting services that enhance beauty and comfort
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
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#ED276E] transition duration-300 text-center"
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
                      <p className="text-sm opacity-90">Based on 500+ reviews</p>
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
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Home Glazer at Interior Painting
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Interior painting is the process of painting the interior of your home. It is the best way to improve the look and feel of your home. Home Glazer offers a complete range of interior painting services in the most convenient, efficient & economical ways. We also offer decorative coatings, protective concrete coatings, wall coverings, faux painting, Ceiling and crack repairs, and plastering and plastering repair of your interior residential and commercial property. HomeGlazer team paint it all! Kitchens, bathrooms, dining rooms, hallways, bedrooms, family rooms, cabins, and everything in between.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We take the time to understand your need and vision for painting your house, office, shop, etc. We are confident you will be pleased by hiring us as your home painter! Refreshing your office, cabin, entire home, updating a room or two, or simply painting trim, our dedicated team is ready to get to work. For this we have the tools and expertise to help you create the home of your dreams. Our trained and skilled painters can paint every kind of place in your interior; no matter it's too big or too small. Over the years, we have helped homeowners with a wide variety of interior painting services.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Interior Painting Process Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Interior Painting Process
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Repainting Process */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-center">Repainting</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Packaging and masking</h4>
                      <p className="text-gray-600 text-sm">We start it by emptying the room by moving the furniture to another room. We always cover the floor and anything you store in the center of the room's plastic sheet. We use painter's tape (masking tape) to mask off your moldings, windows, doors, switchboards, etc.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Necessary Repair</h4>
                      <p className="text-gray-600 text-sm">We start with repairing and fixing every dents, chip, or crack over the wall and ceiling with POP (Plaster of Paris), Wall Putty, Gypsum Compounds, etc. This is the most important part of repainting and it also ensures the smooth surface for paint.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Preparing the surface</h4>
                      <p className="text-gray-600 text-sm">If the walls are already glossy or slick, the paint might have a harder time adhering to the existing finish. We use fine-grit sandpaper, like 150-grit or 180-grit, and go over the walls lightly in a circular motion.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">One coat of primer</h4>
                      <p className="text-gray-600 text-sm">This creates a smooth base for the final paint colour and it's also smart to prime before painting. It blocks stains from bleeding through. It also improves paint adhesion, resulting in reduced blisters and peeling.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2-3 Coat of Paint</h4>
                      <p className="text-gray-600 text-sm">We start with the ceiling and walls later. We move quickly from one section to the next to make sure the paint along the edge doesn't dry before we paint the adjoining section. and this helps us in avoiding the laps marks. We wait for the first coat of paint to dry completely. We paint second and respective coats with the same care and techniques.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cleaning</h4>
                      <p className="text-gray-600 text-sm">After the client's satisfaction, we start the cleaning process. We remove all masking tape and gather plastic sheets. Making sure any spills or splatters are dry before we move them. And finally, we put everything back in the room at their place.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* First Time Painting Process */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6 text-center">First Time Painting</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Priming the surface</h4>
                      <p className="text-gray-600 text-sm">For some surfaces (POP Punning area and drywall), one coat of primer should be applied before putty. Because of primer's adhesive quality it creates the perfect surface for putty.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2 Coat of putty</h4>
                      <p className="text-gray-600 text-sm">Putty is a compound mixture of some elements such as white cement, chalk, etc. 2-3 coats of putty provide a smooth base for ceiling and walls for paint.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sanding the Uneven Surface</h4>
                      <p className="text-gray-600 text-sm">We use fine-grit sandpaper, like 150-grit or 180-grit, and go over the walls lightly in a circular motion to remove the loose and small particles. When the grit of one section becomes covered with dust, we switch to an unused section and continue, after this we wipe down the walls with a dry cloth to remove any dust.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">One Coat of Primer</h4>
                      <p className="text-gray-600 text-sm">This creates a smooth base for the final paint colour and it's also smart to prime before painting. It blocks stains from bleeding through. It also improves paint adhesion, resulting in reduced blisters and peeling.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">3 Coat of Paint</h4>
                      <p className="text-gray-600 text-sm">We start with the ceiling and walls later. We move quickly from one section to the next to make sure the paint along the edge doesn't dry before we paint the adjoining section. and this helps us in avoiding the laps marks. We wait for the first coat of paint to dry completely. We paint second and respective coats with the same care and techniques.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cleaning</h4>
                      <p className="text-gray-600 text-sm">After completion of paintwork, our team ensures the area we have painted is absolutely clean. We clean every spill or splatters of paint and handover the clean and tidy area to our client.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Include Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our interior painting services include but are not limited to
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Interior wall painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Doors and window painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Furniture wood coating</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Trim painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Cabinet painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Kitchen and bathroom painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Ceiling painting</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full"></div>
                    <span className="text-gray-700">Fence Painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full"></div>
                    <span className="text-gray-700">Ceiling and Crack repairs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full"></div>
                    <span className="text-gray-700">Wallcovering</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full"></div>
                    <span className="text-gray-700">Playhouses</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full"></div>
                    <span className="text-gray-700">Stencil Painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full"></div>
                    <span className="text-gray-700">Basement Painting</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full"></div>
                    <span className="text-gray-700">Parking Painting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Paint Finishes Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Types of paints finishes for interior walls
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                At HomeGlazer, you can get the best interior paint for your home and make it look stunning. You can choose a paint type depending on your preferences, budget, and desired look and feel. There are several types of paint finishes for interior walls, including:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Eggshell</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A popular choice for indoor walls, eggshell paint has a smooth finish and low sheen. It's easier to wash than flat paint and is more resistant to scuffs and stains, but it's not as durable as glossier finishes.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Semi-gloss</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A durable, stain-resistant, and slick finish that's often recommended for kitchen and bathroom walls, as well as hallways, children's play areas, and front entrances.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Gloss</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A popular choice for both interior and exterior painting, gloss paint has a higher sheen than matte and acrylic paints. It's easy to clean and hard-wearing, making it a good choice for kitchens and bathrooms.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Satin</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A medium-level sheen that's good for areas that need a little extra shine, like trim, wainscoting, and doors. Satin paint protects walls from moisture, making it a good choice for kitchens and bathrooms.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Flat</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A matte finish that's good for interior walls, especially those with flaws or cracks. Flat paints hide problem areas well and are easy to touch up.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Matte</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A flat, non-reflective paint with a rough, grainy texture that's good for surfaces where you don't want reflections. Matte paint can also cover imperfections on walls.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Metallic</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A sparkly finish that comes from metallic powder or flakes in the paint. Metallic paints come in a variety of colors and finishes for both interior and exterior use.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Textured</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A water-based paint that gives walls a rich, rustic appearance. Textured paint is not commonly used and is usually only applied to a few walls.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-600">
                When choosing a paint finish, you can consider factors like durability, weather, moisture, traffic, and cleanability.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Benefits of Having a Professional Painter Paint Your Home
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                There are several benefits to painting the interior of your home, including:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Improved air quality</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Low VOC paints can reduce odors and fumes, which can help keep your family safe from airborne diseases.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Protection from moisture and mold</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A fresh coat of paint can protect your walls from moisture and mold, ensuring the structural integrity of your home.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Enhanced aesthetics</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional painting can transform the look and feel of your home, creating a more welcoming and beautiful living space.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Increased property value</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Well-maintained and professionally painted interiors can significantly increase the resale value of your property.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Long-lasting results</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional painting techniques and high-quality materials ensure that your paint job lasts for years to come.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Time and cost savings</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Professional painters work efficiently and use the right techniques, saving you time and money in the long run.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paint Brands Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Best Interior Paint Brands
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                There are a ton of interior paints on the market, but which one is the best for your home? We have put together a list of the best interior paints for homes. We tested the durability and coverage as well as factored in cost in our decisions. Here are the best interior paints you can get today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Asian Paint</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Asian Paints is one of the leading and Asia's third-largest brands that offers a wide range of interior wall finishes. They are available in luxury, premium, and economy options. Their advantages include high-quality, long-lasting, available in urban and rural areas, easy to remove dirt and stains, and affordable cost.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> Asian Paints Royale Luxury Emulsion, Asian Paints Apcolite Premium Emulsion, and Asian Paints Tractor Emulsion.
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Berger Paint</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Berger Paints is one of the fastest-growing paint brands in India due to its vibrant range of colors and quality. Its unique features like short drying time, long-lasting, availability in a wide range of colors, easy application, and decorative patterned walls makes it a popular and best paint brand in 2023.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> Easy clean fresh (white color, Luxol Xtra (cornerstone 8A2578), and weather coat long life.
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Dulux Paint</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  This is one of the best paint brands in India mainly supplying sustainable paints and coatings. Its advantages are environment friendly, longer durability, and an easily available product with a wide range of colors.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> Weather shield anti-carb, Weather shield creation stonetex, and Interior A900.
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Nippon Paint</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  Nippon paint is considered one of the top-rated and best paint brands in India that lasts more than a decade. Their key properties like water resistance, air quality, antibacterial and eco-friendly composition are the advantages of Nippon paints.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> Nippon paint atom 2 in 1, Nippon paint breeze emulsion, and Nippon paint spotless NXT.
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Nerolac Paint</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  The Kansai Nerolac Japanese paint company well known as Nerolac paint, is one of the top-rated paint companies in India. Its unique features of stain-free, waterproof, low odor, and fungal-free paint composition helps to protect the painted wall from moisture and ensures structural integrity.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> Nerolac excel top guard, Nerolac excel total, Nerolac excel mica marble stretch and sheen.
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Shalimar Paint</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  It is considered one of the best paint brands in India as it is mainly used for painting monuments and government infrastructure. Its long durability and antibacterial and anti-fungal property is suitable for exterior, interior, wooden, and metallic surfaces and floors.
                </p>
                <div className="text-xs text-gray-500">
                  <strong>Examples:</strong> Shalimar aluminum paint, Superlac advance white and Jetlac care wood PU glossy finish.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#ED276E] to-[#299dd7]">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              GET YOUR FREE QUOTE TODAY!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Home Glazer has made the process simpler keeping clients' satisfaction as a priority. So, the process doesn't hassle and tension. Everything is easy and quick. The interior painting service is the forte of Home Glazer as the team is backed by interior Designers and professional painters. No one has regretted our services. So, hurry up and book us online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/enquiry" 
                className="bg-white text-[#ED276E] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/contact" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-[#ED276E] transition duration-300 text-center"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                We offer comprehensive interior painting services tailored to your specific needs and preferences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Interior Wall Painting</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional interior wall painting services for all types of surfaces including drywall, plaster, and textured walls.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#299dd7] to-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Ceiling & Trim Painting</h3>
                <p className="text-gray-600 leading-relaxed">
                  Specialized ceiling painting and trim work including crown molding, baseboards, and window frames.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Kitchen & Bathroom</h3>
                <p className="text-gray-600 leading-relaxed">
                  Moisture-resistant painting solutions for kitchens and bathrooms with proper surface preparation.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#299dd7] to-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Cabinet & Furniture</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional wood coating and furniture painting services for cabinets, doors, and wooden surfaces.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Texture & Special Effects</h3>
                <p className="text-gray-600 leading-relaxed">
                  Custom texture painting, faux finishes, and special effects to create unique wall designs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#299dd7] to-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Repair & Restoration</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wall repair, crack filling, and surface restoration before painting for perfect results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUs />
        <WhatsAppButton />
      </div>

      <Footer />
    </>
  );
};

export default InteriorPainting;
