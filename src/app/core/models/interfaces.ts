import { Timestamp } from '@angular/fire/firestore';

export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  author: string;
  publishDate: Timestamp;
  isDigital: boolean;
  downloadUrl?: string;
  stock?: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  category: 'quraanic-arabic' | 'computer-skills';
  level: 'beginner' | 'intermediate' | 'advanced';
  skoolUrl: string;
  thumbnail: string;
  startDate: Timestamp;
  duration: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'perfume' | 'merch';
  images: string[];
  stock: number;
  sku: string;
  features?: string[];
}

export interface WebService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features: string[];
  timeline: string;
  category: 'web-development' | 'consulting' | 'maintenance';
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  shippingAddress?: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface OrderItem {
  productId: string;
  productType: 'book' | 'course' | 'product' | 'service';
  quantity: number;
  price: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface User {
  id?: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
  lastLogin: Timestamp;
  orders?: string[];
  courses?: string[];
}

export interface SupplyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'office' | 'packaging' | 'tech' | 'cleaning';
  subCategory?: string; // e.g., 'Paper', 'Ink', 'Tape'
  image?: string; // URL or emoji icon
  unit: string; // 'Ream', 'Box of 10', 'Each'
  minOrder?: number;
  inStock: boolean;
  isPopular?: boolean;
}
