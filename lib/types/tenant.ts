export interface Tenant {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  ownerId: string;
  settings: {
    customDomain?: string;
    branding: {
      logo?: string;
      primaryColor?: string;
      secondaryColor?: string;
    };
    security: {
      mfaRequired: boolean;
      ssoEnabled: boolean;
      allowedEmailDomains: string[];
    };
  };
  subscription: {
    id: string;
    tier: string;
  };
}

export interface TenantUser {
  id: string;
  tenantId: string;
  userId: string;
  role: 'owner' | 'admin' | 'member';
  permissions: string[];
  joinedAt: string;
}