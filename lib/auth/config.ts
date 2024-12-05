export const AUTH_CONFIG = {
  requireEmailConfirmation: false, // Set to true in production
  redirects: {
    afterLogin: '/dashboard',
    afterLogout: '/auth/login',
    afterSignUp: '/dashboard',
  },
} as const;