import React, { useState } from 'react';
import { ShoppingCart, Heart, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get images array, fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = images[currentImageIndex];

  const handleAddToCart = () => {
    addToCart(product);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group bg-white overflow-hidden border border-gray-200 hover:border-brand-lime hover:shadow-2xl hover:shadow-brand-lime/10 transition-all duration-500 flex flex-col h-full relative rounded-2xl"
    >
      {/* Image Area */}
      <div className="relative h-80 overflow-hidden bg-gray-50">
        <AnimatePresence>
          {product.badge && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className={`absolute top-5 right-5 z-10 text-xs font-bold px-4 py-2 tracking-wide backdrop-blur-md rounded-full ${getBadgeStyle(product.badge)}`}
            >
              {product.badge}
            </motion.span>
          )}
        </AnimatePresence>
        
        <motion.img 
          src={currentImage} 
          alt={product.name}
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full h-full object-cover"
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
      <div className="p-6 flex flex-col flex-grow relative bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-xs text-brand-lime mb-3 tracking-[0.2em] font-semibold uppercase"
        >
          {product.category}
        </motion.div>
        <motion.h3 
          className="text-lg font-serif font-semibold text-gray-900 mb-3 group-hover:text-brand-lime transition-colors line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {product.name}
        </motion.h3>
        
        {/* Specs Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
            {product.specs?.slice(0, 2).map((spec, i) => (
                <motion.span 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-[10px] bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 font-medium"
                >
                    {spec}
                </motion.span>
            ))}
        </div>
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-gray-900 font-display"
          >
            ${product.price}
          </motion.span>
          <motion.button 
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-lime text-black px-6 py-3 font-bold text-sm tracking-wide shadow-lg shadow-brand-lime/20 hover:shadow-xl hover:shadow-brand-lime/40 transition-all duration-300 rounded-full relative overflow-hidden"
            title="Add to Cart"
          >
            <AnimatePresence mode="wait">
              {isAddedToCart ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} /> Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  Add to Bag
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};