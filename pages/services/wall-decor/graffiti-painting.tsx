
import React from 'react';
import Head from 'next/head';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

const GraffitiPainting: React.FC = () => {
  return (
    <>
      <Head>
        <title>Graffiti Painting Services - Home Glazer</title>
        <meta name="description" content="Professional graffiti painting services in Delhi & NCR. Transform your walls with stunning street art and murals. Get expert graffiti artists at your doorstep." />
        <meta name="keywords" content="graffiti painting services, wall art, street art, mural painting, Delhi, NCR" />
        <meta property="og:title" content="Graffiti Painting Services | Home Glazer" />
        <meta property="og:description" content="Professional graffiti painting services in Delhi & NCR. Transform your walls with stunning street art and murals." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homeglazer.com/uploads/services/graffiti-hero.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Graffiti Painting Services | Home Glazer" />
        <meta name="twitter:description" content="Professional graffiti painting services in Delhi & NCR." />
        <meta name="twitter:image" content="https://homeglazer.com/uploads/services/graffiti-hero.jpg" />
      </Head>

      <Header />
      
      <div className="bg-white flex flex-col overflow-hidden">
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
                <BreadcrumbLink href="/services/wall-decor">Wall Decor</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/services/wall-decor/graffiti-painting">Graffiti Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img 
              src="/uploads/services/graffiti-hero.jpg" 
              alt="Graffiti Painting Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    Graffiti Painting Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your walls with stunning street art and expressive murals. Professional graffiti artists at your doorstep.
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
                    <div className="text-center text-white">
                      <div className="text-4xl font-bold mb-2">35+</div>
                      <div className="text-lg mb-4">YEARS EXPERIENCE</div>
                      <div className="text-sm opacity-90">Trusted by thousands of customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Are We So Successful Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Are We So Successful as Graffiti Painters?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Graffiti paintings are the murals that depict imagination. Graffiti paintings are very much expressive; it never goes out of trend. The painters paint on the wall a design or some scenario that has deep meaning. Many of us see some paintings on the walls for revolts, some cool and funky paintings in cafe, restaurants or any other space. Graffiti paintings are also very attractive when used to paint the bars and pubs. This art really steals the eyesight so badly that one immediately tries to understand the meaning of the beautiful work. We wait for a while to give that pleasure to our eyes seeing such amazing artworks.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Home Glazer is taking the art of graffiti to the next level by availing it at your doorstep. Yes, you heard that right. Let us take it this way. Suppose, you have an idea of art which you want to etched on the walls of your home, restaurant, hotel, office, shop, school-college, or any other space. You might have a huge desire to tout your masterpiece to tons of people visiting your place. Now, it is not a big deal as Home Glazer has got you covered.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Team Home Glazer has impressed many people with trendy graffiti works and some quality painting services. Get your masterpiece done by Home Glazer with the utmost care. We can change your imagination into reality. Our team has always got you covered with the best of services.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src="/uploads/services/graffiti-artwork.jpg" 
                  alt="Graffiti Artwork"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
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
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="/uploads/services/Home%20Glazer%20At%20Graffiti%20Paintings.png" 
                  alt="Graffiti Painting Process"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Home Glazer At Graffiti Paintings
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  There are very small reasons why our clients have always chosen us over any other painters. Many painters can do Graffiti painting but then also we stay in demand because we understand the little needs of the painting. We understand the emotions attached to graffiti designs.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Here are the most important points that will make you believe why no one regrets hiring us:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">We are a team of young minds and we have mastered the art of painting over the years.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Our work is to materialize the beautiful thoughts of our clients' and to guide them till we make a perfect Graffiti painting.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Before we begin the work, our representative takes note of the minute details that the client wishes to have.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">The graffiti painting service from Home Glazer is fully done by expert painters who know the value and understanding of the paintings.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">We use standard paints and updated tools for painting, color doesn't fade away.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">Our painting services are budget-friendly and the work we offer never fails to attract.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">The expert team values your time, therefore, we finish the work on time.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">We make sure that we satisfy our clients before we leave the site.</span>
                  </div>
                </div>
                
                <p className="text-lg text-gray-600 leading-relaxed mt-6">
                  So, if you are one among many people who want some attractive, eye-catching, and pleasing graffiti on your sites then hurry up and make a booking. Our experts are waiting to help you with the best of their abilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What is Graffiti Painting Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What is Graffiti Painting?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  When you hear the word "Graffiti Painting", your brain automatically creates a picture of some nonsense, meaningless art full of negativity and hatred that you might see on street walls. That's not true about Graffiti painting because it is much more beyond that. It can be a meaningful, beautiful, soulful form of art that spreads awareness.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Graffiti painting is such a pure art form. It is a democratic art by and for anyone, it offers so much but asks for so little. Graffiti is writing or drawings made on a wall or other surfaces, usually as a form of artistic expression.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Graffiti painting is a controversial subject. In most countries, marking or painting property without permission is considered by property owners and civic authorities as defacement and vandalism, which is a punishable crime. Many people see Graffiti as a social ill that contributes negatively to a city and society. However, Graffiti has now become a trend to convey emotions, messages and feelings to the public through art. Besides all this Graffiti has numerous positive benefits.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src="/uploads/services/graffiti-street-art.jpg" 
                  alt="Street Graffiti Art"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features of Graffiti Painting Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <img 
                  src="/uploads/services/graffiti-features.jpg" 
                  alt="Graffiti Features"
                  className="w-24 h-24 object-cover rounded-full shadow-lg"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Features of Graffiti Painting
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Graffiti Provides Self-expression</h3>
                <p className="text-gray-600 leading-relaxed">
                  Individuals get the freedom to express themselves through graffiti. All you need is paint sprayers and an idea. Then, you can make every work of art you want. You can express an opinion or a political point and everyone will be able to see it.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Graffiti Brightens Up the Environment</h3>
                <p className="text-gray-600 leading-relaxed">
                  Well-worked graffiti art is typically creative, colourful, and bold. Thus, it changes the character and vibe of the particular area where it appears. In many cases, this change is positive, since the art turns drab, monotone buildings and bare walls into interesting and eye-catching exhibitions of the imagination.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Graffiti Painting in Education</h3>
                <p className="text-gray-600 leading-relaxed">
                  For some, the problem lies in the medium; an individual might not enjoy traditional forms, such as painting and sculpture instance. While others fail to find art relevant within their lives. When graffiti is taught as an alternative medium of artwork, it may inspire these individuals.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Economically, Graffiti Encourages Residents and Tourists</h3>
                <p className="text-gray-600 leading-relaxed">
                  As Graffiti brighten up commercial space and make it more colourful, interesting, and peaceful, people are more likely to get attracted to it easily. In today's world, people are fond of clicking pictures with artistic backgrounds and a place with Graffiti is perfect.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Mystery & Intrigue</h3>
                <p className="text-gray-600 leading-relaxed">
                  There are so many questions when you're a street art lover! Who did it? Why did someone put this work there? What does it mean? Does it even mean anything? But with the invention of Instagram, it's now easier than ever to find artists' official profiles and learn more about their work.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Sense of Community</h3>
                <p className="text-gray-600 leading-relaxed">
                  Street art is important to keep urban areas and their residents energized and inspired. In some areas, artists and building owners come together to foster the creation of artwork that can be viewed as beautifying and reviving a city, rather than destroying it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Type of Paint Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <img 
                  src="/uploads/services/graffiti-paints.jpg" 
                  alt="Graffiti Paints and Tools"
                  className="w-24 h-24 object-cover rounded-full shadow-lg"
                />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                What Type of Paint Do Graffiti Artist's Use?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Spray paint is the most popular type of paint graffiti artists use because it's portable, extremely versatile and easy to get hold of. Ever since modern-day graffiti's early beginnings in the 1960s, spray paint has been the most popular medium for graffiti.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                But spray paint isn't the only type of paint graffiti and street artists use. Paint marker pens for tags and small mural details, plus emulsion paint for roller graffiti and preparing walls are also commonly used.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Spray Paint</h3>
                <p className="text-gray-600 leading-relaxed">
                  Spray paint is the most popular medium for most graffiti styles. The main reason it's so popular is that it provides maximum freedom and control whilst painting compared to more traditional methods. Anything imaginable can be painted using spray paint to achieve a range of effects.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Low Pressure Spray Paint</h3>
                <p className="text-gray-600 leading-relaxed">
                  Low pressure spray paint is characterised by its lower level of output. This is because low pressure paint allows for more control over the can, meaning it's easier to achieve finer lines and fewer drips.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">High Pressure Spray Paint</h3>
                <p className="text-gray-600 leading-relaxed">
                  High pressure spray paint is defined by its higher level of paint output. High pressure paint is favoured by graffiti artists looking to get their pieces done quickly. It's also used by artists who are painting big pieces.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Paint Markers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Although less iconic than spray paint, another popular medium for graffiti art is paint markers. Due to the lack of availability in the early days of graffiti, graffiti writers would often make their own paint markers.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Pump Markers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Paint pump markers are characterised by their pump valve system. This means when the nib of the pen is pressed down on a surface, paint is released and flows down to the nib. This is unlike traditional gravity style markers.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Emulsion Paint</h3>
                <p className="text-gray-600 leading-relaxed">
                  Emulsion paint is your most common style of paint – the type that comes in a bucket and is used to paint things like walls and ceilings. Graffiti artists use emulsion paint more often than you'd think, especially for preparing walls before using spray paints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#ED276E] to-[#299dd7]">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Walls?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Let our expert graffiti artists bring your imagination to life with stunning wall art that will make your space truly unique and captivating.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/enquiry" 
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition duration-300"
              >
                Contact Us
              </Link>
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

export default GraffitiPainting;
