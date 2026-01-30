import { API_ENDPOINTS } from './config';

interface OrderData {
  user_id?: string;
  guest_info?: any;
  subtotal: number;
  delivery_charge: number;
  discount_amount: number;
  promo_code?: string;
  total_amount: number;
  payment_method: string;
}

interface OrderItem {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price_at_purchase: number;
}

export const createOrder = async (order: OrderData, items: OrderItem[]) => {
  try {
    const response = await fetch(API_ENDPOINTS.orders, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order, items }),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await fetch(API_ENDPOINTS.orders);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const fetchOrderById = async (id: string) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.orders}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch order');
    return await response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

export const updateOrderStatus = async (id: string, status: string) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.orders}/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update order status');
    return await response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    return null;
  }
};
