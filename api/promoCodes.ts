import { API_ENDPOINTS } from './config';
import { PromoCode } from '../types';

export const fetchPromoCodes = async (): Promise<PromoCode[]> => {
  try {
    const response = await fetch(API_ENDPOINTS.promoCodes);
    if (!response.ok) throw new Error('Failed to fetch promo codes');
    const data = await response.json();
    // Convert database format to app format
    return data.map((promo: any) => ({
      code: promo.code,
      percentageDiscount: promo.percentage_discount,
      expiryDate: promo.expiry_date,
    }));
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    return [];
  }
};

export const validatePromoCode = async (code: string): Promise<PromoCode | null> => {
  try {
    const response = await fetch(`${API_ENDPOINTS.promoCodes}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return {
      code: data.code,
      percentageDiscount: data.percentage_discount,
      expiryDate: data.expiry_date,
    };
  } catch (error) {
    console.error('Error validating promo code:', error);
    return null;
  }
};

export const createPromoCode = async (promo: PromoCode): Promise<PromoCode | null> => {
  try {
    console.log('Creating promo code:', promo);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      console.error('No admin token found');
      alert('Not authenticated. Please log in again.');
      return null;
    }
    
    const payload = {
      code: promo.code,
      percentage_discount: promo.percentageDiscount,
      expiry_date: promo.expiryDate,
      is_active: true,
    };
    console.log('Payload:', payload);
    const response = await fetch(API_ENDPOINTS.promoCodes, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to create promo code:', error);
      throw new Error('Failed to create promo code');
    }
    const data = await response.json();
    console.log('Promo code created:', data);
    return {
      code: data.code,
      percentageDiscount: data.percentage_discount,
      expiryDate: data.expiry_date,
    };
  } catch (error) {
    console.error('Error creating promo code:', error);
    alert('Failed to create promo code. Check console for details.');
    return null;
  }
};

export const deletePromoCode = async (code: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      console.error('No admin token found');
      return false;
    }
    
    const response = await fetch(`${API_ENDPOINTS.promoCodes}/${code}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting promo code:', error);
    return false;
  }
};
