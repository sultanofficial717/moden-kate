import React from 'react';
import { Hero } from '../components/Hero';
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
        <Hero />
        
        <CategoryGrid />
        
        {/* Featured Products Section */}
        <section className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-brand-green font-bold uppercase tracking-wider text-sm">Best Selling</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">Latest Drops</h2>
                    </div>
                    <button onClick={() => navigate('/checkout')} className="hidden md:block border border-brand-deep text-brand-deep px-6 py-2 rounded-full hover:bg-brand-lime hover:text-brand-deep hover:border-brand-lime transition-all font-medium">
                        Shop All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                
                <div className="mt-12 text-center md:hidden">
                    <button onClick={() => navigate('/checkout')} className="border border-brand-deep text-brand-deep px-6 py-2 rounded-full hover:bg-brand-lime hover:text-brand-deep hover:border-brand-lime transition-all font-medium w-full">
                        Shop All
                    </button>
                </div>
            </div>
        </section>

        {/* New Luxury Lifestyle Section */}
        <LifestyleSection />

        <InteractiveShowcase />
        
        <UnboxingScroll />

        <TechSpecs />
        
        {/* CTA Section */}
        <section className="py-24 bg-brand-green relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
            <div className="container mx-auto px-6 text-center relative z-10 text-white">
                <h2 className="text-4xl md:text-6xl font-serif mb-6">Upgrade Your Lifestyle</h2>
                <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90 font-light">
                    Join thousands of happy customers using Moden Kate for their daily power and audio needs.
                </p>
                <button 
                  onClick={() => navigate('/checkout')} 
                  className="bg-brand-lime text-brand-deep px-12 py-4 rounded-full font-bold text-lg shadow-2xl shadow-brand-lime/20 hover:bg-white hover:text-brand-deep transition-all transform hover:scale-105"
                >
                    Start Shopping
                </button>
            </div>
        </section>
    </>
  );
};