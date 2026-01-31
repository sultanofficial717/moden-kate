import React from 'react';
import { VideoHero } from '../components/VideoHero';
import { TrustBar } from '../components/TrustBar';
import { MarqueeGallery } from '../components/MarqueeGallery';
import { CategoryGrid } from '../components/CategoryGrid';
import { ProductCard } from '../components/ProductCard';
import { InteractiveShowcase } from '../components/InteractiveShowcase';
import { TechSpecs } from '../components/TechSpecs';
import { UnboxingScroll } from '../components/UnboxingScroll';
import { LifestyleSection } from '../components/LifestyleSection';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useStore();

  return (
    <>
        {/* Hero - The Promise: "Luxury With No Cost" */}
        <VideoHero />
        
        {/* Trust Bar - Building Credibility */}
        <TrustBar />
        
        {/* Transition Section - Value Proposition */}
        <section className="py-16 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden border-b border-white/5">
            <div className="container mx-auto px-6 text-center">
                <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed">
                    Why should luxury be for trust fund kids only? Nah. <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 font-semibold">Premium tech accessories that look AND feel expensive</span>, because you deserve to live your best life without choosing between rent and looking iconic.
                </p>
            </div>
        </section>
        
        {/* Category Discovery */}
        <CategoryGrid />
        
        {/* Featured Products - The Collection */}
        <section className="py-32 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-yellow-500/5 via-transparent to-transparent opacity-50"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent font-bold uppercase tracking-[0.3em] text-xs mb-4">✦ Curated Collection</span>
                    <h2 className="text-5xl md:text-6xl font-black text-white mt-2 tracking-tight mb-6">Featured Luxury</h2>
                    <p className="text-gray-300 text-lg md:text-xl font-light max-w-2xl mx-auto">
                        Handpicked premium accessories that blend sophistication with innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                <div className="text-center">
                    <button onClick={() => navigate('/checkout')} className="bg-white text-black px-14 py-5 font-bold text-lg tracking-wide hover:bg-brand-lime transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-brand-lime/20 hover:scale-105 rounded-full hover:-translate-y-1">
                        Explore Full Collection
                    </button>
                </div>
            </div>
        </section>

        {/* Lifestyle - The Experience */}
        <LifestyleSection />

        {/* Social Proof - Community */}
        <MarqueeGallery />

        {/* Interactive Product Showcase */}
        <InteractiveShowcase />
        
        {/* The Details Matter */}
        <TechSpecs />

        {/* Unboxing Experience */}
        <UnboxingScroll />

        {/* Value Reinforcement Section */}
        <section className="py-24 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden border-y border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4">10K+</h3>
                        <p className="text-gray-300 text-lg font-light">Happy Customers</p>
                        <p className="text-gray-500 text-sm mt-2">Worldwide</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4">Premium</h3>
                        <p className="text-gray-300 text-lg font-light">Quality Guaranteed</p>
                        <p className="text-gray-500 text-sm mt-2">No Compromise</p>
                    </div>
                    <div>
                        <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4">Free</h3>
                        <p className="text-gray-300 text-lg font-light">Shipping Over $50</p>
                        <p className="text-gray-500 text-sm mt-2">No Hidden Fees</p>
                    </div>
                </div>
            </div>
        </section>
        
        {/* Final CTA - The Invitation */}
        <section className="py-40 bg-gradient-to-br from-black via-zinc-950 to-black relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-radial from-yellow-500/10 via-transparent to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full" style={{backgroundImage: 'radial-gradient(circle, rgba(255,215,0,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent font-bold uppercase text-sm tracking-[0.3em] mb-8">✦ Join The Movement</span>
                <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
                    Experience Luxury<br/>Without The Price Tag
                </h2>
                <p className="text-xl md:text-2xl mb-14 max-w-3xl mx-auto text-gray-300 font-light leading-relaxed">
                    Join our exclusive community of over 10,000 members who've discovered that premium quality doesn't have to come with a premium price.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button 
                      onClick={() => navigate('/checkout')} 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-black px-14 py-5 font-bold text-lg tracking-wide shadow-2xl hover:shadow-yellow-400/50 transition-all duration-300 hover:scale-105 rounded-full hover:-translate-y-1"
                    >
                        Start Shopping
                    </button>
                    <button className="bg-transparent border-2 border-white/50 text-white px-14 py-5 font-bold text-lg tracking-wide backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300 rounded-full hover:scale-105 hover:-translate-y-1">
                        Learn More
                    </button>
                </div>
            </div>
        </section>
    </>
  );
};