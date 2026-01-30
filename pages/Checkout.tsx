import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Truck, CreditCard, CheckCircle, ArrowRight, User as UserIcon, Mail, Ticket, X, ShieldCheck, Zap, Award, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { validatePromoCode } from '../api/promoCodes';
import { createOrder } from '../api/orders';

export const Checkout: React.FC = () => {
  const { user, login, cart, cartTotal, clearCart, promoCodes } = useStore();
  const navigate = useNavigate();
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Checkout Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    phone: '',
    paymentMethod: 'cod'
  });

  // Promo Code State
  const [promoInput, setPromoInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      login(loginEmail, loginEmail.split('@')[0]);
    }
  };

  const executePromoApply = async (code: string) => {
    const promo = await validatePromoCode(code);
    
    if (!promo) {
      setPromoMessage({ text: 'Invalid or expired promo code', type: 'error' });
      setAppliedDiscount(0);
      return;
    }

    // Calculate percentage discount
    const discountAmount = Math.floor((cartTotal * promo.percentageDiscount) / 100);
    setAppliedDiscount(discountAmount);
    setPromoMessage({ text: `Code '${code}' Applied! ${promo.percentageDiscount}% off`, type: 'success' });
    setPromoInput(code);
  };

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) return;
    executePromoApply(code);
  };

  const removePromo = () => {
    setPromoInput('');
    setAppliedDiscount(0);
    setPromoMessage(null);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.phone) {
      alert('Please fill in your delivery details.');
      return;
    }
    
    const confirm = window.confirm(`Order Total: Rs. ${finalTotal}\n\nConfirm order for ${user?.name}?`);
    if (confirm) {
      // Prepare order data
      const orderData = {
        guest_info: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: user?.email || '',
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          phone: formData.phone,
        },
        subtotal: cartTotal,
        delivery_charge: deliveryCharge,
        discount_amount: appliedDiscount,
        promo_code: promoInput || undefined,
        total_amount: finalTotal,
        payment_method: formData.paymentMethod,
      };

      const orderItems = cart.map(item => ({
        product_id: item.id,
        product_name: item.name,
        product_image: item.image,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      // Save order to database
      const order = await createOrder(orderData, orderItems);
      
      if (order) {
        clearCart();
        navigate('/');
        alert('Order Placed Successfully! You will receive an SMS shortly.');
      } else {
        alert('Failed to place order. Please try again.');
      }
    }
  };

  const deliveryCharge = 200;
  const finalTotal = Math.max(0, cartTotal + deliveryCharge - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-deep mb-4">Your cart is empty</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-brand-lime text-brand-deep px-8 py-3 rounded-full font-bold hover:bg-brand-deep hover:text-white transition-colors shadow-lg shadow-brand-lime/20"
          >
            Go Shopping
          </button>
        </div>
      </div>
    );
  }

  // LOGIN VIEW
  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-white flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-champagne/20 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Login Box - Reverted to Dark Theme */}
        <div className="bg-brand-deep rounded-3xl shadow-2xl border border-gray-100 overflow-hidden max-w-4xl w-full grid md:grid-cols-2 relative z-10">
          
          <div className="bg-brand-dark/20 p-10 flex flex-col justify-center relative border-r border-white/5">
             <div className="relative z-10 text-white">
                <h2 className="text-3xl font-serif text-brand-champagne mb-4">Welcome Back</h2>
                <p className="text-gray-300 mb-8 font-light">Sign in to access your saved addresses and exclusive offers.</p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime flex-shrink-0"><ShieldCheck size={20} /></div>
                        <span>Bank-Grade Security</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime flex-shrink-0"><Award size={20} /></div>
                        <span>6 Month Warranty on all Products</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime flex-shrink-0"><FileCheck size={20} /></div>
                        <span>Easy Warranty Claim Process</span>
                    </div>
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-full bg-brand-lime/20 flex items-center justify-center text-brand-lime flex-shrink-0"><Zap size={20} /></div>
                        <span>Instant Checkout</span>
                    </div>
                </div>
             </div>
          </div>

          <div className="p-10 bg-brand-deep">
            <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="email" 
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-brand-dark/40 border border-white/10 rounded-xl focus:border-brand-lime text-white outline-none transition-all placeholder-gray-500"
                      placeholder="you@example.com"
                    />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="password" 
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-brand-dark/40 border border-white/10 rounded-xl focus:border-brand-lime text-white outline-none transition-all placeholder-gray-500"
                      placeholder="••••••••"
                    />
                </div>
              </div>
              
              <button type="submit" className="w-full bg-brand-lime text-brand-deep py-3 rounded-xl font-bold hover:bg-white transition-colors shadow-lg shadow-brand-lime/20 flex items-center justify-center gap-2">
                Secure Login <ArrowRight size={18} />
              </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-400">
                <p>Don't have an account? <span className="text-brand-lime font-bold cursor-pointer hover:underline">Sign Up</span></p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // CHECKOUT VIEW
  return (
    <div className="min-h-screen pt-24 pb-12 bg-white text-gray-900">
      <div className="container mx-auto px-6">
        
        <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
            <span className="text-brand-deep">Cart</span>
            <span>/</span>
            <span className="font-semibold text-brand-lime">Secure Checkout</span>
        </div>

        <h1 className="text-3xl font-serif text-brand-deep mb-8 flex items-center gap-3">
            Checkout <Lock className="text-brand-lime" size={24} />
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column: Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address - Reverted to Dark Box */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-brand-deep p-8 rounded-3xl border border-gray-100 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-2 bg-brand-lime/10 rounded-lg text-brand-lime"><Truck size={24} /></div>
                <h2 className="text-xl font-bold text-white">Shipping Details</h2>
              </div>
              
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">First Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full p-3 bg-brand-dark/40 rounded-xl border border-white/10 focus:border-brand-lime text-white outline-none transition-colors placeholder-gray-500"
                    placeholder="John" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">Last Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full p-3 bg-brand-dark/40 rounded-xl border border-white/10 focus:border-brand-lime text-white outline-none transition-colors placeholder-gray-500"
                    placeholder="Doe" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">Street Address</label>
                  <input 
                    type="text" 
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full p-3 bg-brand-dark/40 rounded-xl border border-white/10 focus:border-brand-lime text-white outline-none transition-colors placeholder-gray-500"
                    placeholder="House No, Street, Area" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">City</label>
                  <input 
                    type="text" 
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full p-3 bg-brand-dark/40 rounded-xl border border-white/10 focus:border-brand-lime text-white outline-none transition-colors placeholder-gray-500"
                    placeholder="Karachi" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                    className="w-full p-3 bg-brand-dark/40 rounded-xl border border-white/10 focus:border-brand-lime text-white outline-none transition-colors placeholder-gray-500"
                    placeholder="75500" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-brand-champagne/70 uppercase mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-3 bg-brand-dark/40 rounded-xl border border-white/10 focus:border-brand-lime text-white outline-none transition-colors placeholder-gray-500"
                    placeholder="0300-1234567" 
                  />
                </div>
              </form>
            </motion.div>

            {/* Payment Method - Reverted to Dark Box */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-brand-deep p-8 rounded-3xl border border-gray-100 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                <div className="p-2 bg-brand-lime/10 rounded-lg text-brand-lime"><CreditCard size={24} /></div>
                <h2 className="text-xl font-bold text-white">Payment</h2>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-5 border border-brand-green bg-brand-green/10 rounded-xl cursor-pointer hover:bg-brand-green/20 transition-colors">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked readOnly className="accent-brand-lime w-5 h-5" />
                    <span className="font-semibold text-white">Cash on Delivery</span>
                  </div>
                  <span className="text-xs font-bold bg-brand-lime text-brand-deep px-3 py-1 rounded-full">Fee: Rs. 0</span>
                </label>
                
                <label className="flex items-center justify-between p-5 border border-white/5 bg-white/5 rounded-xl opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" disabled className="w-5 h-5" />
                    <span className="font-medium text-gray-400">Credit/Debit Card (Coming Soon)</span>
                  </div>
                </label>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Order Summary - Kept Dark (Already correct) */}
          <div className="lg:col-span-1">
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-brand-deep text-white rounded-3xl border border-brand-lime/30 p-6 sticky top-28 shadow-2xl"
            >
              <h3 className="text-lg font-bold text-brand-lime mb-6 font-serif">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-white line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-brand-champagne/60">{item.quantity} x Rs. {item.price}</p>
                        </div>
                        <div className="text-sm font-bold text-white">
                            Rs. {item.quantity * item.price}
                        </div>
                    </div>
                ))}
              </div>

              {/* Promo Code Input Section */}
              <div className="mb-6 pt-4 border-t border-white/10">
                <label className="text-xs font-bold text-brand-lime uppercase mb-3 flex items-center gap-2">
                    <Ticket size={14} /> Promo Code
                </label>

                <div className="flex gap-2">
                    <div className="relative flex-grow">
                        <input 
                            type="text" 
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            disabled={appliedDiscount > 0}
                            placeholder="Enter Code"
                            className="w-full pl-4 pr-3 py-2.5 bg-brand-dark/40 border border-brand-lime/30 rounded-lg text-sm focus:border-brand-lime outline-none uppercase text-white placeholder-gray-400"
                        />
                    </div>
                    {appliedDiscount > 0 ? (
                        <button onClick={removePromo} className="bg-red-500/20 text-red-400 border border-red-500/50 px-3 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
                            <X size={18} />
                        </button>
                    ) : (
                        <button onClick={handleApplyPromo} className="bg-brand-lime text-brand-deep px-4 py-2 rounded-lg text-sm font-bold hover:bg-white transition-colors">
                            Apply
                        </button>
                    )}
                </div>
                <AnimatePresence>
                    {promoMessage && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`text-xs mt-3 p-2 rounded border ${promoMessage.type === 'success' ? 'bg-green-900/40 text-green-400 border-green-500/30' : 'bg-red-900/40 text-red-400 border-red-500/30'}`}
                        >
                            {promoMessage.text}
                        </motion.div>
                    )}
                </AnimatePresence>
              </div>

              <div className="space-y-3 pt-2 mb-6 text-sm">
                <div className="flex justify-between text-brand-champagne">
                    <span>Subtotal</span>
                    <span>Rs. {cartTotal}</span>
                </div>
                <div className="flex justify-between text-brand-champagne">
                    <span>Delivery</span>
                    <span className="text-brand-lime">+ Rs. {deliveryCharge}</span>
                </div>
                {appliedDiscount > 0 && (
                    <div className="flex justify-between text-brand-lime">
                        <span>Discount Applied</span>
                        <span className="font-bold">- Rs. {appliedDiscount}</span>
                    </div>
                )}
                <div className="flex justify-between text-xl font-bold text-white pt-4 border-t border-white/10 mt-2">
                    <span>Total</span>
                    <span>Rs. {finalTotal}</span>
                </div>
              </div>

              <button 
                form="checkout-form" 
                type="submit"
                className="w-full bg-brand-lime text-brand-deep py-4 rounded-xl font-bold shadow-lg shadow-brand-lime/30 hover:bg-white hover:shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-2 group"
              >
                Place Order <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-brand-champagne/40">
                <Lock size={12} /> SSL Encrypted Transaction
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};