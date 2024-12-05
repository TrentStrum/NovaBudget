'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

export function PricingSection() {
  return (
    <section className="py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose the plan that best fits your needs. All plans include a 14-day free trial.
          </p>
        </motion.div>
        <div className="isolate mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:mt-20 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card
                className={cn(
                  'flex h-full flex-col p-8',
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
                <Button className="mt-6" variant={tier.id === 'pro' ? 'default' : 'outline'}>
                  Get started
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}