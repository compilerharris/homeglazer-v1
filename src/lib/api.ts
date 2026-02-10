// API Client Utilities
export interface ApiProduct {
  id: string;
  slug: string;
  name: string;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  brandId: string;
  description: string;
  shortDescription: string;
  category: string;
  subCategory?: string | null;
  sheenLevel: string;
  surfaceType: string;
  usage: string;
  prices: Record<string, number>;
  image: string;
  colors?: string[];
  features?: string[];
  specifications?: Record<string, string>;
}

export interface ApiBrand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

// Fetch all products
export async function fetchProducts(params?: {
  brandId?: string;
  search?: string;
}): Promise<ApiProduct[]> {
  const url = new URL('/api/products', window.location.origin);
  if (params?.brandId) {
    url.searchParams.append('brandId', params.brandId);
  }
  if (params?.search) {
    url.searchParams.append('search', params.search);
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

// Fetch all brands
export async function fetchBrands(): Promise<ApiBrand[]> {
  const response = await fetch('/api/brands');
  if (!response.ok) {
    throw new Error('Failed to fetch brands');
  }
  return response.json();
}

// Fetch a single product by ID
export async function fetchProduct(id: string): Promise<ApiProduct> {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

// Transform API product to frontend Product format
export function transformProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    slug: apiProduct.slug,
    name: apiProduct.name,
    brand: apiProduct.brand.name,
    brandId: apiProduct.brand.slug,
    description: apiProduct.description,
    shortDescription: apiProduct.shortDescription,
    category: apiProduct.category,
    subCategory: apiProduct.subCategory,
    sheenLevel: apiProduct.sheenLevel,
    surfaceType: apiProduct.surfaceType,
    usage: apiProduct.usage,
    prices: apiProduct.prices,
    image: apiProduct.image,
    colors: apiProduct.colors,
    features: apiProduct.features,
    specifications: apiProduct.specifications,
  };
}

// Frontend Product interface (matches the one in data/products.ts)
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandId: string;
  description: string;
  shortDescription: string;
  category: string;
  subCategory?: string | null;
  sheenLevel: string;
  surfaceType: string;
  usage: string;
  prices: Record<string, number>;
  image: string;
  colors?: string[];
  features?: string[];
  specifications?: Record<string, string>;
}

// Transform API brand to frontend Brand format
export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export function transformBrand(apiBrand: ApiBrand): Brand {
  return {
    id: apiBrand.slug,
    name: apiBrand.name,
    logo: apiBrand.logo,
    description: apiBrand.description || '',
  };
}

