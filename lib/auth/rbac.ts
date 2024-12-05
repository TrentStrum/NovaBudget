export type Permission =
  | 'read:users'
  | 'write:users'
  | 'delete:users'
  | 'read:billing'
  | 'write:billing'
  | 'read:settings'
  | 'write:settings'
  | 'manage:team'
  | 'manage:billing'
  | 'manage:security';

export type Role = 'owner' | 'admin' | 'member';

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  owner: [
    'read:users',
    'write:users',
    'delete:users',
    'read:billing',
    'write:billing',
    'read:settings',
    'write:settings',
    'manage:team',
    'manage:billing',
    'manage:security',
  ],
  admin: [
    'read:users',
    'write:users',
    'read:billing',
    'read:settings',
    'write:settings',
    'manage:team',
  ],
  member: [
    'read:users',
    'read:settings',
  ],
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole].includes(permission);
}

export function canAccessResource(userRole: Role, requiredPermission: Permission): boolean {
  return hasPermission(userRole, requiredPermission);
}