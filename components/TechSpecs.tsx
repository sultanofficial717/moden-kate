import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Zap, Smartphone, Wifi, ShieldCheck, Bluetooth } from 'lucide-react';

const specs = [
  { icon: Battery, title: "Long Battery", desc: "Up to 30h playtime" },
  { icon: Zap, title: "PD 100W", desc: "Ultra fast charging" },
  { icon: Smartphone, title: "Universal", desc: "iOS & Android" },
  { icon: Wifi, title: "IoT Ready", desc: "Smart connect" },
  { icon: ShieldCheck, title: "Multi-Protect", desc: "Safety first" },
  { icon: Bluetooth, title: "BT 5.3", desc: "Low latency" },
];

export const TechSpecs: React.FC = () => {
  return (
    <section className="py-24 bg-brand-deep text-white overflow-hidden relative">
      
      {/* Decorative Neon Lime Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-lime/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
            
            <div className="w-full md:w-1/3">
                <span className="text-brand-lime font-mono text-xs tracking-widest uppercase mb-4 block">
                    Technical Specifications
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                    Engineered for <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-lime to-brand-green">Excellence</span>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-8 font-light">
                    Every Moden Kate product is built with precision engineering. We don't just sell accessories; we deliver reliable power and pristine audio performance wrapped in sustainable materials.
                </p>
                <button className="text-brand-lime font-semibold border-b border-brand-lime pb-1 hover:text-white transition-colors text-sm uppercase tracking-wide">
                    View Full Datasheet
                </button>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6">
                {specs.map((spec, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-white/5 backdrop-blur-sm border border-brand-lime/20 p-6 rounded-2xl hover:bg-brand-lime/10 hover:border-brand-lime/50 transition-all group duration-300 hover:-translate-y-1"
                    >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-brand-lime/10 group-hover:bg-brand-lime transition-colors duration-300">
                            <spec.icon size={24} className="text-brand-lime group-hover:text-brand-deep transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-white">{spec.title}</h3>
                        <p className="text-sm text-gray-400 group-hover:text-gray-200">{spec.desc}</p>
                    </motion.div>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
};
