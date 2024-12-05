import { mockSubscriptions } from '../mocks/data';

export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export function hasPermission(tier: SubscriptionTier, feature: string): boolean {
  const subscription = mockSubscriptions.find(s => s.tier === tier);
  return subscription?.features.includes(feature) || false;
}

export function getFeaturesByTier(tier: SubscriptionTier): string[] {
  const subscription = mockSubscriptions.find(s => s.tier === tier);
  return subscription?.features || [];
}

export function canAccessFeature(userTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
  const tiers: SubscriptionTier[] = ['free', 'pro', 'enterprise'];
  const userTierIndex = tiers.indexOf(userTier);
  const requiredTierIndex = tiers.indexOf(requiredTier);
  
  return userTierIndex >= requiredTierIndex;
}