import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { CheckCircle2 } from 'lucide-react';

const ThankYouPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <title>Thank You | HomeGlazer</title>
        <meta
          name="description"
          content="Thank you for contacting HomeGlazer. Our team will get back to you shortly."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            Thank you for your free consultation request!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-2">
            We&apos;ve received your details and our team will contact you within 24 hours to discuss your project.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            You&apos;ll be redirected to the homepage in a few seconds…
          </p>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#299dd7] text-white text-sm font-semibold hover:bg-[#237bb0] transition-colors"
          >
            Go to Homepage now
          </button>
        </div>
      </main>
    </>
  );
};

export default ThankYouPage;

