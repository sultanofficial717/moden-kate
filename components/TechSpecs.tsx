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
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 text-gray-900 overflow-hidden relative border-y border-gray-100">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
            
            <div className="w-full md:w-1/3">
                <span className="text-brand-lime font-mono text-xs tracking-widest uppercase mb-4 block">
                    Technical Specifications
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                    Engineered for <br/>
                    <span className="text-brand-lime">Excellence</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 font-light">
                    Every Moden Kate product is built with precision engineering. We don't just sell accessories; we deliver reliable power and pristine audio performance wrapped in sustainable materials.
                </p>
                <button className="text-brand-lime font-semibold border-b-2 border-brand-lime pb-1 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide">
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
                        className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:bg-brand-lime hover:border-brand-lime transition-all group duration-300 hover:-translate-y-1 shadow-lg"
                    >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-brand-lime/20 group-hover:bg-black transition-colors duration-300">
                            <spec.icon size={24} className="text-brand-lime group-hover:text-brand-lime transition-colors duration-300" />
                        </div>
                        <h3 className="font-bold text-lg mb-1 text-white group-hover:text-black">{spec.title}</h3>
                        <p className="text-sm text-gray-400 group-hover:text-black">{spec.desc}</p>
                    </motion.div>
                ))}
            </div>

        </div>
      </div>
    </section>
  );
};
