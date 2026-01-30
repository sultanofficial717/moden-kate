-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Admins and Customers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer', -- 'admin' or 'customer'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    badge VARCHAR(50), -- 'New Arrival', 'Best Seller', 'Sale'
    specs TEXT[], -- Array of strings e.g. ['5000mAh', 'Fast Charge']
    description TEXT,
    stock_quantity INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Promo Codes Table
CREATE TABLE promo_codes (
    code VARCHAR(50) PRIMARY KEY,
    discount_amount INTEGER NOT NULL,
    expiry_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    usage_limit INTEGER DEFAULT NULL,
    used_count INTEGER DEFAULT 0
);

-- 4. Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    guest_info JSONB, -- Stores {name, email, address, phone} if guest
    total_amount INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'shipped', 'delivered'
    payment_method VARCHAR(50) DEFAULT 'cod',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Order Items Table (Linking Products to Orders)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase INTEGER NOT NULL
);

-- Initial Seed Data (Optional)
INSERT INTO promo_codes (code, discount_amount, expiry_date) 
VALUES ('WELCOME50', 50, '2025-12-31'), ('KATE200', 200, '2025-12-31');
