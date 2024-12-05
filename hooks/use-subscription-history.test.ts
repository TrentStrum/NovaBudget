import { renderHook, act } from '@testing-library/react';
import { useSubscriptionHistory } from './use-subscription-history';
import { createWrapper } from '@/tests/utils/test-utils';

describe('useSubscriptionHistory', () => {
  it('fetches history with pagination', async () => {
    const { result } = renderHook(() => useSubscriptionHistory({ limit: 5 }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.events).toHaveLength(5);
    expect(result.current.hasNextPage).toBe(true);
  });

  it('applies filters correctly', async () => {
    const filters = {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      type: 'payment_succeeded' as const,
    };

    const { result } = renderHook(
      () => useSubscriptionHistory({ filters }),
      { wrapper: createWrapper() }
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.events.every(
      event => event.type === 'payment_succeeded'
    )).toBe(true);
  });
});