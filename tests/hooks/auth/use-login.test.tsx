import { renderHook, act } from '@testing-library/react';
import { useLogin } from '@/hooks/auth/use-login';
import { authService } from '@/lib/auth/service';
import { createWrapper } from '../../utils/test-utils';

vi.mock('@/lib/auth/service');

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('handles successful login', async () => {
    const mockUser = { id: '1', email: 'test@example.com' };
    const mockSession = { user: mockUser, token: 'token', expiresAt: 123456789 };
    
    vi.mocked(authService.login).mockResolvedValueOnce({
      user: mockUser,
      session: mockSession,
    });

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('handles login error', async () => {
    vi.mocked(authService.login).mockRejectedValueOnce(
      new Error('Invalid credentials')
    );

    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'wrong-password',
      });
    });

    expect(result.current.isLoading).toBe(false);
  });
});