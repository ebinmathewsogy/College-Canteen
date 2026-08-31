export type UserRole = 'student' | 'staff';

export interface MenuItem {
  id: string;
  name: string;
  nameMalayalam: string;
  category: 'breakfast' | 'lunch' | 'allday' | 'evening' | 'cafeteria';
  location: 'canteen' | 'cafeteria' | 'both';
  price: number;
  diet: 'veg' | 'nonveg' | 'egg';
  description: string;
  descriptionMalayalam: string;
  tags: string[];
  timing: string;
  popular?: boolean;
}

export interface TokenItem {
  menuItemId: string;
  name: string;
  nameMalayalam: string;
  quantity: number;
  price: number;
}

export interface GeneratedToken {
  id: string;
  tokenNumber: string;
  role: UserRole;
  personName: string;
  personIdentifier: string; // Roll No / Department / Staff ID
  location: 'canteen' | 'cafeteria';
  items: TokenItem[];
  totalAmount: number;
  status: 'active' | 'collected' | 'expired';
  counter: string;
  timestamp: string;
  createdAt: number;
  qrCodeUrl?: string;
}
