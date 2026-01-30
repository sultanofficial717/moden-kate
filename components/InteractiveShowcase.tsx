import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WATCH_FACES, SPEAKER_COLORS } from '../constants';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const InteractiveShowcase: React.FC = () => {
  const [activeFaceIndex, setActiveFaceIndex] = useState(0);
  const [activeColor, setActiveColor] = useState(SPEAKER_COLORS[0]);

  const nextFace = () => setActiveFaceIndex((prev) => (prev + 1) % WATCH_FACES.length);
  const prevFace = () => setActiveFaceIndex((prev) => (prev - 1 + WATCH_FACES.length) % WATCH_FACES.length);

  return (
    <div className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section 1: Watch Faces */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1">
             <div className="relative w-80 h-80 mx-auto md:w-96 md:h-96 rounded-full border-[12px] border-gray-800 bg-black shadow-2xl flex items-center justify-center overflow-hidden">
                {/* Watch Strap simulation */}
                <div className="absolute -top-24 w-40 h-24 bg-gray-800 rounded-b-xl z-0"></div>
                <div className="absolute -bottom-24 w-40 h-24 bg-gray-800 rounded-t-xl z-0"></div>

                <AnimatePresence mode='wait'>
                    <motion.img
                        key={WATCH_FACES[activeFaceIndex].id}
                        src={WATCH_FACES[activeFaceIndex].imageUrl}
                        alt={WATCH_FACES[activeFaceIndex].name}
                        className="w-full h-full object-cover relative z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.4 }}
                    />
                </AnimatePresence>
                
                {/* Watch Controls Overlay */}
                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 z-20 pointer-events-none">
                     <button onClick={prevFace} className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 pointer-events-auto transition-colors text-white">
                         <ChevronLeft size={24} />
                     </button>
                     <button onClick={nextFace} className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 pointer-events-auto transition-colors text-white">
                         <ChevronRight size={24} />
                     </button>
                 </div>
             </div>
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <span className="text-brand-green font-bold tracking-widest uppercase">Customization</span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">MSW-002 Ultimate</h2>
            <p className="text-gray-600 text-lg">
                Match your mood with over 90+ cloud-based watch faces. From classic mechanical designs to futuristic digital interfaces.
            </p>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
                {WATCH_FACES.map((face, idx) => (
                    <button 
                        key={face.id}
                        onClick={() => setActiveFaceIndex(idx)}
                        className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeFaceIndex === idx ? 'border-brand-green scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                        <img src={face.imageUrl} alt={face.name} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
          </div>
        </div>

        {/* Section 2: Speaker Color Swatch */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                <span className="text-brand-accent font-bold tracking-widest uppercase">Style Your Sound</span>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-dark">Vibe Wireless Speaker</h2>
                <p className="text-gray-600 text-lg">
                    Choose the color that fits your room. Premium fabric finish available in 5 exclusive colors.
                </p>
                
                <div className="flex flex-wrap gap-4 mt-8">
                    {SPEAKER_COLORS.map((color) => (
                        <button
                            key={color.name}
                            onClick={() => setActiveColor(color)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform ${activeColor.name === color.name ? 'scale-125 shadow-xl ring-2 ring-offset-2 ring-gray-300' : 'hover:scale-110'}`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                        >
                            {activeColor.name === color.name && (
                                <Check size={20} className={color.name === 'Clean White' ? 'text-black' : 'text-white'} />
                            )}
                        </button>
                    ))}
                </div>
                <div className="pt-6">
                    <p className="font-semibold text-brand-dark">Selected: <span style={{ color: activeColor.hex }}>{activeColor.name}</span></p>
                </div>
            </div>

            <div className="relative h-[500px] w-full bg-white rounded-[3rem] shadow-xl overflow-hidden flex items-center justify-center border border-gray-100">
                <motion.div
                    key={activeColor.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                >
                     {/* Simulating changing product color using CSS blend modes or just an overlay tint for this demo since we lack real colored assets */}
                     <img 
                        src="https://picsum.photos/id/1/600/600" 
                        alt="Speaker" 
                        className="w-full h-full object-cover"
                     />
                     <div 
                        className="absolute inset-0 mix-blend-multiply opacity-60 transition-colors duration-500"
                        style={{ backgroundColor: activeColor.hex }}
                     />
                     <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg">
                         <p className="font-bold text-gray-900">High Fidelity</p>
                         <p className="text-xs text-gray-500">360° Sound</p>
                     </div>
                </motion.div>
            </div>
        </div>

      </div>
    </div>
  );
};
