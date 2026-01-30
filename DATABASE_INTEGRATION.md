# Database Integration Guide

## Overview
All sections of the Moden Kate Store app are now connected to the Supabase database through the backend API.

## API Structure

### API Files Created
- `api/config.ts` - API endpoint configuration
- `api/products.ts` - Product CRUD operations
- `api/promoCodes.ts` - Promo code operations
- `api/orders.ts` - Order management

### Backend API Endpoints
- **Products**: `http://localhost:5000/api/products`
- **Promo Codes**: `http://localhost:5000/api/promo-codes`
- **Orders**: `http://localhost:5000/api/orders`

## Connected Features

### ✅ 1. Products Section
**Location**: Home page, Product cards, Admin Inventory

**Database Integration**:
- Fetches all products from `products` table on app load
- Creates new products via Admin panel → saves to database
- Updates existing products → syncs with database
- Deletes products → removes from database
- Displays multiple images from `images` array field

**API Functions**:
- `fetchProducts()` - GET all products
- `createProduct()` - POST new product
- `updateProduct()` - PUT update product
- `deleteProduct()` - DELETE product

### ✅ 2. Promo Codes Section
**Location**: Admin Dashboard, Checkout page

**Database Integration**:
- Loads all active promo codes from `promo_codes` table
- Validates promo codes against database (checks expiry, usage limit)
- Creates new promo codes via Admin → saves to database
- Deletes promo codes → removes from database
- Percentage-based discounts (1-100%) stored and applied

**API Functions**:
- `fetchPromoCodes()` - GET active promo codes
- `validatePromoCode()` - POST validate code
- `createPromoCode()` - POST new promo code
- `deletePromoCode()` - DELETE promo code

### ✅ 3. Orders Section
**Location**: Checkout page

**Database Integration**:
- Saves complete order details to `orders` table
- Saves order items to `order_items` table
- Stores guest info (name, email, address, phone)
- Tracks: subtotal, delivery charge, discount, promo code, total
- Records payment method and status

**API Functions**:
- `createOrder()` - POST new order with items
- `fetchOrders()` - GET all orders
- `fetchOrderById()` - GET single order
- `updateOrderStatus()` - PATCH order status

### ✅ 4. Cart Management
**Location**: Throughout app, Checkout

**Integration**:
- Cart stored in localStorage (client-side)
- When order placed → cart items saved to database as order_items
- Cart cleared after successful order creation

## Data Flow

### Product Management Flow
```
Admin Panel → Add/Edit Product → API Call → Supabase Database → Update UI
```

### Promo Code Validation Flow
```
User enters code → Validate API → Check database → Apply discount → Update total
```

### Order Creation Flow
```
Checkout → Submit order → Create order API → Save to database → Clear cart → Confirmation
```

## Database Schema

### Tables Used
1. **products** - All product data including images array
2. **promo_codes** - Promo codes with percentage discounts
3. **orders** - Order headers with totals
4. **order_items** - Individual items in each order

## Environment Setup

### Backend (.env)
```
SUPABASE_URL=https://oxeutitfvkmlpwewtdcm.supabase.co
SUPABASE_ANON_KEY=your-anon-key
PORT=5000
```

### Frontend
API base URL configured in `api/config.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Testing Database Integration

1. **Start Backend Server**:
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   ```

3. **Test Product Loading**:
   - Open app → Products should load from database
   - Empty? Add products via Admin panel

4. **Test Promo Codes**:
   - Go to Checkout
   - Enter `WELCOME50` or `KATE20`
   - Should validate against database

5. **Test Order Creation**:
   - Add items to cart
   - Complete checkout
   - Check Supabase dashboard → new order in `orders` table

## Admin Panel Integration

**Login**: `http://localhost:3000/#/admin`
- Username: `boss919`
- Password: `kate123`

**Features Connected to Database**:
- ✅ Add products → saves to database
- ✅ Edit products → updates in database
- ✅ Delete products → removes from database
- ✅ Add promo codes → saves to database
- ✅ Delete promo codes → removes from database
- ✅ Multiple image support → stored as array in database

## Real-time Updates

All changes made through the Admin panel or Checkout process are immediately reflected in the database and synced across the application.

## Next Steps

To view orders in Admin panel:
1. Create Orders view in Admin.tsx
2. Use `fetchOrders()` API function
3. Display order history with status management

To add user authentication:
1. Use Supabase Auth
2. Link orders to authenticated users
3. Enable order history per user
