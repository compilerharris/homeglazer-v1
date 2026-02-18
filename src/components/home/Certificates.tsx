import React, { useEffect, useState } from 'react';
import SectionCarousel from './SectionCarousel';
import { CarouselItem } from "@/components/ui/carousel";
import { getMediaUrl } from '@/lib/mediaUrl';

const certificates = [
  { id: "iso-9001", src: "/uploads/certificates/ISO_9001-2015.svg", alt: "ISO 9001:2015 Certification" },
  { id: "labour-ministry", src: "/uploads/certificates/Ministry_of_Labour_and_Employment.png", alt: "Ministry of Labour & Employment Registration" },
  { id: "msme", src: "/uploads/certificates/msme-seeklogo.png", alt: "MSME Registration" },
  { id: "footer-logo", src: "/uploads/certificates/footer-logo.png", alt: "HomeGlazer Certification Mark" }
];

const Certificates: React.FC = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setSlidesToShow(1);
      } else if (width < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <section className="w-full bg-white mt-[50px] max-md:mt-10">
      <div className="container mx-auto px-4 lg:px-8 2xl:w-[1400px]">
        <div className="text-center mb-10">
          <h2 className="text-[40px] font-medium leading-[150%]">
            Certificates &amp; Accreditations
          </h2>
          <p className="text-xl text-[rgba(89,89,89,1)] font-light mt-3">
            Trust backed by quality standards and official registrations.
          </p>
        </div>

        <SectionCarousel
          slidesToShow={slidesToShow}
          autoplay
          loop
          showDots
          hideArrows
        >
          {certificates.map(certificate => (
            <CarouselItem
              key={certificate.id}
              className="basis-full md:basis-1/2 lg:basis-1/4 flex justify-center"
            >
              <div className="w-full max-w-[240px] h-[180px] flex items-center justify-center bg-white rounded-2xl border border-[rgba(0,0,0,0.05)] mx-auto px-6 py-4">
                <img
                  src={getMediaUrl(certificate.src)}
                  alt={certificate.alt}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </SectionCarousel>
      </div>
    </section>
  );
};

export default Certificates;
