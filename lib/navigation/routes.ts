import { Role } from '@/lib/auth/rbac';

export type AppRoute = {
  path: string;
  label: string;
  icon?: string;
  requiredRole?: Role;
  requiredTier?: 'basic' | 'pro' | 'enterprise';
  children?: AppRoute[];
};

export const APP_ROUTES: AppRoute[] = [
  {
    path: '/dashboard',
    label: 'Dashboard',
    icon: 'layout-dashboard',
  },
  {
    path: '/transactions',
    label: 'Transactions',
    icon: 'receipt',
  },
  {
    path: '/budgets',
    label: 'Budgets',
    icon: 'piggy-bank',
    requiredTier: 'basic',
  },
  {
    path: '/accounts',
    label: 'Accounts',
    icon: 'wallet',
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: 'settings',
    children: [
      {
        path: '/settings/profile',
        label: 'Profile',
      },
      {
        path: '/settings/billing',
        label: 'Billing',
      },
      {
        path: '/settings/security',
        label: 'Security',
      },
      {
        path: '/settings/team',
        label: 'Team',
        requiredTier: 'pro',
      },
    ],
  },
];