export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandId: string;
  description: string;
  shortDescription: string;
  category: string;
  sheenLevel: string;
  surfaceType: string;
  usage: string;
  prices: {
    '1L': number;
    '4L': number;
    '10L': number;
    '20L': number;
  };
  image: string;
  colors?: string[];
  features?: string[];
  specifications?: Record<string, string>;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface FilterOptions {
  sheenLevels: string[];
  surfaceTypes: string[];
  usageTypes: string[];
  quantityOptions: string[];
  brands: Brand[];
}

// Sample brands data (replace with actual data from Excel)
export const BRANDS: Brand[] = [
  {
    id: 'asian-paints',
    name: 'Asian Paints',
    logo: '/assets/images/brand-logos/asian-paints-logo.webp',
    description: 'India\'s leading paint company'
  },
  {
    id: 'berger-paints',
    name: 'Berger Paints',
    logo: '/assets/images/brand-logos/berger-logo.webp',
    description: 'Premium paint solutions'
  },
  {
    id: 'kansai-nerolac',
    name: 'Kansai Nerolac',
    logo: '/assets/images/brand-logos/nerolac-logo.webp',
    description: 'Industrial and decorative paints'
  },
  {
    id: 'jsw-paints',
    name: 'JSW Paints',
    logo: '/assets/images/brand-logos/jsw-logo.webp',
    description: 'Innovative paint solutions'
  },
  {
    id: 'birla-opus',
    name: 'Birla Opus',
    logo: '/assets/images/brand-logos/birla-opus-logo.webp',
    description: 'Quality paints for every surface'
  },
  {
    id: 'ral',
    name: 'RAL',
    logo: '/assets/images/brand-logos/ral-logo.webp',
    description: 'International color standard'
  },
  {
    id: 'ncs',
    name: 'NCS',
    logo: '/assets/images/brand-logos/ncs-logo.webp',
    description: 'Natural Color System'
  }
];

// Sample products data (replace with actual data from Excel)
export const PRODUCTS: Product[] = [
  {
    id: 'apcolite-advanced-shyne',
    slug: 'apcolite-advanced-shyne',
    name: 'Apcolite Advanced Shyne',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Premium interior emulsion with advanced shine technology for walls and ceilings. Provides excellent coverage and durability.',
    shortDescription: 'Premium interior emulsion with advanced shine technology',
    category: 'Interior Emulsion',
    sheenLevel: 'High Gloss',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 850,
      '4L': 3200,
      '10L': 7800,
      '20L': 15000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Advanced shine technology',
      'Excellent coverage',
      'Washable finish',
      'Low VOC'
    ],
    specifications: {
      'Coverage': '140-160 sq ft per litre',
      'Drying Time': '2-4 hours',
      'Recoat Time': '4-6 hours',
      'Finish': 'High Gloss'
    }
  },
  {
    id: 'royale-matt',
    slug: 'royale-matt',
    name: 'Royale Matt',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Ultra-premium interior emulsion with superior matt finish. Perfect for creating elegant, sophisticated interiors.',
    shortDescription: 'Ultra-premium interior emulsion with superior matt finish',
    category: 'Interior Emulsion',
    sheenLevel: 'Matt',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1200,
      '4L': 4500,
      '10L': 11000,
      '20L': 21000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Superior matt finish',
      'Stain resistant',
      'Easy to clean',
      'Premium quality'
    ],
    specifications: {
      'Coverage': '120-140 sq ft per litre',
      'Drying Time': '1-2 hours',
      'Recoat Time': '3-4 hours',
      'Finish': 'Matt'
    }
  },
  {
    id: 'ace-interior',
    slug: 'ace-interior',
    name: 'Ace Interior',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Budget-friendly interior emulsion with good coverage and washable finish. Ideal for cost-conscious projects.',
    shortDescription: 'Budget-friendly interior emulsion with good coverage',
    category: 'Interior Emulsion',
    sheenLevel: 'Soft Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 450,
      '4L': 1700,
      '10L': 4200,
      '20L': 8000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Yellow'],
    features: [
      'Budget friendly',
      'Good coverage',
      'Washable finish',
      'Easy application'
    ],
    specifications: {
      'Coverage': '130-150 sq ft per litre',
      'Drying Time': '2-3 hours',
      'Recoat Time': '4-5 hours',
      'Finish': 'Soft Sheen'
    }
  },
  {
    id: 'exterior-emulsion',
    slug: 'exterior-emulsion',
    name: 'Exterior Emulsion',
    brand: 'Berger Paints',
    brandId: 'berger-paints',
    description: 'Weather-resistant exterior emulsion designed to withstand harsh environmental conditions.',
    shortDescription: 'Weather-resistant exterior emulsion',
    category: 'Exterior Emulsion',
    sheenLevel: 'Semi Gloss',
    surfaceType: 'Exterior Wall',
    usage: 'Home',
    prices: {
      '1L': 650,
      '4L': 2400,
      '10L': 5800,
      '20L': 11000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Light Grey', 'Beige', 'Light Blue'],
    features: [
      'Weather resistant',
      'UV protection',
      'Algae resistant',
      'Long lasting'
    ],
    specifications: {
      'Coverage': '120-140 sq ft per litre',
      'Drying Time': '3-4 hours',
      'Recoat Time': '6-8 hours',
      'Finish': 'Semi Gloss'
    }
  },
  {
    id: 'wood-finish',
    slug: 'wood-finish',
    name: 'Wood Finish',
    brand: 'Kansai Nerolac',
    brandId: 'kansai-nerolac',
    description: 'Premium wood finish paint for furniture, doors, and wooden surfaces. Provides excellent protection and beauty.',
    shortDescription: 'Premium wood finish paint for furniture and wooden surfaces',
    category: 'Wood Finish',
    sheenLevel: 'Gloss',
    surfaceType: 'Wood',
    usage: 'Home',
    prices: {
      '1L': 950,
      '4L': 3600,
      '10L': 8800,
      '20L': 17000
    },
    image: '/assets/images/bucket.png',
    colors: ['Natural Wood', 'Mahogany', 'Teak', 'Walnut'],
    features: [
      'Wood protection',
      'Beautiful finish',
      'Durable coating',
      'Easy application'
    ],
    specifications: {
      'Coverage': '100-120 sq ft per litre',
      'Drying Time': '4-6 hours',
      'Recoat Time': '8-12 hours',
      'Finish': 'Gloss'
    }
  },
  {
    id: 'commercial-interior',
    slug: 'commercial-interior',
    name: 'Commercial Interior',
    brand: 'Kansai Nerolac',
    brandId: 'kansai-nerolac',
    description: 'Heavy-duty interior paint designed for commercial spaces with high traffic and wear.',
    shortDescription: 'Heavy-duty interior paint for commercial spaces',
    category: 'Commercial Paint',
    sheenLevel: 'Satin',
    surfaceType: 'Interior Wall',
    usage: 'Commercial',
    prices: {
      '1L': 750,
      '4L': 2800,
      '10L': 6800,
      '20L': 13000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Light Grey', 'Beige', 'Light Blue'],
    features: [
      'Heavy duty',
      'High traffic resistant',
      'Easy to clean',
      'Commercial grade'
    ],
    specifications: {
      'Coverage': '110-130 sq ft per litre',
      'Drying Time': '2-3 hours',
      'Recoat Time': '4-6 hours',
      'Finish': 'Satin'
    }
  }
];

// Filter options derived from products data
export const FILTER_OPTIONS: FilterOptions = {
  sheenLevels: ['High Gloss', 'Matt', 'Soft Sheen', 'Semi Gloss', 'Gloss', 'Satin'],
  surfaceTypes: ['Interior Wall', 'Exterior Wall', 'Wood'],
  usageTypes: ['Home', 'Commercial'],
  quantityOptions: ['1L', '4L', '10L', '20L'],
  brands: BRANDS
};

// Helper functions
export const getProductsByBrand = (brandId: string): Product[] => {
  return PRODUCTS.filter(product => product.brandId === brandId);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return PRODUCTS.find(product => product.slug === slug);
};

export const getProductByBrandAndSlug = (brandId: string, slug: string): Product | undefined => {
  return PRODUCTS.find(product => product.brandId === brandId && product.slug === slug);
};

export const getRelatedProducts = (currentProduct: Product, count: number = 4): Product[] => {
  return PRODUCTS
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.brandId === currentProduct.brandId || product.sheenLevel === currentProduct.sheenLevel)
    )
    .slice(0, count);
};

export const filterProducts = (
  products: Product[],
  filters: {
    sheenLevel?: string;
    surfaceType?: string;
    usage?: string;
    quantity?: string;
  }
): Product[] => {
  return products.filter(product => {
    if (filters.sheenLevel && product.sheenLevel !== filters.sheenLevel) return false;
    if (filters.surfaceType && product.surfaceType !== filters.surfaceType) return false;
    if (filters.usage && product.usage !== filters.usage) return false;
    if (filters.quantity && !product.prices[filters.quantity as keyof typeof product.prices]) return false;
    return true;
  });
}; 