import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import CookieConsent from '@/components/common/CookieConsent';
import { getOgImageUrl } from '@/lib/mediaUrl';
import '../src/styles/tailwind.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';
const DEFAULT_OG_IMAGE = getOgImageUrl('/uploads/hero-banner.png', SITE_URL);

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
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="HomeGlazer - Professional Painting Services" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HomeGlazer - Professional Painting Services" />
        <meta name="twitter:description" content="Professional painting services including interior, exterior, texture painting, wall decor, and wood services." />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

        {/* Google tag (gtag.js) Consent Mode dataLayer added by Site Kit */}
        <script
          id="google_gtagjs-js-consent-mode-data-layer"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {"ad_personalization":"denied","ad_storage":"denied","ad_user_data":"denied","analytics_storage":"denied","functionality_storage":"denied","security_storage":"denied","personalization_storage":"denied","region":["AT","BE","BG","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","MT","NL","NO","PL","PT","RO","SE","SI","SK"],"wait_for_update":500});
window._googlesitekitConsentCategoryMap = {"statistics":["analytics_storage"],"marketing":["ad_storage","ad_user_data","ad_personalization"],"functional":["functionality_storage","security_storage"],"preferences":["personalization_storage"]};
window._googlesitekitConsents = {"ad_personalization":"denied","ad_storage":"denied","ad_user_data":"denied","analytics_storage":"denied","functionality_storage":"denied","security_storage":"denied","personalization_storage":"denied","region":["AT","BE","BG","CH","CY","CZ","DE","DK","EE","ES","FI","FR","GB","GR","HR","HU","IE","IS","IT","LI","LT","LU","LV","MT","NL","NO","PL","PT","RO","SE","SI","SK"],"wait_for_update":500};
            `,
          }}
        />
        {/* End Google tag (gtag.js) Consent Mode dataLayer added by Site Kit */}

        {/* Google tag (gtag.js) snippet added by Site Kit */}
        <script
          type="rocketlazyloadscript"
          data-rocket-src="https://www.googletagmanager.com/gtag/js?id=G-N45TYM4KN3"
          id="google_gtagjs-js"
          async
        />
        <script
          type="rocketlazyloadscript"
          id="google_gtagjs-js-after"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag("set","linker",{"domains":["homeglazer.com"]});
gtag("js", new Date());
gtag("set", "developer_id.dZTNiMT", true);
gtag("config", "G-N45TYM4KN3", {"googlesitekit_post_type":"page"});
            `,
          }}
        />
        {/* End Google tag (gtag.js) snippet added by Site Kit */}
      </Head>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}