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

export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product | null> => {
  try {
    console.log('Creating product:', product);
    const response = await fetch(API_ENDPOINTS.products, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to create product:', error);
      throw new Error('Failed to create product');
    }
    const data = await response.json();
    console.log('Product created:', data);
    return data;
  } catch (error) {
    console.error('Error creating product:', error);
    alert('Failed to create product. Check console for details.');
    return null;
  }
};

export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.products}/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};
