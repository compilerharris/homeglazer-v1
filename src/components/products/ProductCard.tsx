import React from 'react';
import Link from 'next/link';
import { Product } from '../../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.brandId}/${product.slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[#299dd7]">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 flex items-center justify-center p-6">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = '/assets/images/bucket.png';
            }}
          />
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-[#299dd7] transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          
          {/* Brand Name */}
          <p className="text-[#299dd7] font-medium text-sm mb-2">
            {product.brand}
          </p>
          
          {/* Category and Sheen Level */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
            <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
              {product.sheenLevel}
            </span>
          </div>
          
          {/* Short Description */}
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.shortDescription}
          </p>
          
          {/* Price Range and View Details Button */}
          <div className="space-y-3">
            <div className="text-sm text-gray-500">
              Starting from ₹{Math.min(...Object.values(product.prices))}
            </div>
            <div className="w-full bg-[#299dd7] text-white py-2 px-4 rounded-lg font-medium text-center hover:bg-[#237bb0] transition-colors duration-300 group-hover:bg-[#237bb0]">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 