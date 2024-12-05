import type { SubscriptionTier, SubscriptionFeature } from './types';

const TIER_LEVELS: Record<SubscriptionTier, number> = {
  free: 0,
  basic: 1,
  pro: 2,
  enterprise: 3,
};

export function canAccessTier(currentTier: SubscriptionTier, requiredTier: SubscriptionTier): boolean {
  return TIER_LEVELS[currentTier] >= TIER_LEVELS[requiredTier];
}

export function hasFeatureAccess(tier: SubscriptionTier, featureId: string): boolean {
  const features = getFeaturesByTier(tier);
  return features.some(feature => feature.id === featureId);
}

export function getFeaturesByTier(tier: SubscriptionTier): SubscriptionFeature[] {
  // Implementation would fetch features from configuration
  return [];
}

export function calculateUsagePercentage(used: number, limit: number): number {
  if (limit === 0) return 100;
  return Math.min((used / limit) * 100, 100);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}