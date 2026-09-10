import { ROLES } from '../config/constants';

export const routeConfig = {
  public: [
    { path: '/login', name: 'Login' },
    { path: '/signup', name: 'Signup' },
    { path: '/forgot-password', name: 'Forgot Password' },
    { path: '/reset-password', name: 'Reset Password' },
  ],
  customer: [
    { path: '/customer/dashboard', name: 'Dashboard', roles: [ROLES.CUSTOMER] },
    { path: '/customer/tasks', name: 'My Tasks', roles: [ROLES.CUSTOMER] },
    { path: '/customer/tasks/new', name: 'Post Task', roles: [ROLES.CUSTOMER] },
    { path: '/customer/profile', name: 'Customer Profile', roles: [ROLES.CUSTOMER] },
    { path: '/customer/settings', name: 'Settings', roles: [ROLES.CUSTOMER] },
  ],
};
