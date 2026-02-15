import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import WhatsAppButton from '@/components/home/WhatsAppButton';
import CTAButton from '@/components/home/CTAButton';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import BrandTabs from '@/components/products/BrandTabs';
import Pagination from '@/components/products/Pagination';
import Link from 'next/link';
import { 
  FILTER_OPTIONS, 
  filterProducts,
  Product 
} from '@/data/products';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { fetchProducts, fetchBrands, transformProduct, transformBrand } from '@/lib/api';
import { sortBrandsByDisplayOrder } from '@/lib/brand-order';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homeglazer.com';

type SortOption = 'name-asc' | 'name-desc' | 'size-asc' | 'size-desc';
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'size-asc', label: 'Size: Small to Large' },
  { value: 'size-desc', label: 'Size: Large to Small' },
];

function getMinSizeValue(prices: Record<string, number>): number {
  const keys = Object.keys(prices || {}).filter(k => prices[k]);
  if (keys.length === 0) return Infinity;
  const values = keys.map(k => {
    const num = parseFloat(k.replace(/[LKP]$/i, '')) || 0;
    const isKg = /k$/i.test(k);
    return isKg ? num * 1000 : num;
  });
  return Math.min(...values);
}
function getMaxSizeValue(prices: Record<string, number>): number {
  const keys = Object.keys(prices || {}).filter(k => prices[k]);
  if (keys.length === 0) return -Infinity;
  const values = keys.map(k => {
    const num = parseFloat(k.replace(/[LKP]$/i, '')) || 0;
    const isKg = /k$/i.test(k);
    return isKg ? num * 1000 : num;
  });
  return Math.max(...values);
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState(FILTER_OPTIONS.brands);
  const [filterOptions, setFilterOptions] = useState(FILTER_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    sheenLevel: undefined as string | undefined,
    category: undefined as string | undefined,
    usage: undefined as string | undefined,
    quantity: undefined as string | undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const productsPerPage = 12;

  // Fetch products and brands on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and brands in parallel
        const [productsData, brandsData] = await Promise.all([
          fetchProducts(),
          fetchBrands(),
        ]);

        // Transform API data to frontend format
        const transformedProducts = productsData.map(transformProduct);
        const transformedBrands = sortBrandsByDisplayOrder(brandsData.map(transformBrand));

        // Update filter options with fetched brands (quantity uses fixed ranges)
        setFilterOptions({
          ...FILTER_OPTIONS,
          brands: transformedBrands,
        });

        setProducts(transformedProducts);
        setBrands(transformedBrands);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Filter products based on selected brand and filters
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brandId === selectedBrand);
    }
    
    // Apply other filters
    filtered = filterProducts(filtered, filters);
    
    return filtered;
  }, [products, selectedBrand, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'size-asc') {
      sorted.sort((a, b) => {
        const va = getMinSizeValue(a.prices);
        const vb = getMinSizeValue(b.prices);
        return va - vb;
      });
    } else if (sortBy === 'size-desc') {
      sorted.sort((a, b) => {
        const va = getMaxSizeValue(a.prices);
        const vb = getMaxSizeValue(b.prices);
        return vb - va;
      });
    }
    return sorted;
  }, [filteredProducts, sortBy]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Handle filter changes
  const handleFilterChange = (filterType: 'sheenLevel' | 'category' | 'usage' | 'quantity', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === '' ? undefined : (prev[filterType] === value ? undefined : value)
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle brand selection
  const handleBrandSelect = (brandId: string | null) => {
    setSelectedBrand(brandId);
    setCurrentPage(1); // Reset to first page when brand changes
  };

  // Handle sort change
  const handleSortChange = (value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1); // Reset to first page when sort changes
  };

  // Handle page change with scroll to top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('products-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      sheenLevel: undefined,
      category: undefined,
      usage: undefined,
      quantity: undefined,
    });
    setSelectedBrand(null);
    setCurrentPage(1);
  };

  return (
    <>
      <Head>
        <title>Paint Products | HomeGlazer - Premium Paint Brands</title>
        <meta name="description" content="Browse premium paint products from top brands like Asian Paints, Berger, Nerolac, JSW Paints, and Birla Opus. Find the perfect paint for your project." />
        <meta property="og:title" content="Paint Products | HomeGlazer - Premium Paint Brands" />
        <meta property="og:description" content="Browse premium paint products from top brands. Find the perfect paint for your project." />
        <meta property="og:image" content={`${SITE_URL}/uploads/color-bucket1.png`} />
        <meta name="twitter:title" content="Paint Products | HomeGlazer - Premium Paint Brands" />
        <meta name="twitter:description" content="Browse premium paint products from top brands." />
        <meta name="twitter:image" content={`${SITE_URL}/uploads/color-bucket1.png`} />
      </Head>
      <div className="bg-white flex flex-col overflow-hidden items-center">
        <Header />
      
      <div className="w-[90%] lg:w-[80%] mx-auto pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-[#ED276E] to-[#299dd7] py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Premium Paint Products
          </h1>
          <p className="text-white text-xl mb-8 max-w-3xl mx-auto">
            Discover our curated collection of high-quality paints from leading brands. 
            Find the perfect paint for your project with our comprehensive range.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Filters (Hidden on tablet and below) */}
            <div className="hidden lg:block lg:col-span-1">
              <ProductFilters
                filters={filters}
                filterOptions={{ ...filterOptions, brands }}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Right Column - Brand Tabs and Products */}
            <div id="products-list" className="col-span-1 lg:col-span-3">
              {/* Brand Tabs */}
              <BrandTabs
                brands={brands}
                selectedBrand={selectedBrand}
                onBrandSelect={handleBrandSelect}
              />

              {/* Results Count and Sort */}
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-gray-600">
                  Showing {paginatedProducts.length} of {sortedProducts.length} products
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as SortOption)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:ring-2 focus:ring-[#299dd7] focus:border-[#299dd7]"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto"></div>
                  <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className="text-red-400 text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold mb-2">
                    Error Loading Products
                  </h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-[#299dd7] text-white px-6 py-3 rounded-lg hover:bg-[#237bb0] transition-colors"
                  >
                    Reload Page
                  </button>
                </div>
              ) : paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 mb-8">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🎨</div>
                  <h3 className="text-xl font-semibold mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or selecting a different brand.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-[#299dd7] text-white px-6 py-3 rounded-lg hover:bg-[#237bb0] transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#ED276E] to-[#299dd7] w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-[40px] font-medium mb-6">Ready to Transform Your Space?</h2>
          <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4">
              Get a Free Quote
            </CTAButton>
            <Link href="/paint-budget-calculator" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4 rounded-[39px]">
              Try Our Budget Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile Action Buttons */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        {/* Filter Button - Full Width Above */}
        <button
          onClick={() => setShowFilterModal(true)}
          className="w-full bg-gray-600 text-white py-3 px-4 rounded-full font-medium text-center hover:bg-gray-700 transition flex items-center justify-center text-[15px] mb-3"
        >
          Filters
        </button>
        
        {/* Two Fixed Buttons Below */}
        <div className="flex gap-3">
          <Link href="/enquiry" className="flex-1 bg-[#ED276E] text-white py-4 px-4 rounded-lg font-medium text-center hover:bg-[#b81d5a] transition flex items-center justify-center text-[15px]">
            Enquire Now
          </Link>
          <Link href="/paint-budget-calculator" className="flex-1 bg-[#299dd7] text-white py-4 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>

      {/* Filter Modal for Mobile/Tablet */}
      {showFilterModal && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[85vh] rounded-t-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl font-semibold">Filters</h2>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              <ProductFilters
                filters={filters}
                filterOptions={{ ...filterOptions, brands }}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                showHeader={false}
                sticky={false}
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-full bg-[#299dd7] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#237bb0] transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
        <div className="[&_.whatsapp-button]:bottom-24 md:[&_.whatsapp-button]:bottom-8">
          <WhatsAppButton />
        </div>
      </div>
    </>
  );
};

export default Products; 