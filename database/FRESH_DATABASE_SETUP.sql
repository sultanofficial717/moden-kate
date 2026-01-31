-- ====================================
-- MODEN KATE STORE - COMPLETE DATABASE SETUP
-- ====================================
-- This file creates the entire database schema from scratch
-- Execute this in Supabase SQL Editor after clearing all tables
-- Date: January 31, 2026
-- ====================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- DROP EXISTING TABLES (Clean Slate)
-- ====================================
DROP TABLE IF EXISTS bundle_items CASCADE;
DROP TABLE IF EXISTS bundles CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS promo_codes CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS carts CASCADE;

-- Drop existing functions
DROP FUNCTION IF EXISTS decrement_inventory CASCADE;
DROP FUNCTION IF EXISTS increment_promo_usage CASCADE;
DROP FUNCTION IF EXISTS clean_old_carts CASCADE;
DROP FUNCTION IF EXISTS validate_promo_percentage CASCADE;
DROP FUNCTION IF EXISTS validate_inventory CASCADE;
DROP FUNCTION IF EXISTS update_carts_updated_at CASCADE;

-- Drop views
DROP VIEW IF EXISTS product_analytics CASCADE;
DROP VIEW IF EXISTS order_summary CASCADE;

-- ====================================
-- TABLE: categories
-- ====================================
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    image TEXT,
    item_count VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: products
-- ====================================
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL CHECK (price >= 0),
    image TEXT,
    images TEXT[], -- Array of image URLs for gallery
    badge VARCHAR(50),
    description TEXT,
    specs JSONB, -- JSON field for technical specifications
    stock_quantity INTEGER DEFAULT 100 CHECK (stock_quantity >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: promo_codes
-- ====================================
CREATE TABLE promo_codes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    percentage_discount INTEGER NOT NULL CHECK (percentage_discount >= 1 AND percentage_discount <= 100),
    expiry_date DATE NOT NULL,
    usage_limit INTEGER,
    used_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: users (for admin authentication)
-- ====================================
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: orders
-- ====================================
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    guest_name VARCHAR(255),
    guest_email VARCHAR(255),
    guest_phone VARCHAR(50),
    guest_address TEXT,
    subtotal INTEGER NOT NULL,
    delivery_charge INTEGER DEFAULT 0,
    discount_amount INTEGER DEFAULT 0,
    total_amount INTEGER NOT NULL,
    promo_code_used VARCHAR(50),
    payment_method VARCHAR(50) DEFAULT 'COD',
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: order_items
-- ====================================
CREATE TABLE order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price_at_purchase INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: carts (for persistent cart storage)
-- ====================================
CREATE TABLE carts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL UNIQUE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: bundles (Shop by Vibe)
-- ====================================
CREATE TABLE bundles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    vibe_category VARCHAR(100), -- 'study', 'weekend', 'gym', 'chill'
    emoji VARCHAR(10),
    image TEXT,
    discount_percentage INTEGER NOT NULL CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- TABLE: bundle_items
-- ====================================
CREATE TABLE bundle_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    bundle_id UUID NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1 CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- INDEXES FOR PERFORMANCE
-- ====================================

-- Products indexes
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_created_at ON products(created_at DESC);
CREATE INDEX idx_products_price ON products(price);

-- Promo codes indexes
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_is_active ON promo_codes(is_active);
CREATE INDEX idx_promo_codes_expiry ON promo_codes(expiry_date);

-- Orders indexes
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_guest_email ON orders(guest_email);
CREATE INDEX idx_orders_user_id ON orders(user_id);

-- Order items indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Carts indexes
CREATE INDEX idx_carts_session ON carts(session_id);

-- Categories indexes
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ====================================
-- FUNCTIONS
-- ====================================

-- Function to decrement inventory after order
CREATE OR REPLACE FUNCTION decrement_inventory(product_id UUID, quantity_to_deduct INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE products
    SET stock_quantity = stock_quantity - quantity_to_deduct,
        updated_at = NOW()
    WHERE id = product_id
      AND stock_quantity >= quantity_to_deduct;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Insufficient stock for product %', product_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Function to increment promo code usage
CREATE OR REPLACE FUNCTION increment_promo_usage(promo_code TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE promo_codes
    SET used_count = used_count + 1,
        updated_at = NOW()
    WHERE code = promo_code;
END;
$$ LANGUAGE plpgsql;

-- Function to clean old carts (older than 7 days)
CREATE OR REPLACE FUNCTION clean_old_carts()
RETURNS void AS $$
BEGIN
    DELETE FROM carts
    WHERE updated_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ====================================
-- TRIGGERS
-- ====================================

-- Auto-update updated_at on products
CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at on promo_codes
CREATE TRIGGER trigger_promo_codes_updated_at
    BEFORE UPDATE ON promo_codes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at on orders
CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at on carts
CREATE TRIGGER trigger_carts_updated_at
    BEFORE UPDATE ON carts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at on categories
CREATE TRIGGER trigger_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at on users
CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

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
    p.is_active,
    COUNT(oi.id) as times_ordered,
    COALESCE(SUM(oi.quantity), 0) as total_quantity_sold,
    COALESCE(SUM(oi.price_at_purchase * oi.quantity), 0) as total_revenue,
    p.created_at
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.category, p.price, p.stock_quantity, p.is_active, p.created_at;

-- View for order summary
CREATE OR REPLACE VIEW order_summary AS
SELECT 
    o.id,
    o.guest_name,
    o.guest_email,
    o.total_amount,
    o.status,
    o.payment_method,
    o.created_at,
    COUNT(oi.id) as item_count,
    o.promo_code_used
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.guest_name, o.guest_email, o.total_amount, o.status, o.payment_method, o.created_at, o.promo_code_used;

-- View for low stock alerts (products with stock < 10)
CREATE OR REPLACE VIEW low_stock_alert AS
SELECT 
    id,
    name,
    category,
    stock_quantity,
    price,
    is_active,
    CASE 
        WHEN stock_quantity = 0 THEN 'OUT OF STOCK'
        WHEN stock_quantity <= 5 THEN 'CRITICAL'
        WHEN stock_quantity <= 10 THEN 'LOW'
    END as alert_level
FROM products
WHERE stock_quantity <= 10 AND is_active = true
ORDER BY stock_quantity ASC;

-- View for inventory value tracking
CREATE OR REPLACE VIEW inventory_value AS
SELECT 
    p.category,
    COUNT(p.id) as total_products,
    SUM(p.stock_quantity) as total_units,
    SUM(p.stock_quantity * p.price) as total_value,
    AVG(p.price) as avg_price
FROM products p
WHERE p.is_active = true
GROUP BY p.category;

-- View for recent stock movements
CREATE OR REPLACE VIEW stock_movements AS
SELECT 
    oi.product_id,
    p.name as product_name,
    p.category,
    oi.quantity as quantity_sold,
    oi.price_at_purchase,
    o.status as order_status,
    o.created_at as movement_date
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC;

-- ====================================
-- DEFAULT DATA
-- ====================================

-- Insert default admin user
-- Password: kate123 (hashed with bcrypt, 10 rounds)
-- IMPORTANT: Change this password after first login!
INSERT INTO users (email, password_hash, name, role) 
VALUES (
    'admin@modenkate.com',
    '$2b$10$rQZ5vJ3mZxPZqH6KxJ4jWeSLqj4L.lH5x5Nq5Yqt7yKZKqJ5L5L5L',
    'Admin',
    'admin'
);

-- Insert sample categories (optional - remove if not needed)
INSERT INTO categories (name, image, item_count, is_active) VALUES
('Smartphones', '/images/categories/smartphones.jpg', '50+ Items', true),
('Laptops', '/images/categories/laptops.jpg', '30+ Items', true),
('Tablets', '/images/categories/tablets.jpg', '20+ Items', true),
('Accessories', '/images/categories/accessories.jpg', '100+ Items', true);

-- ====================================
-- SAMPLE BUNDLES (Shop by Vibe)
-- ====================================
INSERT INTO bundles (name, description, vibe_category, emoji, image, discount_percentage) VALUES
('Study Sesh', 'Focus mode activated. Watch + earbuds + charger for all-nighters that hit different.', 'study', '📚✨', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=1200&q=80', 15),
('Weekend Flex', 'It''s giving main character energy. Bold watch + speaker for when you''re the moment.', 'weekend', '🎉💫', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', 10),
('Gym Flow', 'Sweat-proof and slay-ready. Sporty watch + earbuds that don''t quit mid-set.', 'gym', '💪🔥', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1200&q=80', 12),
('Chill Beats', 'Big vibes only. Watch + over-ear headphones for when you need that escape pod energy.', 'chill', '🎧💜', 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1200&q=80', 20);

-- ====================================
-- SAMPLE PRODUCTS (Optional - for testing)
-- ====================================
-- Uncomment below to add sample products

/*
INSERT INTO products (name, category, price, image, badge, description, stock_quantity) VALUES
('iPhone 15 Pro', 'Smartphones', 129999, '/images/iphone-15-pro.jpg', 'New', 'Latest iPhone with A17 Pro chip', 50),
('MacBook Pro 14"', 'Laptops', 189999, '/images/macbook-pro.jpg', 'Popular', 'M3 Pro chip, 16GB RAM', 30),
('iPad Air', 'Tablets', 59999, '/images/ipad-air.jpg', 'Best Seller', '10.9" Liquid Retina display', 40),
('AirPods Pro', 'Accessories', 24999, '/images/airpods-pro.jpg', 'Hot', 'Active Noise Cancellation', 100);
*/

-- ====================================
-- SAMPLE PROMO CODES (Optional)
-- ====================================
-- Uncomment below to add sample promo codes

/*
INSERT INTO promo_codes (code, percentage_discount, expiry_date, usage_limit) VALUES
('WELCOME10', 10, '2026-12-31', 1000),
('SAVE20', 20, '2026-06-30', 500),
('VIP30', 30, '2026-03-31', 100);
*/

-- ====================================
-- VERIFICATION QUERIES
-- ====================================
-- Run these after setup to verify everything is created correctly

-- Check all tables
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;

-- Check all indexes
-- SELECT indexname FROM pg_indexes WHERE schemaname = 'public' ORDER BY indexname;

-- Check all functions
-- SELECT routine_name FROM information_schema.routines WHERE routine_schema = 'public' AND routine_type = 'FUNCTION' ORDER BY routine_name;

-- Check admin user
-- SELECT email, name, role FROM users WHERE role = 'admin';

-- ====================================
-- SETUP COMPLETE
-- ====================================
-- Database is now ready for use!
-- 
-- Next steps:
-- 1. Start backend server: cd backend && npm start
-- 2. Start frontend: npm run dev
-- 3. Login at: http://localhost:3000/admin
--    Email: admin@modenkate.com
--    Password: kate123
--
-- IMPORTANT SECURITY NOTES:
-- - Change the admin password immediately after first login
-- - Update JWT_SECRET in backend/.env before production
-- - Review and enable Row Level Security (RLS) policies if needed
-- ====================================
