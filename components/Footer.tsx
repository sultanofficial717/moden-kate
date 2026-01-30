import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6">MODEN<span className="text-brand-lime">KATE</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering your digital life with sustainable, high-performance tech accessories. Designed for the modern world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-lime hover:text-brand-deep transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-lime hover:text-brand-deep transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-lime hover:text-brand-deep transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Shop</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-lime transition-colors">Smart Watches</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Wireless Audio</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Power Banks</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Car Accessories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-brand-lime transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Warranty Policy</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-brand-lime transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and new arrivals.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-lime focus:text-white"
              />
              <button className="bg-brand-lime text-brand-deep px-4 py-2 rounded-r-lg hover:bg-white transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 Moden Kate. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 items-center">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <Link to="/admin" className="hover:text-white transition-colors bg-white/5 px-3 py-1 rounded-full border border-white/5">
                Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};