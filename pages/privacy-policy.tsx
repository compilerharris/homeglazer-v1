import React from 'react';
import Head from 'next/head';
import { getOgImageUrl } from '@/lib/mediaUrl';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy | HomeGlazer</title>
        <meta
          name="description"
          content="Learn how HomeGlazer collects, uses, and protects your personal information, including details on cookies and third-party tools."
        />
        <meta property="og:title" content="Privacy Policy | HomeGlazer" />
        <meta
          property="og:description"
          content="Understand HomeGlazer's privacy practices, data use, cookies, and contact information."
        />
        <meta property="og:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
        <meta name="twitter:title" content="Privacy Policy | HomeGlazer" />
        <meta
          name="twitter:description"
          content="Understand HomeGlazer's privacy practices, data use, cookies, and contact information."
        />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 lg:pt-32">
        <section className="w-full bg-gradient-to-br from-[#ED276E] to-[#299dd7] py-16">
          <div className="w-[90%] lg:w-[80%] mx-auto text-center text-white space-y-4">
            <p className="uppercase tracking-[4px] text-sm font-semibold text-white/90">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Learn how we collect, use, and protect your personal information when you interact with
              HomeGlazer.
            </p>
          </div>
        </section>

        <section className="w-[90%] lg:w-[80%] mx-auto py-12 md:py-16">
          <div className="bg-white shadow-sm rounded-2xl p-6 md:p-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                At “Home Glazer” we respect every individual’s right to privacy. Our relationship with you
                is our most valuable asset and the basis of our reputation. We understand the importance
                you place on the privacy and security of information that personally identifies you or
                your account information. We refer to and treat this information as “personal
                information”.
              </p>
              <p className="text-gray-700 leading-relaxed">
                This privacy policy has been developed to make users of website www.homeglazer.com aware
                of terms of use of personal information that they enter while booking our services. We use
                personal information in ways that are compatible with the purposes for which we originally
                requested it and limit collection and use to what is necessary to administer our business
                and deliver superior service.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may use the information you provide to process requests, answer queries, and provide
                additional information about our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                What personal details are collected on this website?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Personal details are collected on the website through contact forms and via the “Free
                Visit &amp; Inspection” form. Phone numbers and, in some cases, names and email addresses
                are collected when a user voluntarily submits an inquiry. This information is used to
                contact users and answer their queries about our painting and polishing services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Collecting information through cookies
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Like many sites, we use cookies to customise user experience. Cookies are tiny text files
                stored in your browser. They allow websites to store customer preferences. We use two
                types of cookies on this site:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li>First party cookies</li>
                <li>Third party cookies (Google Adwords, Facebook)</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You can delete cookies or change your cookie settings in the settings menu of most
                browsers.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                Do we sell or disclose your personal information to third parties?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                No. We do not share your personal information with any third party. We do not sell, trade,
                or disclose your personal information to any third party. Cookies information is
                anonymous.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">
                How do we use this personal information?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The personal information shared by you on our website is used to serve you better. We
                share this information with our sales team to get in touch with you and answer your
                queries about our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you book your order with us, we send you regular updates on your order. Occasionally,
                we send useful information about special offers and new services. We continually evaluate
                our efforts to protect personal information and keep it accurate and up to date. If you
                identify any error or need to make a change, please contact us and we will promptly update
                our records.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Contacting the Website</h2>
              <p className="text-gray-700 leading-relaxed">
                This privacy policy applies to information collected through the website. By using this
                site, you consent to our privacy policy. If you have any questions or concerns, please
                contact us by email at{' '}
                <a href="mailto:homeglazer@gmail.com" className="text-[#ED276E] underline">
                  homeglazer@gmail.com
                </a>
                .
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
              <div className="space-y-2 text-gray-700 leading-relaxed">
                <p>B-474, Basement, Greenfield Colony, Faridabad, Haryana - 121010</p>
                <p>
                  Tel.:{' '}
                  <a href="tel:+919717256514" className="text-[#ED276E] underline">
                    +91-9717256514
                  </a>
                </p>
                <p>
                  Mail:{' '}
                  <a href="mailto:homeglazer@gmail.com" className="text-[#ED276E] underline">
                    homeglazer@gmail.com
                  </a>
                </p>
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

export default PrivacyPolicyPage;
