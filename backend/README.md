# Moden Kate Store - Backend API

Backend server for Moden Kate Store built with Express.js and Supabase.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file with:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-anon-key
   PORT=5000
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all active products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Promo Codes
- `GET /api/promo-codes` - Get all active promo codes
- `POST /api/promo-codes/validate` - Validate a promo code
- `POST /api/promo-codes` - Create new promo code
- `DELETE /api/promo-codes/:code` - Delete promo code

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status

### Categories
- `GET /api/categories` - Get all categories

## Testing

Test the connection:
```bash
curl http://localhost:5000/health
```

Test products endpoint:
```bash
curl http://localhost:5000/api/products
```

## Tech Stack

- **Express.js** - Web framework
- **Supabase** - Database and authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
