import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';
import { signInSchema, SignInFormValues } from '@/services/auth';
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
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/customer/dashboard';

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/customer/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    setServerError(null);

    const result = await signIn({
      email: data.email,
      password: data.password,
    });

    if (!result.success) {
      setServerError(result.error?.message || 'Sign in failed. Please try again.');
      return;
    }

    // Route based on user role
    const userRole = result.data?.user.role;
    if (userRole === 'CUSTOMER') {
      navigate('/customer/dashboard', { replace: true });
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-sky-50 p-4">
      <div className="w-full max-w-md">
        <Card className="border-slate-200 shadow-xl bg-white">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-sky-600 flex items-center justify-center text-white font-extrabold text-2xl mb-3 shadow-lg">
              T
            </div>
            <CardTitle className="text-2xl font-extrabold text-slate-900">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 mt-1">
              Sign in to your TaskHub account to continue
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4 pt-6 px-6">
              {/* Server Error */}
              {serverError && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p className="font-medium">{serverError}</p>
                </div>
              )}

              {/* Demo Credentials Info */}
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-800">
                <p className="font-bold mb-1">Demo Credentials</p>
                <p>
                  <span className="font-semibold">Customer:</span> sarah.j@example.com
                </p>
                <p>
                  <span className="font-semibold">Provider:</span> alex.r@example.com
                </p>
                <p>
                  <span className="font-semibold">Admin:</span> elena.admin@taskhub.com
                </p>
                <p className="mt-1">
                  <span className="font-semibold">Password:</span> Password1
                </p>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="login-email"
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

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-bold text-slate-700"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-sky-600 font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    error={!!errors.password}
                    {...register('password')}
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
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1 font-medium">
                    {errors.password.message}
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
                    <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" /> Sign In
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-slate-500">
                Don't have an account?{' '}
                <Link to="/signup" className="text-sky-600 font-bold hover:underline">
                  Create one now
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};
