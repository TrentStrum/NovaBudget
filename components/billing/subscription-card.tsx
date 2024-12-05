'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SubscriptionPlan } from '@/lib/types/subscription';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  onSelect: (planId: string) => void;
  loading?: boolean;
}

export function SubscriptionCard({
  plan,
  isCurrentPlan,
  onSelect,
  loading,
}: SubscriptionCardProps) {
  return (
    <Card className={cn(
      'flex flex-col p-6',
      isCurrentPlan && 'border-2 border-primary'
    )}>
      <div className="mb-4">
        <h3 className="text-2xl font-bold">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
      </div>

      <div className="mb-6">
        <span className="text-4xl font-bold">${plan.price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>

      <div className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature.id} className="flex items-start gap-3">
              <Check className="h-4 w-4 mt-1 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium">{feature.name}</p>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
                {feature.limit && (
                  <p className="text-sm text-muted-foreground">
                    Up to {feature.limit.toLocaleString()} {feature.limit === Infinity ? '' : 'units'}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={() => onSelect(plan.id)}
        disabled={loading || isCurrentPlan}
        className="mt-6 w-full"
        variant={isCurrentPlan ? 'secondary' : 'default'}
      >
        {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
      </Button>
    </Card>
  );
}