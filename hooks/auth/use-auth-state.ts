'use client';

import { create } from 'zustand';
import type { AuthState } from '@/lib/auth/types';

interface AuthStore extends AuthState {
  setStatus: (status: AuthState['status']) => void;
  setUser: (user: AuthState['user']) => void;
  setSession: (session: AuthState['session']) => void;
  reset: () => void;
}

const initialState: AuthState = {
  status: 'loading',
  user: null,
  session: null,
};

export const useAuthState = create<AuthStore>((set) => ({
  ...initialState,
  setStatus: (status) => set({ status }),
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  reset: () => set(initialState),
}));