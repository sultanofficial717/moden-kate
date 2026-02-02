# Admin Inventory Tracking Guide

## Overview
Your store now has comprehensive inventory tracking with real-time monitoring, alerts, and analytics.

---

## 🎯 Features Added

### 1. **Low Stock Alerts**
Automatically identifies products that need restocking:
- **OUT OF STOCK** - 0 units
- **CRITICAL** - 1-5 units
- **LOW** - 6-10 units

### 2. **Inventory Value Tracking**
Track total inventory worth by category:
- Total products per category
- Total units in stock
- Total value (price × quantity)
- Average price per category

### 3. **Product Analytics**
Sales performance metrics:
- Times ordered
- Total quantity sold
- Total revenue generated
- Current stock levels

### 4. **Stock Movements**
Track recent inventory changes (last 30 days):
- Product sold
- Quantity moved
- Order status
- Movement date

---

## 📊 API Endpoints (Admin Only)

All endpoints require authentication token in header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get Low Stock Alerts
```http
GET /api/admin/inventory/low-stock

Response:
[
  {
    "id": "uuid",
    "name": "iPhone 15 Pro",
    "category": "Smartphones",
    "stock_quantity": 3,
    "price": 129999,
    "alert_level": "CRITICAL"
  }
]
```

### Get Inventory Value Summary
```http
GET /api/admin/inventory/value

Response:
[
  {
    "category": "Smartphones",
    "total_products": 15,
    "total_units": 245,
    "total_value": 24500000,
    "avg_price": 95000
  }
]
```

### Get Product Analytics
```http
GET /api/admin/inventory/analytics

Response:
[
  {
    "id": "uuid",
    "name": "iPhone 15 Pro",
    "category": "Smartphones",
    "price": 129999,
    "stock_quantity": 45,
    "times_ordered": 127,
    "total_quantity_sold": 250,
    "total_revenue": 32499750
  }
]
```

### Get Stock Movements (Last 30 Days)
```http
GET /api/admin/inventory/movements

Response:
[
  {
    "product_id": "uuid",
    "product_name": "iPhone 15 Pro",
    "category": "Smartphones",
    "quantity_sold": 2,
    "price_at_purchase": 129999,
    "order_status": "delivered",
    "movement_date": "2026-01-30T10:30:00Z"
  }
]
```

### Restock Product
```http
PATCH /api/admin/inventory/:productId/restock
Content-Type: application/json

Body:
{
  "quantity": 50
}

Response:
{
  "message": "Stock updated: iPhone 15 Pro restocked with 50 units",
  "old_stock": 25,
  "new_stock": 75,
  "product": { ... }
}
```

---

## 💻 Using in Frontend

### Create API Functions
Create `api/inventory.ts`:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';

export const getLowStockAlerts = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/inventory/low-stock`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const getInventoryValue = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/inventory/value`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const getProductAnalytics = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/inventory/analytics`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const getStockMovements = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/inventory/movements`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

export const restockProduct = async (productId: string, quantity: number, token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/inventory/${productId}/restock`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quantity })
  });
  return response.json();
};
```

### Add to Admin Dashboard
Example usage in admin page:
```typescript
import { getLowStockAlerts, getInventoryValue } from '../api/inventory';

const AdminDashboard = () => {
  const [lowStock, setLowStock] = useState([]);
  const [inventoryValue, setInventoryValue] = useState([]);
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    const loadInventoryData = async () => {
      const alerts = await getLowStockAlerts(token);
      setLowStock(alerts);
      
      const value = await getInventoryValue(token);
      setInventoryValue(value);
    };
    
    loadInventoryData();
  }, []);

  return (
    <div>
      <h2>Low Stock Alerts</h2>
      {lowStock.map(item => (
        <div key={item.id} className={`alert-${item.alert_level.toLowerCase()}`}>
          <strong>{item.name}</strong>
          <span>Stock: {item.stock_quantity}</span>
          <span className="badge">{item.alert_level}</span>
        </div>
      ))}

      <h2>Inventory Value by Category</h2>
      {inventoryValue.map(cat => (
        <div key={cat.category}>
          <h3>{cat.category}</h3>
          <p>Products: {cat.total_products}</p>
          <p>Units: {cat.total_units}</p>
          <p>Value: Rs. {cat.total_value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};
```

---

## 📈 Direct Database Queries

### Check Current Stock Levels
```sql
SELECT 
    name,
    category,
    stock_quantity,
    price,
    (stock_quantity * price) as inventory_value
FROM products
WHERE is_active = true
ORDER BY stock_quantity ASC;
```

### Find Best Selling Products
```sql
SELECT * FROM product_analytics
ORDER BY total_revenue DESC
LIMIT 10;
```

### Get Low Stock Products
```sql
SELECT * FROM low_stock_alert;
```

### Total Inventory Value
```sql
SELECT 
    SUM(stock_quantity * price) as total_inventory_value,
    SUM(stock_quantity) as total_units
FROM products
WHERE is_active = true;
```

### Products Sold Today
```sql
SELECT 
    p.name,
    SUM(oi.quantity) as sold_today,
    p.stock_quantity as current_stock
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN orders o ON oi.order_id = o.id
WHERE o.created_at::date = CURRENT_DATE
GROUP BY p.id, p.name, p.stock_quantity;
```

### Stock Movement History
```sql
SELECT * FROM stock_movements
WHERE movement_date >= NOW() - INTERVAL '7 days'
ORDER BY movement_date DESC;
```

---

## 🔔 Setting Up Alerts

### Option 1: Email Alerts (Future Enhancement)
Send email when stock is low:
```javascript
// In backend after each order
if (product.stock_quantity <= 10) {
  sendEmail({
    to: 'admin@modenkate.com',
    subject: `Low Stock Alert: ${product.name}`,
    body: `Only ${product.stock_quantity} units left!`
  });
}
```

### Option 2: Dashboard Badge
Show alert count in admin nav:
```typescript
const [alertCount, setAlertCount] = useState(0);

useEffect(() => {
  const checkAlerts = async () => {
    const alerts = await getLowStockAlerts(token);
    setAlertCount(alerts.length);
  };
  
  checkAlerts();
  const interval = setInterval(checkAlerts, 60000); // Check every minute
  
  return () => clearInterval(interval);
}, []);

// In navigation
<span className="badge">{alertCount} Low Stock Items</span>
```

---

## 📊 Inventory Reports

### Daily Stock Report
```sql
-- Run this query daily to get inventory snapshot
SELECT 
    category,
    COUNT(*) as products,
    SUM(stock_quantity) as total_units,
    SUM(stock_quantity * price) as total_value,
    COUNT(CASE WHEN stock_quantity <= 10 THEN 1 END) as low_stock_count
FROM products
WHERE is_active = true
GROUP BY category;
```

### Monthly Sales vs Stock Report
```sql
SELECT 
    p.name,
    p.stock_quantity as current_stock,
    COUNT(oi.id) as orders_this_month,
    SUM(oi.quantity) as units_sold_this_month,
    SUM(oi.quantity * oi.price_at_purchase) as revenue_this_month
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
LEFT JOIN orders o ON oi.order_id = o.id
WHERE o.created_at >= DATE_TRUNC('month', CURRENT_DATE)
GROUP BY p.id, p.name, p.stock_quantity
ORDER BY units_sold_this_month DESC;
```

---

## 🛠️ Maintenance Tasks

### Weekly Tasks
1. **Review Low Stock Alerts** - Restock products below threshold
2. **Check Inventory Value** - Monitor total investment
3. **Review Stock Movements** - Identify fast/slow moving items

### Monthly Tasks
1. **Analyze Product Performance** - Remove slow sellers
2. **Audit Stock Levels** - Physical inventory check vs database
3. **Review Pricing** - Adjust based on movement rates

### Quarterly Tasks
1. **Clean Old Data** - Archive old orders
2. **Update Categories** - Reorganize product structure
3. **Capacity Planning** - Forecast storage needs

---

## 🎯 Best Practices

### Stock Level Guidelines
- **High Demand Products:** Keep 3-month supply
- **Medium Demand:** Keep 1-month supply
- **Low Demand:** Keep 2-week supply
- **Seasonal:** Adjust based on season

### Reorder Points
Set automatic reorder when:
- **Critical:** Stock ≤ 5 units
- **Low:** Stock ≤ 10 units
- **Monitor:** Stock ≤ 20 units

### Stock Rotation
- Use FIFO (First In, First Out) method
- Mark products with arrival dates
- Prioritize older stock in shipments

---

## 🚨 Troubleshooting

### Stock Showing Negative
The database has validation trigger to prevent this, but if it happens:
```sql
-- Find negative stock
SELECT * FROM products WHERE stock_quantity < 0;

-- Fix manually
UPDATE products 
SET stock_quantity = 0 
WHERE stock_quantity < 0;
```

### Stock Not Decreasing After Order
Check if `decrement_inventory()` function is being called:
```sql
-- Test the function
SELECT decrement_inventory('product-uuid-here', 5);

-- Check if function exists
SELECT routine_name FROM information_schema.routines 
WHERE routine_name = 'decrement_inventory';
```

### Analytics Not Showing Data
Refresh the materialized view if using:
```sql
-- Refresh analytics
REFRESH MATERIALIZED VIEW product_analytics;
```

---

## 📱 Mobile Inventory App (Future)

For on-the-go inventory management:
1. Use same API endpoints
2. Add barcode scanning
3. Quick restock functionality
4. Push notifications for alerts

---

## 🎓 Training Resources

### For Admin Staff
1. How to read low stock alerts
2. When to reorder products
3. Understanding inventory value
4. Using stock movement reports

### For Management
1. Analyzing product performance
2. Inventory investment optimization
3. Forecasting and planning
4. Profitability analysis

---

**Next Steps:**
1. Execute `FRESH_DATABASE_SETUP.sql` to create tracking views
2. Restart backend to load new routes
3. Test endpoints with admin token
4. Build inventory dashboard in admin panel
5. Set up daily monitoring routine

Your inventory is now fully tracked and manageable! 📦✅
