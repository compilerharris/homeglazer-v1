import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChevronDown, CheckCircle2, AlertCircle, Loader2, Phone, X, Star } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';
import SvgRoomVisualiser from '@/components/visualizer/SvgRoomVisualiser';
import CanvasRoomVisualiser from '@/components/visualizer/CanvasRoomVisualiser';
import { useIsMobileDevice } from '@/hooks/useIsMobileDevice';
import { embeddedWallMasks } from '@/data/embeddedWallMasks';
import { getMediaUrl } from '@/lib/mediaUrl';
import { BRANDS } from '@/data/products';
import { BRAND_CONFIG } from '@/data/colorBrands';
import { fetchProducts, transformProduct, type Product as ApiProduct } from '@/lib/api';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import CallButton from '@/components/home/CallButton';
import SectionCarousel from '@/components/home/SectionCarousel';
import { CarouselItem } from '@/components/ui/carousel';
import { faqItems } from '@/data/faq';
import AboutHowWeDoIt from '@/components/about/AboutHowWeDoIt';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

const BRAND_LOGOS = BRANDS.map((b) => ({ name: b.name, logo: b.logo, id: b.id }));

// Map UI brand ids (used in products/BRANDS) to colour-DB brand ids (used in BRAND_CONFIG / routes)
const COLOR_BRAND_ID_MAP: Record<string, string> = {
  'asian-paints': 'asian-paints',
  'berger-paints': 'berger',
  'kansai-nerolac': 'nerolac',
  'jsw-paints': 'jsw',
  'birla-opus': 'birla-opus',
};

const getColorBrandId = (uiBrandId: string): string =>
  COLOR_BRAND_ID_MAP[uiBrandId] || uiBrandId;

// Find the first brand that has an associated colour database,
// falling back to config/brand lists if needed.
const DEFAULT_BRAND_ID =
  BRAND_LOGOS.map((b) => getColorBrandId(b.id)).find((mappedId) =>
    BRAND_CONFIG.some((config) => config.id === mappedId)
  ) ||
  BRAND_CONFIG[0]?.id ||
  getColorBrandId(BRAND_LOGOS[0]?.id || '') ||
  '';

const ROOM_IMAGE = '/uploads/bedroom6.jpg';
const WALL_KEYS = ['left', 'right', 'front'] as const;

const certificates = [
  { src: '/uploads/certificates/ISO_9001-2015.svg', alt: 'ISO 9001:2015 Certification' },
  { src: '/uploads/certificates/Ministry_of_Labour_and_Employment.png', alt: 'Ministry of Labour & Employment Registration' },
  { src: '/uploads/certificates/msme-seeklogo.png', alt: 'MSME Registration' },
  { src: '/uploads/certificates/footer-logo.png', alt: 'HomeGlazer Certification Mark' },
];

const QUOTE_ICON = 'https://cdn.builder.io/api/v1/image/assets/ebe74153cda349e3ba80a6039bb1465f/ef8e250bd483959c2ece9169925a09e6ff84e36a?placeholderIfAbsent=true';
const googleReviews = [
  { name: 'Ashwani Kumar', initials: 'AK', position: 'Google Review', rating: 5, text: 'We are very pleased with the wonderful paint job your team completed. The color selection was perfect, and the application was smooth and even. The painters were very professional, punctual, and cleaned up thoroughly after the job. We highly recommend your company to anyone looking for high quality painting services.' },
  { name: 'Kunal Kapoor', initials: 'KK', position: 'Local Guide', rating: 5, text: 'Very Professional service. Mr. Vipin Gupta is well versed in knowledge of his field and painter also did a wonderful job. Happy with the services.' },
  { name: 'Rajni Pal', initials: 'RP', position: 'Google Review', rating: 5, text: 'Home Glazer was a great choice for my home painting needs and I would gladly recommend them to anyone. The customer service was excellent, the quality of their work was impeccable, and the price was reasonable. They made the entire process seamless.' },
  { name: 'Edward Masih', initials: 'EM', position: 'Google Review', rating: 5, text: 'Not only was I impressed with the quality of their work, but I was also very pleased with the end result. My home looks better than ever and I am so happy with the transformation. I would highly recommend Home Glazer for any painting needs that you might have. They provided me with the best customer service and a top-notch job.' },
  { name: 'Hitesh Kumar Verma', initials: 'HV', position: 'Local Guide', rating: 5, text: 'One of the most professional and clean painting services provider in Delhi NCR. Took their service for my office painting and they did a perfect job.' },
];

const testimonialCards = [
  { name: 'M.N. Pandey', initials: 'MP', position: 'Avantika Printers Pvt. Ltd., New Delhi', text: 'Home Glazer delivered exceptional painting work for our printing facility. Their team was professional, punctual, and maintained excellent quality standards throughout the project.' },
  { name: 'Lotus WIINDOORS', initials: 'LW', position: 'Corporate Client', text: 'We trusted Home Glazer for our large-scale painting requirements and they exceeded expectations in finish, timeline, and site cleanliness. Highly recommended for commercial projects.' },
  { name: 'CRUX TECHNORULD', initials: 'CT', position: 'Industrial Client', text: 'From surface preparation to final coats, the Home Glazer team worked meticulously and coordinated seamlessly with our operations. A truly reliable painting partner.' },
];

const landingFaqsBase = [
  { question: 'What painting services does HomeGlazer offer?', answer: 'HomeGlazer provides a comprehensive range of painting services including interior painting, exterior painting, commercial painting, texture painting, wall decor, wood polishing, wood coating, and carpentry services. We cater to both residential and commercial projects across Delhi NCR.' },
  { question: 'How do I get a quote for my painting project?', answer: 'Simply fill out the enquiry form on this page with your details and requirements. Our team will contact you within 24 hours to schedule a free site visit and provide a detailed, no-obligation quotation.' },
  { question: 'Which paint brands do you use?', answer: 'We use only premium branded products including Asian Paints, Berger Paints, Kansai Nerolac, JSW Paints, and Birla Opus. Clients can choose their preferred brand based on their budget and requirements.' },
  { question: 'Do you offer a warranty on painting work?', answer: 'Yes, we offer a warranty on all our painting services. The warranty period varies depending on the type of service and paint used. Our team will discuss the specific warranty terms during the consultation.' },
  { question: 'How long does a typical painting project take?', answer: 'The duration depends on the scope and size of the project. A standard 2BHK apartment typically takes 5-7 days. We provide an estimated timeline during the site visit and strive to complete projects on schedule.' },
];
const landingFaqs = [...landingFaqsBase, ...faqItems];

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
  const router = useRouter();
  const { formData, errors, isSubmitting, submitted, submitError, handleChange, handleSubmit, resetForm } = useContactForm();

  const mobileInputBase =
    'w-full text-sm px-4 py-3 rounded-lg outline-none border shadow-[0px_2px_2px_0px_rgba(0,0,0,0.05)] bg-white text-[rgba(108,114,127,1)]';

  useEffect(() => {
    if (submitted) {
      router.push('/thank-you');
    }
  }, [submitted, router]);

  if (submitted) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#ED276E] shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-center gap-4">
          <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
          <span className="text-white font-semibold text-sm">Thank you! We&apos;ll be in touch within 24 hours to confirm your free consultation.</span>
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
          <span className="text-white font-bold text-sm whitespace-nowrap flex-shrink-0">Get Free Consultation</span>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name *" disabled={isSubmitting} required className={`flex-1 min-w-0 h-12 text-sm px-3 py-2.5 rounded-lg outline-none border ${errors.name ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" disabled={isSubmitting} required className={`flex-1 min-w-0 h-12 text-sm px-3 py-2.5 rounded-lg outline-none border ${errors.email ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile *" disabled={isSubmitting} required className={`flex-1 min-w-0 h-12 text-sm px-3 py-2.5 rounded-lg outline-none border ${errors.mobile ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <textarea name="message" value={formData.message} onChange={(e) => handleChange(e as any)} placeholder="Your Project *" disabled={isSubmitting} rows={1} className={`flex-1 min-w-0 h-12 text-sm px-3 py-2.5 rounded-lg outline-none border resize-none ${errors.message ? 'border-red-300 bg-red-50' : 'border-transparent'} focus:ring-2 focus:ring-white/50`} />
          <div className="relative flex items-center justify-center flex-shrink-0">
            <span className="absolute inset-0 rounded-lg bg-[#299dd7]/40 animate-ping" aria-hidden />
            <button type="submit" disabled={isSubmitting} className="relative bg-[#299dd7] text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-[#237bb0] transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : 'Get Free Consultation'}
            </button>
          </div>
        </form>
        {submitError && <p className="text-center text-white/80 text-xs pb-2">{submitError}</p>}
      </div>

      {/* Tablet/Mobile: fixed bottom button + slide-up form */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        {!isMobileFormOpen ? (
          <button onClick={() => setIsMobileFormOpen(true)} className="w-full bg-[#ED276E] text-white py-4 px-6 font-semibold text-base flex items-center justify-center gap-2 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
            <Phone size={20} /> Get Free Consultation
          </button>
        ) : (
          <div className="bg-[#ED276E] rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.2)] max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center px-5 pt-4 pb-2">
              <span className="font-bold text-white text-lg">Get Free Consultation</span>
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
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  disabled={isSubmitting}
                  required
                  className={`${mobileInputBase} ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-transparent'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-red-100">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  disabled={isSubmitting}
                  required
                  className={`${mobileInputBase} ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-transparent'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-100">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number *"
                  disabled={isSubmitting}
                  required
                  className={`${mobileInputBase} ${
                    errors.mobile ? 'border-red-300 bg-red-50' : 'border-transparent'
                  }`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-[11px] text-red-100">{errors.mobile}</p>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) => handleChange(e as any)}
                  placeholder="Tell us about your project *"
                  disabled={isSubmitting}
                  rows={4}
                  className={`${mobileInputBase} resize-none ${
                    errors.message ? 'border-red-300 bg-red-50' : 'border-transparent'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] text-red-100">{errors.message}</p>
                )}
              </div>
              <button type="submit" disabled={isSubmitting} className="bg-[#299dd7] text-white w-full py-3 rounded-lg font-bold text-sm hover:bg-[#237bb0] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
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

  // Visualiser state - brand/category/color driven by shared colour database
  type ColorEntry = {
    colorName: string;
    colorCode: string;
    colorHex: string;
    [key: string]: any;
  };

  type ColorTypesMap = Record<string, ColorEntry[]>;

  const [activeBrandId, setActiveBrandId] = useState<string>(DEFAULT_BRAND_ID);
  const [colorTypes, setColorTypes] = useState<ColorTypesMap | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorEntry | null>(null);
  const [isLoadingColors, setIsLoadingColors] = useState(false);
  const [colorError, setColorError] = useState<string | null>(null);

  // Quality Paints products state (loaded from API)
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  const sampleColorsForSwatches = (colors: ColorEntry[], max: number = 4): ColorEntry[] => {
    if (colors.length <= max) return colors.slice(0, max);
    const result: ColorEntry[] = [];
    const used = new Set<number>();
    const step = (colors.length - 1) / (max - 1);
    for (let i = 0; i < max; i++) {
      const idx = Math.round(i * step);
      if (!used.has(idx)) {
        used.add(idx);
        result.push(colors[idx]);
      }
    }
    return result;
  };

  // Load colour data for the active brand on the client
  useEffect(() => {
    if (!activeBrandId) return;

    let cancelled = false;

    const loadBrandColors = async () => {
      try {
        setIsLoadingColors(true);
        setColorError(null);

        const brandConfig = BRAND_CONFIG.find((b) => b.id === activeBrandId);
        if (!brandConfig) {
          setColorTypes(null);
          setActiveCategory(null);
          setSelectedColor(null);
          setColorError('Colours for this brand are coming soon.');
          return;
        }

        const module = await import(`@/data/colors/${brandConfig.fileName}`);
        if (cancelled) return;

        const db = module.default as { colorTypes?: ColorTypesMap };
        const types = db.colorTypes || {};
        const categories = Object.keys(types);

        if (categories.length === 0) {
          setColorTypes(null);
          setActiveCategory(null);
          setSelectedColor(null);
          setColorError('Colours for this brand are coming soon.');
          return;
        }

        const firstCategory = categories[0];
        const colorsForCategory = types[firstCategory] || [];

        setColorTypes(types);
        setActiveCategory(firstCategory);
        setSelectedColor(colorsForCategory[0] || null);
      } catch (error) {
        console.error('Error loading colour data:', error);
        if (!cancelled) {
          setColorTypes(null);
          setActiveCategory(null);
          setSelectedColor(null);
          setColorError('Unable to load colours for this brand right now.');
        }
      } finally {
        if (!cancelled) {
          setIsLoadingColors(false);
        }
      }
    };

    loadBrandColors();

    return () => {
      cancelled = true;
    };
  }, [activeBrandId]);

  // Quality paints brand filter
  const [activeProductBrand, setActiveProductBrand] = useState<string | null>(null);

  // Load products for Quality Paints section from API whenever brand filter changes
  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);

        // Use search by brand name instead of brandId to avoid ObjectId issues
        const brandName =
          activeProductBrand &&
          BRAND_LOGOS.find((b) => b.id === activeProductBrand)?.name;
        const searchQuery = brandName || undefined;

        const apiProducts = await fetchProducts({
          search: searchQuery,
          limit: 50,
        });

        if (cancelled) return;

        const transformed = apiProducts
          .map(transformProduct)
          .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        setProducts(transformed);
      } catch (error: any) {
        console.error('[PaintingServicesLanding] Failed to load products:', error);
        if (!cancelled) {
          setProducts([]);
          setProductsError('Unable to load products right now. Please try again later.');
        }
      } finally {
        if (!cancelled) {
          setProductsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, [activeProductBrand]);

  const displayedProducts = products.slice(0, 8);

  // FAQ state (show first 5, then "Load more" for the rest)
  const [openFaq, setOpenFaq] = useState<number>(-1);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const FAQ_INITIAL_COUNT = 5;
  const displayedFaqs = showAllFaqs ? landingFaqs : landingFaqs.slice(0, FAQ_INITIAL_COUNT);
  const hasMoreFaqs = landingFaqs.length > FAQ_INITIAL_COUNT;

  const selectedColorHex = selectedColor?.colorHex || '#F9D07D';

  // Visualiser wall masks
  const wallLayers = WALL_KEYS.map((key) => {
    const path = embeddedWallMasks.bedroom6?.[key];
    if (!path) return null;
    return { path, color: selectedColorHex };
  }).filter((l): l is { path: string; color: string } => l !== null);

  const combinedWallPath = WALL_KEYS
    .map((k) => embeddedWallMasks.bedroom6?.[k])
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
              <a
                href="tel:+919717256514"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#ED276E] transition-colors"
              >
                <Phone size={16} /> +91 97172 56514
              </a>
            </div>
          </div>
        </header>

        {/* Main content area - full width, form overlaps on top */}
        <main>
          {/* ===== HERO BANNER ===== */}
          {/* Mobile/tablet: taller height so vertical hero image isn't cropped; desktop: lg overrides only */}
          <section className="relative w-full min-h-[500px] h-[85vh] max-h-[800px] lg:max-h-[900px] overflow-hidden">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={getMediaUrl('/uploads/hero-banner.png')}
              />
              <source
                media="(min-width: 768px)"
                srcSet={getMediaUrl('/uploads/hero-banner-tablet.webp')}
              />
              <img
                src={getMediaUrl('/uploads/hero-banner-mobile.webp')}
                alt="Professional Painting Services"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </picture>
            <div className="relative z-10 flex flex-col justify-start lg:justify-center h-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 sm:pt-20 lg:pt-0">
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
                <span className="text-white/70 text-sm">1500+ Projects Completed</span>
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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
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

              {/* Mobile / Tablet layout (stacked rows) */}
              <div className="mt-10 space-y-5 md:space-y-6 lg:space-y-8 lg:hidden">
                {/* Room preview */}
                <div className="w-full max-w-4xl mx-auto">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                    {isMobileDevice ? (
                      <SvgRoomVisualiser
                        imageSrc={getMediaUrl(ROOM_IMAGE)}
                        wallPath={combinedWallPath}
                        colorHex={selectedColorHex}
                        roomLabel="bedroom"
                        wallLayers={wallLayers}
                      />
                    ) : (
                      <CanvasRoomVisualiser
                        imageSrc={getMediaUrl(ROOM_IMAGE)}
                        wallPath={combinedWallPath}
                        colorHex={selectedColorHex}
                        roomLabel="bedroom"
                        wallLayers={wallLayers}
                      />
                    )}
                  </div>
                </div>

                {/* Colours row */}
                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Colours
                    </p>
                    {activeCategory && (
                      <p className="text-xs text-gray-500">
                        Showing shades of {activeCategory}
                      </p>
                    )}
                  </div>
                  {isLoadingColors && (
                    <p className="text-xs text-gray-500">Loading colours…</p>
                  )}
                  {colorError && !isLoadingColors && (
                    <p className="text-xs text-red-500">{colorError}</p>
                  )}
                  {colorTypes && !isLoadingColors && !colorError && (
                    <div className="overflow-x-auto pb-1">
                      <div className="flex gap-2 min-w-max">
                        {(() => {
                          const categories = Object.keys(colorTypes);
                          if (!categories.length) return null;

                          const currentCategory =
                            activeCategory && categories.includes(activeCategory)
                              ? activeCategory
                              : categories[0];

                          const colorsForCategory = colorTypes[currentCategory] || [];
                          const displayColors = sampleColorsForSwatches(
                            colorsForCategory,
                            12
                          );

                          return displayColors.map((color) => (
                            <button
                              key={`${currentCategory}-${color.colorCode}-${color.colorHex}`}
                              onClick={() => {
                                setActiveCategory(currentCategory);
                                setSelectedColor(color);
                              }}
                              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 flex-shrink-0 ${
                                selectedColor &&
                                selectedColor.colorHex === color.colorHex &&
                                selectedColor.colorCode === color.colorCode
                                  ? 'border-[#299dd7] shadow-md'
                                  : 'border-transparent hover:border-gray-200'
                              }`}
                              aria-label={`Select colour ${color.colorName} ${color.colorCode}`}
                            >
                              <div
                                className="w-9 h-9 rounded-lg flex-shrink-0"
                                style={{ background: color.colorHex }}
                              />
                              <div className="flex flex-col items-start flex-1">
                                <span className="text-sm text-gray-800 font-medium text-left">
                                  {color.colorName}
                                </span>
                                <span className="text-xs text-gray-500 text-left">
                                  {color.colorCode}
                                </span>
                              </div>
                            </button>
                          ));
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Colour families row */}
                <div className="w-full max-w-5xl mx-auto">
                  <p className="hidden lg:block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 lg:mb-3">
                    Colour Families
                  </p>
                  {colorTypes && !isLoadingColors && !colorError && (
                    <div className="overflow-x-auto pb-1 scrollbar-hide">
                      <div className="flex gap-2 min-w-max">
                        {Object.keys(colorTypes)
                          .slice(0, 9)
                          .map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                const colorsForCategory = colorTypes[category] || [];
                                setActiveCategory(category);
                                if (colorsForCategory[0]) setSelectedColor(colorsForCategory[0]);
                              }}
                              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all ${
                                activeCategory === category
                                  ? 'bg-white shadow-md border border-[#299dd7] text-gray-900'
                                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              {category.toUpperCase()}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Brands row */}
                <div className="w-full max-w-5xl mx-auto">
                  <p className="hidden lg:block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 lg:mb-3">
                    Brands
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 justify-start">
                    {BRAND_LOGOS.map((brand) => {
                      const mappedId = getColorBrandId(brand.id);
                      const isActive = activeBrandId === mappedId;
                      return (
                        <button
                          key={brand.id}
                          onClick={() => setActiveBrandId(mappedId)}
                          className={`sm:px-4 px-3 sm:py-2 py-1 rounded-full font-medium border transition-all duration-200 whitespace-nowrap text-sm flex-shrink-0 ${
                            isActive
                              ? 'bg-[#299dd7] text-white border-[#299dd7]'
                              : 'bg-white text-[#299dd7] border-[#299dd7] hover:bg-[#e6f2fa]'
                          }`}
                        >
                          {brand.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Desktop layout: brands → colour families → colours → preview image */}
              <div className="mt-10 hidden lg:flex flex-row gap-4 items-stretch">
                {/* Brands column */}
                <div className="lg:w-[130px] flex-shrink-0">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center lg:text-left">
                    Brands
                  </p>
                  <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-center lg:justify-start">
                    {BRAND_LOGOS.map((brand) => {
                      const mappedId = getColorBrandId(brand.id);
                      const isActive = activeBrandId === mappedId;
                      return (
                        <button
                          key={brand.id}
                          onClick={() => setActiveBrandId(mappedId)}
                          className={`flex-shrink-0 w-full h-16 rounded-2xl border-2 flex items-center justify-center p-2 transition-all ${
                            isActive
                              ? 'border-[#299dd7] bg-[#e6f2fa] shadow-md'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <img
                            src={getMediaUrl(brand.logo)}
                            alt={brand.name}
                            className="w-24 h-10 object-contain"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Colour families column */}
                <div className="lg:w-[150px] flex-shrink-0">
                  {isLoadingColors && (
                    <p className="text-xs text-gray-500 mb-2">Loading colours…</p>
                  )}
                  {colorError && !isLoadingColors && (
                    <p className="text-xs text-red-500 mb-2">{colorError}</p>
                  )}
                  {colorTypes && !isLoadingColors && !colorError && (
                    <>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center lg:text-left">
                        Colour Families
                      </p>
                      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 justify-center lg:justify-start">
                        {Object.keys(colorTypes)
                          .slice(0, 9)
                          .map((category) => (
                            <button
                              key={category}
                              onClick={() => {
                                const colorsForCategory = colorTypes[category] || [];
                                setActiveCategory(category);
                                if (colorsForCategory[0]) {
                                  setSelectedColor(colorsForCategory[0]);
                                }
                              }}
                              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                                activeCategory === category
                                  ? 'bg-[#299dd7] text-white shadow-md'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Colours column */}
                <div className="lg:w-[170px] flex-shrink-0">
                  {colorTypes && !isLoadingColors && !colorError && (
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center lg:text-left">
                        Colours
                      </p>
                      <div className="grid grid-cols-3 gap-2 justify-items-center">
                        {(() => {
                          const categories = Object.keys(colorTypes);
                          if (!categories.length) return null;

                          const currentCategory =
                            activeCategory && categories.includes(activeCategory)
                              ? activeCategory
                              : categories[0];

                          const colorsForCategory = colorTypes[currentCategory] || [];
                          const displayColors = sampleColorsForSwatches(
                            colorsForCategory,
                            24
                          );

                          return displayColors.map((color) => (
                            <button
                              key={`${currentCategory}-${color.colorCode}-${color.colorHex}`}
                              onClick={() => {
                                setActiveCategory(currentCategory);
                                setSelectedColor(color);
                              }}
                              className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                                selectedColor &&
                                selectedColor.colorHex === color.colorHex &&
                                selectedColor.colorCode === color.colorCode
                                  ? 'border-gray-800 scale-110 shadow-md'
                                  : 'border-white shadow'
                              }`}
                              style={{ backgroundColor: color.colorHex }}
                              aria-label={`Select colour ${color.colorName} ${color.colorCode}`}
                            />
                          ));
                        })()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Room photo (preview image) */}
                <div className="flex-1 min-w-0">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                    {isMobileDevice ? (
                      <SvgRoomVisualiser
                        imageSrc={getMediaUrl(ROOM_IMAGE)}
                        wallPath={combinedWallPath}
                        colorHex={selectedColorHex}
                        roomLabel="bedroom"
                        wallLayers={wallLayers}
                      />
                    ) : (
                      <CanvasRoomVisualiser
                        imageSrc={getMediaUrl(ROOM_IMAGE)}
                        wallPath={combinedWallPath}
                        colorHex={selectedColorHex}
                        roomLabel="bedroom"
                        wallLayers={wallLayers}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== HOW DO WE DO IT? (from about page) ===== */}
          <AboutHowWeDoIt />

          {/* ===== QUALITY PAINTS ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Quality Paints</h2>
              <p className="text-gray-500 text-center mt-3 text-lg">Discover the perfect paint for your next project</p>

              {/* Brand tabs */}
              <div className="flex gap-4 mt-8 overflow-x-auto pb-2 justify-center flex-wrap">
                <button onClick={() => setActiveProductBrand(null)} className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all ${!activeProductBrand ? 'bg-[#ED276E] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>
                  All Brands
                </button>
                {BRAND_LOGOS.map((brand) => (
                  <button key={brand.id} onClick={() => setActiveProductBrand(brand.id)} className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${activeProductBrand === brand.id ? 'bg-[#ED276E] text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'}`}>
                    <img src={getMediaUrl(brand.logo)} alt={brand.name} className="w-10 h-10 object-contain" />
                    <span className="hidden sm:inline">{brand.name}</span>
                  </button>
                ))}
              </div>

              {/* Products grid */}
              <div className="mt-8">
                {productsLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#299dd7] mb-4" />
                    <p className="text-sm">Loading paints...</p>
                  </div>
                ) : productsError ? (
                  <div className="col-span-full text-center py-12 text-red-500 text-sm">
                    {productsError}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {displayedProducts.length > 0 ? (
                      displayedProducts.map((product) => (
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
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12 text-gray-400">
                        <p className="text-lg font-medium">Products coming soon for this brand</p>
                        <p className="text-sm mt-1">Contact us for availability and pricing</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ===== CERTIFICATES & ACCREDITATIONS ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Certificates &amp; Accreditations</h2>
              <p className="text-gray-500 text-center mt-3 text-lg">Trust backed by quality standards and official registrations.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 place-items-center">
                {certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="w-full max-w-[240px] h-[180px] flex items-center justify-center bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow px-6 py-4"
                  >
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
              <p className="text-gray-500 text-center text-lg mb-8">
                See why our clients love our services!
              </p>

              <div className="w-full">
                <SectionCarousel reviewsSection={true}>
                  {googleReviews.map((review, idx) => (
                    <CarouselItem key={`google-${idx}`} className="basis-full md:basis-1/3">
                      <div className="bg-white shadow-[0px_4px_9px_rgba(82,82,82,0.1)] w-full max-w-[500px] mx-auto p-7 rounded-[35px] min-h-[320px] flex flex-col justify-between mb-[30px]">
                        <img src={QUOTE_ICON} alt="Quote Icon" className="aspect-[1.56] object-contain w-[53px]" />
                        <p className="text-[rgba(44,44,44,1)] text-sm font-normal leading-[19px] mt-3.5">
                          &quot;{review.text}&quot;
                        </p>
                        <div className="flex items-center gap-3.5 mt-3.5">
                          <div className="w-[53px] h-[53px] rounded-full bg-[#ED276E] flex items-center justify-center text-white font-semibold text-lg">
                            {review.initials}
                          </div>
                          <div className="flex flex-col">
                            <div className="text-[rgba(237,39,110,1)] text-lg font-semibold">{review.name}</div>
                            <div className="text-[rgba(119,119,119,1)] text-sm font-normal mt-1">{review.position}</div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </SectionCarousel>
              </div>
            </div>
          </section>

          {/* ===== FAQ ===== */}
          <section className="w-full py-16 px-4 sm:px-8 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#299dd7]">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-center mt-3 text-lg mb-10">Everything you need to know, answered!</p>
              <div className="space-y-3">
                {displayedFaqs.map((faq, idx) => (
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
                {hasMoreFaqs && (
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAllFaqs((prev) => !prev)}
                      className="px-6 py-3 rounded-full font-semibold text-sm bg-[#299dd7] text-white hover:bg-[#237bb0] transition-colors flex items-center justify-center gap-2"
                    >
                      {showAllFaqs ? 'Show less' : 'Load more FAQs'}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAllFaqs ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                )}
              </div>
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

        {/* Floating call & WhatsApp buttons (tablet & mobile) */}
        <CallButton />
        <WhatsAppButton />
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
