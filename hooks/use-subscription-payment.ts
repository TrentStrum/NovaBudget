'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

interface PaymentMethod {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

export function useSubscriptionPayment() {
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: paymentMethods, isLoading } = useQuery<PaymentMethod[]>({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const response = await fetch('/api/billing/payment-methods');
      if (!response.ok) throw new Error('Failed to fetch payment methods');
      return response.json();
    },
  });

  const addPaymentMethodMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/billing/payment-methods/setup', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to set up payment method');
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
        description: 'Failed to add payment method',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setIsAddingPaymentMethod(false);
    },
  });

  const setDefaultPaymentMethodMutation = useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const response = await fetch('/api/billing/payment-methods/default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId }),
      });
      if (!response.ok) throw new Error('Failed to set default payment method');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: 'Success',
        description: 'Default payment method updated',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update default payment method',
        variant: 'destructive',
      });
    },
  });

  const removePaymentMethodMutation = useMutation({
    mutationFn: async (paymentMethodId: string) => {
      const response = await fetch(`/api/billing/payment-methods/${paymentMethodId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove payment method');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: 'Success',
        description: 'Payment method removed',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to remove payment method',
        variant: 'destructive',
      });
    },
  });

  const startAddingPaymentMethod = () => {
    setIsAddingPaymentMethod(true);
    addPaymentMethodMutation.mutate();
  };

  return {
    paymentMethods,
    isLoading,
    isAddingPaymentMethod,
    startAddingPaymentMethod,
    setDefaultPaymentMethod: setDefaultPaymentMethodMutation.mutate,
    removePaymentMethod: removePaymentMethodMutation.mutate,
    isSettingDefault: setDefaultPaymentMethodMutation.isPending,
    isRemoving: removePaymentMethodMutation.isPending,
  };
}