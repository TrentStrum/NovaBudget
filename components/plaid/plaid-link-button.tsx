'use client';

import { usePlaidLink } from 'react-plaid-link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface PlaidLinkButtonProps {
  linkToken: string;
  onSuccess: () => void;
}

export function PlaidLinkButton({ linkToken, onSuccess }: PlaidLinkButtonProps) {
  const { toast } = useToast();

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      try {
        const response = await fetch('/api/plaid/exchange-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public_token }),
        });

        if (!response.ok) throw new Error('Failed to exchange token');
        
        onSuccess();
        toast({
          title: 'Success',
          description: 'Bank account connected successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to connect bank account',
          variant: 'destructive',
        });
      }
    },
    onExit: (err, metadata) => {
      if (err) {
        toast({
          title: 'Error',
          description: 'Failed to connect bank account',
          variant: 'destructive',
        });
      }
    },
  });

  return (
    <Button
      onClick={() => open()}
      disabled={!ready}
    >
      Connect Bank Account
    </Button>
  );
}