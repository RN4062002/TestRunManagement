import { useAuthContext } from '@/app/providers/AuthProvider';

/**
 * Primary auth hook consumed by all components.
 *
 * Returns: user, role, isAuthenticated, isLoading,
 *          signUp, signIn, signOut, resetPassword, setRole
 */
export function useAuth() {
  return useAuthContext();
}
