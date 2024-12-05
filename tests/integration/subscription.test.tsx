import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import { PricingPage } from '@/app/pricing/page';
import { mockUsers } from '../mocks/data';

describe('Subscription Management', () => {
  const mockUser = mockUsers[0]; // Free tier user

  beforeEach(() => {
    // Mock authenticated user
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ user: mockUser }),
      } as Response)
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('displays correct pricing tiers', () => {
    render(<PricingPage />);
    
    expect(screen.getByText(/basic/i)).toBeInTheDocument();
    expect(screen.getByText(/pro/i)).toBeInTheDocument();
    expect(screen.getByText(/enterprise/i)).toBeInTheDocument();
  });

  it('handles tier upgrade successfully', async () => {
    render(<PricingPage />);
    
    const upgradeButton = screen.getByRole('button', { name: /upgrade to pro/i });
    fireEvent.click(upgradeButton);
    
    await waitFor(() => {
      expect(screen.getByText(/subscription upgraded/i)).toBeInTheDocument();
    });
  });

  it('shows feature differences between tiers', () => {
    render(<PricingPage />);
    
    expect(screen.getByText(/basic analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/advanced analytics/i)).toBeInTheDocument();
    expect(screen.getByText(/priority support/i)).toBeInTheDocument();
  });

  it('handles payment errors gracefully', async () => {
    // Mock failed payment
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
      Promise.reject(new Error('Payment failed'))
    );

    render(<PricingPage />);
    
    const upgradeButton = screen.getByRole('button', { name: /upgrade to pro/i });
    fireEvent.click(upgradeButton);
    
    await waitFor(() => {
      expect(screen.getByText(/payment failed/i)).toBeInTheDocument();
    });
  });
});