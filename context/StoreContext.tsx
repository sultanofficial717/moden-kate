import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, PromoCode } from '../types';
import { fetchProducts, createProduct as apiCreateProduct, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct } from '../api/products';
import { fetchPromoCodes, createPromoCode as apiCreatePromoCode, deletePromoCode as apiDeletePromoCode } from '../api/promoCodes';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // --- LOAD DATA FROM DATABASE ---
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Load products from database
        const productsData = await fetchProducts();
        if (!productsData || productsData.length === 0) {
          console.warn('No products loaded from database');
        }
        setProducts(productsData);
        
        // Load promo codes from database
        const promosData = await fetchPromoCodes();
        setPromoCodes(promosData);
        
        setError(null);
        setRetryCount(0);
      } catch (err) {
        console.error('Failed to load data:', err);
        const errorMessage = 'Failed to connect to server. Please check if backend is running on http://localhost:5000';
        setError(errorMessage);
        
        // Auto-retry up to 3 times with exponential backoff
        if (retryCount < 3) {
          const delay = Math.min(1000 * Math.pow(2, retryCount), 10000);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, delay);
        }
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [retryCount]);

  // --- PERSISTENCE ---
  useEffect(() => {
    const savedCart = localStorage.getItem('moden_kate_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    const savedUser = localStorage.getItem('moden_kate_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('moden_kate_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) localStorage.setItem('moden_kate_user', JSON.stringify(user));
    else localStorage.removeItem('moden_kate_user');
  }, [user]);

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

  // --- ADMIN LOGIN (using backend authentication) ---
  const adminLogin = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Login failed');
        return false;
      }

      const data = await response.json();
      // Store token in localStorage
      localStorage.setItem('admin_token', data.token);
      localStorage.setItem('admin_user', JSON.stringify(data.user));
      setIsAdminLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to connect to server. Please check if backend is running.');
      return false;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    setIsAdminLoggedIn(false);
  };

  const addProduct = async (p: Product) => {
    const token = localStorage.getItem('admin_token');
    const newProduct = await apiCreateProduct(p, token);
    if (newProduct) {
      setProducts(prev => [newProduct, ...prev]);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    const token = localStorage.getItem('admin_token');
    const updated = await apiUpdateProduct(updatedProduct.id, updatedProduct, token);
    if (updated) {
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    }
  };

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem('admin_token');
    const success = await apiDeleteProduct(id, token);
    if (success) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const addPromoCode = async (code: PromoCode) => {
    const newPromo = await apiCreatePromoCode(code);
    if (newPromo) {
      setPromoCodes(prev => [...prev, newPromo]);
    }
  };

  const removePromoCode = async (codeStr: string) => {
    const success = await apiDeletePromoCode(codeStr);
    if (success) {
      setPromoCodes(prev => prev.filter(c => c.code !== codeStr));
    }
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Show loading or error states
  if (loading && products.length === 0) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Loading store data...</p>
      </div>
    );
  }

  return (
    <StoreContext.Provider value={{ 
      cart, user, products, promoCodes,
      addToCart, removeFromCart, updateQuantity, clearCart, 
      login, logout, 
      cartTotal, cartCount,
      isAdminLoggedIn, adminLogin, adminLogout,
      addProduct, updateProduct, deleteProduct,
      addPromoCode, removePromoCode,
      error,
      loading
    }}>
      {error && (
        <div style={{ 
          padding: '1rem', 
          background: '#fee', 
          color: '#c00', 
          textAlign: 'center',
          borderBottom: '1px solid #fcc'
        }}>
          ⚠️ {error}
          <button 
            onClick={() => setRetryCount(0)}
            style={{ marginLeft: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
          >
            Retry Connection
          </button>
        </div>
      )}
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
