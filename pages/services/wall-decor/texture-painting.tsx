
import React from 'react';
import Head from 'next/head';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';

const TexturePainting: React.FC = () => {
  return (
    <>
      <Head>
        <title>Stencil Painting Services - Home Glazer</title>
        <meta name="description" content="Professional stencil painting services in Delhi NCR. Transform your walls with beautiful designs and patterns. Expert stencil painters at affordable rates." />
        <meta name="keywords" content="stencil painting services, wall designs, wall patterns, Delhi NCR, affordable painting" />
      </Head>

      <Header />
      
      <div className="min-h-screen">
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
                <BreadcrumbLink href="/services/wall-decor/texture-painting">Texture Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section */}
        <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/texture-painting.png" 
              alt="Texture Painting Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          </div>
          
          <div className="relative z-10 text-center text-white px-4 lg:px-8">
            <div className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              WALL DECOR SERVICES
            </div>
                          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Texture Painting Services
              </h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                Transform your walls with stunning texture effects and dimensional finishes. Professional texture painting services for unique wall designs.
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/enquiry" 
                className="bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#ED276E]/90 hover:to-[#299dd7]/90 transition duration-300 transform hover:scale-105"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/contact" 
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Home Glazer at Stencil Painting Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Home Glazer at Texture Painting
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Every wall of your home should display the story behind it. Stencil painting is a fabulous way to produce designs/patterns on the walls or ceiling. Today, stencil painting is in high demand and people spend hours picking the right stencils for their dream home. The purpose of stenciling in painting and interior design is enormous.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  According to your imagination and wish one can choose the perfect perfect stencil with fine colour combinations for your wall. Stencil painting reflects your imagination on the wall. The stencil painting on the wall can lighten the space with the fresh gasp of air, rejuvenating it with the refreshing aura.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Transforming your home with the stencil painting becomes important when the wall of your home becomes the point of attraction. A perfect stencil painting with a bright colour combination reflects how colourful you are. You can save a big amount of money by choosing stencil painting over costly designer wallpaper. At Home Glazer, we offer the finest stencil painting services in Delhi NCR because we are a team of dedicated professionals and we are known for our great customer service.
                </p>
              </div>
              
              <div className="relative">
                <img 
                  src="/lovable-uploads/stencil-painting.png" 
                  alt="Stencil Painting"
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Our Services
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <img 
                  src="/lovable-uploads/stencil-process.png" 
                  alt="Stencil Painting Process"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Stencil Painting Process
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Prepare the surface:</strong> Before starting the stenciling it is important to ensure the surface is good, there is no uneven texture, no overlapping mark, no spot marks. Wipe off the dust from the surface with a dry cloth.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Preview Stencil Design:</strong> Preview the stencil design and ensure that the design is absolutely perfect. All the edges are good because any error in stencil can bring unwanted design and problems.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Paint:</strong> Paste the stencil with a soft hand at the right place with the use of painter's tape.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Touch up:</strong> We paint the area or the site by placing the stencils. Paint brush is used to make the initial colour, then there is a chance that small portions remains unpainted. This occurs due to the thickness of paint brush, so for that touch up is done.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700"><strong>Cleaning:</strong> Many times it happens that after the painting is completed, the stencil can still stick to the area in small pieces. We remove the stencils and clean the painted areas. Also, we leave the site clean when we finish the work.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Stencil Painting Process Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                What is Stencil Painting Process
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Stencil Painting is an advanced design of paints that adds value to your house. This practice involves around stamping a sketch onto a surface by flow of paint throughout a stencil and it is not a modern painting design instead it's an old way of painting. If you choose the right color combination with stencil painting, definitely it can amaze you.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                It can be used to add an artistic eloquent to the walls around you. You might have seen earlier in documentaries about ancient peoples that they paint on stones and sculptures in a manner identical to modern-day stencil paintings.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                There are various advantages of stencil painting, if you want a design like miny streaks of specific designs then stencils paintings are first to be considered. If you want creative designs on your home walls but you are not in the mood to spend much, then you should choose stencil painting instead of texture painting. It is way more economical than texture painting.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                You can apply wet paints on dry painting surfaces, this is a major advantage of stencil painting. Stencil paintings provide exceptional piercing of color when compared to roller engraves. Stencil paintings can be applied on all kinds of twisted and unified portions. When you use a stencil, you have a better grip on it when compared to roller or paint brushes, this results in lesser mistakes which makes it a more accurate tool to paint with. If you mistakenly paint at a surface where it is not needed, you can easily clean it in stencil painting. You can quickly change the patterns while painting with a stencil.
              </p>
            </div>
          </div>
        </section>

        {/* Advantages of Stencil Painting Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Advantages of Stencil Painting
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost-Effective Design Solution</h3>
                <p className="text-gray-600 leading-relaxed">
                  If you want creative designs on your home walls but you are not in the mood to spend much, then you should choose stencil painting instead of texture painting. It is way more economical than texture painting and considered by most people who love designer walls at cheap prices.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Versatile Application</h3>
                <p className="text-gray-600 leading-relaxed">
                  You can apply wet paints on dry painting surfaces, this is a major advantage of stencil painting. Stencil paintings provide exceptional piercing of color when compared to roller engraves and can be applied on all kinds of twisted and unified portions.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Better Control & Accuracy</h3>
                <p className="text-gray-600 leading-relaxed">
                  When you use a stencil, you have a better grip on it when compared to roller or paint brushes, this results in lesser mistakes which makes it a more accurate tool to paint with. You can quickly change the patterns while painting with a stencil.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Easy Cleanup</h3>
                <p className="text-gray-600 leading-relaxed">
                  If you mistakenly paint at a surface where it is not needed, you can easily clean it in stencil painting. The process allows for precise application and minimal mess, making it ideal for detailed work.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Perfect for Specific Designs</h3>
                <p className="text-gray-600 leading-relaxed">
                  If you want a design like miny streaks of specific designs then stencils paintings are first to be considered. They provide consistent, repeatable patterns that are perfect for creating uniform designs across large surfaces.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Pattern Changes</h3>
                <p className="text-gray-600 leading-relaxed">
                  You can quickly change the patterns while painting with a stencil. This flexibility allows you to experiment with different designs and create unique combinations without starting over.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose HomeGlazer Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Why Choose HomeGlazer for the Stencil Painting Service?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                HomeGlazer offers a comprehensive variety of professional painting services for stencil painting on walls, enclosures, or at any twisted surface. Our experienced painters are passionate about the stencil painting task and deliver better-than-expected results. Stencil painting is for those people who are so obsessed with the sense of artistic feel they can get in a room.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                If you are among one, you are at the right place as we have expert and skilled painters who can paint your wall with modern stencils made up of plastic and metal. HomeGlazer is concerned about delivering best-in-class texture painting at affordable rates which can be considered by our clients.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Along with stencil painting, HomeGlazer also provides services related to Murals, Wall Graphics, and Window Graphics. You can choose HomeGlazer which is a trustworthy painting service provider company.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                If you are living in a space that is traditional or contemporary, then there is always a space to be filled with stencil paintings. With stencil painting service you can give your living space a glamorous makeover. Stencils come in many designs and patterns, so it doesn't matter whether you're looking for a festive theme, seasonal theme, or any specific theme, you can get it done very easily.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We stand behind our stencil painting services. We are always here to assist you and answer all of your stencil painting questions and when you book your stencil painting service with Home Glazer, we ensure that your stencil painting project is a total success.
              </p>
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
              Let our expert stencil painters create beautiful designs and patterns that will make your walls tell a story and add glamour to your living space.
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

export default TexturePainting;
