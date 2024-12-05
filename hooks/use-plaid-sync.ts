'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export function usePlaidSync() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/plaid/sync-transactions', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to sync transactions');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
      toast({
        title: 'Success',
        description: 'Transactions synced successfully',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to sync transactions',
        variant: 'destructive',
      });
    },
  });
}