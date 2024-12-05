'use client';

import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import type { Subscription } from '@/lib/types/subscription';

interface UsageMeterProps {
  subscription: Subscription;
  feature: {
    id: string;
    name: string;
    description: string;
    limit?: number;
  };
}

export function UsageMeter({ subscription, feature }: UsageMeterProps) {
  const usage = subscription.usage[feature.id as keyof typeof subscription.usage] || 0;
  const limit = feature.limit || Infinity;
  const percentage = limit === Infinity ? 0 : (usage / limit) * 100;

  return (
    <Card className="p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{feature.name}</h4>
          <p className="text-sm text-muted-foreground">{feature.description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">
            {usage.toLocaleString()} / {limit === Infinity ? '∞' : limit.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">
            {percentage.toFixed(1)}% used
          </p>
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
    </Card>
  );
}