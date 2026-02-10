import React, { useRef, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import CTAButton from '@/components/home/CTAButton';
import ProductCard from '@/components/products/ProductCard';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

// Force dynamic rendering - prevents static generation at build time
// This ensures Prisma client is only used at request time, not during build
export const dynamic = 'force-dynamic';

// SVG paths for bedroom wall regions (from bedroom6 folder)
const LEFT_WALL_PATH = "M674.48,369.43v63.32l5.17.81,1.08,5.95,6.49.42-.2-70.37-12.54-.13h0ZM295.74,534.66l.08,12.28-4.77.47.15-12.05,4.54-.7ZM286.82,535.83l-.15,12.12-15.33,1.8v-12.2l15.48-1.72h0ZM249.99,552.88l16.81-2.5v-12.2l-10.87,1.09c-1.02,11.65-5.94,13.61-5.94,13.61h0ZM407.31,520.01l3.79,22.5,10.48,1.49-3.37-24.58-10.9.59h0ZM390.66,539.61l7.46,1.06,1.27-20.8-6.13.14-2.6,19.6h0ZM381.16,517.77l-.75-2.39-.74-7.02v-17.18l-.75-3.14h-1.5l-.44,27.04-.13,22.57,9.01,1.28,2.77-18.92-5.23-1.04-2.24-1.2h0ZM366.41,391.51l4.74,13.01-3.29-21.96,5.68,18.38.6-19.58.59-7.02-7.9-23.49-.42,40.66h0ZM364.9,538.28l4.99-.55,1.56-49.39h-6.04l-.51,49.94h0ZM674.48,321.12V94.42l-226.06-54.61-75.35,17.97L111.79.57.13.11v611.71l66.16-9.65.15-55.61-.6-94.19.45-84.55V33.87c.6-1.96,1.36-.15,3.01-.45s1.66,1.81,5.12.9c3.47-.9,4.67,3.77,7.23,2.26,2.56-1.51,1.96,1.36,4.07.45,2.11-.9,3.92,1.51,6.18.9,2.26-.6,1.21,4.52,4.67,1.81,3.47-2.71,3.01.15,3.77.3.75.15,1.66.9,3.32,0,1.66-.9,2.11,1.66,4.07,1.05,1.96-.6,3.16,1.81,5.43,1.05,2.26-.75,3.16,3.01,4.67,1.81,1.51-1.21,2.71.75,3.32.15.6-.6,1.96.6,2.86,1.36.9.75,3.84.62,5.97.27,2.13-.36,2.13,4.98.36,10.32s-.71,20.99-.71,20.99l170.02,29.52v-9.96s-1.6-15.04-.03-17.4,4.56.47,6.3,0c1.73-.47,4.09,2.52,5.98,1.57,1.89-.94,3.78,2.52,4.56.79s3.78.63,8.5.47c4.72-.16,4.72,4.41,7.87,2.83s4.72,1.89,8.03,1.26,3.31,2.83,5.19,1.73c1.89-1.1,3.62.63,6.61.63s3.31,2.36,5.51,1.42,2.83,2.36,5.19,1.26c2.36-1.1,4.88,1.57,4.88,1.57l4.09.94c1.1-2.2,3.31-.31,3.31-.31,2.99,0,5.67.47,4.56,4.72-1.1,4.25-5.78,3.06-5.78,3.06l-6.46-2.04-1.36,8.5.68,62.59v136.41l-.44,42.83,8.64,20.85,5.98-17.78-3.29,18.38,4.33,10.76.75-3.14.6-18.53.45,13.75,4.93-17.78-1.05,28.09.9-3.44,1.94-27.04-.3,21.37,3.88-13.9-.15,9.26,3.14-15.84-2.09,17.33,13.9-46.76-.6,6.13,2.24-6.57c-1.64,15.54-10.76,53.64-10.76,53.64l2.84-6.28-5.68,25.7,7.02-7.77-5.08,8.96,7.62-3.14c-1.34,2.24-7.02,5.53-7.02,5.53,0,0-4.03,1.79-5.08,8.22-1.05,6.42-5.68,18.38-5.68,18.38,14.04-.75,19.57.75,19.57.75l1.64.9-.15,18.97c18.23-15.09,24.5,1.2,24.5,1.2-10.76-11.36-15.24-2.39-15.24-2.39l3.44,1.49c15.39-3.59,21.07,16.14,21.07,16.14-8.82-16.29-17.78-14.04-17.78-14.04,5.83,3.29,13.9,14.64,13.9,14.64,0,0-5.98-5.53-8.37-6.87-2.39-1.34-3.14-4.63-7.47-6.42s-8.07,4.78-8.07,4.78c8.52-3.59,13.45,10.31,13.45,10.31l3.59,2.69-2.69-.3c5.08,21.81,1.34,30.03,1.34,30.03,0-10.24-1.37-17.76-2.86-22.91-.09,8-.42,32.88-1.17,37.26-.9,5.23-5.38,4.78-5.38,4.78l4.23,25.92,11.99,1.7c.46-5.21,1.07-6.59,1.07-6.59,3.37-1.23,28.49-5.51,28.49-5.51,0,0,.61-.92.61-3.52s.46-5.05,1.68-7.81c1.23-2.76,9.04-19.3,9.04-19.3,0,0,5.51-13.94,15.16-25.42,9.65-11.49,22.82-13.63,24.81-13.63s5.67-1.84,5.67-1.84c0,0,2.3-2.14,5.51-2.76,3.22-.61,12.56-2.91,15.93-3.83,3.37-.92,7.2-.46,10.57-1.38s6.59.15,9.04-.92c2.45-1.07,6.59.61,9.04-.77s8.58.31,11.49-1.38c2.91-1.68,7.81-2.45,7.81-2.45,5.36-3.22,7.81-1.07,7.81-1.07,3.22-1.53,5.67-.15,5.67-.15,4.44-1.68,6.43.15,6.43.15,3.68-.92,7.05-.15,10.26-.15s14.09-.15,23.43-4.59c9.34-4.44,17.21-2.64,17.21-2.64l.77-6.58c1.16-1.55,8.21-1.54,8.21-1.54v-63.32l-5.11-.12.39-47.19,4.73-.99v-.02h0ZM609.83,377.23l-5.04.76-85.43,1.26.25-179.17,1.76-1.01,88.45,11.84v166.32h0ZM402.92,541.35l1.42.2-1.22-5.55-.2,5.35ZM427.18,472.8l.83.64c-1.39-3.81-2.62-5.57-2.62-5.57l-4.18-1.34,1.64,6.42,4.33-.15h0Z";

const RIGHT_WALL_PATH = "M1256.66,472.47l8.58.42.13-100.16-8.85-.14.14,99.88ZM1278.79,372.45l-11.06.14v100.3l10.92.97v-12.32h1.11v-78.02l-.97-.28v-10.79ZM1224.3,372.41l1.08-2.16v-46.54l-.27-14.07-.54-2.44,22.19-.27,33.28-1.35-.07-80.83c-3.76,5.01-11.14,10.59-26.11,16.05-18.76,6.84-31.66,3.32-43.20-2.15s-23.46-16.81-26.39-33.42,2.54-29.32,9.77-40.27,17.01-17.01,28.15-22.48,22.09-4.3,35.57-2.35c10.8,1.56,19.21,9.14,22.14,12.1l-.13-152.12-63.23.76-542.05,93.55v226.7l33.36-1.25.41-5.36,3.71.82.21,4.12,40.62,1.24-.62,2.68v46.39h-18.76l-.2,59.84,6.23-.64h11.9l12.72-.27,7.03,1.35,5.14.54.27-37.07.27-24.35.81-9.47,1.35-5.14s2.98-7.31,10.28-7.03c7.31.27,118.78-.81,118.78-.81l216.72-1.89,67.91-.27s5.41-.27,5.14,7.58c-.27,7.85-.54,74.68-.54,74.68l.27,48.7,19.75-4.33s-.81-5.68.81-5.68,23.81-.81,28.95,1.08c5.14,1.89,1.62,4.87,1.62,4.87l5.14.54-.27-100.11-29.22.54h.02,0ZM790.57,259.27l-1.43.1-34.63,2.04-2.45-.31.1-43.42,3.68-.41,32.28-2.86,2.45.82v44.03h0ZM1077.89,137.09s5.4-21.36,34.86-24.3,46.64,55.48-6.38,65.05c0,0-16.69,1.47-26.76-13.75,0,0-7.36-9.57-1.72-27ZM971.79,154.19s12.61-1.96,13.31,16.12-28.31,19.76-28.73.56c0,0-1.26-14.71,15.42-16.68ZM807.22,176.92l30.34-3.27,1.84.82.1,45.67-30.45,2.55-1.94-1.12.1-44.65h.01ZM842.98,286.75l-.31,2.15-3.06.31-10.83.1-23.29,1.33-3.27-.82v-52.62l32.9-2.35h7.15l.72,1.33-.1,9.6.1,40.97h-.01ZM910.27,309.32c-15.98,9.11-41.48,7.01-48.07-25.51,0,0-5.75-32.79,28.45-44,0,0,18.08-5.05,31.53,13.31,13.45,18.36,4.06,47.09-11.91,56.2h0ZM942.28,224.05l-22.25,1.9-40.99,3.07-7.03.59-6.59-.44-.15-43.92-.29-34.55.29-5.42,6.29-1.02,33.96-4.25,5.27-.29,5.56-.88,15.08-1.9,10.1-1.17,1.76,2.05v56.07l.15,29.13-1.17,1.02h.01ZM991.07,250.66l-31.39,2.44-6.22-.81v-49.51l36.17-3.04,1.86.66.22,49.26-.64,1.02v-.02h0ZM1060.87,225.77l-51.95,3.79-3.79-1.08.27-65.21,53.57-5.68,1.89,1.35v66.83h.01ZM1171.26,290.43l-81.44,2.98h-11.09l-4.6-.81v-93.35l94.7-8.12,2.71,1.08.27,94.7-.54,3.52h-.01ZM689.49,369.98l-.2,70.01,6.05-2.37,8.12-3.25,1.89.82h.01s-.41-65.21-.41-65.21h-15.46ZM674.48,369.43v63.32l5.17.81,1.08,5.95,6.49.42-.2-70.37-12.54-.13ZM715.88,369.77l.2,61.61,10.1-.79,5.42-.82.33-.03-.58-60.38-15.47.41Z";

const WINDOW_PATH = "M212.52,109.16l-.22,271.72,84.8-.9v23.17l-83.9,2.25-.9,81.88h-26.99l.45-78.05-1.57-2.25-53.98,1.35v-25.87l55.11-.67.9-276.44-56.01-9.67-.56-18.62,170.02,29.52-.31,16.99-86.82-14.4ZM185.27,504.54c8.64.19,11.91,1.54,11.91,1.54l14.98.38v-11.52h-26.99l.1,9.6ZM246.94,511.42s8.8,2.93,8.8,14.67.18,13.19.18,13.19l10.87-1.09-.3-28.91-19.56,2.15ZM271.39,509.07l-.05,28.48,15.49-1.72-.96-27.74-14.47.98ZM291.2,535.36l4.54-.7.29-27.93-4.89.78.06,27.85Z";

const BEDROOM_IMAGE = "/uploads/bedroom6.jpg";

// Animated color thumbnail component
interface AnimatedRoomThumbnailProps {
  colors: string[];
  type: 'single' | 'multi';
  id: string;
}

const AnimatedRoomThumbnail: React.FC<AnimatedRoomThumbnailProps> = ({ colors, type, id }) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prev) => (prev + 1) % colors.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [colors.length]);
  
  const currentColor = colors[currentColorIndex];
  const nextColor = colors[(currentColorIndex + 1) % colors.length];
  const windowColor = colors[(currentColorIndex + 2) % colors.length];
  
  if (type === 'multi') {
    // For advanced visualizer - show different colors on left wall, right wall, and window
    return (
      <div className="relative w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
        <img 
          src={BEDROOM_IMAGE}
          alt="Bedroom preview with multiple wall colors"
          className="object-cover w-full h-full"
          onError={(e) => {
            e.currentTarget.src = '/assets/images/bedroom/bedroom1/bedroom1.jpg';
          }}
        />
        {/* SVG Overlay with multiple color regions */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
          viewBox="0 0 1280 720"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id={`wall-mask-left-${id}`}>
              <rect width="100%" height="100%" fill="black"/>
              <path d={LEFT_WALL_PATH} fill="white"/>
            </mask>
            <mask id={`wall-mask-right-${id}`}>
              <rect width="100%" height="100%" fill="black"/>
              <path d={RIGHT_WALL_PATH} fill="white"/>
            </mask>
            <mask id={`wall-mask-window-${id}`}>
              <rect width="100%" height="100%" fill="black"/>
              <path d={WINDOW_PATH} fill="white"/>
            </mask>
          </defs>
          {/* Left wall */}
          <rect 
            width="100%" 
            height="100%" 
            fill={currentColor} 
            opacity="0.7"
            mask={`url(#wall-mask-left-${id})`}
            style={{ transition: 'fill 0.8s ease-in-out' }}
          />
          {/* Right wall */}
          <rect 
            width="100%" 
            height="100%" 
            fill={nextColor} 
            opacity="0.7"
            mask={`url(#wall-mask-right-${id})`}
            style={{ transition: 'fill 0.8s ease-in-out' }}
          />
          {/* Window */}
          <rect 
            width="100%" 
            height="100%" 
            fill={windowColor} 
            opacity="0.7"
            mask={`url(#wall-mask-window-${id})`}
            style={{ transition: 'fill 0.8s ease-in-out' }}
          />
        </svg>
      </div>
    );
  }
  
  // Single wall visualizer - all walls same color
  return (
    <div className="relative w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden">
      <img 
        src={BEDROOM_IMAGE}
        alt="Bedroom preview with single wall color"
        className="object-cover w-full h-full"
        onError={(e) => {
          e.currentTarget.src = '/assets/images/bedroom/bedroom1/bedroom1.jpg';
        }}
      />
      {/* SVG Overlay for all walls with same color */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <mask id={`wall-mask-combined-${id}`}>
            <rect width="100%" height="100%" fill="black"/>
            <path d={LEFT_WALL_PATH} fill="white"/>
            <path d={RIGHT_WALL_PATH} fill="white"/>
            <path d={WINDOW_PATH} fill="white"/>
          </mask>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill={currentColor} 
          opacity="0.7"
          mask={`url(#wall-mask-combined-${id})`}
          style={{ transition: 'fill 0.8s ease-in-out' }}
        />
      </svg>
    </div>
  );
};

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    slug: string;
    brandId: string;
    brand: string; // Brand name for display
    description: string;
    shortDescription: string;
    category: string;
    subCategory?: string | null;
    sheenLevel: string;
    surfaceType: string;
    usage: string;
    image: string;
    bannerImage?: string | null;
    prices: Record<string, number>;
    colors?: string[];
    features?: string[];
    specifications?: Record<string, string>;
    pisHeading?: string;
    pisDescription?: string;
    pisFileUrl?: string;
    showPisSection?: boolean;
    userGuideSteps?: Array<{title: string, description: string}>;
    userGuideMaterials?: string[];
    userGuideTips?: string[];
    showUserGuide?: boolean;
    faqs?: Array<{question: string, answer: string}>;
    showFaqSection?: boolean;
    suggestedBlogs?: Array<{
      id: string;
      slug: string;
      title: string;
      excerpt: string;
      coverImage: string;
      author: string;
      readTime: string;
      categories: string[];
      publishedAt: string | null;
    }>;
  };
  relatedProducts: Array<{
    id: string;
    name: string;
    slug: string;
    brandId: string;
    brand: string;
    image: string;
    prices: Record<string, number>;
    shortDescription: string;
    description: string;
    category: string;
    subCategory?: string | null;
    sheenLevel: string;
    surfaceType: string;
    usage: string;
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps & { brandSlug: string }> = ({ product, relatedProducts, brandSlug }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Debug logging
  useEffect(() => {
    console.log('Product data:', product);
    console.log('Related products:', relatedProducts);
    console.log('Related products count:', relatedProducts.length);
  }, [product, relatedProducts]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>{product.name} | {product.brand} - HomeGlazer</title>
        <meta name="description" content={product.description || `${product.name} by ${product.brand}. Premium quality paint available at HomeGlazer. Find the perfect paint for your home.`} />
        <meta name="keywords" content={`${product.name}, ${product.brand}, paint, ${product.sheenLevel || ''}, ${product.surfaceType || ''}, HomeGlazer`} />
        <meta property="og:title" content={`${product.name} | ${product.brand} - HomeGlazer`} />
        <meta property="og:description" content={product.description || `${product.name} by ${product.brand}. Premium quality paint.`} />
        <meta property="og:type" content="product" />
        <meta property="og:image" content={product.image && product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image || '/uploads/color-bucket1.png'}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | ${product.brand}`} />
        <meta name="twitter:description" content={product.description || `Premium quality paint by ${product.brand}.`} />
        <meta name="twitter:image" content={product.image && product.image.startsWith('http') ? product.image : `${SITE_URL}${product.image || '/uploads/color-bucket1.png'}`} />
      </Head>
      <div className="bg-white flex flex-col overflow-hidden items-center">
        <Header />

        <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
          <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products?brand=${product.brandId}`}>{product.brand}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/products/${brandSlug}/${product.slug}`}>{product.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="w-full relative h-96 md:h-[32rem] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: product.bannerImage
              ? `url(${product.bannerImage.startsWith('/') ? product.bannerImage : product.bannerImage})`
              : 'url(/assets/images/bedroom/bedroom1/bedroom1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* 30% black overlay */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Content - Desktop Only */}
        <div className="relative z-10 h-full flex items-center hidden lg:flex">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-white">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-xl mb-6 opacity-90">
                  {product.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    {product.brand}
                  </span>
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    {product.category}
                  </span>
                  {product.subCategory && (
                    <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                      {product.subCategory}
                    </span>
                  )}
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    {product.sheenLevel}
                  </span>
                </div>
              </div>
              
              {/* Product Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="bg-white rounded-xl p-6 shadow-2xl max-w-sm">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/images/bucket.png';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile/Tablet Content - Outside Hero */}
      <div className="lg:hidden w-full py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-3xl font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                {product.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#299dd7] text-white px-3 py-1 rounded-full text-sm">
                  {product.brand}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
                {product.subCategory && (
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {product.subCategory}
                  </span>
                )}
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {product.sheenLevel}
                </span>
              </div>
            </div>

            {/* Product Image */}
            <div className="flex justify-center">
              <div className="bg-white rounded-xl p-4 shadow-lg max-w-xs border border-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/bucket.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Information Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Description */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Product Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Available Sizes/Quantity */}
              {product.prices && Object.keys(product.prices).filter((k) => product.prices[k]).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Available Sizes</h3>
                  <p className="text-gray-700">
                    Available in {Object.keys(product.prices)
                      .filter((k) => product.prices[k])
                      .sort()
                      .join(', ')}
                  </p>
                </div>
              )}

              {/* Features */}
              {product.features && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="text-[#299dd7] mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Specifications</h2>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium text-gray-900">{key}</div>
                      <div className="text-gray-600">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visualizer Section */}
      <section className="w-full py-12 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Single Wall Visualizer */}
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold mb-3">Single Wall Visualiser</h3>
              <p className="text-gray-600 mb-6">
                Quickly preview popular colours on sample rooms with ease. Simple and fast!
              </p>
              <AnimatedRoomThumbnail 
                colors={['#FF6B9D', '#FFD93D', '#6BCF7F', '#4A90E2', '#9B59B6']}
                type="single"
                id="single"
              />
              <Link 
                href="/colour-visualiser/basic"
                className="mt-4 bg-[#299dd7] text-white hover:bg-[#237bb0] py-3 px-6 flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 text-lg"
              >
                Try Single Wall Visualiser
                <span>›</span>
              </Link>
            </div>

            {/* Advanced Visualizer */}
            <div className="flex flex-col">
              <h3 className="text-3xl font-bold mb-3">Advanced Visualiser</h3>
              <p className="text-gray-600 mb-6">
                Choose different colours for each wall and ceiling across multiple room types and styles.
              </p>
              <AnimatedRoomThumbnail 
                colors={['#4A90E2', '#6BCF7F', '#FF6B9D', '#FFD93D', '#9B59B6']}
                type="multi"
                id="advanced"
              />
              <Link 
                href="/colour-visualiser/advanced"
                className="mt-4 bg-[#ED276E] text-white hover:bg-[#b81d5a] py-3 px-6 flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 text-lg"
              >
                Try Advanced Visualiser
                <span>›</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* User Guide Section */}
      {product.showUserGuide && (
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            {/* Main Title */}
            <h2 className="text-4xl font-bold mb-12 text-center">
              User Guide For {product.name}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Step-by-Step Process (2/3 width) */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-6">
                    Step-by-Step Process
                  </h3>
                  <div className="space-y-6">
                    {product.userGuideSteps && product.userGuideSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-[#ED276E] text-white rounded-full flex items-center justify-center font-bold text-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2 text-lg">{step.title}</h4>
                          <p className="text-gray-700 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Materials and Tips (1/3 width) */}
              <div className="lg:col-span-1 space-y-6">
                {/* Materials */}
                {product.userGuideMaterials && product.userGuideMaterials.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4">
                      Materials You'll Need
                    </h3>
                    <ul className="space-y-3">
                      {product.userGuideMaterials.map((material, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <span className="text-[#299dd7] text-lg flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{material}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips */}
                {product.userGuideTips && product.userGuideTips.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-xl font-bold mb-4">
                      Tips
                    </h3>
                    <ul className="space-y-3">
                      {product.userGuideTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-3 text-gray-700">
                          <span className="text-[#299dd7] text-lg flex-shrink-0">✓</span>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Information Sheet Download Section */}
      {product.showPisSection && product.pisFileUrl && (
        <section className="w-full py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7]">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-white text-[40px] font-medium mb-6">
              {product.pisHeading || `Download Product Information Sheet for ${product.brand} ${product.name}`}
            </h2>
            <p className="text-white text-xl mb-8">
              {product.pisDescription || 'Get detailed technical specifications, application guidelines, and safety information for this product.'}
            </p>
            <a 
              href={product.pisFileUrl || '/downloads/sample-product-info.pdf'}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-gray-900 hover:bg-gray-100 py-4 px-8 rounded-lg font-medium transition-all duration-300 text-xl shadow-lg"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              Download Product Information
            </a>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {product.showFaqSection && product.faqs && product.faqs.length > 0 && (
        <section className="w-full py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {product.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="flex justify-between items-center cursor-pointer p-6 hover:bg-gray-100 transition-colors w-full text-left"
                    >
                      <h3 className="text-lg font-bold pr-4">
                        {faq.question}
                      </h3>
                      <svg 
                        className={`w-6 h-6 text-[#ED276E] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Want some suggestion? - Blog Articles */}
      {product.suggestedBlogs && product.suggestedBlogs.length > 0 && (
        <section className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Want some suggestion?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {product.suggestedBlogs.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={`/blog/${blog.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    {blog.categories && blog.categories.length > 0 && (
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {blog.categories.map((category, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-[#ED276E] bg-opacity-10 text-[#ED276E] px-2 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--brand-pink)] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{blog.author}</span>
                      <span className="mx-2">•</span>
                      <span>{blog.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="w-full py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Related Products
            </h2>
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => {
                  const container = document.getElementById('related-products-scroll');
                  if (container) {
                    container.scrollBy({ left: -300, behavior: 'smooth' });
                  }
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-200"
                aria-label="Scroll left"
              >
                <span className="text-lg">‹</span>
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => {
                  const container = document.getElementById('related-products-scroll');
                  if (container) {
                    container.scrollBy({ left: 300, behavior: 'smooth' });
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-gray-50 transition-all duration-200"
                aria-label="Scroll right"
              >
                <span className="text-lg">›</span>
              </button>

              {/* Scrollable Container */}
              <div
                id="related-products-scroll"
                className="overflow-x-auto scrollbar-hide flex gap-6 px-4"
                style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
              >
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="flex-shrink-0 w-80">
                    <ProductCard product={relatedProduct as any} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Get a Free Quote
            </CTAButton>
            <CTAButton to="/paint-budget-calculator" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Try Our Budget Calculator
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Mobile Action Buttons */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Enquire Now
          </Link>
          <Link href="/paint-budget-calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Budget Calculator
          </Link>
        </div>
      </div>

      <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductDetailsProps> = async ({ params, req }) => {
  try {
    // Validate params
    if (!params || !params.brand || !params.slug) {
      console.error('Missing required params:', params);
      return { notFound: true };
    }

    const brandSlug = params.brand as string;
    const slug = params.slug as string;

    // Get the base URL for API calls
    // During server-side rendering, we can construct the absolute URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Fetch product data from API route instead of using Prisma directly
    let apiResponse;
    try {
      const apiUrl = `${baseUrl}/api/products/by-slug?brand=${encodeURIComponent(brandSlug)}&slug=${encodeURIComponent(slug)}`;
      console.log('Fetching product from API:', apiUrl);
      
      apiResponse = await fetch(apiUrl);
      
      if (!apiResponse.ok) {
        console.error(`API returned error: ${apiResponse.status} ${apiResponse.statusText}`);
        return { notFound: true };
      }
    } catch (error) {
      console.error('Error fetching from API:', error);
      return { notFound: true };
    }

    // Parse the API response
    let data;
    try {
      data = await apiResponse.json();
    } catch (error) {
      console.error('Error parsing API response:', error);
      return { notFound: true };
    }

    // Validate the response structure
    if (!data || !data.product) {
      console.error('Invalid API response structure:', data);
      return { notFound: true };
    }

    return {
      props: {
        product: data.product,
        relatedProducts: data.relatedProducts || [],
        brandSlug: brandSlug,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    // Log full error details for debugging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    // Return notFound to prevent build failure
    return { notFound: true };
  }
};

export default ProductDetails; 