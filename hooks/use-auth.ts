'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { authService, LoginCredentials, SignUpCredentials } from '@/lib/auth/service';
import { AUTH_CONFIG } from '@/lib/auth/config';

export function useAuth() {
  const router = useRouter();
  const { toast } = useToast();

  const login = async (credentials: LoginCredentials) => {
    try {
      await authService.login(credentials);
      router.push(AUTH_CONFIG.redirects.afterLogin);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign in',
        variant: 'destructive',
      });
    }
  };

  const signUp = async (credentials: SignUpCredentials) => {
    try {
      await authService.signUp(credentials);
      
      if (!AUTH_CONFIG.requireEmailConfirmation) {
        // Auto-login after signup in development
        await login(credentials);
      } else {
        toast({
          title: 'Success',
          description: 'Please check your email to verify your account',
        });
        router.push(AUTH_CONFIG.redirects.afterLogout);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create account',
        variant: 'destructive',
      });
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      router.push(AUTH_CONFIG.redirects.afterLogout);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to sign out',
        variant: 'destructive',
      });
    }
  };

  return {
    login,
    signUp,
    logout,
  };
}