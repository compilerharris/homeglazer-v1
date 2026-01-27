import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CookieConsent from '@/components/common/CookieConsent';
import '../src/styles/tailwind.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/og-image.jpg`;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const path = router.asPath.split('?')[0].split('#')[0];
  const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;

  return (
    <>
      <Head>
        {/* Basic Meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ED276E" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Default Title & Description */}
        <title>HomeGlazer - Professional Painting Services</title>
        <meta name="description" content="Professional painting services including interior, exterior, texture painting, wall decor, and wood services. Transform your space with HomeGlazer." />
        
        {/* Open Graph - Facebook, WhatsApp, LinkedIn */}
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="HomeGlazer" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:title" content="HomeGlazer - Professional Painting Services" />
        <meta property="og:description" content="Professional painting services including interior, exterior, texture painting, wall decor, and wood services. Transform your space with HomeGlazer." />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HomeGlazer - Professional Painting Services" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HomeGlazer - Professional Painting Services" />
        <meta name="twitter:description" content="Professional painting services including interior, exterior, texture painting, wall decor, and wood services." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      </Head>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}