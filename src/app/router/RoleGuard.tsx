import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserRole } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ROLES } from '@/app/config/constants';

interface RoleGuardProps {
  allowedRoles: UserRole | UserRole[];
  fallbackUrl?: string;
  children?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  allowedRoles,
  fallbackUrl,
  children,
}) => {
  const { role, isAuthenticated, setRole } = useAuth();

  const allowedArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedArray.includes(role)) {
    if (fallbackUrl) {
      return <Navigate to={fallbackUrl} replace />;
    }

    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-amber-200 bg-amber-50/50 shadow-md">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mb-3">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl text-slate-900">Access Restricted</CardTitle>
            <CardDescription className="text-slate-600 mt-1">
              Your active role <strong className="text-slate-900 font-semibold">{role}</strong> does not have permission to view this section.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-slate-500 text-center">
            This module requires the <strong className="text-amber-800">{allowedArray.join(' or ')}</strong> role.
          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-2">
            <Button
              className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              onClick={() => setRole(allowedArray[0])}
            >
              Switch Role to {allowedArray[0]}
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2 border-slate-200"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" /> Go Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return children ? <>{children}</> : <Outlet />;
};
