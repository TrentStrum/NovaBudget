import { http, HttpResponse } from 'msw';
import { Database } from '@/lib/supabase/types';

type User = Database['public']['Tables']['users']['Row'];
type Account = Database['public']['Tables']['accounts']['Row'];
type Transaction = Database['public']['Tables']['transactions']['Row'];
type Budget = Database['public']['Tables']['budgets']['Row'];

const mockUser: User = {
  id: '123',
  email: 'test@example.com',
  created_at: new Date().toISOString(),
};

const mockAccounts: Account[] = [
  {
    id: '1',
    user_id: mockUser.id,
    name: 'Main Checking',
    type: 'checking',
    balance: 5000,
    created_at: new Date().toISOString(),
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    account_id: mockAccounts[0].id,
    amount: 100,
    category: 'groceries',
    description: 'Grocery shopping',
    date: new Date().toISOString(),
    type: 'expense',
    created_at: new Date().toISOString(),
  },
];

const mockBudgets: Budget[] = [
  {
    id: '1',
    user_id: mockUser.id,
    category: 'groceries',
    amount: 500,
    period: 'monthly',
    created_at: new Date().toISOString(),
  },
];

export const handlers = [
  http.post('/auth/login', () => {
    return HttpResponse.json({ user: mockUser, session: { token: 'mock-token' } });
  }),

  http.get('/api/accounts', () => {
    return HttpResponse.json(mockAccounts);
  }),

  http.get('/api/transactions', () => {
    return HttpResponse.json(mockTransactions);
  }),

  http.get('/api/budgets', () => {
    return HttpResponse.json(mockBudgets);
  }),
];