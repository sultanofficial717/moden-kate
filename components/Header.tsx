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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/10 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-xl shadow-2xl py-4'
          : 'bg-black/80 backdrop-blur-md py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="font-black text-2xl tracking-tight">
                <span className="text-white group-hover:text-gray-300 transition-colors">MODEN</span><span className="bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">KATE</span>
            </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-gray-300">
          <Link to="/" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-200 hover:after:w-full after:transition-all after:duration-300">Home</Link>
          <a href="#" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-200 hover:after:w-full after:transition-all after:duration-300">Shop</a>
          <a href="#" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-200 hover:after:w-full after:transition-all after:duration-300">Vibes</a>
          <Link to="/sustainability" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-200 hover:after:w-full after:transition-all after:duration-300">Sustainability</Link>
          <a href="#" className="hover:text-white transition-all duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:to-yellow-200 hover:after:w-full after:transition-all after:duration-300">Support</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5 text-white">
          <button className="hover:text-brand-lime transition-colors">
            <Search size={22} />
          </button>
          
          {user ? (
            <div className="relative group">
                <button className="flex items-center gap-1 hover:text-brand-lime transition-colors">
                    <User size={22} className="text-brand-lime" />
                    <span className="text-xs font-bold hidden sm:block text-white">{user.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-32 bg-white border-4 border-black shadow-[6px_6px_0px_#000] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm font-bold hover:bg-brand-lime hover:text-black text-red-600">
                        Logout
                    </button>
                </div>
            </div>
          ) : (
             <button onClick={() => navigate('/checkout')} className="hover:text-brand-lime transition-colors">
                <User size={22} />
             </button>
          )}

          <Link to="/checkout" className="relative hover:text-white transition-colors group">
            <ShoppingBag size={22} />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-200 text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-yellow-400/50">
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