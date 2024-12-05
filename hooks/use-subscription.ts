'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import type { Subscription, SubscriptionTier } from '@/lib/types/subscription';

interface UseSubscriptionOptions {
  onSubscriptionChange?: (subscription: Subscription) => void;
}

export function useSubscription(options: UseSubscriptionOptions = {}) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: subscription, isLoading } = useQuery<Subscription>({
    queryKey: ['subscription'],
    queryFn: async () => {
      const response = await fetch('/api/billing/subscription');
      if (!response.ok) throw new Error('Failed to fetch subscription');
      return response.json();
    },
  });

  const upgradeMutation = useMutation({
    mutationFn: async (tier: SubscriptionTier) => {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier,
          returnUrl: `${window.location.origin}/billing`,
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create checkout session');
      return response.json();
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to upgrade subscription',
        variant: 'destructive',
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/billing/cancel', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to cancel subscription');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      toast({
        title: 'Subscription Cancelled',
        description: 'Your subscription will end at the current billing period',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription',
        variant: 'destructive',
      });
    },
  });

  const reactivateMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/billing/reactivate', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to reactivate subscription');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] });
      toast({
        title: 'Subscription Reactivated',
        description: 'Your subscription has been reactivated',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to reactivate subscription',
        variant: 'destructive',
      });
    },
  });

  return {
    subscription,
    isLoading,
    isActive: subscription?.status === 'active',
    isTrialing: subscription?.status === 'trialing',
    isCanceled: subscription?.status === 'canceled',
    isPastDue: subscription?.status === 'past_due',
    upgrade: upgradeMutation.mutate,
    cancel: cancelMutation.mutate,
    reactivate: reactivateMutation.mutate,
    isUpgrading: upgradeMutation.isPending,
    isCanceling: cancelMutation.isPending,
    isReactivating: reactivateMutation.isPending,
  };
}