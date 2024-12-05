import { SubscriptionPlan } from '../types/subscription';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for small teams and startups',
    price: 29,
    features: [
      {
        id: 'users',
        name: 'Team Members',
        description: 'Number of team members allowed',
        limit: 5,
      },
      {
        id: 'storage',
        name: 'Storage',
        description: 'Storage space for files and documents',
        limit: 10, // GB
      },
      {
        id: 'api_requests',
        name: 'API Requests',
        description: 'Monthly API requests allowed',
        limit: 10000,
      },
    ],
    limits: {
      users: 5,
      storage: 10,
      apiRequests: 10000,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing businesses and teams',
    price: 99,
    features: [
      {
        id: 'users',
        name: 'Team Members',
        description: 'Number of team members allowed',
        limit: 20,
      },
      {
        id: 'storage',
        name: 'Storage',
        description: 'Storage space for files and documents',
        limit: 50, // GB
      },
      {
        id: 'api_requests',
        name: 'API Requests',
        description: 'Monthly API requests allowed',
        limit: 50000,
      },
    ],
    limits: {
      users: 20,
      storage: 50,
      apiRequests: 50000,
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: 299,
    features: [
      {
        id: 'users',
        name: 'Team Members',
        description: 'Unlimited team members',
      },
      {
        id: 'storage',
        name: 'Storage',
        description: 'Unlimited storage space',
      },
      {
        id: 'api_requests',
        name: 'API Requests',
        description: 'Unlimited API requests',
      },
    ],
    limits: {
      users: Infinity,
      storage: Infinity,
      apiRequests: Infinity,
    },
  },
];