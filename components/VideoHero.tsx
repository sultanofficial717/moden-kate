import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { placeholderMedia } from '../theme';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

export const VideoHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays on mobile
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[600px] md:min-h-[700px] overflow-hidden flex items-center justify-center">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 z-0"
      >
        <source src={placeholderMedia.videos.hero} type="video/mp4" />
        Your browser does not support video.
      </video>

      {/* Dark Overlay with Grid Pattern */}
      <div className="absolute inset-0 z-[1]" style={{
        background: 'radial-gradient(circle at 30% 50%, rgba(204, 255, 0, 0.15) 0%, rgba(10, 10, 10, 0.9) 50%, rgba(10, 10, 10, 0.95) 100%)'
      }}>
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: 'linear-gradient(rgba(204, 255, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(204, 255, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-[2] text-center px-4 sm:px-6 md:px-8 max-w-[90%] md:max-w-4xl lg:max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Small Badge Above Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-200 text-black px-6 md:px-8 py-2 mb-6 md:mb-8 text-xs md:text-sm font-semibold tracking-[0.3em] shadow-xl shadow-yellow-400/20"
        >
          ⚜ EXCLUSIVE COLLECTION
        </motion.div>

        <motion.h1
          className="mb-6 md:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
        >
          <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" style={{
            textShadow: '0 4px 20px rgba(255, 255, 255, 0.1)'
          }}>
            LUXURY WITH
          </span>
          <span className="block bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mt-2" style={{
            textShadow: '0 4px 30px rgba(250, 204, 21, 0.4)'
          }}>
            NO COST
          </span>
        </motion.h1>

        <motion.p
          className="font-light text-gray-300 mb-8 md:mb-12 leading-relaxed text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="block mb-3">Exquisite tech accessories crafted for those who appreciate refinement.</span>
          <span className="block text-sm sm:text-base bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent font-medium">
            Premium Quality • Accessible Pricing • Complimentary Shipping
          </span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full sm:w-auto font-heading text-sm md:text-base lg:text-lg font-bold text-black bg-brand-lime px-8 md:px-12 lg:px-14 py-3 md:py-4 lg:py-5 cursor-pointer transition-all rounded-full shadow-xl hover:shadow-2xl hover:shadow-brand-lime/50 uppercase tracking-wide"
          >
            SHOP NOW
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full sm:w-auto font-heading text-sm md:text-base lg:text-lg font-bold text-white bg-transparent border-2 border-white/50 px-8 md:px-12 lg:px-14 py-3 md:py-4 lg:py-5 cursor-pointer transition-all uppercase tracking-wide rounded-full hover:bg-white/10 hover:border-white"
          >
            VIEW COLLECTION
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
