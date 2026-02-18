
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getMediaUrl, getAbsoluteMediaUrl } from '@/lib/mediaUrl';
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
const ONE_DAY_HERO_IMAGE = "/assets/images/bedroom/bedroom10/bedroom10.jpg";

const OneDayPainting: React.FC = () => {
  return (
    <>
      <Head>
        <title>WOW One Day Painting Services | Professional One Day Painters | Home Glazer</title>
        <meta name="description" content="Transform your home or office in just ONE DAY with our WOW One Day Painting Services. Professional painters delivering quality painting in 24 hours. Get free consultation today!" />
        <meta name="keywords" content="one day painting, same day painting, quick painting services, fast painting, 24 hour painting, professional one day painters" />
        <meta property="og:title" content="WOW One Day Painting Services | Professional One Day Painters | Home Glazer" />
        <meta property="og:description" content="Transform your home or office in just ONE DAY with our WOW One Day Painting Services. Professional painters delivering quality painting in 24 hours." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homeglazer.com/services/customized-painting/one-day-painting" />
        <meta property="og:image" content={getAbsoluteMediaUrl(ONE_DAY_HERO_IMAGE, SITE_URL)} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://homeglazer.com/services/customized-painting/one-day-painting" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="One Day Painting Services | Home Glazer" />
        <meta name="twitter:description" content="Quick one-day painting services for fast room makeovers." />
        <meta name="twitter:image" content={getAbsoluteMediaUrl(ONE_DAY_HERO_IMAGE, SITE_URL)} />
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
                <BreadcrumbLink href="/services/customized-painting/one-day-painting">One Day Painting</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED276E] to-[#299dd7] opacity-90"></div>
          <div className="absolute inset-0">
            <img 
              src={getMediaUrl(ONE_DAY_HERO_IMAGE)} 
              alt="WOW One Day Painting Services"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 w-full">
            <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
                <div className="text-white">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    WOW One Day Painting Services
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-95">
                    Transform your home or office in just ONE DAY with professional painting services
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
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-0 border border-white/20 w-72 h-72 overflow-hidden">
                    <img
                      src={getMediaUrl("/uploads/services/WOW%20One%20Day%20Painting%20Services%20thumb.png")}
                      alt="WOW One Day Painting Services"
                      className="w-full h-full object-cover"
                    />
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
                Home Glazer at WOW One Day Painting
              </h2>
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-xl text-gray-600 leading-relaxed">
                  Life is so fast these days that time is money. We have seen many people who need the work to get done in one day. The worth of time is unbeatable. Now, we often fail to look after the house painting that might have faded over time. But when there is a sudden event, we become conscious of the fade colour. We feel like having a quick painting service which is hardly available. If available then also not affordable most of the time. So, for any important day, event, wedding, meeting, party, or a quick touch up we have a solution. WOW One Day is Home Glazer's special option that makes your place fresh and attractive in just one day.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  It is tough for residential places to arrange for a long painting job when everyone is at home. Similarly, it is not very good to mess up a workplace during the time of work. No one likes renovation or touch-up painting works going on around them all the time. If you avail our WOW One Day, then we got you covered. We have a very strong and efficient team that can finish the work just in one day. It can be a Sunday when the office is closed or the day when a picnic is planned. We make sure that we leave the place as clean as possible. The owner will find every belonging in its perfect place.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Why WOW One Day Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why is WOW One Day special and recommended to all?
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                This is very much suitable and profitable for busy places who are worried about the mess of painting services. We finish the assigned work quickly and leave with our client's approval and satisfaction. No matter how big or small the work is, our team has the capacity to manage it efficiently in one day.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">Flexible Scheduling</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  You can schedule the WOW One Day painting as per your convenience.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">Budget-Friendly</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Budget-friendly services will be provided to our clients.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">Professional Team</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  The professional painters will work on the scheduled date.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">Color Consultation</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  After approval of estimates and schedules, the first meeting will be regarding the colour.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">One Day Completion</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  Our painters will finish the work in one day and leave the place unaffected.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 text-center">Expert Designers</h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  We have professionals for designs and painting so the work is done with perfection.
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-700 leading-relaxed">
                Home Glazer has worked with new clients who are referred by our existing clients. This especially happens for our WOW One Day benefit. As it is expensive to book a package with expert designers and painters for a long time. Here, we give you the opportunity to book such painters and designers for one day and get the maximum benefit. So, don't miss the opportunity to book a schedule to get the experts at your doorsteps.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Key Features of WOW One Day Painting Services
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                With WOW One Day Painting Services, we undertake to redecorate the entire interior space of a house or office in a matter of one, that's right, a single day. The purpose of this service is to meet the requirements of customers looking for fast and effective ways to suit their needs with speedy execution and without compromising on quality.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Full Interior Repaint in Just 24 Hours</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Home Glazer promises to redecorate the house or office, as the case may be, on the inside fully within a single day. This definitely works in the clients' favor who would ideally wish to complete the renewal of their whole space and as a such do not want a lengthy painting work to be done on it.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Organized and Efficient Teamwork</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To achieve this rapid turnaround, Home Glazer deploys a number of professional painters who are well coordinated in order to minimize the time taken to execute the task at hand. These are skilled painters who are highly organized and work well within a systematic well-designed workflow which includes proper scheduling, quick action and judicious management of manpower.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Advanced Painting Techniques and Equipment</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The service incorporates advanced tools and techniques of painting in order to realized the desired efficiency in the scope of service. In any painting company, it is reasonable to expect that airless paint sprayers, quick-dry paints, or any other modern conveniences are used in order to hasten operations but achieve quality work.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Thorough Preparation and Planning</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Home Glazer does a deep property assessment before the painting day. It entails taking measurements to determine square footage, color consults, detailing special requests, and creating a schedule. Errection of clear plastic sheets to protect areas not to be painted, repositioning furniture, and placing cardboard sheets on the floors is done in a systematic way.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Quality Assurance and Cleanup</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Home Glazer also however guarantees that quality of the job is also highly maintained during the short time of the job. The coatings on the walls are smooth, and free of clumps, and lines are vivid due to the high-level training of the painters. At the end of the painting process, inspection of the quality of work is carried out to ensure it meets the company standards.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Minimal Disruption to Daily Life</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  It is true to say that the most outstanding benefit of this service is that it reduces the extent to which a normal painting practice can interfere with your day to day activities. Homeowners or office owners won't have to deal with days or weeks of paint smell, mess, or the inconvenience of rearranging their schedules. Instead, they can get a freshly paint interior in just one day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Advantages of WOW One Day Painting Services
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Less Time Wasted</h3>
                <p className="text-gray-600 leading-relaxed">
                  The first reason is speed. Customers can request their home or office be repainted in 1 day which means they can go back to their routines or business activities in the shortest time possible.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">No Hassles</h3>
                <p className="text-gray-600 leading-relaxed">
                  The typical troubles associated with painting project last over a period of time, which is not the case here. It is possible to spend only one day to vacate and do away with painters for a few days. People can just step out of their house in the morning and back morning to a fully painted house.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Good Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Despite the quick turnaround, Home Glazer still delivers accuracy and professional results. The professionals are well-acquainted with the duties complemented by modern equipment and techniques that guarantee a perfect job.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Reasonable Cost</h3>
                <p className="text-gray-600 leading-relaxed">
                  Since the work is done in one working day, all wages and other connected costs would be less. In other words, this is a relatively cheaper plan for most of the customers.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold mb-4">Utmost Value in Emergencies</h3>
                <p className="text-gray-600 leading-relaxed">
                  Such a service comes in handy in cases where time cannot be spared. For instance, when a person wants to sell or rent a house they need to repaint it, before one has a very important meeting they need to clean a dull office, or even before throwing a party clean the whole house.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Example Use Cases Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Example Use Cases
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Preparing a Home for Sale</h3>
                <p className="text-gray-600 leading-relaxed">
                  For example, if a homeowner intends to sell that home, they can relatively make themselves look easier and pleasing to the prospective purchasers by painting the house and making it as lovely as possible within a day.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold mb-6">Corporate Office Rebranding</h3>
                <p className="text-gray-600 leading-relaxed">
                  During a period that an organization is going through some changes or rebranding, the business serves the professional look of the space while ensuring that daily business flow goes on.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Commercial Space Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                WOW One Day Painting Services Benefits For Commercial Space
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-12">
                Our WOW One Day Painting Service is equally beneficial for commercial spaces including offices, retail stores, restaurants, and other business establishments.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Business Continuity</h3>
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

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Professional Appearance</h3>
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
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Cost-Effective Solution</h3>
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

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Versatile Applications</h3>
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
          </div>
        </section>

        {/* Residential Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                WOW One Day Painting Services Benefits For Residential Space
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                Home Glazer's WOW One Day Painting Service comes as a revolution in the 'painting' of residential interiors that include homes, apartments, bungalows, villas, farmhouses, and all the other entities counting as reposes. We guarantee covering all your interior surfaces with paint and repainting in just one day.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Timeliness – Whole House in one Day</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    One of the most significant advantages of our WOW One Day service is speed. Whether you live in a cozy apartment or a spacious villa, we can repaint the entire interior in just 24 hours.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>A large, experienced team:</strong> The members of the crew split themselves over different rooms and perform work increasing the effective, ensuring every room gets maximum attention.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Advanced tools and equipment:</strong> Our professional painters mostly employ the use of airless sprayers, roller paint tools, and high-speed drying paints.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">No Compromise on Quality</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Good work is achieved in a short period of time, but this in no way compromises on the quality of work done. Home Glazer guarantees:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Craftsmanship:</strong> Our expert contractors make sure that the surfaces are perfectly smooth and evenly coated with paint, edges are well defined and lines crisp.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Use of paints of the best quality:</strong> Every wall gets the best paint applied that is guaranteed to last and still look beautiful years to come.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Improves the Appearances of Your Homes</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Finding such a reasonable home is sometimes difficult since the cost is usually on the higher end at all Times Painting in a whole new colour enhances the appeal of the house.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Personalised redecorating:</strong> Besides understanding the property styling, we undertake colour consultancy for Indian clients colours, this is important especially for more off-beat colours like red requiring a great deal of courage.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#ED276E] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Fresh look:</strong> Coated homes exemplifies the new look since foregoing the old dented painted homes only a few months ago. The normal scuffs and marks and general ageing of your house is all covered by paint.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Healthier Living Environment</h3>
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
                  <h3 className="text-xl font-bold mb-4">Minimal Disruption to Your Daily Life</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The creationists know that homeowners would like to cut down on the bothersome aspects of a painting project. With our WOW One Day, no need to wait for days for your home to be "in order" once the work is over.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>No need to move out:</strong> In cases of traditional painting that takes a couple of days, occupants are normally required to leave their homes, but in our case within a period of one day, clients are able to stay in their homes.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Takes a short period to setup and clean up:</strong> All the inconveniences such as preparing the house for the painting work and cleaning after the painting has been done are taken care of by us.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Ideal For Homes Of All Kinds</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Our WOW One Day Painting Service can similarly adapt to homes of all shapes and sizes, including activity based enclosed apartment and spacious bungalows and villas.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Apartments and homes:</strong> Within such small areas naturally-divided into numerous self-contained zones, we hear every room in the house is brilliantly organized.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Bungalows and villas:</strong> Our big work force enhances the quantity of labor relating to more than one room and floor at the same time.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Appreciation of Property Assets</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    One of the important assets to incorporate if you intend to sell or rent your home is the interior painting that can raise the value of your property up considerably.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Better first impressions:</strong> Potential buyers or tenants always tend to salivate over newly occupied and freshly painted homes. It improves the general appearance of the room.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Cost-effective improvement:</strong> One of the cheapest ways of making adjustments on the premises to sell the house is painting. With WOW One Day, one does not have to wait such long periods.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold mb-4">Apposite for Specific Occasions or Events</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    When you expect family or friends and need to get ready for some big event like a wedding or reproductive holiday, our WOW One Day Painting Service is quite fitting.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Panicked renovations:</strong> We are fast and effective. We can do a fast refresh of the house as you wait for your visitors to arrive or you just desire a new job done in time for the festive season.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-[#299dd7] rounded-full mt-2 flex-shrink-0"></div>
                      <span><strong>Peace of mind:</strong> Everything is handled by our potential and professional painters who plan and execute every job so you can prepare to go to your event rather than dreading a long period of house painting.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Summary Section */}
        <section className="py-20 bg-white">
          <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Summary of Key Benefits
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">24-Hour Completion</h3>
                <p className="text-gray-600 text-sm">
                  Repainting of your entire residence in only one working day (01 day: 24 hours).
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Minimal Disruption</h3>
                <p className="text-gray-600 text-sm">
                  Negligible impact on usual activities in the family.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Quality Finish</h3>
                <p className="text-gray-600 text-sm">
                  High quality and good finishing using quality paint.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">All Home Types</h3>
                <p className="text-gray-600 text-sm">
                  Suitable for houses of every size (condos, bungalows, villas, farmhouses).
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Enhanced Value</h3>
                <p className="text-gray-600 text-sm">
                  Enhances the aesthetics and market value of the house.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-[#ED276E] rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3">Eco-Friendly</h3>
                <p className="text-gray-600 text-sm">
                  Environment friendly, contain low-VOC paints, leading to better indoor air quality.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                Thanks to Home Glazer's WOW One Day Painting Service, you may benefit from a newly painted home without the bother of tedious painting jobs being increasingly strung along. No worry if you want to spruce up the area or prepare for a particular occasion- we transform the area in just one day wowing the clients.
              </p>
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
              Thanks to Home Glazer's WOW One Day Painting Service, you may benefit from a newly painted home without the bother of tedious painting jobs being increasingly strung along. No worry if you want to spruce up the area or prepare for a particular occasion- we transform the area in just one day wowing the clients.
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
                We offer comprehensive one-day painting services tailored to your specific needs and timeline requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Interior Painting</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Professional interior painting services for homes and offices with premium finishes.
                </p>
                <Link 
                  href="/services/customized-painting/interior-painting" 
                  className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#ED276E]/90 hover:to-[#299dd7]/90 transition duration-300 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#299dd7] to-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7m-7 7v18m7-7l7 7m-7-7v18" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Exterior Painting</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Expert exterior painting services to enhance your home's curb appeal and protection.
                </p>
                <Link 
                  href="/services/customized-painting/exterior-painting" 
                  className="inline-block bg-gradient-to-r from-[#299dd7] to-[#ED276E] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#299dd7]/90 hover:to-[#ED276E]/90 transition duration-300 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">WOW One Day Painting</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Complete your entire home painting project in just one day with our specialized service.
                </p>
                <Link 
                  href="/services/customized-painting/one-day-painting" 
                  className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#ED276E]/90 hover:to-[#299dd7]/90 transition duration-300 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#299dd7] to-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Per Day Painting</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Flexible per-day painting services for projects that require extended timelines.
                </p>
                <Link 
                  href="/services/customized-painting/per-day-painting" 
                  className="inline-block bg-gradient-to-r from-[#299dd7] to-[#ED276E] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#299dd7]/90 hover:to-[#ED276E]/90 transition duration-300 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Custom Solutions</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Tailored painting solutions designed specifically for your unique requirements.
                </p>
                <Link 
                  href="/enquiry" 
                  className="inline-block bg-gradient-to-r from-[#ED276E] to-[#299dd7] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#ED276E]/90 hover:to-[#299dd7]/90 transition duration-300 transform hover:scale-105"
                >
                  Get Quote
                </Link>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#299dd7] to-[#ED276E] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Consultation</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Free consultation to discuss your painting project and get expert advice.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-block bg-gradient-to-r from-[#299dd7] to-[#ED276E] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#299dd7]/90 hover:to-[#ED276E]/90 transition duration-300 transform hover:scale-105"
                >
                  Contact Us
                </Link>
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

export default OneDayPainting;
