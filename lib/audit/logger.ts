import { prisma } from '../db/prisma';
import type { User } from '@prisma/client';

export type AuditAction =
  | 'user.login'
  | 'user.logout'
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.canceled'
  | 'payment.succeeded'
  | 'payment.failed'
  | 'mfa.enabled'
  | 'mfa.disabled'
  | 'sso.configured'
  | 'api.access';

export interface AuditLogParams {
  tenantId: string;
  userId: string;
  action: AuditAction;
  resource: string;
  details: Record<string, any>;
}

export async function createAuditLog({
  tenantId,
  userId,
  action,
  resource,
  details,
}: AuditLogParams) {
  return prisma.auditLog.create({
    data: {
      tenantId,
      userId,
      action,
      resource,
      details,
    },
  });
}

export async function getAuditLogs(tenantId: string, options?: {
  userId?: string;
  action?: AuditAction;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
  offset?: number;
}) {
  const where = {
    tenantId,
    ...(options?.userId && { userId: options.userId }),
    ...(options?.action && { action: options.action }),
    ...(options?.startDate && options?.endDate && {
      createdAt: {
        gte: options.startDate,
        lte: options.endDate,
      },
    }),
  };

  return prisma.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: options?.limit || 50,
    skip: options?.offset || 0,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}