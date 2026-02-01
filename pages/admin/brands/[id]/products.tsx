import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  sheenLevel: string;
  prices: {
    '1L': number;
    '4L': number;
    '10L': number;
    '20L': number;
  };
}

export default function BrandProducts() {
  const router = useRouter();
  const { id } = router.query;
  const [brand, setBrand] = useState<Brand | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchBrand();
      fetchProducts();
    }
  }, [id]);

  const fetchBrand = async () => {
    try {
      const response = await fetch(`/api/brands/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBrand(data);
      } else {
        setError('Brand not found');
      }
    } catch (err) {
      setError('Failed to load brand');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?brandId=${id}`);
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

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
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

  if (loading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                {brand?.name} Products
              </h1>
              {brand && (
                <p className="text-gray-600 mt-1">{brand.description}</p>
              )}
            </div>
            <Button
              onClick={() => router.push('/admin/products/new')}
              className="bg-[#299dd7] hover:bg-[#237bb0] text-white"
            >
              Add Product
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {products.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">No products found for this brand.</p>
                <Button
                  onClick={() => router.push('/admin/products/new')}
                  className="mt-4 bg-[#299dd7] hover:bg-[#237bb0] text-white"
                >
                  Create First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Category:</span> {product.category} |
                          <span className="font-medium ml-2">Sheen:</span> {product.sheenLevel}
                        </p>
                        <p className="text-xs text-gray-500">
                          <span className="font-medium">Prices:</span> 
                          1L: ₹{product.prices['1L']} | 
                          4L: ₹{product.prices['4L']} | 
                          10L: ₹{product.prices['10L']} | 
                          20L: ₹{product.prices['20L']}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

