import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { supabase } from './supabase.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ====================================
// PRODUCTS ROUTES
// ====================================

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
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
app.post('/api/products', async (req, res) => {
  try {
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
app.put('/api/products/:id', async (req, res) => {
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
app.delete('/api/products/:id', async (req, res) => {
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
app.post('/api/promo-codes/validate', async (req, res) => {
  try {
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
app.post('/api/promo-codes', async (req, res) => {
  try {
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
app.delete('/api/promo-codes/:code', async (req, res) => {
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

// Get all orders
app.get('/api/orders', async (req, res) => {
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
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
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

// Create new order
app.post('/api/orders', async (req, res) => {
  try {
    const { order, items } = req.body;

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
