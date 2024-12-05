import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/auth/login/page';

describe('Authentication Flow', () => {
  it('allows users to log in with valid credentials', async () => {
    render(<LoginPage />);
    
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'pro@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'correct-password');
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });

  it('shows error message with invalid credentials', async () => {
    render(<LoginPage />);
    
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'wrong@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrong-password');
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('maintains button state during authentication', async () => {
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'pro@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'correct-password');
    
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/signing in/i);
    
    await waitFor(() => {
      expect(window.location.pathname).toBe('/dashboard');
    });
  });
});