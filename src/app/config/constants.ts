import { UserRole } from '@/types';

// Role Constants
export const ROLES = {
  CUSTOMER: 'CUSTOMER' as UserRole,
  PROVIDER: 'PROVIDER' as UserRole,
  ADMIN: 'ADMIN' as UserRole,
} as const;

export const CUSTOMER = 'CUSTOMER' as const;
export const PROVIDER = 'PROVIDER' as const;
export const ADMIN = 'ADMIN' as const;

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CUSTOMER: {
    DASHBOARD: '/customer/dashboard',
    TASKS: '/customer/tasks',
    NEW_TASK: '/customer/tasks/new',
    PROFILE: '/customer/profile',
    SETTINGS: '/customer/settings',
  },
} as const;

export const APP_CONFIG = {
  NAME: 'TaskHub',
  DESCRIPTION: 'On-demand local & remote task marketplace',
  CURRENCY: 'USD',
  CURRENCY_SYMBOL: '$',
} as const;
