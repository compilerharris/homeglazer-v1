import React from 'react';
import Head from 'next/head';
import { getOgImageUrl } from '@/lib/mediaUrl';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { 
  Home, 
  Info, 
  Mail, 
  HelpCircle, 
  Image, 
  Paintbrush, 
  Palette, 
  Calculator, 
  Eye, 
  FileText,
  ChevronRight,
  Building2,
  Sparkles,
  TreePine,
  ShoppingBag
} from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

interface SitemapLink {
  name: string;
  href: string;
  children?: SitemapLink[];
}

interface SitemapSection {
  title: string;
  icon: React.ReactNode;
  links: SitemapLink[];
}

const sitemapData: SitemapSection[] = [
  {
    title: "General Pages",
    icon: <Home className="w-5 h-5" />,
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Testimonials", href: "/testimonials" },
      { name: "Contact", href: "/contact" },
      { name: "Enquiry", href: "/enquiry" },
      { name: "FAQ", href: "/faq" },
      { name: "Gallery", href: "/gallery" },
    ]
  },
  {
    title: "Painting Services",
    icon: <Paintbrush className="w-5 h-5" />,
    links: [
      { 
        name: "Painting Services", 
        href: "/services/painting",
        children: [
          { name: "Residential Painting", href: "/services/painting/residential" },
          { name: "Commercial Painting", href: "/services/painting/commercial" },
          { name: "Kids Room Painting", href: "/services/painting/kids-room" },
        ]
      },
    ]
  },
  {
    title: "Customized Painting",
    icon: <Sparkles className="w-5 h-5" />,
    links: [
      { 
        name: "Customized Painting", 
        href: "/services/customized-painting",
        children: [
          { name: "Interior Painting", href: "/services/customized-painting/interior-painting" },
          { name: "Exterior Painting", href: "/services/customized-painting/exterior-painting" },
          { name: "One Day Painting", href: "/services/customized-painting/one-day-painting" },
          { name: "Per Day Painting", href: "/services/customized-painting/per-day-painting" },
        ]
      },
    ]
  },
  {
    title: "Wall Decor",
    icon: <Palette className="w-5 h-5" />,
    links: [
      { 
        name: "Wall Decor Services", 
        href: "/services/wall-decor",
        children: [
          { name: "Graffiti Painting", href: "/services/wall-decor/graffiti-painting" },
          { name: "Stencil Art", href: "/services/wall-decor/stencil-art" },
          { name: "Texture Painting", href: "/services/wall-decor/texture-painting" },
          { name: "Wallpaper", href: "/services/wall-decor/wallpaper" },
        ]
      },
    ]
  },
  {
    title: "Wood Services",
    icon: <TreePine className="w-5 h-5" />,
    links: [
      { 
        name: "Wood Services", 
        href: "/services/wood-services",
        children: [
          { name: "Carpentry", href: "/services/wood/carpentry" },
          { name: "Wood Coating", href: "/services/wood/wood-coating" },
          { name: "Wood Polishing", href: "/services/wood/wood-polishing" },
        ]
      },
    ]
  },
  {
    title: "Products",
    icon: <ShoppingBag className="w-5 h-5" />,
    links: [
      { 
        name: "Browse All Products", 
        href: "/products",
        children: [
          { name: "Asian Paints", href: "/products" },
          { name: "Berger Paints", href: "/products" },
          { name: "Kansai Nerolac", href: "/products" },
          { name: "JSW Paints", href: "/products" },
          { name: "Birla Opus", href: "/products" },
        ]
      },
    ]
  },
  {
    title: "Tools & Calculators",
    icon: <Calculator className="w-5 h-5" />,
    links: [
      { 
        name: "Paint Budget Calculator", 
        href: "/paint-budget-calculator",
        children: [
          { name: "Painting Calculator", href: "/calculator/painting" },
          { name: "Wood Polishing Calculator", href: "/calculator/wood-polishing" },
        ]
      },
    ]
  },
  {
    title: "Colour Visualisers",
    icon: <Eye className="w-5 h-5" />,
    links: [
      { 
        name: "Colour Visualiser", 
        href: "/colour-visualiser",
        children: [
          { name: "Basic Visualiser", href: "/colour-visualiser/basic" },
          { name: "Advanced Visualiser", href: "/colour-visualiser/advanced" },
        ]
      },
    ]
  },
  {
    title: "Blog & Resources",
    icon: <FileText className="w-5 h-5" />,
    links: [
      { name: "Blog Articles", href: "/blog" },
      { name: "FAQ", href: "/faq" },
      { name: "Support", href: "/support" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "Terms & Conditions", href: "/terms-and-condition" },
    ]
  },
];

const SitemapLinkItem: React.FC<{ link: SitemapLink; isChild?: boolean }> = ({ link, isChild = false }) => {
  return (
    <div className={isChild ? "ml-6" : ""}>
      <Link 
        href={link.href}
        className={`
          group flex items-center gap-2 py-2 
          ${isChild 
            ? "text-gray-600 hover:text-[#ED276E]" 
            : "text-[#299dd7] font-medium hover:text-[#ED276E]"
          }
          transition-colors duration-200
        `}
      >
        <ChevronRight className={`w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 ${isChild ? "text-gray-400" : "text-[#299dd7]"}`} />
        <span>{link.name}</span>
      </Link>
      {link.children && link.children.length > 0 && (
        <div className="border-l-2 border-gray-200 ml-2">
          {link.children.map((child, index) => (
            <SitemapLinkItem key={index} link={child} isChild />
          ))}
        </div>
      )}
    </div>
  );
};

const SitemapSection: React.FC<{ section: SitemapSection }> = ({ section }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="bg-[#299dd7] px-6 py-4">
        <div className="flex items-center gap-3 text-white">
          {section.icon}
          <h2 className="text-lg font-semibold">{section.title}</h2>
        </div>
      </div>
      <div className="p-6">
        {section.links.map((link, index) => (
          <SitemapLinkItem key={index} link={link} />
        ))}
      </div>
    </div>
  );
};

const Sitemap: React.FC = () => {
  return (
    <>
      <Head>
        <title>Sitemap | HomeGlazer - All Pages</title>
        <meta name="description" content="Navigate through all HomeGlazer pages. Find our services, products, tools, calculators, and resources for professional painting services." />
        <meta property="og:title" content="Sitemap | HomeGlazer - All Pages" />
        <meta property="og:description" content="Navigate through all HomeGlazer pages and discover our complete range of painting services." />
        <meta property="og:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
        <meta name="twitter:title" content="Sitemap | HomeGlazer - All Pages" />
        <meta name="twitter:description" content="Navigate through all HomeGlazer pages and discover our services." />
        <meta name="twitter:image" content={getOgImageUrl("/uploads/hero-banner.png", SITE_URL)} />
      </Head>
      <div className="bg-gray-50 flex flex-col overflow-hidden items-center min-h-screen">
        <Header />
      
      {/* Breadcrumb */}
      <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/sitemap">Sitemap</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#ED276E] to-[#299dd7] py-16 mt-8">
        <div className="w-[90%] lg:w-[80%] mx-auto text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Sitemap
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
            Navigate through all our pages and discover our complete range of painting services, 
            tools, and resources.
          </p>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="w-full bg-white py-12">
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Quick Links
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/enquiry" 
              className="px-6 py-3 border-2 border-gray-300 text-gray-500 rounded-lg font-medium hover:bg-[#ED276E] hover:border-[#ED276E] hover:text-white transition-colors duration-200"
            >
              Get a Quote
            </Link>
            <Link 
              href="/paint-budget-calculator" 
              className="px-6 py-3 border-2 border-gray-300 text-gray-500 rounded-lg font-medium hover:bg-[#ED276E] hover:border-[#ED276E] hover:text-white transition-colors duration-200"
            >
              Budget Calculator
            </Link>
            <Link 
              href="/colour-visualiser" 
              className="px-6 py-3 border-2 border-gray-300 text-gray-500 rounded-lg font-medium hover:bg-[#ED276E] hover:border-[#ED276E] hover:text-white transition-colors duration-200"
            >
              Colour Visualiser
            </Link>
            <Link 
              href="/products" 
              className="px-6 py-3 border-2 border-gray-300 text-gray-500 rounded-lg font-medium hover:bg-[#ED276E] hover:border-[#ED276E] hover:text-white transition-colors duration-200"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="w-[90%] lg:w-[80%] mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitemapData.map((section, index) => (
            <SitemapSection key={index} section={section} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-3xl md:text-[40px] font-medium mb-6">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Our team is here to help. Contact us directly and we'll guide you to the right service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-[#ED276E] hover:bg-gray-100 text-lg px-8 py-4 rounded-lg font-medium transition-colors duration-200"
            >
              Contact Us
            </Link>
            <Link 
              href="/faq" 
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-4 rounded-lg font-medium transition-colors duration-200"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
      
      {/* Mobile Action Buttons - Fixed at Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="flex gap-3">
          <Link 
            href="/enquiry" 
            className="flex-1 bg-[#ED276E] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]"
          >
            Enquire Now
          </Link>
          <Link 
            href="/paint-budget-calculator" 
            className="flex-1 bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]"
          >
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

export default Sitemap;
