import React from 'react';
import Head from 'next/head';
import { getOgImageUrl } from '@/lib/mediaUrl';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Cookie Policy | HomeGlazer</title>
        <meta
          name="description"
          content="Learn how HomeGlazer uses cookies and how you can manage your preferences."
        />
        <meta property="og:title" content="Cookie Policy | HomeGlazer" />
        <meta
          property="og:description"
          content="Understand the types of cookies we use, why we use them, and how to control them."
        />
        <meta property="og:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
        <meta name="twitter:title" content="Cookie Policy | HomeGlazer" />
        <meta
          name="twitter:description"
          content="Understand the types of cookies we use, why we use them, and how to control them."
        />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50 pt-28 lg:pt-32">
        <section className="w-full bg-gradient-to-br from-[#ED276E] to-[#299dd7] py-16">
          <div className="w-[90%] lg:w-[80%] mx-auto text-center text-white space-y-4">
            <p className="uppercase tracking-[4px] text-sm font-semibold text-white/90">Legal</p>
            <h1 className="text-4xl md:text-5xl font-bold">Cookie Policy</h1>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
              Learn what cookies are, how we use them at HomeGlazer, and how you can manage your
              preferences.
            </p>
          </div>
        </section>

        <section className="w-[90%] lg:w-[80%] mx-auto py-12 md:py-16">
          <div className="bg-white shadow-sm rounded-2xl p-6 md:p-10 space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                This Cookie Policy explains how HomeGlazer (“we”, “us”, or “our”) uses cookies and similar
                technologies when you visit www.homeglazer.com. By using our site, you agree to the use of
                cookies as described here.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">What are cookies?</h2>
              <p className="text-gray-700 leading-relaxed">
                Cookies are small text files placed on your device by websites you visit. They help the
                site function, remember your preferences, and understand how you interact with pages so we
                can improve your experience.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Types of cookies we use</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li>
                  <span className="font-semibold">Essential cookies</span>: Required for site functionality
                  and security (e.g., navigation, basic forms).
                </li>
                <li>
                  <span className="font-semibold">Performance &amp; analytics cookies</span>: Help us
                  understand site usage so we can improve performance and content.
                </li>
                <li>
                  <span className="font-semibold">Functional cookies</span>: Remember preferences such as
                  language or region to provide a tailored experience.
                </li>
                <li>
                  <span className="font-semibold">Advertising cookies</span>: Used to deliver relevant ads
                  and measure their effectiveness.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Third-party cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We may allow trusted partners to set cookies to support analytics and advertising. These
                may include providers such as Google Analytics or Google Ads, and Facebook. These third
                parties have their own privacy and cookie policies that govern their use.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Managing cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                You can control or delete cookies through your browser settings. Most browsers allow you to
                refuse cookies, delete existing ones, or receive a prompt before a cookie is stored.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li>Adjust cookie settings in your browser’s privacy or security menu.</li>
                <li>Disable analytics/advertising cookies if you prefer not to be tracked for these purposes.</li>
                <li>
                  Note that restricting cookies may impact site functionality or the personalization of
                  services.
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold">Updates to this policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Cookie Policy to reflect changes in technology, applicable laws, or our
                services. Please review this page periodically for the latest information.
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

export default CookiePolicyPage;
