import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, user, logout } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className={`font-bold text-2xl tracking-tighter ${isScrolled ? 'text-brand-dark' : 'text-brand-dark'}`}>
                MODEN<span className="text-brand-green">KATE</span>
            </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-brand-green transition-colors">Home</Link>
          <a href="#" className="hover:text-brand-green transition-colors">Smart Watches</a>
          <a href="#" className="hover:text-brand-green transition-colors">Audio</a>
          <a href="#" className="hover:text-brand-green transition-colors">Charging</a>
          <a href="#" className="hover:text-brand-green transition-colors">Support</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-gray-700">
          <button className="hover:text-brand-green transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="relative group">
                <button className="flex items-center gap-1 hover:text-brand-green transition-colors">
                    <User size={20} className="text-brand-green" />
                    <span className="text-xs font-bold hidden sm:block">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500">
                        Logout
                    </button>
                </div>
            </div>
          ) : (
             <button onClick={() => navigate('/checkout')} className="hover:text-brand-green transition-colors">
                <User size={20} />
             </button>
          )}

          <Link to="/checkout" className="relative hover:text-brand-green transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-lime text-brand-deep text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                {cartCount}
                </span>
            )}
          </Link>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};