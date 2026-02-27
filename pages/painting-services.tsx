import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { ChevronDown, CheckCircle2, AlertCircle, Loader2, Phone, X, Star } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import SvgRoomVisualiser from '@/components/visualizer/SvgRoomVisualiser';
import CanvasRoomVisualiser from '@/components/visualizer/CanvasRoomVisualiser';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { embeddedWallMasks } from '@/data/embeddedWallMasks';
import { getMediaUrl } from '@/lib/mediaUrl';
import { BRANDS, PRODUCTS } from '@/data/products';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const BRAND_LOGOS = BRANDS.map((b) => ({ name: b.name, logo: b.logo, id: b.id }));

const TOP_PRODUCTS = PRODUCTS.slice(0, 8);

const COLOR_HUES = [
  { name: 'Reds', colors: ['#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#EF9A9A'] },
  { name: 'Blues', colors: ['#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#82B1FF', '#448AFF', '#90CAF9'] },
  { name: 'Greens', colors: ['#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20', '#69F0AE', '#00E676', '#A5D6A7'] },
  { name: 'Yellows', colors: ['#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17', '#FFFF8D', '#FFFF00', '#FFF59D'] },
  { name: 'Neutrals', colors: ['#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#D7CCC8', '#BCAAA4', '#A1887F'] },
  { name: 'Purples', colors: ['#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C', '#EA80FC', '#E040FB', '#CE93D8'] },
];

const ROOM_IMAGE = '/assets/images/livingroom/livingroom1/livingroom1.jpg';
const WALL_KEYS = ['left', 'right', 'front'] as const;

const certificates = [
  { src: '/uploads/certificates/ISO_9001-2015.svg', alt: 'ISO 9001:2015 Certification' },
  { src: '/uploads/certificates/Ministry_of_Labour_and_Employment.png', alt: 'Ministry of Labour & Employment Registration' },
  { src: '/uploads/certificates/msme-seeklogo.png', alt: 'MSME Registration' },
  { src: '/uploads/certificates/Startup India Registration.webp', alt: 'Startup India Registration' },
  { src: '/uploads/certificates/Shop & Establisment Certificate.webp', alt: 'Shop & Establishment Certificate' },
  { src: '/uploads/certificates/HOME GLAZER SOLUTIONS QMS.webp', alt: 'HomeGlazer Solutions QMS' },
];

const reviews = [
  { name: 'Ashwani Kumar', initials: 'AK', position: 'Google Review', rating: 5, text: 'We are very pleased with the wonderful paint job your team completed. The color selection was perfect, and the application was smooth and even. The painters were very professional, punctual, and cleaned up thoroughly after the job.' },
  { name: 'Kunal Kapoor', initials: 'KK', position: 'Local Guide', rating: 5, text: 'Very Professional service. Mr. Vipin Gupta is well versed in knowledge of his field and painter also did a wonderful job. Happy with the services.' },
  { name: 'Rajni Pal', initials: 'RP', position: 'Google Review', rating: 5, text: 'Home Glazer was a great choice for my home painting needs and I would gladly recommend them to anyone. The customer service was excellent, the quality of their work was impeccable, and the price was reasonable.' },
  { name: 'Edward Masih', initials: 'EM', position: 'Google Review', rating: 5, text: 'Not only was I impressed with the quality of their work, but I was also very pleased with the end result. My home looks better than ever and I am so happy with the transformation.' },
  { name: 'Hitesh Kumar Verma', initials: 'HV', position: 'Local Guide', rating: 5, text: 'One of the most professional and clean painting services provider in Delhi NCR. Took their service for my office painting and they did a perfect job.' },
];

const landingFaqs = [
  { question: 'What painting services does HomeGlazer offer?', answer: 'HomeGlazer provides a comprehensive range of painting services including interior painting, exterior painting, commercial painting, texture painting, wall decor, wood polishing, wood coating, and carpentry services. We cater to both residential and commercial projects across Delhi NCR.' },
  { question: 'How do I get a quote for my painting project?', answer: 'Simply fill out the enquiry form on this page with your details and requirements. Our team will contact you within 24 hours to schedule a free site visit and provide a detailed, no-obligation quotation.' },
  { question: 'Which paint brands do you use?', answer: 'We use only premium branded products including Asian Paints, Berger Paints, Kansai Nerolac, JSW Paints, and Birla Opus. Clients can choose their preferred brand based on their budget and requirements.' },
  { question: 'Do you offer a warranty on painting work?', answer: 'Yes, we offer a warranty on all our painting services. The warranty period varies depending on the type of service and paint used. Our team will discuss the specific warranty terms during the consultation.' },
  { question: 'How long does a typical painting project take?', answer: 'The duration depends on the scope and size of the project. A standard 2BHK apartment typically takes 5-7 days. We provide an estimated timeline during the site visit and strive to complete projects on schedule.' },
];

const services = [
  { title: 'Residential', description: 'Transform your home with our premium residential painting services tailored to your style and preferences.', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/feb90153e0e003c64ec5c51f88adb9c53c5665d0?placeholderIfAbsent=true' },
  { title: 'Commercial', description: 'Professional painting solutions for offices, retail spaces, and commercial buildings to enhance your business image.', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/3abc0d3433dc7ccb1a71887419241b5ee4eca153?placeholderIfAbsent=true' },
  { title: 'Wood Coating', description: 'Preserve and beautify your wooden surfaces with our specialized wood coating and finishing techniques.', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/d7c8dd1a8cd5163299aa1b5d6926da8cc6670bdc?placeholderIfAbsent=true' },
  { title: 'Kids Room', description: 'Create magical spaces for children with our themed designs, safe paints, and creative wall treatments.', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/cf15213242b2344e311ec56bf353a7bf7802b92f?placeholderIfAbsent=true' },
  { title: 'Wall Decor', description: 'Elevate your interiors with custom wall treatments, textures, and artistic finishes that make a statement.', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/9e91d008b3071a2670d49ebc416751206f4467a5?placeholderIfAbsent=true' },
  { title: 'Customised Painting', description: 'Bring your vision to life with personalized painting solutions tailored to your unique requirements.', imageUrl: 'https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/3d065c1c5f706ca914effd1e3edf4b8121b322ce?placeholderIfAbsent=true' },
];

// --- Sticky Bottom Form Component ---
function StickyForm({ isMobileFormOpen, setIsMobileFormOpen }: { isMobileFormOpen: boolean; setIsMobileFormOpen: (v: boolean) => void }) {
  const { formData, errors, isSubmitting, submitted, submitError, handleChange, handleSubmit, resetForm } = useContactForm();

  if (submitted) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#ED276E] shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-4">
          <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
          <span className="text-white font-semibold text-sm">Thank you! We&apos;ll contact you within 24 hours.</span>
          <button onClick={resetForm} className="bg-white text-[#ED276E] px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-gray-100 transition-all flex-shrink-0">Send Another</button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop: horizontal fixed bottom bar */}
      <div className="hidden lg:block fixed bottom-0 left-0 right-0 z-50 bg-[#ED276E] shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-white font-bold text-sm whitespace-nowrap flex-shrink-0">Get Free Quote</span>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name *" disabled={isSubmitting} required className={`flex-1 min-w-0 text-sm px-3 py-2 rounded-lg outline-none border ${errors.name ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" disabled={isSubmitting} required className={`flex-1 min-w-0 text-sm px-3 py-2 rounded-lg outline-none border ${errors.email ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile *" disabled={isSubmitting} required className={`flex-1 min-w-0 text-sm px-3 py-2 rounded-lg outline-none border ${errors.mobile ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <input type="text" name="message" value={formData.message} onChange={(e) => handleChange(e as any)} placeholder="Your Project *" disabled={isSubmitting} className={`flex-1 min-w-0 text-sm px-3 py-2 rounded-lg outline-none border ${errors.message ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <button type="submit" disabled={isSubmitting} className="bg-white text-[#ED276E] px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all disabled:opacity-50 flex items-center gap-2 flex-shrink-0 whitespace-nowrap">
            {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : 'Submit'}
          </button>
        </form>
        {submitError && <p className="text-center text-white/80 text-xs pb-2">{submitError}</p>}
      </div>

      {/* Tablet/Mobile: fixed bottom button + slide-up form */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        {!isMobileFormOpen ? (
          <button onClick={() => setIsMobileFormOpen(true)} className="w-full bg-[#ED276E] text-white py-4 px-6 font-semibold text-base flex items-center justify-center gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
            <Phone size={20} /> Get Free Quote
          </button>
        ) : (
          <div className="bg-[#ED276E] rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.2)] max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center px-5 pt-4 pb-2">
              <span className="font-bold text-white text-lg">Get Free Quote</span>
              <button onClick={() => setIsMobileFormOpen(false)} className="p-1 rounded-full hover:bg-white/20">
                <X size={20} className="text-white" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-3">
              {submitError && (
                <div className="flex items-start gap-2 p-2 bg-white/20 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-white flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-white">{submitError}</p>
                </div>
              )}
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name *" disabled={isSubmitting} required className="w-full text-sm px-4 py-3 rounded-lg outline-none" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" disabled={isSubmitting} required className="w-full text-sm px-4 py-3 rounded-lg outline-none" />
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile Number *" disabled={isSubmitting} required className="w-full text-sm px-4 py-3 rounded-lg outline-none" />
              <input type="text" name="message" value={formData.message} onChange={(e) => handleChange(e as any)} placeholder="Tell us about your project *" disabled={isSubmitting} className="w-full text-sm px-4 py-3 rounded-lg outline-none" />
              <button type="submit" disabled={isSubmitting} className="bg-white text-[#ED276E] w-full py-3 rounded-lg font-bold text-sm hover:bg-gray-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : 'Get Free Consultation'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

// --- Main Page ---
export default function PaintingServicesLanding() {
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);
  const isMobileDevice = useIsMobileDevice();

  // Visualiser state
  const [selectedColor, setSelectedColor] = useState('#F9D07D');
  const [activeHueIndex, setActiveHueIndex] = useState(0);
  const [activeBrandIndex, setActiveBrandIndex] = useState(0);

  // Quality paints brand filter
  const [activeProductBrand, setActiveProductBrand] = useState<string | null>(null);
  const filteredProducts = activeProductBrand
    ? PRODUCTS.filter((p) => p.brandId === activeProductBrand).slice(0, 8)
    : TOP_PRODUCTS;

  // FAQ state
  const [openFaq, setOpenFaq] = useState(0);

  // Visualiser wall masks
  const wallLayers = WALL_KEYS.map((key) => {
    const path = embeddedWallMasks.livingroom1?.[key];
    if (!path) return null;
    return { path, color: selectedColor };
  }).filter((l): l is { path: string; color: string } => l !== null);

  const combinedWallPath = WALL_KEYS
    .map((k) => embeddedWallMasks.livingroom1?.[k])
    .filter(Boolean)
    .join(' ');

  const scrollToForm = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsMobileFormOpen(true);
    } else {
      const formEl = document.querySelector('.sticky-form-desktop');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <Head>
        <title>Professional Painting Services in Delhi NCR | HomeGlazer</title>
        <meta name="description" content="Get expert painting services for your home or office. Interior, exterior, texture painting & more. Free site visit & consultation. Call now!" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Professional Painting Services in Delhi NCR | HomeGlazer" />
        <meta property="og:description" content="Transform your space with HomeGlazer's professional painting services. Free consultation & site visit." />
      </Head>

      <div className="bg-white flex flex-col overflow-hidden">
        {/* ===== HEADER ===== */}
        <header className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            <a href="/" className="flex-shrink-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/e26e09b75bb9c4ab63f78d15296ed43e8713cb0b?placeholderIfAbsent=true"
                alt="HomeGlazer Logo"
                className="h-10 w-auto object-contain"
              />
            </a>
            <div className="flex items-center gap-3">
              <a href="tel:+919717256514" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#ED276E] transition-colors">
                <Phone size={16} /> +91 97172 56514
              </a>
              <button onClick={scrollToForm} className="bg-[#ED276E] hover:bg-[#b81d5a] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md">
                Get Free Quote
              </button>
            </div>
          </div>
        </header>

        {/* Main content area - full width, form overlaps on top */}
        <main>
          {/* ===== HERO BANNER ===== */}
          <section className="relative w-full h-[70vh] min-h-[400px] max-h-[600px] overflow-hidden">
            <img
              src={getMediaUrl('/uploads/hero-banner.png')}
              alt="Professional Painting Services"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto px-4 sm:px-8">
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
                Professional Painting<br />Services in Delhi NCR
              </h1>
              <p className="text-white/90 text-base sm:text-lg mt-4 max-w-xl leading-relaxed drop-shadow">
                Transform your home or office with 35+ years of trusted expertise. Interior, exterior, texture &amp; decorative painting.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <a href="tel:+919717256514" className="bg-[#ED276E] hover:bg-[#b81d5a] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all shadow-lg flex items-center gap-2">
                  <Phone size={16} /> Call Now
                </a>
                <a href="https://wa.me/919717256514" className="bg-[#25D366] hover:bg-[#1ebe57] text-white px-7 py-3 rounded-full font-semibold text-sm transition-all shadow-lg flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
                  <span className="text-white text-sm ml-1">4.9/5</span>
                </div>
                <span className="text-white/70 text-sm">500+ Projects Completed</span>
              </div>
            </div>
          </section>

          {/* ===== OUR SERVICES ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Our Services</h2>
              <p className="text-gray-500 text-center mt-3 text-lg">Painting Your Dreams with Every Brushstroke</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {services.map((service, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-[20px] overflow-hidden hover:shadow-lg transition-all duration-300 group">
                    <div className="relative aspect-[1.683] overflow-hidden">
                      <img src={service.imageUrl} alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== WHY CHOOSE US ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Why Choose Us?</h2>
              <p className="text-gray-500 text-center mt-3 text-lg">Superior Quality &amp; Exceptional Service</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {[
                  { icon: getMediaUrl('/uploads/trusted-expertiese.svg'), title: 'Trusted Expertise', desc: '35+ years delivering high-quality painting services.' },
                  { icon: getMediaUrl('/uploads/skilled-experts.svg'), title: 'Skilled Experts', desc: 'Trained and experienced painters at your service.' },
                  { icon: getMediaUrl('/uploads/site-supervision.svg'), title: 'Free Site Visit', desc: 'No-cost consultation to help you decide.' },
                  { icon: getMediaUrl('/uploads/free-site-visit.svg'), title: 'Site Supervision', desc: 'A dedicated expert to ensure smooth execution.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-[#ED276E] to-[#299dd7] rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
                    <img src={item.icon} alt={item.title} className="w-16 h-16 object-contain mb-4" />
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/90 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== SINGLE WALL VISUALISER ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Visualise Your Colour</h2>
              <p className="text-gray-500 text-center mt-3 text-lg">See how different colours transform your space</p>

              {/* Desktop: brands left | room center | colors right */}
              {/* Mobile/Tablet: room on top, brands below, colors below */}
              <div className="mt-10 flex flex-col lg:flex-row gap-6 items-stretch">
                {/* Brands column - on mobile this goes below room */}
                <div className="order-2 lg:order-1 lg:w-[140px] flex-shrink-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center lg:text-left">Brands</p>
                  <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-center lg:justify-start">
                    {BRAND_LOGOS.map((brand, idx) => (
                      <button key={brand.id} onClick={() => setActiveBrandIndex(idx)} className={`flex-shrink-0 w-16 h-16 lg:w-full lg:h-14 rounded-xl border-2 flex items-center justify-center p-2 transition-all ${activeBrandIndex === idx ? 'border-[#ED276E] bg-pink-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                        <img src={getMediaUrl(brand.logo)} alt={brand.name} className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Room photo */}
                <div className="order-1 lg:order-2 flex-1 min-w-0">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                    {isMobileDevice ? (
                      <SvgRoomVisualiser
                        imageSrc={getMediaUrl(ROOM_IMAGE)}
                        wallPath={combinedWallPath}
                        colorHex={selectedColor}
                        roomLabel="livingroom"
                      />
                    ) : (
                      <CanvasRoomVisualiser
                        imageSrc={getMediaUrl(ROOM_IMAGE)}
                        wallPath={combinedWallPath}
                        colorHex={selectedColor}
                        roomLabel="livingroom"
                      />
                    )}
                  </div>
                </div>

                {/* Color hues + colors column */}
                <div className="order-3 lg:w-[200px] flex-shrink-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center lg:text-left">Colour Families</p>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-center lg:justify-start">
                    {COLOR_HUES.map((hue, idx) => (
                      <button key={hue.name} onClick={() => setActiveHueIndex(idx)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeHueIndex === idx ? 'bg-[#ED276E] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        {hue.name}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center lg:text-left">Colours</p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {COLOR_HUES[activeHueIndex].colors.map((color) => (
                        <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === color ? 'border-gray-800 scale-110 shadow-md' : 'border-white shadow'}`} style={{ backgroundColor: color }} aria-label={`Select colour ${color}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== QUALITY PAINTS ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Quality Paints</h2>
              <p className="text-gray-500 text-center mt-3 text-lg">Discover the perfect paint for your next project</p>

              {/* Brand tabs */}
              <div className="flex gap-3 mt-8 overflow-x-auto pb-2 justify-center flex-wrap">
                <button onClick={() => setActiveProductBrand(null)} className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeProductBrand ? 'bg-[#ED276E] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>
                  All Brands
                </button>
                {BRAND_LOGOS.map((brand) => (
                  <button key={brand.id} onClick={() => setActiveProductBrand(brand.id)} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeProductBrand === brand.id ? 'bg-[#ED276E] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>
                    <img src={getMediaUrl(brand.logo)} alt={brand.name} className="w-5 h-5 object-contain" />
                    <span className="hidden sm:inline">{brand.name}</span>
                  </button>
                ))}
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
                {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-square bg-gray-50 p-4 flex items-center justify-center">
                      <img src={getMediaUrl(product.image)} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-3">
                      <p className="text-[10px] text-[#ED276E] font-medium uppercase">{product.brand}</p>
                      <h4 className="text-sm font-semibold text-gray-800 mt-1 line-clamp-2">{product.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{product.shortDescription}</p>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full text-center py-12 text-gray-400">
                    <p className="text-lg font-medium">Products coming soon for this brand</p>
                    <p className="text-sm mt-1">Contact us for availability and pricing</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ===== CERTIFICATES & ACCREDITATIONS ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Certificates &amp; Accreditations</h2>
              <p className="text-gray-500 text-center mt-3 text-lg">Trust backed by quality standards and official registrations</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-center h-[140px] shadow-sm hover:shadow-md transition-shadow">
                    <img src={getMediaUrl(cert.src)} alt={cert.alt} className="max-h-full max-w-full object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== GOOGLE REVIEWS ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-2">
                <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-7 object-contain" />
                <span className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={20} className="text-[#FBBC05] fill-[#FBBC05]" />)}
                </span>
                <span className="text-gray-600 font-medium">4.9</span>
              </div>
              <p className="text-gray-500 text-center text-lg mb-8">See why our clients love our services!</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((review, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />)}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">&quot;{review.text}&quot;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ED276E] flex items-center justify-center text-white font-semibold text-sm">{review.initials}</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.position}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== FAQ ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-center mt-3 text-lg mb-10">Everything you need to know, answered!</p>
              <div className="space-y-3">
                {landingFaqs.map((faq, idx) => (
                  <div key={idx} className={`border rounded-xl overflow-hidden transition-all ${openFaq === idx ? 'border-[#ED276E]/30 bg-pink-50/30 shadow-sm' : 'border-gray-200 bg-white'}`}>
                    <button onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                      <span className="text-sm sm:text-base font-semibold text-gray-800 pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-[#ED276E] flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ===== CTA BANNER ===== */}
          <section className="w-full py-12 px-4 sm:px-8 bg-gradient-to-r from-[#ED276E] to-[#299dd7]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Ready to Transform Your Space?</h2>
              <p className="text-white/90 mt-3 text-base">Get a free consultation and site visit. No obligation!</p>
              <button onClick={scrollToForm} className="mt-6 bg-white text-[#ED276E] px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all shadow-lg">
                Get Free Quote Now
              </button>
            </div>
          </section>

          {/* ===== STATIC FOOTER ===== */}
          <footer className="bg-[#1A1C1D] text-white py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3">
                  <a href="/">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/a31b4e17e03d223ec6cdc7effea804d074edba47?placeholderIfAbsent=true"
                      alt="HomeGlazer Logo"
                      className="w-24 object-contain mb-4"
                    />
                  </a>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    HomeGlazer is your trusted painting partner with 35+ years of experience in residential and commercial painting services across Delhi NCR.
                  </p>
                </div>
                <div className="md:w-1/3">
                  <h4 className="text-sm font-semibold mb-3">Our Services</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>Interior Painting</li>
                    <li>Exterior Painting</li>
                    <li>Texture Painting</li>
                    <li>Wood Polishing</li>
                    <li>Wall Decor</li>
                    <li>Commercial Painting</li>
                  </ul>
                </div>
                <div className="md:w-1/3">
                  <h4 className="text-sm font-semibold mb-3">Contact</h4>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>Phone: +91 97172 56514</li>
                    <li>Email: info@homeglazer.com</li>
                    <li>Location: Delhi NCR, India</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                <p className="text-gray-500 text-xs">&copy; 2025 Home Glazer Solutions Private Limited. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </main>

        {/* Sticky Form */}
        <StickyForm isMobileFormOpen={isMobileFormOpen} setIsMobileFormOpen={setIsMobileFormOpen} />
      </div>

      {/* Add bottom padding on mobile/tablet for the fixed CTA button */}
      <style jsx>{`
        @media (max-width: 1023px) {
          main { padding-bottom: 60px; }
        }
      `}</style>
    </>
  );
}
