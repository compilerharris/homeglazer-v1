import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  category: string;
  sheenLevel: string;
  prices: {
    '1L': number;
    '4L': number;
    '10L': number;
    '20L': number;
  };
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    try {
      const url = search ? `/api/products?search=${encodeURIComponent(search)}` : '/api/products';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Products</h1>
            <Button
              onClick={() => router.push('/admin/products/new')}
              className="bg-[#299dd7] hover:bg-[#237bb0] text-white"
            >
              Add Product
            </Button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <div className="py-12 text-center">
                <p className="text-gray-600">No products found. Create your first product!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">
                      {product.name}
                    </h3>
                  </div>
                  {product.image && (
                    <div className="mb-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-contain bg-gray-50 rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="space-y-2 flex-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Brand:</span> {product.brand.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span> {product.category}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Sheen:</span> {product.sheenLevel}
                    </p>
                    <div className="pt-2 border-t border-gray-200">
                      <p className="text-xs font-medium text-gray-700 mb-1">Prices:</p>
                      <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                        <span>1L: ₹{product.prices['1L']}</span>
                        <span>4L: ₹{product.prices['4L']}</span>
                        <span>10L: ₹{product.prices['10L']}</span>
                        <span>20L: ₹{product.prices['20L']}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="flex-1"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

