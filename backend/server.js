import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase, testConnection } from './supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CORS_ORIGIN?.split(',') || []
    : ['http://localhost:5173', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.'
});

const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: 'Too many orders created, please try again later.'
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later.'
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/', generalLimiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Test database connection on startup
testConnection().then((connected) => {
  if (!connected) {
    console.error('⚠️  Warning: Failed to connect to database. Some features may not work.');
  }
});

// ====================================
// AUTHENTICATION ROUTES
// ====================================

// Admin login endpoint
app.post('/api/admin/login', authLimiter, [
  body('username').trim().isLength({ min: 3 }).escape(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Fetch admin user from database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', username)
      .eq('role', 'admin')
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '24h' }
    );

    res.json({ 
      token, 
      user: { 
        id: user.id,
        email: user.email, 
        name: user.name,
        role: user.role
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// ====================================
// PRODUCTS ROUTES
// ====================================

// Get all products (optimized with caching headers)
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, category, price, image, images, badge, specs, stock_quantity, is_active')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database error:', error);
      throw error;
    }
    
    // Set cache headers for better performance
    res.set('Cache-Control', 'public, max-age=60');
    res.json(data || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: error.message 
    });
  }
});

// Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new product
app.post('/api/products', verifyToken, requireAdmin, [
  body('name').trim().isLength({ min: 1, max: 255 }).withMessage('Product name is required'),
  body('category').trim().isLength({ min: 1, max: 100 }).withMessage('Category is required'),
  body('price').isInt({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock must be a positive number'),
  body('image').optional().trim(),
  body('description').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { data, error } = await supabase
      .from('products')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update product
app.put('/api/products/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

// ====================================
// PROMO CODES ROUTES
// ====================================

// Get all active promo codes
app.get('/api/promo-codes', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('is_active', true)
      .gte('expiry_date', new Date().toISOString().split('T')[0]);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    res.status(500).json({ error: error.message });
  }
});

// Validate promo code
app.post('/api/promo-codes/validate', [
  body('code').trim().isLength({ min: 1 }).withMessage('Promo code is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { code } = req.body;
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .gte('expiry_date', new Date().toISOString().split('T')[0])
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Invalid or expired promo code' });
    }

    // Check usage limit
    if (data.usage_limit && data.used_count >= data.usage_limit) {
      return res.status(400).json({ error: 'Promo code usage limit reached' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create promo code
app.post('/api/promo-codes', verifyToken, requireAdmin, [
  body('code').trim().isLength({ min: 3, max: 50 }).toUpperCase().withMessage('Valid promo code required'),
  body('percentage_discount').isInt({ min: 1, max: 100 }).withMessage('Discount must be between 1-100'),
  body('expiry_date').isISO8601().withMessage('Valid expiry date required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { data, error } = await supabase
      .from('promo_codes')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating promo code:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete promo code
app.delete('/api/promo-codes/:code', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('promo_codes')
      .delete()
      .eq('code', req.params.code);

    if (error) throw error;
    res.json({ message: 'Promo code deleted successfully' });
  } catch (error) {
    console.error('Error deleting promo code:', error);
    res.status(500).json({ error: error.message });
  }
});

// ====================================
// ORDERS ROUTES
// ====================================

// Get all orders with pagination
app.get('/api/orders', verifyToken, requireAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const { data, error, count } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (name, image)
        )
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    
    res.json({
      orders: data,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get single order
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (name, image)
        )
      `)
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create new order with rate limiting
app.post('/api/orders', orderLimiter, async (req, res) => {
  try {
    const { order, items } = req.body;

    // Validate request
    if (!order || !items || items.length === 0) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    // Check inventory availability
    for (const item of items) {
      const { data: product, error } = await supabase
        .from('products')
        .select('stock_quantity, name')
        .eq('id', item.product_id)
        .single();

      if (error || !product) {
        return res.status(404).json({ error: `Product ${item.product_id} not found` });
      }

      if (product.stock_quantity < item.quantity) {
        return res.status(400).json({ 
          error: `Insufficient stock for ${product.name}. Available: ${product.stock_quantity}, Requested: ${item.quantity}` 
        });
      }
    }

    // Insert order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (orderError) throw orderError;

    // Insert order items
    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    // Update inventory for each product
    for (const item of items) {
      const { error: invError } = await supabase.rpc('decrement_inventory', {
        product_id: item.product_id,
        quantity_to_deduct: item.quantity
      });
      
      if (invError) {
        console.error(`Inventory update failed for product ${item.product_id}:`, invError);
      }
    }

    // Update promo code usage if applicable
    if (order.promo_code) {
      const { error: promoError } = await supabase.rpc('increment_promo_usage', {
        promo_code: order.promo_code
      });
      if (promoError) console.error('Error updating promo usage:', promoError);
    }

    res.status(201).json(orderData);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update order status
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: error.message });
  }
});

// ====================================
// CATEGORIES ROUTES
// ====================================

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});

// ====================================
// INVENTORY TRACKING ROUTES (Admin Only)
// ====================================

// Get low stock alerts
app.get('/api/admin/inventory/low-stock', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('low_stock_alert')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching low stock:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get inventory value summary
app.get('/api/admin/inventory/value', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('inventory_value')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching inventory value:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get product analytics (sales performance)
app.get('/api/admin/inventory/analytics', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('product_analytics')
      .select('*')
      .order('total_revenue', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get recent stock movements (last 30 days)
app.get('/api/admin/inventory/movements', verifyToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('stock_movements')
      .select('*')
      .limit(100);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching stock movements:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update product stock manually (for restocking)
app.patch('/api/admin/inventory/:id/restock', verifyToken, requireAdmin, [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be positive')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { quantity } = req.body;
    
    // Get current stock
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('stock_quantity, name')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Add to stock
    const newStock = product.stock_quantity + quantity;
    
    const { data, error } = await supabase
      .from('products')
      .update({ stock_quantity: newStock })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    
    res.json({ 
      message: `Stock updated: ${product.name} restocked with ${quantity} units`,
      old_stock: product.stock_quantity,
      new_stock: newStock,
      product: data
    });
  } catch (error) {
    console.error('Error restocking product:', error);
    res.status(500).json({ error: error.message });
  }
});

// ====================================
// HEALTH CHECK
// ====================================

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Moden Kate Store Backend is running' });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Moden Kate Store API',
    endpoints: {
      products: '/api/products',
      promoCodes: '/api/promo-codes',
      orders: '/api/orders',
      categories: '/api/categories'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
  console.log(`🎟️  Promo Codes API: http://localhost:${PORT}/api/promo-codes`);
  console.log(`📋 Orders API: http://localhost:${PORT}/api/orders`);
});
