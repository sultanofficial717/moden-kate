
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
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
  discountAmount: number;
  expiryDate: string; // YYYY-MM-DD
}
