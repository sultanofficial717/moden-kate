import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden bg-white flex items-center justify-center pt-20">
      
      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center h-full">
        
        {/* Text Content */}
        <motion.div 
          style={{ y: yText, opacity }}
          className="flex flex-col items-start gap-6"
        >
          <motion.div 
             initial={{ width: 0 }}
             animate={{ width: '40px' }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="h-1 bg-brand-luxury mb-2"
          />
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-brand-deep font-bold tracking-[0.2em] uppercase text-xs"
          >
            New Collection 2024
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-medium text-brand-deep leading-tight tracking-wider"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-luxury">
              LUXURY WITH NO COST
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-lg md:text-xl max-w-md font-light"
          >
            Experience the 35W Super Fast Charger with smart PD technology. Sleek, powerful, and designed for the ambitious.
          </motion.p>
          
          <motion.button 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             onClick={() => navigate('/checkout')}
             className="bg-brand-lime text-brand-deep px-10 py-4 rounded-full font-bold shadow-xl shadow-brand-lime/30 hover:bg-brand-deep hover:text-white transition-all transform hover:scale-105"
          >
            Shop Now
          </motion.button>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          style={{ y: yImage }}
          className="relative flex justify-center"
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-80 h-80 md:w-[500px] md:h-[500px]"
            >
                {/* Product Image */}
                <img 
                    src="https://picsum.photos/id/1059/800/800" 
                    alt="Hero Product" 
                    className="w-full h-full object-contain drop-shadow-2xl rounded-3xl relative z-10"
                />
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};