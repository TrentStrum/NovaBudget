import {
  canAccessTier,
  hasFeatureAccess,
  calculateUsagePercentage,
  formatCurrency,
} from '@/lib/subscription/utils';
import type { SubscriptionTier } from '@/lib/subscription/types';

describe('Subscription Utils', () => {
  describe('canAccessTier', () => {
    it('allows access to lower tiers', () => {
      expect(canAccessTier('enterprise', 'basic')).toBe(true);
      expect(canAccessTier('pro', 'basic')).toBe(true);
    });

    it('allows access to same tier', () => {
      expect(canAccessTier('pro', 'pro')).toBe(true);
    });

    it('denies access to higher tiers', () => {
      expect(canAccessTier('basic', 'pro')).toBe(false);
      expect(canAccessTier('free', 'enterprise')).toBe(false);
    });
  });

  describe('calculateUsagePercentage', () => {
    it('calculates correct percentage', () => {
      expect(calculateUsagePercentage(50, 100)).toBe(50);
      expect(calculateUsagePercentage(150, 100)).toBe(100);
    });

    it('handles zero limit', () => {
      expect(calculateUsagePercentage(50, 0)).toBe(100);
    });
  });

  describe('formatCurrency', () => {
    it('formats currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });
});