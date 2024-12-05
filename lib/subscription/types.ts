export type SubscriptionTier = 'free' | 'basic' | 'pro' | 'enterprise';

export type SubscriptionStatus = 
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'incomplete'
  | 'trialing';

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  limit?: number;
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  description: string;
  price: number;
  features: SubscriptionFeature[];
  limits: {
    users: number;
    storage: number;
    apiRequests: number;
  };
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  trialEnd?: string;
  usage: {
    users: number;
    storage: number;
    apiRequests: number;
  };
}

export interface SubscriptionEvent {
  id: string;
  type: 'created' | 'updated' | 'canceled' | 'payment_succeeded' | 'payment_failed';
  date: string;
  details: Record<string, any>;
}