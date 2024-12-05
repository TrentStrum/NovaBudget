'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from './use-auth-state';
import { authService } from '@/lib/auth/service';
import { useToast } from '@/hooks/use-toast';
import type { LoginCredentials } from '@/lib/auth/types';

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setSession, setStatus } = useAuthState();
  const { toast } = useToast();

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const { user, session } = await authService.login(credentials);
      
      setUser(user);
      setSession(session);
      setStatus('authenticated');
      
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign in',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
}