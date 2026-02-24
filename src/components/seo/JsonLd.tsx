import React from 'react';
import Head from 'next/head';

interface JsonLdProps {
  data: object | object[];
}

/**
 * Renders JSON-LD structured data in the document head.
 */
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  const json = Array.isArray(data) ? data : [data];
  return (
    <Head>
      {json.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
};

export const ORGANIZATION_JSON_LD = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HomeGlazer',
  url: siteUrl,
  logo: `${siteUrl}/uploads/hero-banner.png`,
  description: 'Professional painting services including interior, exterior, texture painting, wall decor, and wood services. Transform your space with HomeGlazer.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    url: `${siteUrl}/contact`,
    contactType: 'customer service',
  },
});

export const LOCAL_BUSINESS_JSON_LD = (siteUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#organization`,
  name: 'HomeGlazer',
  description: 'Professional painting services including interior, exterior, texture painting, wall decor, and wood services in India.',
  url: siteUrl,
  image: `${siteUrl}/uploads/hero-banner.png`,
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: [
    'Interior Painting',
    'Exterior Painting',
    'Texture Painting',
    'Wall Decor',
    'Wood Polishing',
    'Wood Coating',
  ],
});
