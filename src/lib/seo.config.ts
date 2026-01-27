import { DefaultSeoProps } from 'next-seo';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const defaultSEOConfig: DefaultSeoProps = {
  defaultTitle: 'HomeGlazer - Professional Painting Services',
  titleTemplate: '%s | HomeGlazer',
  description: 'Professional painting services including interior, exterior, texture painting, wall decor, and wood services. Transform your space with HomeGlazer.',
  canonical: SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'HomeGlazer',
    images: [
      {
        url: `${SITE_URL}/assets/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'HomeGlazer - Professional Painting Services',
      },
    ],
  },
  twitter: {
    handle: '@homeglazer',
    site: '@homeglazer',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#ED276E',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
  ],
};

export default defaultSEOConfig;
export { SITE_URL };
