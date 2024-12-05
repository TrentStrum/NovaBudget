'use client';

import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/use-subscription';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  requiredTier: 'basic' | 'pro' | 'enterprise';
}

const TIER_LEVELS = {
  basic: 0,
  pro: 1,
  enterprise: 2,
};

export function SubscriptionGuard({ children, requiredTier }: SubscriptionGuardProps) {
  const router = useRouter();
  const { data: subscription, isLoading } = useSubscription();

  if (isLoading) {
    return null;
  }

  const currentTierLevel = subscription ? TIER_LEVELS[subscription.tier as keyof typeof TIER_LEVELS] : -1;
  const requiredTierLevel = TIER_LEVELS[requiredTier];

  if (currentTierLevel < requiredTierLevel) {
    return (
      <Alert className="max-w-xl mx-auto my-8">
        <h3 className="font-semibold mb-2">Feature not available</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This feature requires the {requiredTier} plan or higher.
          Upgrade your subscription to access this feature.
        </p>
        <Button onClick={() => router.push('/pricing')}>
          View Plans
        </Button>
      </Alert>
    );
  }

  return children;
}