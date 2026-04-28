/**
 * types.ts
 */

export enum UserRole {
  INVESTOR = 'investor',
  OPERATOR = 'operator',
  ADMIN = 'admin'
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: any;
}

export interface InvestmentOpportunity {
  id: string;
  title: string;
  cropType: string;
  duration: string;
  expectedReturn: string;
  minInvestment: number;
  location: string;
  images: string[];
  description: string;
  status: 'active' | 'closed';
}

export interface Activity {
  id: string;
  farmId: string;
  plotId: string;
  type: 'planting' | 'irrigation' | 'fertilization' | 'harvesting' | 'other';
  notes: string;
  imageUrl?: string;
  timestamp: any;
  operatorId: string;
  operatorName: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  ownerId: string;
  totalArea: string;
  plots: Plot[];
}

export interface Plot {
  id: string;
  name: string;
  currentCrop: string;
  status: string;
}

export interface Investment {
  id: string;
  investorId: string;
  opportunityId: string;
  amount: number;
  investedAt: any;
  status: 'active' | 'matured' | 'withdrawn';
}
