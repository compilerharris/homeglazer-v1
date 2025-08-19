
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

const PerDayPainting: React.FC = () => {
  return (
    <>
      <Head>
        <title>WOW Per Day Painting Services | Professional Painters | Home Glazer</title>
        <meta name="description" content="Hire professional painters on a per-day basis. Flexible, affordable painting services for small jobs and touch-ups. Get expert painters at your doorstep with Home Glazer." />
        <meta name="keywords" content="per day painting, daily painter hire, flexible painting services, affordable painting, professional painters" />
        <meta property="og:title" content="WOW Per Day Painting Services | Professional Painters | Home Glazer" />
        <meta property="og:description" content="Hire professional painters on a per-day basis. Flexible, affordable painting services for small jobs and touch-ups." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/customized-painting/per-day-painting" />
        <link rel="canonical" href="https://homeglazer.com/services/customized-painting/per-day-painting" />
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
                <BreadcrumbLink href="/services/customized-painting/per-day-painting">WOW Per Day Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section - Full Width with Split Layout */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1560435650-7470a0b0eaa7?w=1920&h=1080&fit=crop&q=80" 
              alt="Professional on-demand painting services - expert painters at work"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    WOW Per Day Painting Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Hire professional painters on a per-day basis. Flexible, affordable painting services for your specific needs.
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
                      <div className="flex justify-center space-x-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-white/20"></div>
                        <div className="w-10 h-10 rounded-full bg-white/20"></div>
                        <div className="w-10 h-10 rounded-full bg-white/20"></div>
                      </div>
                      <div className="text-sm opacity-90">Trusted by thousands of customers</div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Home Glazer at WOW Per Day Painting
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Life is busy and hectic for everyone, thinking of painting, re-painting, or just a touch-up painting is also a tough deal. WOW Per Day Painting Service is unique as the Home Glazer team has some expert painters who go to your doorsteps and provide the services. We have seen many people bothering to hire painters for their unnecessary delay and wage rate. But here we provide efficient painters who are worth your time and money.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our clients can hire as many painters as they want for as long as they need them. There is no hurry to make a huge payment. Payment is done on a regular basis in the form of a wage. This helps to get the best painters for the days when they are actually needed. Their charges are suitable for a per-day basis and they prefer to work like this.
                </p>
              </div>
              
              {/* Professional Painter Working Image */}
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&q=80" 
                  alt="Professional painter working efficiently in modern home interior"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Why is WOW Per Day Painting Service an opportunity Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Why is WOW Per Day Painting Service an opportunity for you?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Painting Tools and Equipment Image */}
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80" 
                  alt="Professional painting tools and equipment for quality interior work"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
              </div>
              
              <div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Wow Per Day Painting Service is for saving them valuable time and money for our clients'. This is an opportunity to get your small areas painted at affordable rates by skilled painters. Many as per surveys, we have understood that people do not wish to make a big deal when they have to colour a small room or they need to do some patchwork. Everyone feels like saving money but they never wish to compromise the quality of work. So, as Home Glazer has promised to stay beside the client throughout, we have introduced WOW Per Day Painting Service. In this option, clients only hire the painter and enjoy their quality services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why is Home Glazer beneficial Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Why is Home Glazer beneficial to you?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Home Glazer has been working successfully for more than 35 years. The reason for our success is the satisfaction of our clients only. We have understood the need for quick hassle-free services. But we all wish to have clean and enhancing colours on the four walls always. This dilemma is taken care of by our team. The calculation is very simple when you need an estimate.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                All you need to know is the wage of the painter. You can decide the number of days you want the work:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-xl font-bold text-[#ED276E]">
                  Painter's wages (X) Number of Painters (X) Number of Days = Total Amount
                </p>
                <p className="text-gray-600 mt-2">Paint material will be borne by the customer</p>
              </div>
            </div>
          </div>
        </section>

        {/* How to avail the services Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                How to avail the WOW Per Day Painting Services benefit?
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We have made things simple in terms of everything. Here is everything that is beneficial to you:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Booking online and scheduling the work prior to 2 days before the day or painting.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Our representative will visit the site that needs to be painted.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Keep your paints and materials ready for the painting work.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Our painters will be there on time.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Skilled painters will work as per clients' needs and requirements.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Only pay for the painter's service.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">Perfection will be provided for clients' satisfaction.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700">The work will not be left incomplete or improper.</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed mt-8">
                Get the perfectionist of the work for your required days on a wage basis. No one will have to pay huge charges for affording the professional painters in a package. To enjoy this facility, book WOW Per Day online and get your estimates.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Features of WOW Per Day Painting Services
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Hire Flexibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Where there are professional painters, clients do not have to pay for several days but can hire them for one day and do the work accordingly. That is, a customer can hire the painter for one day, for several days or on and off whenever required by the work at hand.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Customizable Services</h3>
                <p className="text-gray-600 leading-relaxed">
                  This particular service is compatible with those types of work such as touch ups & repair works, painting of small areas, minor touch up painting after renovation, marks their walls for season approaching, and painting as part of larger projects.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Availability of Multiskilled Painters</h3>
                <p className="text-gray-600 leading-relaxed">
                  Home Glazer has expert painters in their team. They ensure that customers are assisted with skillful painters following set use and practice industrial guidelines.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Costs</h3>
                <p className="text-gray-600 leading-relaxed">
                  The painter's services are detailed with clear prices before the work is carried out depending on how long the painters will be required. Each of the clients is charged on every working day and this makes it possible to foresee the amount that will be used on the project as a whole.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pleasant Surprise and Quick Service</h3>
                <p className="text-gray-600 leading-relaxed">
                  Booking the WOW Per Day Painting Service is very easy as the customers can do it on the website, app or even call Home Glazer directly. It is as simple as it sounds — customers select the date(s), time that the painters are needed, state any additional requirements and everything else will be sorted out by Home Glazer.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Guarantee of Quality Work</h3>
                <p className="text-gray-600 leading-relaxed">
                  Home Glazer has put measures in place to avoid any dip in quality rendering. All the necessary equipments and materials are given to painters and the work is supervised to meet set quality standards by the organization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Customers Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Benefits for Customers
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Savings</h3>
                <p className="text-gray-600 leading-relaxed">
                  The costs are reasonable since clients only pay a painter when there is a work to be done and this helps avoid cases where they pay the whole price only for a fraction of a task.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Time Savings</h3>
                <p className="text-gray-600 leading-relaxed">
                  Through day hiring of the painters, customers can get their work done in lesser time than when they are waiting for larger projects' teams to become available.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Convenience</h3>
                <p className="text-gray-600 leading-relaxed">
                  The facility enables customers to have painters fixed to their schedules, thus, bringing the work within easy reach within their day to day activities.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Minimal Risk</h3>
                <p className="text-gray-600 leading-relaxed">
                  Suitable for clients who may be reluctant due to the scope of the painting requirement or to those who need the work done only for certain specific period.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Finish</h3>
                <p className="text-gray-600 leading-relaxed">
                  Small as the tasks are, clients still enjoy the attention of professionals hence, getting pleasing results.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trouble-Free Management</h3>
                <p className="text-gray-600 leading-relaxed">
                  There is no reason for customers to manage the painters or the work. Home Glazer will take care of everything by ensuring that the painters do their work in an orderly manner and clean up when they finish the work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Use Cases Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Example Use Cases
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">A Small Apartment Refresh</h3>
                <p className="text-gray-600 leading-relaxed">
                  A homeowner wishes to change the color of the kitchen or the living room; however, does not want a contractor to be engaged for an extended period. They are able to let out painters from Home Glazer for up to 2-3 days to do the work effectively.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Co-working Space Touch-up</h3>
                <p className="text-gray-600 leading-relaxed">
                  A businessman desires to repaint his office before the meeting of an important client. They get some cost and time savings as well as the professional touch by hiring painters for one day.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Painting Services Before the Event</h3>
                <p className="text-gray-600 leading-relaxed">
                  A customer who is preparing the celebratory event at home may want to have certain areas quickly painted in order to make the place look better for the people who will be attending. Night or two, they can bet painters to make the painting look as they want with no future commitments.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Between Tenant Repaint</h3>
                <p className="text-gray-600 leading-relaxed">
                  A property owner who rents out apartments might use this service to repaint the walls of his properties within some days with tenant changing to maintain none abuse of the property.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Space Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                WOW One Day Painting Services Benefits For Commercial Space
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Business Continuity</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Commercial spaces can't afford long downtime. Our one-day service ensures minimal disruption to business operations while providing a fresh, professional appearance.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Weekend or holiday service:</strong> We can schedule painting during off-hours to avoid any business interruption.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Quick turnaround:</strong> Get back to business as usual the very next day.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Appearance</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  A fresh coat of paint can significantly improve the professional image of your business space.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Enhanced customer perception:</strong> Clean, fresh walls create a positive impression on clients and customers.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Brand consistency:</strong> Maintain your brand colors and professional standards.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Cost-Effective Solution</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  For commercial spaces, time is money. Our one-day service provides excellent value:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Reduced labor costs:</strong> Single-day completion means lower overall project costs.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Minimal business disruption:</strong> Avoid lost revenue from extended closures.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Versatile Applications</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Our service adapts to various commercial environments:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Office spaces:</strong> Corporate offices, meeting rooms, and common areas.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Retail environments:</strong> Stores, showrooms, and display areas.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Hospitality sector:</strong> Hotels, restaurants, and entertainment venues.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Residential Benefits Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                WOW One Day Painting Services Benefits For Residential Space
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Timeliness – Whole House in one Day</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our WOW One Day Painting Service is designed to complete the entire interior painting of your home in just one working day. This means you can transform your living space without the hassle of living in a construction zone for weeks.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Quick completion:</strong> Get your entire home painted in just one day.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Minimal disruption:</strong> Return to your normal routine the very next day.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">No Compromise on Quality</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Despite the quick turnaround, we never compromise on the quality of our work. Our professional team ensures that every detail is perfect.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Professional finish:</strong> Smooth coatings and crisp lines guaranteed.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Attention to detail:</strong> Every corner and edge is properly painted.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Improves the Appearances of Your Homes</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    A fresh coat of paint can dramatically transform the look and feel of your home, making it more inviting and modern.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Enhanced aesthetics:</strong> Modern colors and finishes update your home's appearance.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Increased curb appeal:</strong> Make your home stand out in the neighborhood.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Healthier Living Environment</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Besides enhancing the aesthetics of your property, this service, in some permissions and creative applications, is able to change the atmosphere of the home.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Low-VOC, eco-friendly paints:</strong> The paints that we use are safe not just because they do not contain ozone depleting or toxic materials but also because they do not contain volatile organic compounds.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Clean, fresh atmosphere:</strong> There is no air freshener that is right enough to cover the awful stench caused by layers of the old paint and other materials that have trapped allergens.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Minimal Disruption to Your Daily Life</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Traditional painting projects can take weeks and disrupt your daily routine. Our one-day service minimizes this disruption.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Quick turnaround:</strong> Get back to your routine in just one day.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Efficient process:</strong> Our team works quickly and efficiently to minimize noise and mess.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ideal For Homes Of All Kinds</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Whether you have a small apartment or a large family home, our service is designed to accommodate all types of residential spaces.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Versatile service:</strong> Works for apartments, townhouses, and single-family homes.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Customized approach:</strong> We adapt our process to your specific home layout and requirements.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Apposite for Specific Occasions or Events</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Perfect for when you need your home to look its best for special occasions, parties, or when preparing to sell.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Event preparation:</strong> Get your home ready for parties, celebrations, or family gatherings.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Home staging:</strong> Prepare your home for sale with a fresh, appealing appearance.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary of Key Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Summary of Key Benefits
              </h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                WOW Per Day Painting Services by Home Glazer fundamentally changes how customers buy and spend on painting services. There is a rich quality and flexibility to it, which is what users need in today's fast-paced world.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700"><strong>On-demand service:</strong> Do you need painters for just a day to perform a small task or for several days or more to execute a complex job? This is possible and enables you to phase the work if required.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700"><strong>Schedule Adjustments:</strong> In any case, if you do not know how many days a job will take or want to supervise its daily execution, one can commence with a limited number of painters or even fewer and then add more days or workers as necessary.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-gray-700"><strong>Projects do not have to be priced in detail:</strong> With this service, you do not have to such a stereotype where you are compelled to come up with a complete project plan, raising high upfront payment for its execution.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Before & After Transformation Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                Transform Your Space in Just One Day
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See the incredible difference our professional painters can make to your home or business in a single day
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Before Image */}
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80" 
                  alt="Interior space before professional painting transformation"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
              </div>
              
              {/* After Image */}
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&q=80" 
                  alt="Interior space after professional painting transformation"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-lg text-gray-600 mb-6">
                Our expert painters use premium materials and professional techniques to deliver stunning results
              </p>
              <Link 
                href="/enquiry" 
                className="bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-[#ED276E]/90 hover:to-[#299dd7]/90 transition duration-300 transform hover:scale-105"
              >
                Get Your Transformation Started
              </Link>
            </div>
          </div>
        </section>

        {/* Professional Team Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#ED276E] mb-6">
                  Our Expert Painting Team
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Home Glazer's professional painters are highly skilled, experienced, and committed to delivering exceptional results. Each team member undergoes rigorous training and follows industry best practices to ensure your satisfaction.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Certified and licensed professionals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">35+ years of combined experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Quality-focused approach</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-[#ED276E] rounded-full"></div>
                    <span className="text-gray-700">Customer satisfaction guarantee</span>
                  </div>
                </div>
              </div>
              
              {/* Professional Team Image */}
              <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1560435650-7470a0b0eaa7?w=800&h=600&fit=crop&q=80" 
                  alt="Professional painting team working efficiently and professionally"
                  className="w-full h-96 object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#ED276E] to-[#299dd7]">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Experience the flexibility and quality of our WOW Per Day Painting Services. Get professional painters at your doorstep with no long-term commitments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/enquiry" 
                className="bg-white text-[#ED276E] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
              >
                Get Free Quote
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#ED276E] transition duration-300"
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

export default PerDayPainting;
