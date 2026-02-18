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

export interface ApiProductsResponse {
  data: ApiProduct[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface ApiBrand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

// Get the base URL for API calls
// Priority: NEXT_PUBLIC_API_URL (for integration testing) > current origin (browser) > localhost (SSR fallback)
function getApiBaseUrl(): string {
  // Allow override via environment variable for integration testing
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // In browser, use current origin (works in both dev and production)
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // SSR fallback - use NEXT_PUBLIC_SITE_URL if available, otherwise localhost
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
}

// Fetch all products
export async function fetchProducts(params?: {
  brandId?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<ApiProduct[]> {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:39',message:'fetchProducts called',data:{hasParams:!!params,brandId:params?.brandId,search:params?.search},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const baseUrl = getApiBaseUrl();
  const url = new URL('/api/products', baseUrl);
  if (params?.brandId) {
    url.searchParams.append('brandId', params.brandId);
  }
  if (params?.search) {
    url.searchParams.append('search', params.search);
  }
  if (params?.page) {
    url.searchParams.append('page', params.page.toString());
  }
  if (params?.limit) {
    url.searchParams.append('limit', params.limit.toString());
  }

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:47',message:'About to fetch products',data:{url:url.toString()},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  let response;
  try {
    response = await fetch(url.toString());
  } catch (fetchError: any) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:50',message:'Fetch error caught',data:{errorMessage:fetchError?.message,errorName:fetchError?.name,errorStack:fetchError?.stack},timestamp:Date.now(),runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    throw new Error(`Network error fetching products: ${fetchError?.message}`);
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:50',message:'Response received',data:{status:response.status,statusText:response.statusText,ok:response.ok,contentType:response.headers.get('content-type'),url:response.url},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  const responseText = await response.text();
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:54',message:'Response body received',data:{isJson:responseText.trim().startsWith('{'),bodyPreview:responseText.substring(0,500),bodyLength:responseText.length},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  if (!response.ok) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:58',message:'Response not OK - parsing error',data:{status:response.status,bodyText:responseText.substring(0,1000)},timestamp:Date.now(),runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    let errorData;
    try {
      errorData = JSON.parse(responseText);
    } catch (e) {
      errorData = { rawResponse: responseText.substring(0, 1000) };
    }
    throw new Error(`Failed to fetch products: ${JSON.stringify(errorData)}`);
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:68',message:'Parsing JSON response',data:{responseLength:responseText.length},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  
  const parsedResponse: ApiProductsResponse | ApiProduct[] = JSON.parse(responseText);
  
  // Handle both old format (array) and new format (object with data and pagination)
  if (Array.isArray(parsedResponse)) {
    return parsedResponse;
  } else {
    return parsedResponse.data;
  }
}

// Fetch all brands
export async function fetchBrands(): Promise<ApiBrand[]> {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:75',message:'fetchBrands called',data:{},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/brands`;
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:78',message:'About to fetch brands',data:{url},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  let response;
  try {
    response = await fetch(url);
  } catch (fetchError: any) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:82',message:'Fetch error caught',data:{errorMessage:fetchError?.message,errorName:fetchError?.name,errorStack:fetchError?.stack},timestamp:Date.now(),runId:'run1',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    throw new Error(`Network error fetching brands: ${fetchError?.message}`);
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:81',message:'Response received',data:{status:response.status,statusText:response.statusText,ok:response.ok,contentType:response.headers.get('content-type'),url:response.url},timestamp:Date.now(),runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  const responseText = await response.text();
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:85',message:'Response body received',data:{isJson:responseText.trim().startsWith('{'),bodyPreview:responseText.substring(0,500),bodyLength:responseText.length},timestamp:Date.now(),runId:'run1',hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  
  if (!response.ok) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:90',message:'Response not OK - parsing error',data:{status:response.status,bodyText:responseText.substring(0,1000)},timestamp:Date.now(),runId:'run1',hypothesisId:'E'})}).catch(()=>{});
    // #endregion
    let errorData;
    try {
      errorData = JSON.parse(responseText);
    } catch (e) {
      errorData = { rawResponse: responseText.substring(0, 1000) };
    }
    throw new Error(`Failed to fetch brands: ${JSON.stringify(errorData)}`);
  }
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/21adcf91-15ca-4563-a889-6dc1018faf8e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f9ea0e'},body:JSON.stringify({sessionId:'f9ea0e',location:'api.ts:100',message:'Parsing JSON response',data:{responseLength:responseText.length},timestamp:Date.now(),runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  return JSON.parse(responseText);
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

