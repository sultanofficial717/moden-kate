import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const UnboxingScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation values
  const lidRotation = useTransform(scrollYProgress, [0.2, 0.5], [0, -110]); // Rotates lid open
  const earbudY = useTransform(scrollYProgress, [0.3, 0.6], [50, -60]); // Lifts earbuds up
  const earbudScale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1.1]);
  const glowOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 0.8]);

  return (
    <div ref={containerRef} className="h-[150vh] bg-white relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        <div className="text-center mb-10 relative z-20">
            <motion.h2 
                style={{ opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 1]) }}
                className="text-3xl md:text-5xl font-bold text-brand-dark"
            >
                Unbox the <span className="text-brand-green">Experience</span>
            </motion.h2>
            <motion.p 
                style={{ opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1]) }}
                className="text-gray-500 mt-2"
            >
                Scroll to open
            </motion.p>
        </div>

        {/* Case Container */}
        <div className="relative w-80 h-64 md:w-96 md:h-80 perspective-1000">
            
            {/* Earbuds (Inside) */}
            <motion.div 
                style={{ y: earbudY, scale: earbudScale }}
                className="absolute inset-x-0 bottom-10 flex justify-center gap-4 z-10"
            >
                 <div className="w-16 h-24 bg-gray-900 rounded-full border-4 border-gray-800 shadow-xl relative">
                    <motion.div style={{ opacity: glowOpacity }} className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-neon rounded-full shadow-[0_0_10px_#00F0FF]" />
                 </div>
                 <div className="w-16 h-24 bg-gray-900 rounded-full border-4 border-gray-800 shadow-xl relative">
                    <motion.div style={{ opacity: glowOpacity }} className="absolute top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-brand-neon rounded-full shadow-[0_0_10px_#00F0FF]" />
                 </div>
            </motion.div>

            {/* Case Body (Bottom) */}
            <div className="absolute bottom-0 w-full h-32 bg-gray-200 rounded-b-[3rem] shadow-2xl border border-gray-300 z-20 flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg animate-pulse" />
            </div>

            {/* Case Lid (Top) - Hinged */}
            <motion.div 
                style={{ rotateX: lidRotation }}
                className="absolute bottom-32 w-full h-32 bg-gray-200 rounded-t-[3rem] shadow-md border border-gray-300 z-30 origin-bottom flex items-end justify-center pb-4"
            >
                <span className="text-gray-400 font-bold tracking-widest text-xs">MODEN KATE</span>
            </motion.div>

        </div>
      </div>
    </div>
  );
};
