'use client';

import { motion } from 'framer-motion';
import { BarChart2, Lock, Wallet, RefreshCcw } from 'lucide-react';

const features = [
  {
    name: 'Bank Integration',
    description: 'Connect your bank accounts securely and automatically sync your transactions.',
    icon: Wallet,
  },
  {
    name: 'Smart Analytics',
    description: 'Get insights into your spending patterns with beautiful charts and reports.',
    icon: BarChart2,
  },
  {
    name: 'Bank-Level Security',
    description: 'Your data is protected with enterprise-grade encryption and security measures.',
    icon: Lock,
  },
  {
    name: 'Real-Time Sync',
    description: 'Always stay up to date with automatic transaction synchronization.',
    icon: RefreshCcw,
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage your finances
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Powerful features to help you track, analyze, and improve your financial health.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.name}</h3>
                <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}