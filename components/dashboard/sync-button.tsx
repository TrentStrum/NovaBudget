'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { usePlaidSync } from '@/hooks/use-plaid-sync';
import { SubscriptionGuard } from '@/components/subscription/subscription-guard';

export function SyncButton() {
  const { mutate: syncTransactions, isPending } = usePlaidSync();

  return (
    <SubscriptionGuard requiredTier="basic">
      <Button
        onClick={() => syncTransactions()}
        disabled={isPending}
        variant="outline"
        size="sm"
      >
        <RefreshCw className={`h-4 w-4 mr-2 ${isPending ? 'animate-spin' : ''}`} />
        {isPending ? 'Syncing...' : 'Sync Now'}
      </Button>
    </SubscriptionGuard>
  );
}