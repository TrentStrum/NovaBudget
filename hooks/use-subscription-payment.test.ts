import { renderHook, act } from '@testing-library/react';
import { useSubscriptionPayment } from './use-subscription-payment';
import { createWrapper } from '@/tests/utils/test-utils';

describe('useSubscriptionPayment', () => {
  it('fetches payment methods successfully', async () => {
    const { result } = renderHook(() => useSubscriptionPayment(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.paymentMethods).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles adding new payment method', async () => {
    const { result } = renderHook(() => useSubscriptionPayment(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.startAddingPaymentMethod();
    });

    expect(result.current.isAddingPaymentMethod).toBe(true);
  });

  it('handles setting default payment method', async () => {
    const { result } = renderHook(() => useSubscriptionPayment(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.setDefaultPaymentMethod('pm_123');
    });

    expect(result.current.isSettingDefault).toBe(false);
  });
});