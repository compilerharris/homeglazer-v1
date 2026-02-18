import React from 'react';
import Link from 'next/link';
import { Product } from '../../data/products';
import { getMediaUrl } from '@/lib/mediaUrl';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.brandId}/${product.slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[#299dd7] h-full flex flex-col">
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 md:p-6">
          <img 
            src={product.image?.startsWith('http') ? product.image : getMediaUrl(product.image || '')} 
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.dataset.errorHandled) {
                img.dataset.errorHandled = 'true';
                img.src = getMediaUrl('/assets/images/bucket.png');
                img.onerror = () => {
                  img.style.display = 'none';
                };
              }
            }}
          />
        </div>
        
        {/* Product Info */}
        <div className="p-3 md:p-4 flex flex-col flex-grow">
          {/* Content Section - Flexible height */}
          <div className="flex-grow flex flex-col">
            {/* Product Name */}
            <h3 className="font-semibold text-sm md:text-lg mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            {/* Brand Name */}
            <p className="text-[#299dd7] font-medium text-xs md:text-sm mb-2">
              {product.brand}
            </p>
            
            {/* Category and Sheen Level */}
            <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                {product.category}
              </span>
              {product.subCategory && (
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                  {product.subCategory}
                </span>
              )}
              <span className="inline-block bg-gray-100 text-gray-700 text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full">
                {product.sheenLevel}
              </span>
            </div>
            
            {/* Short Description */}
            <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-2 md:mb-3">
              {product.shortDescription}
            </p>
          </div>
          
          {/* Size/Quantity and View Details Button - Fixed at bottom */}
          <div className="space-y-2 md:space-y-3">
            <div className="text-xs md:text-sm text-gray-500">
              {product.prices && Object.keys(product.prices).filter((k) => product.prices[k]).length > 0
                ? `Available in ${Object.keys(product.prices)
                    .filter((k) => product.prices[k])
                    .sort()
                    .join(', ')}`
                : 'Contact for sizes'}
            </div>
            <div className="w-full bg-[#299dd7] text-white py-2 px-3 md:px-4 rounded-lg font-medium text-xs md:text-sm text-center hover:bg-[#237bb0] transition-colors duration-300 group-hover:bg-[#237bb0]">
              View Details →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 