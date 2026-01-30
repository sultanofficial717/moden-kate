import { Product, Category, WatchFace } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Smart Watches', image: 'https://picsum.photos/id/1060/400/400', itemCount: '90+ Faces' },
  { id: '2', name: 'Audio Gear', image: 'https://picsum.photos/id/1/400/400', itemCount: 'Premium Sound' },
  { id: '3', name: 'Power Banks', image: 'https://picsum.photos/id/201/400/400', itemCount: 'High Capacity' },
  { id: '4', name: 'Chargers', image: 'https://picsum.photos/id/250/400/400', itemCount: 'Super Fast' },
];

// acting as our "Database"
export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '35W Super Fast Charger',
    category: 'Chargers',
    price: 1600,
    image: 'https://picsum.photos/id/1059/600/600',
    badge: 'Best Seller',
    specs: ['PD 3.0', 'Compact', 'Safety Chip'],
  },
  {
    id: 'p2',
    name: 'USB Fast Car Charger',
    category: 'Car Accessories',
    price: 1200,
    image: 'https://picsum.photos/id/1070/600/600',
    badge: 'New Arrival',
    specs: ['Dual Port', 'LED Indicator', 'Metallic'],
  },
  {
    id: 'p3',
    name: 'MTW-066 ANC Earphones',
    category: 'Audio',
    price: 4500,
    image: 'https://picsum.photos/id/1083/600/600',
    badge: 'Sale',
    specs: ['Active Noise Cancellation', '30h Battery', 'Bass Boost'],
  },
  {
    id: 'p4',
    name: '20000mAh Power Bank',
    category: 'Power Banks',
    price: 3200,
    image: 'https://picsum.photos/id/146/600/600',
    specs: ['22.5W Output', 'Digital Display', 'Multi-Device'],
  },
  {
    id: 'p5',
    name: 'Moden Watch Ultra',
    category: 'Smart Watches',
    price: 8500,
    image: 'https://picsum.photos/id/1060/600/600',
    badge: 'New Arrival',
    specs: ['AMOLED', '10 Days Battery', 'Waterproof'],
  },
  {
    id: 'p6',
    name: 'BassPro Wireless Speaker',
    category: 'Audio',
    price: 2800,
    image: 'https://picsum.photos/id/145/600/600',
    specs: ['360° Sound', 'IPX7 Waterproof', 'RGB Lights'],
  },
  {
    id: 'p7',
    name: 'Travel Adapter Universal',
    category: 'Chargers',
    price: 1500,
    image: 'https://picsum.photos/id/1050/600/600',
    specs: ['All-in-One', 'Surge Protect', 'USB-C'],
  },
  {
    id: 'p8',
    name: 'Magnetic Wireless Pad',
    category: 'Chargers',
    price: 2100,
    image: 'https://picsum.photos/id/1056/600/600',
    badge: 'Best Seller',
    specs: ['15W Fast Charge', 'Magnetic', 'Slim'],
  },
  // ============================================================
  // TO ADD A NEW PRODUCT:
  // Copy the block below, uncomment it, and fill in your details.
  // ============================================================
  /*
  {
    id: 'p9',  // Ensure ID is unique (e.g., p9, p10, p11)
    name: 'Product Name Here',
    category: 'Category Name',
    price: 1000,
    image: 'https://picsum.photos/id/100/600/600', // URL to your image
    badge: 'New Arrival', // Optional: 'New Arrival', 'Best Seller', or 'Sale'
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
  },
  */
];

export const WATCH_FACES: WatchFace[] = [
  { id: 'wf1', name: 'Classic Chrono', imageUrl: 'https://picsum.photos/id/102/300/300' },
  { id: 'wf2', name: 'Neon Digital', imageUrl: 'https://picsum.photos/id/103/300/300' },
  { id: 'wf3', name: 'Minimalist', imageUrl: 'https://picsum.photos/id/104/300/300' },
  { id: 'wf4', name: 'Sport Fitness', imageUrl: 'https://picsum.photos/id/106/300/300' },
];

export const SPEAKER_COLORS = [
  { name: 'Midnight Black', hex: '#1A1A1B' },
  { name: 'Forest Green', hex: '#006633' },
  { name: 'Electric Blue', hex: '#0070F3' },
  { name: 'Sunset Orange', hex: '#FF6B00' },
  { name: 'Clean White', hex: '#F0F0F0' },
];
