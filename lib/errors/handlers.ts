import { AppError } from './types';
import { toast } from '@/components/ui/use-toast';

export function handleAuthError(error: AppError) {
  switch (error.code) {
    case 'auth/invalid-credentials':
      toast({
        title: 'Authentication Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      break;
    case 'auth/email-already-in-use':
      toast({
        title: 'Registration Error',
        description: 'Email is already registered',
        variant: 'destructive',
      });
      break;
    default:
      toast({
        title: 'Authentication Error',
        description: error.message || 'An error occurred during authentication',
        variant: 'destructive',
      });
  }
}

export function handleSubscriptionError(error: AppError) {
  switch (error.code) {
    case 'subscription/payment-failed':
      toast({
        title: 'Payment Failed',
        description: 'Your payment could not be processed',
        variant: 'destructive',
      });
      break;
    case 'subscription/limit-exceeded':
      toast({
        title: 'Limit Exceeded',
        description: 'You have reached your subscription limit',
        variant: 'destructive',
      });
      break;
    default:
      toast({
        title: 'Subscription Error',
        description: error.message || 'An error occurred with your subscription',
        variant: 'destructive',
      });
  }
}

export function handleApiError(error: AppError) {
  if (error.status === 429) {
    toast({
      title: 'Rate Limit Exceeded',
      description: 'Please try again later',
      variant: 'destructive',
    });
    return;
  }

  toast({
    title: 'API Error',
    description: error.message || 'An error occurred while processing your request',
    variant: 'destructive',
  });
}