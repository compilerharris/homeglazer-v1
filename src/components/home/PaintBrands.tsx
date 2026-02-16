import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import { SECTION_CTA_CLASSES } from './CTAButton';
import { fetchBrands, transformBrand } from '@/lib/api';
import { sortBrandsByDisplayOrder } from '@/lib/brand-order';
import type { Brand } from '@/lib/api';

const PaintBrands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Fetch brands from API (same as products page)
  useEffect(() => {
    async function loadBrands() {
      try {
        const brandsData = await fetchBrands();
        const transformedBrands = sortBrandsByDisplayOrder(brandsData.map(transformBrand));
        setBrands(transformedBrands);
      } catch (err) {
        console.error('Failed to load brands:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBrands();
  }, []);

  // Responsive slidesToShow logic
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return <section className="w-full mt-[50px] pb-[31px] pt-0 max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center gap-8 2xl:w-[1400px]">
        <div className="w-full lg:w-2/3">
          {loading ? (
            <div className="flex justify-center items-center min-h-[250px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7]"></div>
            </div>
          ) : (
            <SectionCarousel paintBrandsSection={true} slidesToShow={slidesToShow}>
              {brands.map(brand => (
                <CarouselItem key={brand.id} className="basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                  <Link href={`/products?brand=${encodeURIComponent(brand.id)}`} className="block">
                    <div className="relative w-[180px] h-[250px] mx-auto bg-white rounded-lg border border-gray-100 shadow-sm flex items-center justify-center p-4 hover:shadow-md transition-shadow">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-contain rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Logo';
                        }}
                      />
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </SectionCarousel>
          )}
        </div>
        
        <div className="w-full lg:w-1/3 my-auto">
          <div className="max-w-[354px] mx-auto">
            <h2 className="text-[40px] font-medium">
              Quality Paints
            </h2>
            <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-[18px]">
              Discover the perfect paint for your next project.
            </p>
            <Link href="/products" className={`${SECTION_CTA_CLASSES} flex min-h-[60px] w-[297px] max-w-full items-center gap-[13px] text-[21px] font-normal text-center justify-center mt-7 pl-[19px] pr-[11px] py-[13px]`}>
              <span className="self-stretch my-auto">View All Paint Brands</span>
              <img alt="Arrow Icon" className="aspect-[0.97] object-contain w-[34px] self-stretch shrink-0 my-auto brightness-0 invert" src="/uploads/12a32754-91eb-4743-b4c9-43258abcf89f.png" />
            </Link>
          </div>
        </div>
      </div>
    </section>;
};

export default PaintBrands;