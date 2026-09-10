import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleGuard } from './RoleGuard';
import { ROLES } from '../config/constants';
import { MainLayout } from '@/components/layout/MainLayout';

// Auth Pages
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Customer Feature Pages
import { CustomerDashboardPage } from '@/features/customer/pages/CustomerDashboardPage';
import { CustomerTasksPage } from '@/features/customer/pages/CustomerTasksPage';
import { NewTaskPage } from '@/features/customer/pages/NewTaskPage';
import { CustomerProfilePage } from '@/features/customer/pages/CustomerProfilePage';
import { CustomerSettingsPage } from '@/features/customer/pages/CustomerSettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/customer/dashboard" replace />,
  },

  // ─── Public Auth Routes ───
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },

  // ─── Protected Customer Routes ───
  {
    path: '/customer',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={[ROLES.CUSTOMER]}>
          <MainLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <CustomerDashboardPage />,
      },
      {
        path: 'tasks',
        element: <CustomerTasksPage />,
      },
      {
        path: 'tasks/new',
        element: <NewTaskPage />,
      },
      {
        path: 'profile',
        element: <CustomerProfilePage />,
      },
      {
        path: 'settings',
        element: <CustomerSettingsPage />,
      },
    ],
  },

  // ─── 404 ───
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
