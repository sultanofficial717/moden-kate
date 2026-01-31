import React, { useState } from 'react';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get images array, fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = images[currentImageIndex];

  // Color logic for strategic functions
  const getBadgeStyle = (badge: string) => {
    switch(badge) {
        case 'New Arrival': return 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border border-white/20 shadow-lg'; 
        case 'Best Seller': return 'bg-gradient-to-r from-yellow-400 to-yellow-200 text-black border border-yellow-300 shadow-lg shadow-yellow-400/50'; 
        case 'Sale': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white border border-white/20 shadow-lg'; 
        default: return 'bg-black/80 text-white border border-white/20 shadow-lg';
    }
  };

  return (
    <div className="group bg-gradient-to-b from-zinc-900 to-black overflow-hidden border border-white/10 hover:border-yellow-400/30 shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 flex flex-col h-full relative hover:-translate-y-2">
      {/* Image Area */}
      <div className="relative h-80 overflow-hidden bg-black">
        {product.badge && (
          <span className={`absolute top-5 right-5 z-10 text-xs font-bold px-4 py-2 tracking-wide backdrop-blur-md ${getBadgeStyle(product.badge)}`}>
            {product.badge}
          </span>
        )}
        
        <img 
          src={currentImage} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Image Gallery Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black p-1 opacity-0 group-hover:opacity-100 transition-all z-5"
            >
              <ChevronLeft size={18} className="text-black" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black p-1 opacity-0 group-hover:opacity-100 transition-all z-5"
            >
              <ChevronRight size={18} className="text-black" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 border-2 border-black transition-colors ${
                    idx === currentImageIndex ? 'bg-brand-lime' : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hover Actions - Removed neon glow */}
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-grow relative bg-gradient-to-b from-transparent to-black/50">
        <div className="text-xs bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent mb-3 tracking-[0.2em] font-semibold">{product.category}</div>
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-gray-100 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        {/* Specs Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
            {product.specs?.slice(0, 2).map((spec, i) => (
                <span key={i} className="text-[10px] bg-gray-50 text-gray-600 px-2 py-1 rounded-md border border-gray-100">
                    {spec}
                </span>
            ))}
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">${product.price}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-black px-6 py-3 font-bold text-sm tracking-wide shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300 rounded-full hover:-translate-y-1"
            title="Add to Cart"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};