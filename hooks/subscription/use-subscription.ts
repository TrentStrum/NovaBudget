'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSubscriptionState } from './use-subscription-state';
import { useToast } from '@/hooks/use-toast';
import type { SubscriptionTier } from '@/lib/subscription/types';

export function useSubscription() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setSubscription, setLoading, setError } = useSubscriptionState();

  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const response = await fetch('/api/billing/subscription');
      if (!response.ok) throw new Error('Failed to fetch subscription');
      return response.json();
    },
    onSuccess: (data) => setSubscription(data),
    onError: (error) => setError(error as Error),
  });

  const upgradeMutation = useMutation({
    mutationFn: async (tier: SubscriptionTier) => {
      setLoading(true);
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
    onSettled: () => setLoading(false),
  });

  const cancelMutation = useMutation({
    mutationFn: async () => {
      setLoading(true);
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
    onSettled: () => setLoading(false),
  });

  return {
    subscription,
    isActive: subscription?.status === 'active',
    isTrialing: subscription?.status === 'trialing',
    isCanceled: subscription?.status === 'canceled',
    isPastDue: subscription?.status === 'past_due',
    upgrade: upgradeMutation.mutate,
    cancel: cancelMutation.mutate,
    isUpgrading: upgradeMutation.isPending,
    isCanceling: cancelMutation.isPending,
  };
}