import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../constants';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">Explore Categories</h2>
          <div className="h-1 w-20 bg-brand-green mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => (
            <motion.div
              key={cat.id}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg"
              whileHover="hover"
              initial="rest"
            >
              {/* Background Image with Zoom Effect */}
              <motion.img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover"
                variants={{
                  rest: { scale: 1 },
                  hover: { scale: 1.1, rotate: 2 }
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Overlay - Optimized for Contrast Ratio > 4.5:1 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-white text-xl font-bold mb-1 font-serif tracking-wide drop-shadow-md">{cat.name}</h3>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-lime shadow-[0_0_8px_rgba(160,255,0,0.8)]"></span>
                    <p className="text-gray-200 text-sm font-light">{cat.itemCount}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};