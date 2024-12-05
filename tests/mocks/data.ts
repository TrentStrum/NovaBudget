export const mockUsers = [
  {
    id: 'user-1',
    email: 'free@example.com',
    subscription_tier: 'free',
  },
  {
    id: 'user-2',
    email: 'pro@example.com',
    subscription_tier: 'pro',
  },
  {
    id: 'user-3',
    email: 'enterprise@example.com',
    subscription_tier: 'enterprise',
  },
];

export const mockSubscriptions = [
  {
    id: 'sub-1',
    user_id: 'user-1',
    tier: 'free',
    status: 'active',
    features: ['basic_analytics', 'single_account'],
  },
  {
    id: 'sub-2',
    user_id: 'user-2',
    tier: 'pro',
    status: 'active',
    features: ['advanced_analytics', 'multiple_accounts', 'api_access'],
  },
  {
    id: 'sub-3',
    user_id: 'user-3',
    tier: 'enterprise',
    status: 'active',
    features: ['all_features', 'priority_support', 'custom_integration'],
  },
];