import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex-shrink-0">
        <div className="flex flex-col h-screen sticky top-0">
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <img 
              src="/assets/images/home-glazer-logo-1.png" 
              alt="HomeGlazer Logo" 
              className="h-10 w-auto object-contain"
            />
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto min-h-0">
            <Link
              href="/admin/dashboard"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                router.pathname === '/admin/dashboard'
                  ? 'bg-[#299dd7] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/brands"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                router.pathname.startsWith('/admin/brands')
                  ? 'bg-[#299dd7] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Brands
            </Link>
            <Link
              href="/admin/products"
              className={`block px-4 py-2 rounded-lg transition-colors ${
                router.pathname.startsWith('/admin/products')
                  ? 'bg-[#299dd7] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Products
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 flex-shrink-0 mt-auto">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
        <main className="p-8 w-full max-w-full flex-1">{children}</main>
        <footer className="py-4 px-8 border-t border-gray-200 bg-white">
          <p className="text-center text-sm text-gray-600">
            © 2025 Homeglazer. All Rights Reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

