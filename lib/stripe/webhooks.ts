import { stripe } from './client';
import { prisma } from '../db/prisma';
import { createAuditLog } from '../audit/logger';
import { Stripe } from 'stripe';

export async function handleSubscriptionCreated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  const customerId = subscription.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.subscription.create({
    data: {
      id: subscription.id,
      userId: user.id,
      status: subscription.status,
      tier: subscription.metadata.tier || 'basic',
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      usage: {
        users: 0,
        storage: 0,
        apiRequests: 0,
      },
    },
  });

  await createAuditLog({
    tenantId: user.id,
    userId: user.id,
    action: 'subscription.created',
    resource: 'subscription',
    details: {
      subscriptionId: subscription.id,
      tier: subscription.metadata.tier,
    },
  });
}

export async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: subscription.status,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    },
  });
}

export async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: 'canceled' },
  });

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: subscription.customer as string },
  });

  if (user) {
    await createAuditLog({
      tenantId: user.id,
      userId: user.id,
      action: 'subscription.canceled',
      resource: 'subscription',
      details: {
        subscriptionId: subscription.id,
      },
    });
  }
}

export async function handlePaymentSucceeded(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerId = invoice.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (user) {
    await createAuditLog({
      tenantId: user.id,
      userId: user.id,
      action: 'payment.succeeded',
      resource: 'payment',
      details: {
        invoiceId: invoice.id,
        amount: invoice.amount_paid,
      },
    });
  }
}

export async function handlePaymentFailed(event: Stripe.Event) {
  const invoice = event.data.object as Stripe.Invoice;
  const customerId = invoice.customer as string;

  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
  });

  if (user) {
    await createAuditLog({
      tenantId: user.id,
      userId: user.id,
      action: 'payment.failed',
      resource: 'payment',
      details: {
        invoiceId: invoice.id,
        amount: invoice.amount_due,
      },
    });
  }
}