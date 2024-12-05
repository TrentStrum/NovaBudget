export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  prices: {
    basic: process.env.STRIPE_BASIC_PRICE_ID!,
    pro: process.env.STRIPE_PRO_PRICE_ID!,
    enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
  },
} as const;

if (!STRIPE_CONFIG.publishableKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

if (!STRIPE_CONFIG.webhookSecret) {
  throw new Error('Missing STRIPE_WEBHOOK_SECRET');
}

Object.entries(STRIPE_CONFIG.prices).forEach(([tier, priceId]) => {
  if (!priceId) {
    throw new Error(`Missing Stripe price ID for ${tier} tier`);
  }
});