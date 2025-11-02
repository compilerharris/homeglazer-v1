import React, { useRef, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import CTAButton from '@/components/home/CTAButton';
import ProductCard from '@/components/products/ProductCard';
import { prisma } from '@/lib/prisma';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

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
    sheenLevel: string;
    surfaceType: string;
    usage: string;
    image: string;
    prices: Record<string, number>;
    colors?: string[];
    features?: string[];
    specifications?: Record<string, string>;
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
    sheenLevel: string;
    surfaceType: string;
    usage: string;
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps & { brandSlug: string }> = ({ product, relatedProducts, brandSlug }) => {
  // Debug logging
  useEffect(() => {
    console.log('Product data:', product);
    console.log('Related products:', relatedProducts);
    console.log('Related products count:', relatedProducts.length);
  }, [product, relatedProducts]);

  return (
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
      <section className="w-full relative h-48 md:h-64 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/images/bedroom/bedroom1/bedroom1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Removed dark overlay */}
        </div>
        
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
              <h1 className="text-[#ED276E] text-3xl font-bold mb-4">
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
              <h2 className="text-[#ED276E] text-3xl font-bold mb-6">Product Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              {product.features && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
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
                <h2 className="text-[#ED276E] text-3xl font-bold mb-6">Specifications</h2>
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
      <section className="w-full py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">
            Want to see this color on your walls?
          </h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Use our color visualizer to see how this paint will look in your space.
            Upload a photo of your room and experiment with different colors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              to="/colour-visualiser/basic"
              className="bg-white text-gray-900 hover:bg-gray-100 text-xl px-8 py-4"
            >
              Try Single Wall Visualizer
            </CTAButton>
            <CTAButton
              to="/colour-visualiser/advanced"
              className="bg-[#ED276E] text-white hover:bg-[#b81d5a] text-xl px-8 py-4"
            >
              Try Advanced Visualizer
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="w-full py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-[#ED276E] text-3xl font-bold mb-8 text-center">
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
            <CTAButton to="/calculator" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
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
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-3 px-3 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px] whitespace-nowrap">
            Budget Calculator
          </Link>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProductDetailsProps> = async ({ params }) => {
  try {
    // Validate params
    if (!params || !params.brand || !params.slug) {
      console.error('Missing required params:', params);
      return { notFound: true };
    }

    const brandSlug = params.brand as string;
    const slug = params.slug as string;

    // Ensure Prisma client is initialized
    if (!prisma) {
      console.error('Prisma client not initialized');
      return { notFound: true };
    }

    // Find the brand by slug
    let brand;
    try {
      brand = await prisma.brand.findUnique({
        where: { slug: brandSlug },
        select: { id: true, name: true },
      });
    } catch (error) {
      console.error('Error fetching brand:', error);
      return { notFound: true };
    }

    if (!brand) {
      console.log(`Brand not found: ${brandSlug}`);
      return { notFound: true };
    }

    // Find the product by brand ID and slug
    let product;
    try {
      product = await prisma.product.findUnique({
        where: {
          brandId_slug: {
            brandId: brand.id,
            slug: slug,
          },
        },
        include: {
          brand: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
          relatedProducts: {
            take: 4,
            include: {
              relatedProduct: {
                include: {
                  brand: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      return { notFound: true };
    }

    if (!product) {
      console.log(`Product not found: ${slug} for brand ${brandSlug}`);
      return { notFound: true };
    }

    // Format product for component
    const formattedProduct = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      brandId: product.brandId,
      brand: product.brand.name,
      description: product.description,
      shortDescription: product.shortDescription,
      category: product.category,
      sheenLevel: product.sheenLevel,
      surfaceType: product.surfaceType,
      usage: product.usage,
      image: product.image,
      prices: product.prices as Record<string, number>,
      colors: (product.colors as string[]) || [],
      features: (product.features as string[]) || [],
      specifications: (product.specifications as Record<string, string>) || {},
    };

    // Format related products for ProductCard component
    const formattedRelatedProducts = (product.relatedProducts || []).map((rp: any) => ({
      id: rp.relatedProduct.id,
      name: rp.relatedProduct.name,
      slug: rp.relatedProduct.slug,
      brandId: rp.relatedProduct.brandId,
      brand: rp.relatedProduct.brand.name,
      image: rp.relatedProduct.image,
      prices: rp.relatedProduct.prices as Record<string, number>,
      shortDescription: rp.relatedProduct.shortDescription,
      category: rp.relatedProduct.category,
      sheenLevel: rp.relatedProduct.sheenLevel,
      // Add required fields that ProductCard doesn't use but Product type requires
      description: rp.relatedProduct.description || '',
      surfaceType: rp.relatedProduct.surfaceType || '',
      usage: rp.relatedProduct.usage || '',
    }));

    return {
      props: {
        product: formattedProduct,
        relatedProducts: formattedRelatedProducts,
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