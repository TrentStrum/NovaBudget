'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

interface SubscriptionEvent {
  id: string;
  type: 'created' | 'updated' | 'canceled' | 'payment_succeeded' | 'payment_failed';
  date: string;
  details: Record<string, any>;
}

interface UseSubscriptionHistoryOptions {
  limit?: number;
  filters?: {
    startDate?: Date;
    endDate?: Date;
    type?: SubscriptionEvent['type'];
  };
}

export function useSubscriptionHistory({
  limit = 10,
  filters,
}: UseSubscriptionHistoryOptions = {}) {
  const { toast } = useToast();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['subscription-history', filters],
    queryFn: async ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams({
        offset: String(pageParam * limit),
        limit: String(limit),
        ...(filters?.startDate && { startDate: filters.startDate.toISOString() }),
        ...(filters?.endDate && { endDate: filters.endDate.toISOString() }),
        ...(filters?.type && { type: filters.type }),
      });

      const response = await fetch(`/api/billing/history?${searchParams}`);
      if (!response.ok) throw new Error('Failed to fetch subscription history');
      return response.json();
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === limit ? pages.length : undefined;
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to load subscription history',
        variant: 'destructive',
      });
    },
  });

  const events = data?.pages.flat() ?? [];

  return {
    events,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  };
}