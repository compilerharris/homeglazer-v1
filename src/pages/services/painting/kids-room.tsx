
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import MiniKidsVisualizer from '@/components/visualizer/MiniKidsVisualizer';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const KidsRoom: React.FC = () => {
  return (
    <>
      <Head>
        <title>Kids Room Painting Services | Children's Room Painters | Home Glazer</title>
        <meta name="description" content="Home Glazer offers professional kids room painting services. Create magical spaces with themed designs, safe paints, and expert children's room painters. Call us for kids room color ideas." />
        <meta name="keywords" content="kids room painting, children's room painting, kids room painters, kids room color ideas, safe paint for kids room" />
        <meta property="og:title" content="Kids Room Painting Services | Children's Room Painters | Home Glazer" />
        <meta property="og:description" content="Home Glazer offers professional kids room painting services with safe, non-toxic paints and creative designs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/painting/kids-room" />
        <link rel="canonical" href="https://homeglazer.com/services/painting/kids-room" />
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
                <BreadcrumbLink href="/services/painting/kids-room">Kids Room Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
              alt="Kids Room Painting Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
                    Kids Room Painting Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95 drop-shadow-md">
                    Create magical spaces for your little ones with safe, creative, and professional kids room painting
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/enquiry"
                      className="bg-white text-[#ED276E] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 text-center shadow-lg"
                    >
                      Get Free Quote
                    </Link>
                    <Link
                      href="/colour-visualiser"
                      className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#ED276E] transition duration-300 text-center shadow-lg"
                    >
                      Try Color Visualizer
                    </Link>
                  </div>
                </div>
                <div className="hidden lg:flex justify-center">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
                    <div className="text-center text-white">
                      <div className="text-4xl font-bold mb-2 drop-shadow-lg">100%</div>
                      <div className="text-lg mb-4 drop-shadow-md">SAFE PAINTS</div>
                      <div className="flex justify-center space-x-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white/30 border border-white/50"></div>
                        <div className="w-10 h-10 rounded-full bg-white/30 border border-white/50"></div>
                        <div className="w-10 h-10 rounded-full bg-white/30 border border-white/50"></div>
                      </div>
                      <p className="text-sm opacity-90 drop-shadow-md">Non-toxic & child-friendly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Home Glazer at Kids Room Painting Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Home Glazer at Kids Room Painting
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  To put your creative mind, the walls of children's rooms are the perfect spot. The ideal formation of dynamic paint shading blend plans is a lot of significant. It's like a golden opportunity for the Home Glazer team if we get to paint your kid's rooms. Good wall paint color combinations can change the kid's room into heaven. It resembles edges playing and dozing in paradise.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  The color combinations scheme varies with the age of the children. Moreover, the color schemes can vary with the gender of the kid. If you want to paint the room for a newly born kid or nursery kid, then you can use some light color variations like baby blue or baby pink color. Wall paint colors for the young kids or teen kids can be like yellow, pale green, light purple, and many more combinations are present.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  There are various lovely color shading combinations that can look brilliant and alleviating on a kid's room's wall. We can repaint the walls as per your requirement, by swapping the furniture and accessories out. You can hire Home Glazer because we have a properly trained and skilled team of painters. An extraordinary choice of paint shades, all around a masterminded and outfitted room impeccably suited for kids.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/lovable-uploads/kids.png" 
                    alt="Kids Room Painting"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#ED276E] mb-2">Safe</div>
                    <div className="text-sm text-gray-600">Non-toxic Paints</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Try Colors for Your Kids Room Section */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Try Colors for Your Kids Room
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore different color combinations to see how they transform your child's room. Click on any color to see it applied to the room.
              </p>
            </div>
            
            <MiniKidsVisualizer />
          </div>
        </section>

        {/* Colour Your Kids Room Section */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg flex justify-center items-center">
                  <div className="w-1/2">
                    <img 
                      src="/lovable-uploads/kids.png" 
                      alt="Kids Room Design"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Colour Your Kids Room
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  If you want to paint the room for a teenager, then you can use some dark colour tones. The teenagers mostly prefer the dark shades and moody colour combinations. You can use grey shades also for a teenager's room. In addition, you can add colour to the room by painting the woodwork and furniture, which is affordable.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Home glazer offers affordable and exciting themes and schemes for kids' room decor. Good themes and colour schemes can balance peace in your kid's life. You should hire Home Glazer for kid's room decor because we can provide you with the best and perfect colour combinations. There are various themes that we can provide for kid's room decor, such as glow in Dark Themes with fairies, submarine theme, butterflies theme, and many more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Paint Kids Rooms with Them in Mind Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Paint Kids Rooms with Them in Mind
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                As children grow and their tastes change, your child's room will need to evolve with them. Paint makes it easy to customize children's furniture and walls and it also allows parents to repaint and update a child's room with minimal expense.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      1. Choose Soothing Colors for a Nursery
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Paler colors tend to be more soothing for both young children and their parents. Pastel yellows, soft blues, pale greens, and warm pinks are all good options for nurseries. Choosing the right paint color can significantly increase a child's ability to get a good night's sleep.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      2. Think About the Future
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Babies grow up quickly so choosing a color scheme that can grow up with your child is something to consider. Neutral paint colors like off-white, beige, and soft gray offer a grounding and comforting feel and are easy to accessorize.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      3. Consider the Mood You Want to Set
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Findings from a study conducted by the University of California found that younger children respond more positively to lighter colors while darker shades tend to have a negative association. Color psychologists recommend painting a child's bedroom with a calm color palette.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      4. Talk to Your Child
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      If your child is old enough to express an opinion, ask them what colors they like best. For toddlers and younger children, pick 4-5 paint chips to bring home and let them choose their favorite. Older children will likely want more input into the decision.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Kids Room Wall Decor Ideas Section */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Kids Room Wall Decor Ideas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Creativity is a must when it comes to designing your toddler's room, and the right wall décor ideas will work wonders while creating a space that is youthful and fun.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Wall Painting Ideas</h3>
                  <p className="text-gray-600 leading-relaxed">
                    From bright yellow hues to glistening turquoise blue, children's room wall painting ideas are limitless. Blue is said to be a soothing, peaceful hue that promotes happiness and instils calmness within children.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Texture Design Ideas</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Apart from wall decals and paintings, you can design your kid's room with fun textures like stripes, motifs, and flowers. Try experimenting with sea creatures, imprints, stamps, or anything quirky.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Wallpaper Design Ideas</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Cartoon characters like Chhota Bheema or Avengers are a hit among children. Bring these characters to life by installing your kid's favourite cartoon-themed wallpapers in their rooms.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Wall Sticker Ideas</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Let children's wall stickers accentuate your child's room and add a joyous charm to it. Try adding unique space-themed, jungle-themed, or aqua-themed children's wall stickers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Paint a Child's Room Section */}
        <section className="py-20 bg-gray-50 w-full">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                How to Paint a Child's Room – A Step-by-Step Guide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Follow our professional guide to ensure a safe and beautiful paint job for your child's room.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Prepare the Room</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ensure the room is well-ventilated. Move furniture away from the walls and cover it with drop cloths. Use painter's tape to protect windowsills, door frames, and baseboards.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Prime the Walls</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Applying a primer is crucial, especially if you're changing the wall colour significantly. Primer provides a smooth base for your topcoat and ensures better adhesion and truer colour.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Painting</h3>
                  <p className="text-gray-600 leading-relaxed">
                    When painting, use rollers for large, flat areas and brushes for cutting in around corners and edges. Apply at least two coats for even coverage, allowing sufficient drying time between coats.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Let the Professional House Painters Help Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Let the Professional House Painters Help
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Home Glazer is a locally owned business that specializes in residential painting. Our fully insured, bonded, and skilled painters are equipped to handle any size project. We offer residential interior and exterior painting.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Here at Home Glazer, we make giving your home a complete facelift easier without worries and hassles. Our team of experts delivers the highest quality and smoothest results so your home can become a focal point in your neighborhood.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Home Glazer, our trained professional painters will transform your home into something you will be proud of. Call us to connect with us.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg">
                  <img 
                    src="/lovable-uploads/team-pic.png" 
                    alt="Professional Painters"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#299dd7] mb-2">35+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
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
              Ready to Transform Your Child's Room?
            </h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Let our experienced team create a magical space for your little ones with safe, creative, and professional kids room painting services. Contact us today for a free consultation and quote.
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

export default KidsRoom;
