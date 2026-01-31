-- ====================================
-- SCHEMA FIXES (Critical)
-- ====================================

-- Add missing is_active column to products (if not exists)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='products' AND column_name='is_active') THEN
        ALTER TABLE products ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;
END $$;

-- Ensure stock_quantity exists in products
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='products' AND column_name='stock_quantity') THEN
        ALTER TABLE products ADD COLUMN stock_quantity INTEGER DEFAULT 100;
    END IF;
END $$;

-- Fix promo_codes table - ensure percentage_discount exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='promo_codes' AND column_name='percentage_discount') THEN
        -- Add percentage_discount column
        ALTER TABLE promo_codes ADD COLUMN percentage_discount INTEGER;
        
        -- If discount_amount exists, migrate data
        IF EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='promo_codes' AND column_name='discount_amount') THEN
            UPDATE promo_codes SET percentage_discount = 10 WHERE discount_amount IS NOT NULL;
            ALTER TABLE promo_codes DROP COLUMN discount_amount;
        END IF;
    END IF;
    
    -- Ensure is_active exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='promo_codes' AND column_name='is_active') THEN
        ALTER TABLE promo_codes ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
    END IF;
    
    -- Ensure used_count exists
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='promo_codes' AND column_name='used_count') THEN
        ALTER TABLE promo_codes ADD COLUMN used_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Create categories table if not exists
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    image TEXT,
    item_count VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'customer',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: kate123 - hashed with bcrypt)
-- You should change this password immediately after first login
INSERT INTO users (email, password_hash, name, role) 
VALUES (
    'admin@modenkate.com',
    '$2b$10$rQZ5vJ3mZxPZqH6KxJ4jWeSLqj4L.lH5x5Nq5Yqt7yKZKqJ5L5L5L',
    'Admin',
    'admin'
) ON CONFLICT (email) DO NOTHING;

-- ====================================
-- PERFORMANCE IMPROVEMENTS
-- ====================================

-- Add indexes for frequently queried fields
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_is_active ON promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_promo_codes_expiry ON promo_codes(expiry_date);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_guest_email ON orders(guest_email);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- ====================================
-- INVENTORY MANAGEMENT FUNCTION
-- ====================================

-- Function to decrement inventory after order
CREATE OR REPLACE FUNCTION decrement_inventory(product_id UUID, quantity_to_deduct INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE products
  SET stock_quantity = stock_quantity - quantity_to_deduct
  WHERE id = product_id
    AND stock_quantity >= quantity_to_deduct;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for product %', product_id;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- PROMO CODE USAGE TRACKING
-- ====================================

-- Function to increment promo code usage
CREATE OR REPLACE FUNCTION increment_promo_usage(promo_code TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE promo_codes
  SET times_used = times_used + 1
  WHERE code = promo_code;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- CART MANAGEMENT (Session-based)
-- ====================================

-- Create carts table for persistent cart storage
CREATE TABLE IF NOT EXISTS carts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast session lookup
CREATE INDEX IF NOT EXISTS idx_carts_session ON carts(session_id);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_carts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_carts_updated_at
  BEFORE UPDATE ON carts
  FOR EACH ROW
  EXECUTE FUNCTION update_carts_updated_at();

-- Function to clean old carts (older than 7 days)
CREATE OR REPLACE FUNCTION clean_old_carts()
RETURNS void AS $$
BEGIN
  DELETE FROM carts
  WHERE updated_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- DATA VALIDATION TRIGGERS
-- ====================================

-- Trigger to validate promo code percentage
CREATE OR REPLACE FUNCTION validate_promo_percentage()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.percentage_discount IS NOT NULL THEN
    IF NEW.percentage_discount < 1 OR NEW.percentage_discount > 100 THEN
      RAISE EXCEPTION 'Percentage discount must be between 1 and 100';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_promo
  BEFORE INSERT OR UPDATE ON promo_codes
  FOR EACH ROW
  EXECUTE FUNCTION validate_promo_percentage();

-- Trigger to prevent negative inventory
CREATE OR REPLACE FUNCTION validate_inventory()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock_quantity < 0 THEN
    RAISE EXCEPTION 'Stock quantity cannot be negative';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validate_inventory
  BEFORE INSERT OR UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION validate_inventory();

-- ====================================
-- ANALYTICS VIEWS
-- ====================================

-- View for product performance
CREATE OR REPLACE VIEW product_analytics AS
SELECT 
  p.id,
  p.name,
  p.category,
  p.price,
  p.stock_quantity,
  COUNT(oi.id) as times_ordered,
  SUM(oi.quantity) as total_quantity_sold,
  SUM(oi.price_at_purchase * oi.quantity) as total_revenue
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.category, p.price, p.stock_quantity;

-- View for order summary
CREATE OR REPLACE VIEW order_summary AS
SELECT 
  o.id,
  o.guest_name,
  o.guest_email,
  o.total_amount,
  o.status,
  o.created_at,
  COUNT(oi.id) as item_count,
  o.promo_code_used
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.guest_name, o.guest_email, o.total_amount, o.status, o.created_at, o.promo_code_used;

-- ====================================
-- ROW LEVEL SECURITY (Optional)
-- ====================================

-- Enable RLS on sensitive tables
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (uncomment if needed)
-- CREATE POLICY admin_all_orders ON orders FOR ALL USING (true);
-- CREATE POLICY admin_all_order_items ON order_items FOR ALL USING (true);
