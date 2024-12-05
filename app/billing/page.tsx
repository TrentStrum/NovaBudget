'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { SubscriptionCard } from '@/components/billing/subscription-card';
import { UsageMeter } from '@/components/billing/usage-meter';
import { BillingHistory } from '@/components/billing/billing-history';
import { PaymentMethod } from '@/components/billing/payment-method';
import { SUBSCRIPTION_PLANS } from '@/lib/config/subscription-plans';
import { useToast } from '@/components/ui/use-toast';

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { data: subscription } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const response = await fetch('/api/billing/subscription');
      if (!response.ok) throw new Error('Failed to fetch subscription');
      return response.json();
    },
  });

  const { data: paymentMethods } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const response = await fetch('/api/billing/payment-methods');
      if (!response.ok) throw new Error('Failed to fetch payment methods');
      return response.json();
    },
  });

  const { data: invoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const response = await fetch('/api/billing/invoices');
      if (!response.ok) throw new Error('Failed to fetch invoices');
      return response.json();
    },
  });

  const handleUpgrade = async (planId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/billing/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: planId,
          returnUrl: `${window.location.origin}/billing`,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initiate upgrade process',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-8">Billing & Subscription</h1>

      <Tabs defaultValue="subscription">
        <TabsList className="mb-8">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="subscription">
          <div className="grid gap-8 md:grid-cols-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                isCurrentPlan={subscription?.tier === plan.id}
                onSelect={handleUpgrade}
                loading={loading}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage">
          {subscription && (
            <div className="space-y-6">
              {SUBSCRIPTION_PLANS
                .find((plan) => plan.id === subscription.tier)
                ?.features.map((feature) => (
                  <UsageMeter
                    key={feature.id}
                    subscription={subscription}
                    feature={feature}
                  />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="payment">
          {paymentMethods && (
            <PaymentMethod
              paymentMethods={paymentMethods}
              onAddNew={() => {}}
              onSetDefault={async () => {}}
              onRemove={async () => {}}
            />
          )}
        </TabsContent>

        <TabsContent value="history">
          {invoices && <BillingHistory invoices={invoices} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}