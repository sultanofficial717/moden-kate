// This is a BACKEND server example.
// You would run this with: node server/index.js
// Dependencies needed: npm install express pg cors dotenv

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL Connection Pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'moden_kate_db',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(express.json());

// API Routes

// 1. Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 2. Create Order
app.post('/api/orders', async (req, res) => {
  const { user_id, guest_info, items, total_amount } = req.body;
  
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN'); // Start Transaction

    // Insert Order
    const orderQuery = `
      INSERT INTO orders (user_id, guest_info, total_amount)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const orderRes = await client.query(orderQuery, [user_id, guest_info, total_amount]);
    const orderId = orderRes.rows[0].id;

    // Insert Items
    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await client.query('COMMIT'); // Commit Transaction
    res.status(201).json({ message: 'Order created', orderId });

  } catch (e) {
    await client.query('ROLLBACK');
    console.error(e);
    res.status(500).json({ error: 'Transaction failed' });
  } finally {
    client.release();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
