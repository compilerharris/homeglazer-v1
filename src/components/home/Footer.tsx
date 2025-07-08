import React, { useRef, useEffect } from 'react';
import { Facebook, X, Youtube } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  showSentinel?: boolean;
  onSentinelRef?: (ref: HTMLDivElement | null) => void;
}

const Footer: React.FC<FooterProps> = ({ showSentinel, onSentinelRef }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Pass the ref up to parent if needed
  useEffect(() => {
    if (showSentinel && onSentinelRef) {
      onSentinelRef(sentinelRef.current);
    }
  }, [showSentinel, onSentinelRef]);

  return (
    <footer className="bg-[rgba(26,28,29,1)] w-full flex flex-col items-center justify-center mt-[50px] pt-10 pb-20 max-md:mt-10">
      {showSentinel && (
        <div ref={sentinelRef} className="block md:hidden w-full h-1" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
      )}
      <div className="w-[90%] lg:w-[80%] 2xl:w-[1400px] mx-auto flex max-w-full flex-col overflow-hidden items-stretch">
        <div className="self-center relative flex w-full max-w-[1120px] flex-wrap">
          <div className="z-0 flex min-w-60 flex-col items-center gap-[20px] w-full sm:w-auto md:mr-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/a31b4e17e03d223ec6cdc7effea804d074edba47?placeholderIfAbsent=true"
              alt="Footer Logo"
              className="aspect-[2.54] object-contain w-[104px] shadow-[0px_0px_1px_-68px_rgba(255,255,255,0.5)] self-center"
            />
            <div className="flex gap-4 mt-4">
              <a href="#" className="bg-[rgba(255,255,255,0.1)] p-3 rounded-full hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300">
                <Facebook size={24} color="white" />
              </a>
              <a href="#" className="bg-[rgba(255,255,255,0.1)] p-3 rounded-full hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  shape-rendering="geometricPrecision" 
                  text-rendering="geometricPrecision" 
                  image-rendering="optimizeQuality" 
                  fill-rule="evenodd" 
                  clip-rule="evenodd" 
                  viewBox="0 0 512 462.799"
                  className="w-6 h-6 fill-white"
                >
                  <path fill-rule="nonzero" d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"/>
                </svg>
              </a>
              <a href="#" className="bg-[rgba(255,255,255,0.1)] p-3 rounded-full hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300">
                <Youtube size={24} color="white" />
              </a>
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/d7eb31b7f801672f4f65d6d7f0bba1d7fa26dc46?placeholderIfAbsent=true"
              alt="Decorative Line"
              className="aspect-[71.43] object-contain w-[351px] rounded mt-4"
            />
          </div>
          <div className="z-0 flex flex-wrap w-full md:flex-1 mt-8 md:mt-0">
            {/* Layout for the columns at different breakpoints */}
            <div className="w-full sm:w-1/2 lg:w-auto lg:flex-1 px-4 mb-8">
              <h3 className="text-[rgba(150,150,150,1)] text-sm font-medium tracking-[0.28px] self-stretch">
                <Link href="/contact" className="hover:text-white transition-all duration-250">Contact</Link>
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/about" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">About Us</Link>
                <Link href="/faq" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">FAQ</Link>
                <Link href="/privacy-policy" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Privacy Policy</Link>
                <Link href="/enquiry" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Enquire Now</Link>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto lg:flex-1 px-4 mb-8">
              <h3 className="text-[rgba(150,150,150,1)] text-sm font-medium tracking-[0.28px]">
                Our Main Services
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/services/painting/interior-painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Interior Painting</Link>
                <Link href="/services/painting/exterior-painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Exterior Painting</Link>
                <Link href="/services/painting/commercial" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Commercial Painting</Link>
                <Link href="/services/painting/kids-room" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Kids Room Painting</Link>
                <Link href="/services/customized-painting/per-day-painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Per Day Painting</Link>
                <Link href="/services/customized-painting/one-day-painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">One Day Painting</Link>
                <Link href="/services/wall-decor/texture-painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Texture Painting</Link>
                <Link href="/services/wall-decor/stencil-art" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Stencil Art</Link>
                <Link href="/services/wall-decor/wallpaper" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Wallpaper</Link>
                <Link href="/services/wall-decor/graffiti-painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Graffiti Painting</Link>
                <Link href="/services/wood/wood-polishing" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Wood Polishing</Link>
                <Link href="/services/wood/wood-coating" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Wood Coating</Link>
                <Link href="/services/wood/carpentry" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Carpentry</Link>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto lg:flex-1 px-4 mb-8">
              <h3 className="text-[rgba(150,150,150,1)] text-sm font-medium tracking-[0.28px]">
                Quick Links
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Home</Link>
                <Link href="/blog" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Blog</Link>
                <Link href="/calculator" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Budget Calculator</Link>
                <Link href="/calculator/painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Painting Calculator</Link>
                <Link href="/calculator/wood-polishing" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Wood Polishing Calculator</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center font-normal leading-none mt-[38px] max-md:max-w-full">
          <div className="bg-[rgba(230,230,230,0.5)] flex min-h-px w-full" />
          <div className="flex h-[52px] w-full max-w-[1188px] flex-col items-center justify-center mt-[21px] max-md:max-w-full">
            <div className="flex items-center gap-[17px] text-xs text-white whitespace-nowrap justify-center">
              <a href="#" className="self-stretch rounded h-[17px] gap-[9px] my-auto hover:text-gray-300 transition-all duration-300">
                English
              </a>
              <div className="bg-white self-stretch flex w-1 shrink-0 h-1 my-auto rounded-[17px]" />
              <a href="#" className="self-stretch rounded h-[17px] gap-[9px] my-auto hover:text-gray-300 transition-all duration-300">
                Privacy
              </a>
              <div className="bg-white self-stretch flex w-1 shrink-0 h-1 my-auto rounded-[17px]" />
              <a href="#" className="self-stretch rounded h-[17px] gap-[9px] my-auto hover:text-gray-300 transition-all duration-300">
                Legal
              </a>
            </div>
            <div className="text-[#A6A7AB] text-[13px] mt-6">
              © 2025 Homeglazer. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
