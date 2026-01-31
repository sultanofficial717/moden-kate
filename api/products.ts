import { API_ENDPOINTS } from './config';
import { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_ENDPOINTS.products);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const createProduct = async (product: Omit<Product, 'id'>, token?: string | null): Promise<Product | null> => {
  try {
    console.log('Creating product:', product);
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(API_ENDPOINTS.products, {
      method: 'POST',
      headers,
      body: JSON.stringify(product),
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const error = await response.json();
      console.error('Failed to create product:', error);
      if (response.status === 401) {
        alert('Authentication required. Please log in again.');
      } else {
        alert(error.error || 'Failed to create product');
      }
      throw new Error('Failed to create product');
    }
    const data = await response.json();
    console.log('Product created:', data);
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    return null;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>, token?: string | null): Promise<Product | null> => {
  try {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      if (response.status === 401) {
        alert('Authentication required. Please log in again.');
      }
      throw new Error('Failed to update product');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

export const deleteProduct = async (id: string, token?: string | null): Promise<boolean> => {
  try {
    const headers: HeadersInit = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
      method: 'DELETE',
      headers,
    });
    
    if (response.status === 401) {
      alert('Authentication required. Please log in again.');
    }
    
    return response.ok;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};
