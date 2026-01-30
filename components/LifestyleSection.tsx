import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const LifestyleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="bg-brand-deep text-white overflow-hidden py-0 relative">
      
      {/* Background Infinite Marquee - Subtle Gold */}
      <div className="absolute top-20 left-0 w-full overflow-hidden opacity-[0.03] pointer-events-none select-none z-0">
          <div className="animate-marquee whitespace-nowrap text-[12rem] font-bold text-brand-gold font-serif leading-none">
             LUXURY PERFORMANCE POWER PRECISION ELEGANCE LUXURY PERFORMANCE POWER PRECISION ELEGANCE
          </div>
      </div>

      {/* Editorial Section 1: Split Screen */}
      <div className="grid md:grid-cols-2 min-h-screen relative z-10">
        <div className="relative h-[60vh] md:h-auto overflow-hidden group">
            <motion.div style={{ y: y1, scale }} className="absolute inset-0 w-full h-[120%]">
                 <img 
                    src="https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=2937&auto=format&fit=crop" 
                    alt="Luxury Tech Lifestyle" 
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                />
            </motion.div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="flex flex-col justify-center p-12 md:p-24 relative z-10">
            <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '60px' }}
                transition={{ duration: 1 }}
                className="h-[2px] bg-brand-lime mb-8"
            />
            <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-brand-lime uppercase tracking-[0.3em] text-xs font-bold mb-6"
            >
                The Philosophy
            </motion.span>
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-serif font-light leading-tight mb-8"
            >
                Defined by <br />
                <span className="italic text-brand-lime font-serif">Details.</span>
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-gray-300 text-lg leading-relaxed font-light mb-8"
            >
                True luxury isn't just about appearance; it's about the seamless integration of technology into your life. 
                We believe your tools should be as ambitious as your dreams. Elevate your daily ritual.
            </motion.p>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <button className="flex items-center gap-2 text-brand-lime hover:text-white transition-colors uppercase tracking-widest text-xs font-bold group">
                    Explore Collection <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" size={16} />
                </button>
            </motion.div>
        </div>
      </div>

      {/* Editorial Section 2: Full Width Parallax with Gold Accent */}
      <div className="relative h-[80vh] w-full overflow-hidden flex items-center justify-center border-t border-brand-gold/10">
        <motion.div style={{ y: y2 }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
             <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2940&auto=format&fit=crop" 
                alt="Fashion and Tech" 
                className="w-full h-full object-cover brightness-[0.4] saturate-50"
            />
        </motion.div>
        <div className="relative z-10 text-center px-6 max-w-4xl backdrop-blur-sm p-10 rounded-3xl border border-white/5 bg-brand-deep/20">
             <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg"
            >
                "Create without <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-white">limits</span>."
            </motion.h2>
             <motion.div 
                initial={{ w: 0 }}
                whileInView={{ w: '120px' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-brand-lime to-brand-green mx-auto"
            />
        </div>
      </div>

      {/* Editorial Section 3: Motivation with Copper/Luxury Button */}
      <div className="container mx-auto px-6 py-32 relative">
        
        {/* Decorative Circle */}
        <div className="absolute top-20 right-20 w-64 h-64 border border-brand-lime/20 rounded-full animate-spin-slow pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
                <div className="absolute -inset-4 bg-brand-lime/10 rounded-lg blur-xl opacity-20 transform -rotate-3"></div>
                <motion.img 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=3001&auto=format&fit=crop"
                    className="w-full h-[600px] object-cover rounded-sm shadow-2xl relative z-10"
                    alt="Minimalist Setup"
                />
            </div>
            <div className="md:w-1/2 pb-12">
                 <motion.h3 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-serif mb-8 leading-tight"
                 >
                    For the <span className="text-brand-lime italic">Bold</span> & <br />
                    The <span className="text-brand-champagne">Relentless.</span>
                 </motion.h3>
                 <motion.p 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-gray-300 text-xl font-light leading-relaxed mb-10"
                 >
                    Moden Kate isn't just a brand; it's a statement. A commitment to quality that speaks before you do. 
                    Whether you are conquering the boardroom or exploring the unknown, carry technology that keeps up.
                 </motion.p>
                 <motion.button 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-brand-lime text-brand-deep px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-brand-deep transition-colors shadow-lg shadow-brand-lime/20"
                 >
                    Read Our Story
                 </motion.button>
            </div>
        </div>
      </div>

    </div>
  );
};