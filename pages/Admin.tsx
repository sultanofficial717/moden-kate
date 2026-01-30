import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Lock, Plus, Trash2, Edit2, Search, Save, X, Ticket, Package, Database, Copy, Check, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';

export const Admin: React.FC = () => {
  const { 
    isAdminLoggedIn, adminLogin, adminLogout, 
    products, addProduct, updateProduct, deleteProduct,
    promoCodes, addPromoCode, removePromoCode 
  } = useStore();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'inventory' | 'promos' | 'database'>('inventory');
  const [copied, setCopied] = useState(false);

  // Inventory State
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({});
  const [productImages, setProductImages] = useState<string[]>([]);

  // Promo State
  const [promoForm, setPromoForm] = useState({ code: '', discountAmount: 0, expiryDate: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminLogin(username, password)) {
      alert('Invalid Credentials');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = async () => {
    if (!productForm.name || !productForm.price) return;
    
    // Filter out empty image URLs
    const imageUrls = productImages.filter(img => img?.trim());
    
    if (imageUrls.length === 0) {
      alert('Please add at least one product image');
      return;
    }
    
    const productData = {
      name: productForm.name,
      category: productForm.category || 'Uncategorized',
      price: productForm.price,
      image: imageUrls[0], // Primary image is the first one
      images: imageUrls,
      badge: productForm.badge || null,
      specs: productForm.specs || [],
      colors: productForm.colors || [],
      description: productForm.description || '',
      stock_quantity: 100,
      is_active: true,
    };

    try {
      if (isEditing) {
        await updateProduct({ ...productData, id: isEditing.id } as Product);
        alert('Product updated successfully!');
      } else {
        await addProduct(productData as Product);
        alert('Product created successfully!');
      }
      closeProductModal();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please check console for details.');
    }
  };

  const closeProductModal = () => {
    setIsEditing(null);
    setIsAdding(false);
    setProductForm({});
    setProductImages([]);
  };

  const openEdit = (p: Product) => {
    setIsEditing(p);
    setProductForm(p);
    setProductImages(p.images || [p.image]);
  };

  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const percentage = Number(promoForm.discountAmount);
    
    // Validate percentage is between 1-100
    if (!promoForm.code || percentage < 1 || percentage > 100 || !promoForm.expiryDate) {
      alert('Please enter a valid promo code and discount percentage (1-100)');
      return;
    }
    
    try {
      await addPromoCode({
        code: promoForm.code.toUpperCase(),
        percentageDiscount: percentage,
        expiryDate: promoForm.expiryDate
      });
      setPromoForm({ code: '', discountAmount: 0, expiryDate: '' });
      alert('Promo code created successfully!');
    } catch (error) {
      console.error('Error creating promo code:', error);
      alert('Failed to create promo code. Please check console for details.');
    }
  };

  const copySchema = () => {
    const schema = `-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    badge VARCHAR(50),
    specs TEXT[],
    description TEXT,
    stock_quantity INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    guest_info JSONB,
    total_amount INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`;
    navigator.clipboard.writeText(schema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Admin Access</h2>
            <p className="text-gray-500">Please verify your identity.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-brand-green outline-none"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:border-brand-green outline-none"
            />
            <button className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
            <p className="text-gray-500">Manage your inventory, promotions, and data</p>
          </div>
          <button onClick={adminLogout} className="px-6 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors">
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`pb-4 px-4 font-medium transition-colors relative whitespace-nowrap ${activeTab === 'inventory' ? 'text-brand-green' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="flex items-center gap-2"><Package size={18} /> Inventory</div>
            {activeTab === 'inventory' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />}
          </button>
          <button 
            onClick={() => setActiveTab('promos')}
            className={`pb-4 px-4 font-medium transition-colors relative whitespace-nowrap ${activeTab === 'promos' ? 'text-brand-green' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="flex items-center gap-2"><Ticket size={18} /> Promo Codes</div>
            {activeTab === 'promos' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />}
          </button>
          <button 
            onClick={() => setActiveTab('database')}
            className={`pb-4 px-4 font-medium transition-colors relative whitespace-nowrap ${activeTab === 'database' ? 'text-brand-green' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <div className="flex items-center gap-2"><Database size={18} /> Database Setup</div>
            {activeTab === 'database' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green" />}
          </button>
        </div>

        {/* --- INVENTORY TAB --- */}
        {activeTab === 'inventory' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            
            <div className="flex justify-between mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-green"
                />
              </div>
              <button 
                onClick={() => {
                  setIsAdding(true);
                  setProductImages(['']);
                }}
                className="bg-brand-green text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
              >
                <Plus size={18} /> Add Product
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Badge</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 font-medium">Rs. {product.price}</td>
                        <td className="px-6 py-4">
                          {product.badge ? (
                            <span className="bg-brand-green/10 text-brand-green px-2 py-1 rounded text-xs font-bold">{product.badge}</span>
                          ) : <span className="text-gray-400">-</span>}
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button onClick={() => openEdit(product)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Edit2 size={18} /></button>
                          <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-50 p-2 rounded-lg transition-colors"><Trash2 size={18} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- PROMOS TAB --- */}
        {activeTab === 'promos' && (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-3 gap-8">
              
              {/* Add Promo Form */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                <h3 className="font-bold text-lg mb-4">Add Promo Code</h3>
                <form onSubmit={handleAddPromo} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Code</label>
                    <input 
                      type="text" 
                      value={promoForm.code}
                      onChange={e => setPromoForm({...promoForm, code: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded mt-1 uppercase"
                      placeholder="SUMMER25"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Discount Percentage (%)</label>
                    <input 
                      type="number" 
                      value={promoForm.discountAmount}
                      onChange={e => {
                        const value = Number(e.target.value);
                        if (value >= 1 && value <= 100) {
                          setPromoForm({...promoForm, discountAmount: value});
                        }
                      }}
                      min="1"
                      max="100"
                      className="w-full p-2 border border-gray-200 rounded mt-1"
                      placeholder="e.g., 20 (for 20%)"
                      required
                    />
                    <p className="text-xs text-gray-400 mt-1">Value must be between 1-100</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Expiry Date</label>
                    <input 
                      type="date" 
                      value={promoForm.expiryDate}
                      onChange={e => setPromoForm({...promoForm, expiryDate: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded mt-1"
                      required
                    />
                  </div>
                  <button className="w-full bg-brand-dark text-white py-2 rounded-lg font-bold hover:bg-brand-green transition-colors">
                    Create Code
                  </button>
                </form>
              </div>

              {/* Promo List */}
              <div className="md:col-span-2 space-y-4">
                {promoCodes.map((promo) => (
                  <div key={promo.code} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                        <Ticket size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl tracking-wider">{promo.code}</h4>
                        <p className="text-sm text-gray-500">Discount: {promo.percentageDiscount}%</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-xs text-gray-400 mb-2">Expires: {promo.expiryDate}</p>
                       <button onClick={() => removePromoCode(promo.code)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                    </div>
                  </div>
                ))}
                {promoCodes.length === 0 && (
                  <div className="text-center py-10 text-gray-400">No active promo codes.</div>
                )}
              </div>
           </motion.div>
        )}

        {/* --- DATABASE TAB --- */}
        {activeTab === 'database' && (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
             <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Guide */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Terminal size={20} className="text-brand-green" /> Setup Guide
                        </h3>
                        <div className="space-y-4 text-sm text-gray-600">
                            <p>To connect Moden Kate to a real PostgreSQL database:</p>
                            <ol className="list-decimal pl-4 space-y-2">
                                <li>Install PostgreSQL from <b>postgresql.org</b></li>
                                <li>Create a database named <code>moden_kate_db</code></li>
                                <li>Install a backend server (Node.js/Express)</li>
                                <li>Use the schema on the right to create tables</li>
                                <li>Connect via <code>node-postgres</code></li>
                            </ol>
                            <div className="mt-4 p-3 bg-gray-900 text-gray-200 rounded-lg font-mono text-xs">
                                npm install pg express cors dotenv
                            </div>
                        </div>
                    </div>

                    <div className="bg-brand-deep p-6 rounded-2xl shadow-sm text-white">
                        <h3 className="font-bold mb-2">Need help?</h3>
                        <p className="text-sm opacity-80 mb-4">Contact our DevOps team for secure credentials and environment variables.</p>
                        <button className="w-full bg-white text-brand-deep py-2 rounded-lg font-bold hover:bg-brand-lime transition-colors">
                            Request Access
                        </button>
                    </div>
                </div>

                {/* Schema Viewer */}
                <div className="lg:col-span-2">
                    <div className="bg-[#1e1e1e] rounded-2xl shadow-xl overflow-hidden border border-gray-800">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 bg-[#252526]">
                            <div className="flex items-center gap-2">
                                <Database size={18} className="text-blue-400" />
                                <span className="text-gray-200 font-mono text-sm">schema.sql</span>
                            </div>
                            <button 
                                onClick={copySchema} 
                                className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
                            >
                                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                {copied ? 'Copied' : 'Copy SQL'}
                            </button>
                        </div>
                        <div className="p-6 overflow-x-auto">
                            <pre className="font-mono text-sm text-blue-300">
{`-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    badge VARCHAR(50),
    specs TEXT[],
    description TEXT,
    stock_quantity INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    guest_info JSONB,
    total_amount INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`}
                            </pre>
                            <p className="text-gray-500 text-xs mt-4 italic">// Copy full schema from database/schema.sql file</p>
                        </div>
                    </div>
                </div>

             </div>
           </motion.div>
        )}

        {/* --- EDIT/ADD PRODUCT MODAL --- */}
        <AnimatePresence>
          {(isEditing || isAdding) && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
              >
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-xl">{isAdding ? 'Add Product' : 'Edit Product'}</h3>
                  <button onClick={closeProductModal}><X size={20} /></button>
                </div>
                
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                    <input 
                      className="w-full p-2 border border-gray-200 rounded mt-1" 
                      value={productForm.name || ''} 
                      onChange={e => setProductForm({...productForm, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Price (Rs)</label>
                      <input 
                        type="number"
                        className="w-full p-2 border border-gray-200 rounded mt-1" 
                        value={productForm.price || 0} 
                        onChange={e => setProductForm({...productForm, price: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                      <select 
                        className="w-full p-2 border border-gray-200 rounded mt-1"
                        value={productForm.category || 'Audio'}
                        onChange={e => setProductForm({...productForm, category: e.target.value})}
                      >
                         <option>Smart Watches</option>
                         <option>Audio</option>
                         <option>Power Banks</option>
                         <option>Chargers</option>
                         <option>Car Accessories</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Product Images</label>
                    <div className="space-y-2 mt-2">
                      {productImages.map((img, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input 
                            className="flex-1 p-2 border border-gray-200 rounded text-sm" 
                            value={img} 
                            onChange={e => {
                              const newImages = [...productImages];
                              newImages[idx] = e.target.value;
                              setProductImages(newImages);
                            }}
                            placeholder="https://..."
                          />
                          <button
                            type="button"
                            onClick={() => setProductImages(productImages.filter((_, i) => i !== idx))}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setProductImages([...productImages, ''])}
                        className="w-full p-2 border-2 border-dashed border-gray-300 rounded text-sm text-gray-500 hover:border-brand-green hover:text-brand-green transition-colors"
                      >
                        + Add Image
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase">Badge (Optional)</label>
                    <select 
                      className="w-full p-2 border border-gray-200 rounded mt-1"
                      value={productForm.badge || ''}
                      onChange={e => setProductForm({...productForm, badge: e.target.value as any})}
                    >
                       <option value="">None</option>
                       <option value="New Arrival">New Arrival</option>
                       <option value="Best Seller">Best Seller</option>
                       <option value="Sale">Sale</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
                  <button onClick={closeProductModal} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                  <button onClick={handleSaveProduct} className="px-6 py-2 bg-brand-green text-white rounded-lg font-bold hover:bg-green-700">Save Changes</button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};