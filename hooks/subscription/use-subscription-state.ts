'use client';

import { create } from 'zustand';
import type { Subscription } from '@/lib/subscription/types';

interface SubscriptionStore {
  subscription: Subscription | null;
  isLoading: boolean;
  error: Error | null;
  setSubscription: (subscription: Subscription | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

const initialState = {
  subscription: null,
  isLoading: false,
  error: null,
};

export const useSubscriptionState = create<SubscriptionStore>((set) => ({
  ...initialState,
  setSubscription: (subscription) => set({ subscription }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
}));