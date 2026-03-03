import React from 'react';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import ProductPage from '@/pages/products/[brand]/[slug]';
import asianPaintsData from '@/data/asian_paints_products.json';

interface Params extends ParsedUrlQuery {
  slug: string;
}

// Reuse the existing product details page component, but feed it data from the JSON file
const DevAsianPaintsProductPage = (props: any) => {
  return <ProductPage {...props} />;
};

export const getServerSideProps: GetServerSideProps<any, Params> = async (context) => {
  const { params } = context;

  if (!params?.slug) {
    return { notFound: true };
  }

  const slug = params.slug;

  const productFromJson = asianPaintsData.products.find((p) => p.slug === slug);

  if (!productFromJson) {
    return { notFound: true };
  }

  const brandSlug = asianPaintsData.brand.slug;

  // Map related products using the same JSON file
  const relatedProducts =
    (productFromJson as any).relatedProducts?.map((relatedSlug: string) => {
      const related = asianPaintsData.products.find((p) => p.slug === relatedSlug);
      if (!related) return null;
      return {
        id: related.id,
        name: related.name,
        slug: related.slug,
        brandId: related.brandId,
        brand: related.brand,
        image: related.image,
        prices: related.prices,
        shortDescription: related.shortDescription,
        description: related.description,
        category: related.category,
        subCategory: related.subCategory ?? null,
        sheenLevel: related.sheenLevel,
        surfaceType: related.surfaceType,
        usage: related.usage,
      };
    }).filter(Boolean) || [];

  const product = {
    id: productFromJson.id,
    name: productFromJson.name,
    slug: productFromJson.slug,
    brandId: productFromJson.brandId,
    brand: productFromJson.brand,
    description: productFromJson.description,
    shortDescription: productFromJson.shortDescription,
    category: productFromJson.category,
    subCategory: productFromJson.subCategory ?? null,
    sheenLevel: productFromJson.sheenLevel,
    surfaceType: productFromJson.surfaceType,
    usage: productFromJson.usage,
    image: productFromJson.image,
    bannerImage: (productFromJson as any).bannerImage ?? null,
    sizeUnit: 'L',
    prices: productFromJson.prices || {},
    colors: productFromJson.colors || [],
    features: productFromJson.features || [],
    specifications: productFromJson.specifications || {},
    pisHeading: (productFromJson as any).pisHeading ?? null,
    pisDescription: (productFromJson as any).pisDescription ?? null,
    pisFileUrl: (productFromJson as any).pisFileUrl ?? null,
    showPisSection: (productFromJson as any).showPisSection ?? false,
    userGuideSteps: (productFromJson as any).userGuideSteps || null,
    userGuideMaterials: (productFromJson as any).userGuideMaterials || null,
    userGuideTips: (productFromJson as any).userGuideTips || null,
    showUserGuide: (productFromJson as any).showUserGuide ?? false,
    faqs: (productFromJson as any).faqs || null,
    showFaqSection: (productFromJson as any).showFaqSection ?? false,
  };

  return {
    props: {
      product,
      relatedProducts,
      brandSlug,
    },
  };
};

export default DevAsianPaintsProductPage;

