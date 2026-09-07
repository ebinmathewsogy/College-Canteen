export type UserRole = 'student' | 'staff';

export type MenuCategory = 
  | 'all'
  | 'meals' 
  | 'breakfast' 
  | 'snacks' 
  | 'teacoffee' 
  | 'icecream' 
  | 'juices' 
  | 'bakery'
  | 'allday';

export interface MenuItem {
  id: string;
  name: string;
  nameMalayalam?: string;
  category: MenuCategory;
  price: number;
  diet: 'veg' | 'nonveg' | 'egg';
  description: string;
  descriptionMalayalam?: string;
  tags: string[];
  timing: string;
  isFullTime: boolean; // Available full-time throughout canteen working hours
  popular?: boolean;
  imageEmoji?: string;
}

export interface TokenItem {
  menuItemId: string;
  name: string;
  nameMalayalam?: string;
  quantity: number;
  price: number;
}

export type TokenStatus = 'active' | 'preparing' | 'ready' | 'collected' | 'expired' | 'cancelled';

export interface GeneratedToken {
  id: string;
  tokenNumber: string;
  role: UserRole;
  personName: string;
  personIdentifier: string; // Roll No / Department / Staff ID
  location: 'canteen';
  items: TokenItem[];
  totalAmount: number;
  status: TokenStatus;
  counter: string;
  timestamp: string;
  createdAt: number;
  qrCodeUrl?: string;
  readyAt?: number;
  completedAt?: number;
  notes?: string;
}

