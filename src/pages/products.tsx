import React, { useState, useMemo } from 'react';
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
  PRODUCTS, 
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

const Products: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    sheenLevel: undefined as string | undefined,
    surfaceType: undefined as string | undefined,
    usage: undefined as string | undefined,
    quantity: undefined as string | undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const productsPerPage = 12;

  // Filter products based on selected brand and filters
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;
    
    // Apply brand filter
    if (selectedBrand) {
      filtered = filtered.filter(product => product.brandId === selectedBrand);
    }
    
    // Apply other filters
    filtered = filterProducts(filtered, filters);
    
    return filtered;
  }, [selectedBrand, filters]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle filter changes
  const handleFilterChange = (filterType: 'sheenLevel' | 'surfaceType' | 'usage' | 'quantity', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? undefined : value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle brand selection
  const handleBrandSelect = (brandId: string | null) => {
    setSelectedBrand(brandId);
    setCurrentPage(1); // Reset to first page when brand changes
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      sheenLevel: undefined,
      surfaceType: undefined,
      usage: undefined,
      quantity: undefined,
    });
    setSelectedBrand(null);
    setCurrentPage(1);
  };

  return (
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
                filterOptions={FILTER_OPTIONS}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Right Column - Brand Tabs and Products */}
            <div className="col-span-1 lg:col-span-3">
              {/* Brand Tabs */}
              <BrandTabs
                brands={FILTER_OPTIONS.brands}
                selectedBrand={selectedBrand}
                onBrandSelect={handleBrandSelect}
              />

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {paginatedProducts.length} of {filteredProducts.length} products
                </p>
              </div>

              {/* Products Grid */}
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🎨</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
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
            <Link href="/calculator" className="bg-transparent border-2 border-white text-white hover:bg-[#0FA0CE] hover:border-[#0FA0CE] text-xl px-8 py-4 rounded-[39px]">
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
          <Link href="/calculator" className="flex-1 bg-[#299dd7] text-white py-4 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition flex items-center justify-center text-[15px]">
            Budget Calculator
          </Link>
        </div>
      </div>

      {/* Filter Modal for Mobile/Tablet */}
      {showFilterModal && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[85vh] rounded-t-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
              <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
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
                filterOptions={FILTER_OPTIONS}
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
  );
};

export default Products; 