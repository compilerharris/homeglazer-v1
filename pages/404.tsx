import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { getOgImageUrl } from '@/lib/mediaUrl';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const NotFound = () => {
  const router = useRouter();
  const location = router.asPath;

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location
    );
  }, [location]);

  return (
    <>
      <Head>
        <title>Page Not Found | HomeGlazer</title>
        <meta name="description" content="The page you are looking for does not exist. Return to HomeGlazer homepage for professional painting services." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Page Not Found | HomeGlazer" />
        <meta property="og:description" content="The page you are looking for does not exist." />
        <meta property="og:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Page Not Found | HomeGlazer" />
        <meta name="twitter:description" content="The page you are looking for does not exist." />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
