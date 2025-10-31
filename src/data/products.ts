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
  }
];

// Sample products data (replace with actual data from Excel)
export const PRODUCTS: Product[] = [
  {
    id: 'tractor-emulsion',
    slug: 'tractor-emulsion',
    name: 'Tractor Emulsion',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Economy interior emulsion with smart upgrade and smooth finish. Provides 2/5 washability and 1600+ shade availability.',
    shortDescription: 'Economy interior emulsion with smart upgrade and smooth finish',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 450,
      '4L': 1700,
      '10L': 4200,
      '20L': 8000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Smart upgrade technology',
      'Smooth finish',
      '2/5 washability',
      '1600+ shade availability'
    ],
    specifications: {
      'Coverage': '130-150 Sq.ft./Ltr (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '6-8 Hours',
      'Finish': 'Matt',
      'Durability': '3-4 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'tractor-emulsion-advance',
    slug: 'tractor-emulsion-advance',
    name: 'Tractor Emulsion Advance',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Economy interior emulsion with superior anti-fungal shield. Provides 2/5 washability and 1600+ shade availability.',
    shortDescription: 'Economy interior emulsion with superior anti-fungal shield',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 500,
      '4L': 1900,
      '10L': 4700,
      '20L': 9000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Superior anti-fungal shield',
      'Smooth finish',
      '2/5 washability',
      '1600+ shade availability'
    ],
    specifications: {
      'Coverage': '130-150 Sq.ft./Ltr (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '6-8 Hours',
      'Finish': 'Matt',
      'Durability': '3-4 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'tractor-emulsion-shyne',
    slug: 'tractor-emulsion-shyne',
    name: 'Tractor Emulsion Shyne',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Economy interior emulsion with sheen finish. Provides 2/5 washability and 1000+ shade availability.',
    shortDescription: 'Economy interior emulsion with sheen finish',
    category: 'Interior Paint',
    sheenLevel: 'Low Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 480,
      '4L': 1800,
      '10L': 4400,
      '20L': 8500
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Sheen finish',
      'Smooth application',
      '2/5 washability',
      '1000+ shade availability'
    ],
    specifications: {
      'Coverage': '130-150 Sq.ft./Ltr (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '6-8 Hours',
      'Finish': 'Low Sheen',
      'Durability': '3-4 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'tractor-emulsion-sparc',
    slug: 'tractor-emulsion-sparc',
    name: 'Tractor Emulsion Sparc',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Perfect economy emulsion with smooth finish. Provides 2/5 washability and 850+ shade availability.',
    shortDescription: 'Perfect economy emulsion with smooth finish',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 400,
      '4L': 1500,
      '10L': 3700,
      '20L': 7000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Perfect economy emulsion',
      'Smooth finish',
      '2/5 washability',
      '850+ shade availability'
    ],
    specifications: {
      'Coverage': '120-140 Sq.ft./Ltr (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '6-8 Hours',
      'Finish': 'Matt',
      'Durability': '2-3 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'tractor-emulsion-sparc-advance',
    slug: 'tractor-emulsion-sparc-advance',
    name: 'Tractor Emulsion Sparc Advance',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Perfect economy emulsion with smooth finish, better whiteness & hiding. Provides 2/5 washability and 850+ shade availability.',
    shortDescription: 'Perfect economy emulsion with better whiteness & hiding',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 420,
      '4L': 1600,
      '10L': 3900,
      '20L': 7500
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Perfect economy emulsion',
      'Smooth finish',
      'Better whiteness & hiding',
      '850+ shade availability'
    ],
    specifications: {
      'Coverage': '120-140 Sq.ft./Ltr (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '6-8 Hours',
      'Finish': 'Matt',
      'Durability': '2-3 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'apcolite-premium-emulsion',
    slug: 'apcolite-premium-emulsion',
    name: 'Apcolite Premium Emulsion',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Premium interior emulsion with rich matt finish, satin guard, long lasting film, fungus & mildew resistance, extra deep colours for feature wall.',
    shortDescription: 'Premium interior emulsion with rich matt finish and satin guard',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
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
      'Rich matt finish',
      'Satin guard',
      'Long lasting film',
      'Fungus & mildew resistance',
      'Extra deep colours for feature wall'
    ],
    specifications: {
      'Coverage': '75-85 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '45 Minutes',
      'Recoating Time': '8-10 Hours',
      'Finish': 'Matt & Smooth',
      'Durability': '4-5 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'apcolite-premium-satin-emulsion',
    slug: 'apcolite-premium-satin-emulsion',
    name: 'Apcolite Premium Satin Emulsion',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Premium interior emulsion with rich satin finish, advance satin guard, high washability, anti fungal.',
    shortDescription: 'Premium interior emulsion with rich satin finish',
    category: 'Interior Paint',
    sheenLevel: 'Low Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 900,
      '4L': 3400,
      '10L': 8300,
      '20L': 16000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Rich satin finish',
      'Advance satin guard',
      'High washability',
      'Anti fungal'
    ],
    specifications: {
      'Coverage': '95-115 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '45 Minutes',
      'Recoating Time': '8-10 Hours',
      'Finish': 'Silky Smooth',
      'Durability': '4-5 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'apcolite-all-protek-shyne',
    slug: 'apcolite-all-protek-shyne',
    name: 'Apcolite All Protek Shyne',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Premium interior emulsion with flame spread resistance, advance satin guard, lotus effect, fragrance.',
    shortDescription: 'Premium interior emulsion with flame spread resistance',
    category: 'Interior Paint',
    sheenLevel: 'Low Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 950,
      '4L': 3600,
      '10L': 8800,
      '20L': 17000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Flame spread resistance',
      'Advance satin guard',
      'Lotus effect',
      'Fragrance'
    ],
    specifications: {
      'Coverage': '95-115 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '45 Minutes',
      'Recoating Time': '8-10 Hours',
      'Finish': 'Low Sheen',
      'Durability': '4-5 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'apcolite-all-protek',
    slug: 'apcolite-all-protek',
    name: 'Apcolite All Protek',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Premium interior emulsion with flame spread resistance, advance satin guard, lotus effect, fragrance.',
    shortDescription: 'Premium interior emulsion with flame spread resistance',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 950,
      '4L': 3600,
      '10L': 8800,
      '20L': 17000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Flame spread resistance',
      'Advance satin guard',
      'Lotus effect',
      'Fragrance'
    ],
    specifications: {
      'Coverage': '95-115 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '45 Minutes',
      'Recoating Time': '8-10 Hours',
      'Finish': 'Matt & Smooth',
      'Durability': '4-5 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'apcolite-advance-shyne',
    slug: 'apcolite-advance-shyne',
    name: 'Apcolite Advance Shyne',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Premium interior emulsion with high sheen finish.',
    shortDescription: 'Premium interior emulsion with high sheen finish',
    category: 'Interior Paint',
    sheenLevel: 'High Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1000,
      '4L': 3800,
      '10L': 9200,
      '20L': 17500
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'High sheen finish',
      'Premium quality',
      'Excellent coverage',
      'Durable finish'
    ],
    specifications: {
      'Coverage': '95-115 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '45 Minutes',
      'Recoating Time': '8-10 Hours',
      'Finish': 'High Sheen',
      'Durability': '4-5 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'apcolite-advanced-heavy-duty-emulsion',
    slug: 'apcolite-advanced-heavy-duty-emulsion',
    name: 'Apcolite Advanced Heavy Duty Emulsion',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Premium interior emulsion with rich matt finish, advanced satin guard, fungus & mildew resistance, 2X film strength, abrasion resistance, burnish resistance.',
    shortDescription: 'Premium heavy duty emulsion with advanced protection',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1100,
      '4L': 4200,
      '10L': 10200,
      '20L': 19500
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Off White', 'Light Grey', 'Beige'],
    features: [
      'Rich matt finish',
      'Advanced satin guard',
      'Fungus & mildew resistance',
      '2X film strength',
      'Abrasion resistance',
      'Burnish resistance'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '45 Minutes',
      'Recoating Time': '8-10 Hours',
      'Finish': 'Matt & Smooth',
      'Durability': '4-5 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-luxury-emulsion',
    slug: 'royale-luxury-emulsion',
    name: 'Royale Luxury Emulsion',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with enhanced satin resistance & easy clean, anti fungal protection, smooth finish, enhance durability, create teflon surface.',
    shortDescription: 'Luxury emulsion with enhanced satin resistance & easy clean',
    category: 'Interior Paint',
    sheenLevel: 'Low Sheen',
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
      'Enhanced satin resistance & easy clean',
      'Anti fungal protection',
      'Smooth finish',
      'Enhance durability',
      'Create teflon surface'
    ],
    specifications: {
      'Coverage': '85-130 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Low Sheen & Smooth',
      'Durability': '6-7 Years',
      'Shelf Life': '3 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-luster',
    slug: 'royale-luster',
    name: 'Royale Luster',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with enhanced satin resistance & easy clean, anti fungal protection, smooth finish, enhance durability, create teflon surface, anti yellowing, less odour & irritation in eyes.',
    shortDescription: 'Luxury emulsion with silky smooth & high sheen finish',
    category: 'Interior Paint',
    sheenLevel: 'High Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1300,
      '4L': 4900,
      '10L': 12000,
      '20L': 23000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Enhanced satin resistance & easy clean',
      'Anti fungal protection',
      'Smooth finish',
      'Enhance durability',
      'Create teflon surface',
      'Anti yellowing',
      'Less odour & irritation in eyes'
    ],
    specifications: {
      'Coverage': '85-105 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Silky Smooth & High Sheen',
      'Durability': '6-7 Years',
      'Shelf Life': '3 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-advanced',
    slug: 'royale-advanced',
    name: 'Royale Advanced',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with green assure, advanced satin resistance, advance sheen, release fragrance.',
    shortDescription: 'Luxury emulsion with green assure and advanced satin resistance',
    category: 'Interior Paint',
    sheenLevel: 'High Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1400,
      '4L': 5300,
      '10L': 13000,
      '20L': 25000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Green assure',
      'Advanced satin resistance',
      'Advance sheen',
      'Release fragrance'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Smooth & Sheen',
      'Durability': '6-7 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-matt',
    slug: 'royale-matt',
    name: 'Royale Matt',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with smoothest matt finish, burnish resistance, teflon surface protector, excellent dirt resistance, anti-bacterial and anti-fungal shield.',
    shortDescription: 'Luxury emulsion with smoothest matt finish',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1500,
      '4L': 5700,
      '10L': 14000,
      '20L': 27000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Smoothest matt finish',
      'Burnish resistance',
      'Teflon surface protector',
      'Excellent dirt resistance',
      'Anti-bacterial and anti-fungal shield'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Matt & Smooth',
      'Durability': '6-7 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-shyne-luxury-emulsion',
    slug: 'royale-shyne-luxury-emulsion',
    name: 'Royale Shyne Luxury Emulsion',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with green assure, high sheen, teflon surface protector, anti-bacterial & anti-fungal shield.',
    shortDescription: 'Luxury emulsion with high sheen and teflon surface protector',
    category: 'Interior Paint',
    sheenLevel: 'High Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1600,
      '4L': 6100,
      '10L': 15000,
      '20L': 29000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Green assure',
      'High sheen',
      'Teflon surface protector',
      'Anti-bacterial & anti-fungal shield'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'High Sheen',
      'Durability': '6-7 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-health-sheild',
    slug: 'royale-health-sheild',
    name: 'Royale Health Sheild',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with silver ion technology, germ killing action, neutralize formaldehyde, green assure, teflon surface protector.',
    shortDescription: 'Luxury emulsion with silver ion technology and germ killing action',
    category: 'Interior Paint',
    sheenLevel: 'Low Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1700,
      '4L': 6500,
      '10L': 16000,
      '20L': 31000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Silver ion technology',
      'Germ killing action',
      'Neutralize formaldehyde',
      'Green assure',
      'Teflon surface protector'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Low Sheen & Smooth',
      'Durability': '6-7 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-aspira',
    slug: 'royale-aspira',
    name: 'Royale Aspira',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with unsurpassed water beading technology, enhanced anti-microbial formula, environmentally responsible, super satin resistance, exceptional crack bridging technology.',
    shortDescription: 'Luxury emulsion with unsurpassed water beading technology',
    category: 'Interior Paint',
    sheenLevel: 'Low Sheen',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1800,
      '4L': 6900,
      '10L': 17000,
      '20L': 33000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Unsurpassed water beading technology',
      'Enhanced anti-microbial formula',
      'Environmentally responsible',
      'Super satin resistance',
      'Exceptional crack bridging technology'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Silky Smooth Finish',
      'Durability': '6-7 Years',
      'Shelf Life': '3 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-glitz-ultra-matt',
    slug: 'royale-glitz-ultra-matt',
    name: 'Royale Glitz (Ultra Matt)',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with luxury with teflon, dead matt finish, royale designer palette, crack free performance, green assure, satin repellent.',
    shortDescription: 'Luxury emulsion with dead matt finish and teflon protection',
    category: 'Interior Paint',
    sheenLevel: 'Ultra Matt',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 1900,
      '4L': 7300,
      '10L': 18000,
      '20L': 35000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Luxury with teflon',
      'Dead matt finish',
      'Royale designer palette',
      'Crack free performance',
      'Green assure',
      'Satin repellent'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Dead Matt',
      'Durability': '6-7 Years',
      'Shelf Life': '5 Years',
      'Dilution': 'Water Based'
    }
  },
  {
    id: 'royale-atmos',
    slug: 'royale-atmos',
    name: 'Royale Atmos',
    brand: 'Asian Paints',
    brandId: 'asian-paints',
    description: 'Luxury interior emulsion with neutralises formaldehyde, release fragrance, green assure, teflon, absorbs malodours.',
    shortDescription: 'Luxury emulsion that neutralises formaldehyde and absorbs malodours',
    category: 'Interior Paint',
    sheenLevel: 'Mat',
    surfaceType: 'Interior Wall',
    usage: 'Home',
    prices: {
      '1L': 2000,
      '4L': 7700,
      '10L': 19000,
      '20L': 37000
    },
    image: '/assets/images/bucket.png',
    colors: ['White', 'Cream', 'Light Blue', 'Pink'],
    features: [
      'Neutralises formaldehyde',
      'Release fragrance',
      'Green assure',
      'Teflon',
      'Absorbs malodours'
    ],
    specifications: {
      'Coverage': '140-160 Sq. ft./Ltr. (Two Coats)',
      'Surface Dry Time': '30 Minutes',
      'Recoating Time': '4 Hours',
      'Finish': 'Smooth Matt Finish',
      'Durability': '6-7 Years',
      'Shelf Life': '3 Years',
      'Dilution': 'Water Based'
    }
  }
];

// Filter options derived from products data
export const FILTER_OPTIONS: FilterOptions = {
  sheenLevels: ['Ultra Matt', 'Mat', 'Low Sheen', 'High Sheen'],
  surfaceTypes: ['Interior Wall', 'Exterior Wall', 'Wood', 'Metal'],
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