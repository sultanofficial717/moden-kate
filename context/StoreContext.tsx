import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, PromoCode } from '../types';
import { FEATURED_PRODUCTS } from '../constants';

interface CartItem extends Product {
  quantity: number;
}

interface User {
  email: string;
  name: string;
}

interface StoreContextType {
  // Shop Data
  products: Product[];
  cart: CartItem[];
  user: User | null;
  promoCodes: PromoCode[];
  
  // Shop Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  login: (email: string, name: string) => void;
  logout: () => void;
  cartTotal: number;
  cartCount: number;

  // Admin Data & Actions
  isAdminLoggedIn: boolean;
  adminLogin: (u: string, p: string) => boolean;
  adminLogout: () => void;
  addProduct: (p: Product) => void;
  updateProduct: (p: Product) => void;
  deleteProduct: (id: string) => void;
  addPromoCode: (code: PromoCode) => void;
  removePromoCode: (codeStr: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- STATE ---
  const [products, setProducts] = useState<Product[]>(FEATURED_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    { code: 'WELCOME50', discountAmount: 50, expiryDate: '2025-12-31' },
    { code: 'KATE200', discountAmount: 200, expiryDate: '2025-12-31' }
  ]);

  // --- PERSISTENCE ---
  useEffect(() => {
    const savedCart = localStorage.getItem('moden_kate_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedUser = localStorage.getItem('moden_kate_user');
    if (savedUser) setUser(JSON.parse(savedUser));

    // In a real app, products would come from DB. Here we check if we have modified ones saved.
    const savedProducts = localStorage.getItem('moden_kate_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));

    const savedPromos = localStorage.getItem('moden_kate_promos');
    if (savedPromos) setPromoCodes(JSON.parse(savedPromos));
  }, []);

  useEffect(() => {
    localStorage.setItem('moden_kate_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('moden_kate_user', JSON.stringify(user));
    else localStorage.removeItem('moden_kate_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('moden_kate_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('moden_kate_promos', JSON.stringify(promoCodes));
  }, [promoCodes]);

  // --- CART ACTIONS ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => setCart([]);

  // --- USER AUTH ---
  const login = (email: string, name: string) => {
    setUser({ email, name });
  };

  const logout = () => {
    setUser(null);
  };

  // --- ADMIN ACTIONS ---
  const adminLogin = (u: string, p: string) => {
    if (u === 'boss919' && p === 'kate123') {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => setIsAdminLoggedIn(false);

  const addProduct = (p: Product) => {
    setProducts(prev => [p, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addPromoCode = (code: PromoCode) => {
    setPromoCodes(prev => [...prev, code]);
  };

  const removePromoCode = (codeStr: string) => {
    setPromoCodes(prev => prev.filter(c => c.code !== codeStr));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <StoreContext.Provider value={{ 
      cart, user, products, promoCodes,
      addToCart, removeFromCart, updateQuantity, clearCart, 
      login, logout, 
      cartTotal, cartCount,
      isAdminLoggedIn, adminLogin, adminLogout,
      addProduct, updateProduct, deleteProduct,
      addPromoCode, removePromoCode
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
