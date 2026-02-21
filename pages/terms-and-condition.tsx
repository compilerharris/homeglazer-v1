import React from 'react';
import Head from 'next/head';
import { getOgImageUrl } from '@/lib/mediaUrl';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const TermsAndConditionPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Terms &amp; Conditions | HomeGlazer</title>
        <meta
          name="description"
          content="Read HomeGlazer's Terms & Conditions covering service scope, payments, customer obligations, liability, and contact details."
        />
        <meta property="og:title" content="Terms & Conditions | HomeGlazer" />
        <meta
          property="og:description"
          content="Understand our Terms & Conditions for painting and wood services, including payments, obligations, and liability."
        />
        <meta property="og:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
        <meta name="twitter:title" content="Terms & Conditions | HomeGlazer" />
        <meta
          name="twitter:description"
          content="Understand our Terms & Conditions for painting and wood services."
        />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 lg:pt-32">
        <section className="w-full bg-gradient-to-br from-[#ED276E] to-[#299dd7] py-16">
          <div className="w-[90%] lg:w-[80%] mx-auto text-center text-white space-y-4">
            <p className="uppercase tracking-[4px] text-sm font-semibold text-white/90">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold">Terms &amp; Conditions</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Please review these Terms &amp; Conditions to understand how we provide our painting and
              wood services, the obligations involved, and how to contact us.
            </p>
          </div>
        </section>

        <section className="w-[90%] lg:w-[80%] mx-auto py-12 md:py-16">
          <div className="bg-white shadow-sm rounded-2xl p-6 md:p-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Definitions</h2>
              <div className="space-y-2 text-gray-700 leading-relaxed">
                <p>
                  “Client” signifies the organisation or individual who purchases Services. “Services”
                  signifies the residential and commercial painting that we provide to the Client as
                  Service Provider.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">General</h2>
              <p className="text-gray-700 leading-relaxed">
                Payment schedules may change depending on the order size and will be communicated during
                booking. Any modification to these Terms &amp; Conditions (including any additional terms)
                is only valid if agreed to in writing by the Service Provider.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Commencement Date</h2>
              <div className="space-y-2 text-gray-700 leading-relaxed">
                <p>
                  The customer will make full payment to the Service Provider according to the price
                  confirmed when placing the order.
                </p>
                <p>
                  Costs will follow the pre-decided standard price for Services and are exclusive of
                  Service Tax or other applicable taxes.
                </p>
                <p>
                  Clients must permit access to the premises for authorised Service Providers and provide
                  all appropriate information needed to plan the Services.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Price and Payment</h2>
              <p className="text-gray-700 leading-relaxed">
                The Service Provider will offer the Services with reasonable skill, expertise, and care,
                consistent with standards in the residential and commercial painting sector.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Customers Obligation</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms &amp; Conditions apply to sales of Services by the Service Provider to the
                Client. Services will be carried out at the specified location determined by the Client,
                or as close as reasonably possible to the date required by the Client.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Arrangement of the Services
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The Service Provider will deliver Services to the Client at the agreed location and time
                frame, adhering to these Terms &amp; Conditions.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Limitation of Liability
              </h2>
              <div className="space-y-2 text-gray-700 leading-relaxed">
                <p>
                  If the Service Provider fails to render Services with reasonable care and skill, we will
                  perform necessary corrective action at no extra cost to the Client.
                </p>
                <p>
                  Painters are trained and background-verified; however, we strongly recommend the client
                  or a representative remains present during the work to ensure satisfaction and safeguard
                  valuables.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Outsider Links</h2>
              <div className="space-y-2 text-gray-700 leading-relaxed">
                <p>
                  Our Services may include materials from third parties. Links to third-party websites are
                  provided for convenience; we are not responsible for reviewing their content or accuracy.
                </p>
                <p>
                  Access to third-party tools is provided “as is” without warranties, representations, or
                  conditions of any kind. Use of such tools is at your own risk, and you should review the
                  terms provided by the relevant third-party supplier.
                </p>
                <p>
                  New services or features offered through the site will also be subject to these Terms of
                  Service. Review third-party policies before engaging in any transaction. Complaints,
                  claims, or questions regarding third-party products should be directed to the third
                  party.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Contact Information</h2>
              <div className="space-y-2 text-gray-700 leading-relaxed">
                <p>
                  For questions about our privacy policy or these Terms &amp; Conditions, contact us at{' '}
                  <a href="mailto:homeglazer@gmail.com" className="text-[#ED276E] underline">
                    homeglazer@gmail.com
                  </a>{' '}
                  or call <a href="tel:+919717256514" className="text-[#ED276E] underline">+91-9717256514</a>.
                </p>
                <p>Address: B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/enquiry"
              className="bg-[#ED276E] text-white px-8 py-3 rounded-lg font-semibold text-center hover:bg-[#b81d5a] transition-colors duration-200"
            >
              Book an Appointment
            </Link>
            <Link
              href="/contact"
              className="border-2 border-[#299dd7] text-[#299dd7] px-8 py-3 rounded-lg font-semibold text-center hover:bg-[#299dd7] hover:text-white transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>
        </section>

        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
          <div className="flex gap-3">
            <Link
              href="/enquiry"
              className="flex-1 bg-[#ED276E] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px] whitespace-nowrap"
            >
              Enquire Now
            </Link>
            <Link
              href="/paint-budget-calculator"
              className="flex-1 bg-[#299dd7] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px] whitespace-nowrap"
            >
              Budget Calculator
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default TermsAndConditionPage;
