
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string; // Primary image (for backward compatibility)
  images?: string[]; // Array of image URLs
  badge?: 'New Arrival' | 'Best Seller' | 'Sale';
  specs?: string[];
  colors?: string[];
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: string;
}

export interface WatchFace {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PromoCode {
  code: string;
  percentageDiscount: number; // 1-100
  expiryDate: string; // YYYY-MM-DD
}
