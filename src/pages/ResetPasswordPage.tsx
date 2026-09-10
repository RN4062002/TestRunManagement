import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, ResetPasswordFormValues } from '@/services/auth';
import { authService } from '@/services/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  LogIn,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || 'demo-token';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setServerError(null);
    const result = await authService.confirmResetPassword({
      token,
      newPassword: data.newPassword,
    });

    if (!result.success) {
      setServerError(result.error?.message || 'Reset failed. Please try again.');
      return;
    }

    setResetDone(true);
  };

  // ─── Success ───
  if (resetDone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-sky-50 p-4">
        <Card className="max-w-md w-full border-slate-200 shadow-xl bg-white">
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 ring-4 ring-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
              Password Reset Complete
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Your password has been updated successfully. You can now sign in with your new
              password.
            </p>
            <Link to="/login">
              <Button className="w-full gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold h-11">
                <LogIn className="w-4 h-4" /> Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Form ───
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-sky-50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-slate-200 shadow-xl bg-white">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 mb-3 ring-4 ring-sky-100">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <CardTitle className="text-2xl font-extrabold text-slate-900">
              Set New Password
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 mt-1">
              Choose a strong new password for your TaskHub account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 pt-4 px-6">
              {serverError && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="font-medium">{serverError}</p>
                </div>
              )}

              {/* New Password */}
              <div>
                <label
                  htmlFor="reset-password"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="reset-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="pl-10 pr-10"
                    error={!!errors.newPassword}
                    {...register('newPassword')}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="reset-confirm"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="reset-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="Re-enter new password"
                    className="pl-10 pr-10"
                    error={!!errors.confirmPassword}
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 px-6 pt-2 pb-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold h-11 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Resetting...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Reset Password
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
