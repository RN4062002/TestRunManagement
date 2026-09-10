import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole, SignUpCredentials, SignInCredentials, AuthResult, AuthSession } from '@/types';
import { authService } from '@/services/auth';

// ──────────────────────────────────────────────
// Context Type
// ──────────────────────────────────────────────

interface AuthContextType {
  // State
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth actions
  signUp: (credentials: SignUpCredentials) => Promise<AuthResult<AuthSession>>;
  signIn: (credentials: SignInCredentials) => Promise<AuthResult<AuthSession>>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResult>;

  // Legacy compat (used by RoleGuard demo switcher)
  setRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ──────────────────────────────────────────────
// Provider
// ──────────────────────────────────────────────

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // true initially to check existing session

  // ─── Bootstrap: check existing session on mount ───

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const result = await authService.getCurrentUser();
        if (!cancelled && result.success && result.data) {
          setUser(result.data);
        }
      } catch {
        // No session — fine
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  // ─── Sign Up ───

  const signUp = useCallback(async (credentials: SignUpCredentials): Promise<AuthResult<AuthSession>> => {
    setIsLoading(true);
    try {
      const result = await authService.signUp(credentials);
      if (result.success && result.data) {
        setUser(result.data.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ─── Sign In ───

  const signIn = useCallback(async (credentials: SignInCredentials): Promise<AuthResult<AuthSession>> => {
    setIsLoading(true);
    try {
      const result = await authService.signIn(credentials);
      if (result.success && result.data) {
        setUser(result.data.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ─── Sign Out ───

  const signOut = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ─── Reset Password ───

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    return authService.resetPassword({ email });
  }, []);

  // ─── Role Switcher (demo helper — reassigns role in-memory) ───

  const setRole = useCallback((newRole: UserRole) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, role: newRole };
    });
  }, []);

  // ─── Context Value ───

  const value: AuthContextType = {
    user,
    role: user?.role ?? 'CUSTOMER',
    isAuthenticated: user !== null,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    setRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
