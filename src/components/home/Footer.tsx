import React, { useRef, useEffect } from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
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

  const socialLinks = [
    {
      href: 'https://www.facebook.com/homeglazers/',
      label: 'Facebook',
      icon: <Facebook className="w-6 h-6 text-white" />,
    },
    {
      href: 'https://in.linkedin.com/company/home-glazer',
      label: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6 text-white" />,
    },
    {
      href: 'https://www.instagram.com/homeglazer/',
      label: 'Instagram',
      icon: <Instagram className="w-6 h-6 text-white" />,
    },
    {
      href: 'https://www.quora.com/profile/Home-Glazer',
      label: 'Quora',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="11" r="6" />
          <path d="M14.5 14.5 17 17" />
        </svg>
      ),
    },
    {
      href: 'https://in.pinterest.com/homeglazer/',
      label: 'Pinterest',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white"
          fill="currentColor"
        >
          <path d="M12 2C6.486 2 2 6.201 2 11.197c0 3.72 2.342 6.907 5.67 8.12-.078-.688-.148-1.744.032-2.494.162-.693 1.046-4.418 1.046-4.418s-.267-.534-.267-1.322c0-1.237.718-2.161 1.611-2.161.76 0 1.127.569 1.127 1.252 0 .763-.486 1.904-.738 2.962-.21.889.445 1.614 1.319 1.614 1.583 0 2.803-1.669 2.803-4.077 0-2.133-1.534-3.626-3.725-3.626-2.54 0-4.035 1.905-4.035 3.872 0 .767.295 1.59.663 2.037.073.089.083.167.061.257-.067.28-.218.888-.248 1.01-.039.162-.13.196-.301.118-1.122-.525-1.822-2.173-1.822-3.5 0-2.843 2.064-5.45 5.952-5.45 3.124 0 5.556 2.225 5.556 5.198 0 3.106-1.959 5.604-4.678 5.604-.913 0-1.773-.474-2.067-1.033l-.562 2.139c-.203.781-.755 1.759-1.124 2.355.846.262 1.741.404 2.668.404 5.514 0 10-4.201 10-9.197C22 6.201 17.514 2 12 2z" />
        </svg>
      ),
    },
    {
      href: 'https://twitter.com/homeglazer',
      label: 'X',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 462.799"
          className="w-6 h-6 fill-white"
        >
          <path
            fillRule="nonzero"
            d="M403.229 0h78.506L310.219 196.04 512 462.799H354.002L230.261 301.007 88.669 462.799h-78.56l183.455-209.683L0 0h161.999l111.856 147.88L403.229 0zm-27.556 415.805h43.505L138.363 44.527h-46.68l283.99 371.278z"
          />
        </svg>
      ),
    },
  ];

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
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[rgba(255,255,255,0.1)] p-3 rounded-full hover:bg-[rgba(255,255,255,0.2)] transition-all duration-300"
                >
                  {item.icon}
                </a>
              ))}
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
              <h3 className="text-sm font-medium tracking-[0.28px] self-stretch">
                Company
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Home</Link>
                <Link href="/about" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">About Us</Link>
                <Link href="/testimonials" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Testimonials</Link>
                <Link href="/blog" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Blog</Link>
                <Link href="/contact" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Contact</Link>
                <Link href="/enquiry" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Enquire Now</Link>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto lg:flex-1 px-4 mb-8">
              <h3 className="text-sm font-medium tracking-[0.28px]">
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
              <h3 className="text-sm font-medium tracking-[0.28px]">
                Tools & Resources
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                <div className="hidden">
                  <Link href="/products" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Products</Link>
                </div>
                <Link href="/colour-visualiser/basic" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Single Wall Visualizer</Link>
                <Link href="/colour-visualiser/advanced" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Advanced Visualizer</Link>
                <Link href="/paint-budget-calculator" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Budget Calculator</Link>
                <Link href="/calculator/painting" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Painting Calculator</Link>
                <Link href="/calculator/wood-polishing" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Wood Polishing Calculator</Link>
              </div>
            </div>
            <div className="w-full sm:w-1/2 lg:w-auto lg:flex-1 px-4 mb-8">
              <h3 className="text-sm font-medium tracking-[0.28px]">
                Support & Legal
              </h3>
              <div className="flex flex-col gap-2 mt-2">
                <Link href="/faq" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">FAQ</Link>
                <Link href="/privacy-policy" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Privacy Policy</Link>
                <Link href="/terms-and-condition" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Terms &amp; Conditions</Link>
                <Link href="/cookie-policy" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Cookie Policy</Link>
                <Link href="/sitemap" className="text-[rgba(111,121,136,1)] text-sm tracking-[0.28px] hover:text-white transition-all duration-250">Sitemap</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center font-normal leading-none mt-[38px] max-md:max-w-full">
          <div className="bg-[rgba(230,230,230,0.5)] flex min-h-px w-full" />
          <div className="flex h-[52px] w-full max-w-[1188px] flex-col items-center justify-center mt-[21px] max-md:max-w-full">
            <div className="text-[#A6A7AB] text-[13px] mt-6">
              © 2025 Home Glazer Solutions Private Limited. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
