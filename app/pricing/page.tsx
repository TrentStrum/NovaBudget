'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

const tiers = [
  {
    name: 'Basic',
    id: 'basic',
    price: '$9',
    description: 'Essential features for personal finance',
    features: [
      'Connect up to 2 bank accounts',
      'Basic transaction tracking',
      'Monthly budget planning',
      'Basic reports and analytics',
    ],
  },
  {
    name: 'Pro',
    id: 'pro',
    price: '$19',
    description: 'Advanced features for power users',
    features: [
      'Connect unlimited bank accounts',
      'Advanced transaction categorization',
      'Custom budget templates',
      'Advanced analytics and insights',
      'Export data in multiple formats',
    ],
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: '$49',
    description: 'Complete solution for businesses',
    features: [
      'Everything in Pro',
      'Multiple user accounts',
      'Team collaboration tools',
      'API access',
      'Priority support',
      'Custom integrations',
    ],
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubscribe = async (tierId: string) => {
    try {
      setLoading(tierId);
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tierId,
          returnUrl: `${window.location.origin}/dashboard`,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create checkout session',
        variant: 'destructive',
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                'p-8 ring-1 ring-muted',
                tier.id === 'pro' && 'ring-2 ring-primary'
              )}
            >
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-sm font-semibold text-muted-foreground">/month</span>
              </p>
              <Button
                className="mt-6 w-full"
                onClick={() => handleSubscribe(tier.id)}
                disabled={loading === tier.id}
              >
                {loading === tier.id ? 'Processing...' : 'Subscribe'}
              </Button>
              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}