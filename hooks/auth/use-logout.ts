'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from './use-auth-state';
import { authService } from '@/lib/auth/service';
import { useToast } from '@/hooks/use-toast';

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { reset } = useAuthState();
  const { toast } = useToast();

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      
      reset();
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign out',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logout,
    isLoading,
  };
}