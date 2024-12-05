import { hasPermission, getFeaturesByTier, canAccessFeature } from '../utils/subscription-utils';

describe('Subscription Utilities', () => {
  describe('hasPermission', () => {
    it('correctly checks feature access for free tier', () => {
      expect(hasPermission('free', 'basic_analytics')).toBe(true);
      expect(hasPermission('free', 'advanced_analytics')).toBe(false);
    });

    it('correctly checks feature access for pro tier', () => {
      expect(hasPermission('pro', 'advanced_analytics')).toBe(true);
      expect(hasPermission('pro', 'priority_support')).toBe(false);
    });

    it('correctly checks feature access for enterprise tier', () => {
      expect(hasPermission('enterprise', 'priority_support')).toBe(true);
      expect(hasPermission('enterprise', 'custom_integration')).toBe(true);
    });
  });

  describe('getFeaturesByTier', () => {
    it('returns correct features for each tier', () => {
      expect(getFeaturesByTier('free')).toContain('basic_analytics');
      expect(getFeaturesByTier('pro')).toContain('api_access');
      expect(getFeaturesByTier('enterprise')).toContain('priority_support');
    });

    it('returns empty array for invalid tier', () => {
      expect(getFeaturesByTier('invalid' as any)).toEqual([]);
    });
  });

  describe('canAccessFeature', () => {
    it('correctly determines feature access based on tier hierarchy', () => {
      expect(canAccessFeature('free', 'free')).toBe(true);
      expect(canAccessFeature('free', 'pro')).toBe(false);
      expect(canAccessFeature('pro', 'free')).toBe(true);
      expect(canAccessFeature('enterprise', 'pro')).toBe(true);
    });
  });
});