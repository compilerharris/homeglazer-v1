import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';

interface DashboardStats {
  brands: number;
  products: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({ brands: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [brandsRes, productsRes] = await Promise.all([
        fetch('/api/brands'),
        fetch('/api/products'),
      ]);

      const brands = await brandsRes.json();
      const products = await productsRes.json();

      setStats({
        brands: brands.length || 0,
        products: products.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#299dd7] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading stats...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Total Brands</h2>
                <p className="text-4xl font-bold text-[#299dd7]">{stats.brands}</p>
              </div>

              <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Total Products</h2>
                <p className="text-4xl font-bold text-[#ED276E]">{stats.products}</p>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

