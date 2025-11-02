import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  _count?: {
    products: number;
  };
}

export default function BrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      } else {
        setError('Failed to load brands');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this brand? All associated products will also be deleted.')) {
      return;
    }

    try {
      const response = await fetch(`/api/brands/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchBrands();
      } else {
        alert('Failed to delete brand');
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
            <h1 className="text-3xl font-bold text-[#ED276E]">Brands</h1>
            <Button
              onClick={() => router.push('/admin/brands/new')}
              className="bg-[#299dd7] hover:bg-[#237bb0] text-white"
            >
              Add Brand
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading brands...</p>
            </div>
          ) : brands.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <div className="py-12 text-center">
                <p className="text-gray-600">No brands found. Create your first brand!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand) => (
                <div key={brand.id} className="bg-white rounded-xl shadow p-6 border border-gray-200 flex flex-col">
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-[#ED276E]">{brand.name}</h2>
                  </div>
                  <div className="space-y-3 flex-1">
                    <img src={brand.logo} alt={brand.name} className="h-20 object-contain mb-3" />
                    <p className="text-sm text-gray-600">{brand.description}</p>
                    <p className="text-xs text-gray-500">Slug: {brand.slug}</p>
                    {brand._count && (
                      <p className="text-xs text-gray-500">Products: {brand._count.products}</p>
                    )}
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/admin/brands/${brand.id}/edit`)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(brand.id)}
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

