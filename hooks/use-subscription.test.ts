import { renderHook, act } from '@testing-library/react';
import { useSubscription } from './use-subscription';
import { createWrapper } from '@/tests/utils/test-utils';

describe('useSubscription', () => {
  it('fetches subscription data successfully', async () => {
    const { result } = renderHook(() => useSubscription(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.subscription).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles subscription upgrade', async () => {
    const { result } = renderHook(() => useSubscription(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.upgrade('pro');
    });

    expect(result.current.isUpgrading).toBe(false);
  });

  it('handles subscription cancellation', async () => {
    const { result } = renderHook(() => useSubscription(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.cancel();
    });

    expect(result.current.isCanceled).toBe(true);
  });
});