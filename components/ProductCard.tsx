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
        case 'New Arrival': return 'bg-brand-lime text-brand-deep'; // Modernity & Tech
        case 'Best Seller': return 'bg-brand-gold text-brand-deep'; // Prestige
        case 'Sale': return 'bg-brand-luxury text-white'; // Action & Urgency
        default: return 'bg-brand-green text-white';
    }
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full relative">
      {/* Image Area */}
      <div className="relative h-64 overflow-hidden bg-gray-50">
        {product.badge && (
          <span className={`absolute top-4 left-4 z-10 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md ${getBadgeStyle(product.badge)}`}>
            {product.badge}
          </span>
        )}
        
        <img 
          src={currentImage} 
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Image Gallery Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all z-5"
            >
              <ChevronLeft size={18} className="text-gray-700" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all z-5"
            >
              <ChevronRight size={18} className="text-gray-700" />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-brand-lime' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
            <button className="bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-brand-green hover:bg-white transition-colors">
                <Heart size={18} />
            </button>
        </div>

        {/* Neon Glow on Hover (Subtle) */}
        <div className="absolute inset-0 ring-4 ring-brand-lime/50 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Details */}
      <div className="p-6 flex flex-col flex-grow relative">
        <div className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-medium">{product.category}</div>
        <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
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

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-brand-dark">Rs. {product.price}/-</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-brand-deep text-white p-3 rounded-xl hover:bg-brand-lime hover:text-brand-deep transition-all duration-300 shadow-lg shadow-brand-deep/10 active:scale-90 transform"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};