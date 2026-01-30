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
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-champagne/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-brand-deep/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

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
            className="text-5xl md:text-7xl font-serif font-medium text-brand-deep leading-[1.1]"
          >
            Power Meets <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-luxury">Elegance.</span>
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
                {/* Floating Circle behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-brand-gold/20 rounded-full animate-spin-slow pointer-events-none" />

                {/* Product Image */}
                <img 
                    src="https://picsum.photos/id/1059/800/800" 
                    alt="Hero Product" 
                    className="w-full h-full object-contain drop-shadow-2xl rounded-3xl relative z-10 animate-float"
                />
                
                {/* Floating Specs - Updated to use Deep Green/Lime */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute -right-4 top-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-brand-green/10 z-20"
                >
                    <p className="font-bold text-brand-deep">35W</p>
                    <p className="text-xs text-gray-500">Fast Charge</p>
                </motion.div>

                 <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    className="absolute -left-4 bottom-1/4 bg-brand-deep text-white backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/10 z-20"
                >
                    <p className="font-bold text-brand-lime">USB-C</p>
                    <p className="text-xs text-white/70">Power Delivery</p>
                </motion.div>
            </motion.div>
        </motion.div>
      </div>
    </div>
  );
};