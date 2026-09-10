import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { forgotPasswordSchema, ForgotPasswordFormValues } from '@/services/auth';
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
import { Mail, ArrowLeft, Loader2, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [sentTo, setSentTo] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await resetPassword(data.email);
    setSentTo(data.email);
    setEmailSent(true);
  };

  // ─── Success: email sent ───
  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-sky-50 p-4">
        <Card className="max-w-md w-full border-slate-200 shadow-xl bg-white">
          <CardContent className="p-8 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-4 ring-4 ring-emerald-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Check Your Email</h2>
            <p className="text-sm text-slate-500 mb-4">
              If an account exists for <strong className="text-slate-900">{sentTo}</strong>, we've
              sent a password reset link. Please check your inbox and spam folder.
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => {
                  setEmailSent(false);
                  setSentTo('');
                }}
                className="w-full gap-2 border-slate-200"
              >
                <Mail className="w-4 h-4" /> Try a different email
              </Button>
              <Link to="/login" className="block">
                <Button
                  variant="ghost"
                  className="w-full gap-2 text-sky-600 hover:text-sky-700 hover:bg-sky-50"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Button>
              </Link>
            </div>
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
            <div className="mx-auto w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-3 ring-4 ring-amber-100">
              <KeyRound className="w-7 h-7" />
            </div>
            <CardTitle className="text-2xl font-extrabold text-slate-900">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 mt-1">
              No worries. Enter your email and we'll send you a reset link.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 pt-4 px-6">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    error={!!errors.email}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 font-medium">{errors.email.message}</p>
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
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" /> Send Reset Link
                  </>
                )}
              </Button>

              <Link to="/login" className="block">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full gap-2 text-slate-600 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
