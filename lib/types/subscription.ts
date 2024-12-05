export type SubscriptionTier = 'basic' | 'pro' | 'enterprise';

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete';

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