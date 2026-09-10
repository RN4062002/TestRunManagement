import {
  User,
  UserRole,
  AuthSession,
  SignUpCredentials,
  SignInCredentials,
  ResetPasswordRequest,
  ResetPasswordConfirm,
  AuthResult,
} from '@/types';

// ──────────────────────────────────────────────
// Auth Service Interface
// ──────────────────────────────────────────────

export interface IAuthService {
  signUp(credentials: SignUpCredentials): Promise<AuthResult<AuthSession>>;
  signIn(credentials: SignInCredentials): Promise<AuthResult<AuthSession>>;
  signOut(): Promise<AuthResult>;
  getCurrentUser(): Promise<AuthResult<User>>;
  resetPassword(request: ResetPasswordRequest): Promise<AuthResult>;
  confirmResetPassword(request: ResetPasswordConfirm): Promise<AuthResult>;
  verifyEmail(token: string): Promise<AuthResult>;
  resendVerificationEmail(email: string): Promise<AuthResult>;
}

// ──────────────────────────────────────────────
// Storage Keys
// ──────────────────────────────────────────────

const STORAGE_KEYS = {
  SESSION: 'taskhub_session',
  USERS_DB: 'taskhub_users_db',
} as const;

// ──────────────────────────────────────────────
// Mock Users Database (in-memory + localStorage)
// ──────────────────────────────────────────────

interface StoredUser extends User {
  passwordHash: string; // plain-text in mock; hashed in real impl
}

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS_DB);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(users));
}

function getStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    // Check expiry
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function saveSession(session: AuthSession) {
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function generateToken(): string {
  return `tok_${Date.now()}_${Math.random().toString(36).slice(2, 15)}`;
}

function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ──────────────────────────────────────────────
// Seed demo users on first run
// ──────────────────────────────────────────────

function seedDemoUsers() {
  const existing = getStoredUsers();
  if (existing.length > 0) return;

  const demoUsers: StoredUser[] = [
    {
      id: 'user_cust_101',
      name: 'Sarah Jenkins',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 234-5678',
      role: 'CUSTOMER',
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      emailVerified: true,
      createdAt: '2025-01-15T08:00:00Z',
      passwordHash: 'Password1',
    },
    {
      id: 'user_prov_202',
      name: 'Alex Rivera',
      email: 'alex.r@example.com',
      phone: '+1 (555) 876-5432',
      role: 'PROVIDER',
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      emailVerified: true,
      createdAt: '2024-11-10T08:00:00Z',
      passwordHash: 'Password1',
    },
    {
      id: 'user_admin_303',
      name: 'Elena Rostova',
      email: 'elena.admin@taskhub.com',
      phone: '+1 (555) 999-0000',
      role: 'ADMIN',
      avatarUrl:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'ACTIVE',
      emailVerified: true,
      createdAt: '2024-01-01T08:00:00Z',
      passwordHash: 'Password1',
    },
  ];

  saveStoredUsers(demoUsers);
}

// Seed once at module load time
seedDemoUsers();

// ──────────────────────────────────────────────
// Mock Auth Service Implementation
// ──────────────────────────────────────────────

function stripPassword(u: StoredUser): User {
  const { passwordHash, ...user } = u;
  return user;
}

function createSession(user: User): AuthSession {
  const session: AuthSession = {
    user,
    accessToken: generateToken(),
    refreshToken: generateToken(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(), // 24 hours
  };
  saveSession(session);
  return session;
}

class MockAuthService implements IAuthService {
  // ───── Sign Up ─────

  async signUp(credentials: SignUpCredentials): Promise<AuthResult<AuthSession>> {
    await delay(600);

    const users = getStoredUsers();

    // Check duplicate email
    if (users.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase())) {
      return {
        success: false,
        error: {
          code: 'auth/email-already-in-use',
          message: 'An account with this email address already exists.',
          field: 'email',
        },
      };
    }

    const newUser: StoredUser = {
      id: generateId(),
      name: credentials.name,
      email: credentials.email.toLowerCase().trim(),
      phone: credentials.phone,
      role: credentials.role || 'CUSTOMER',
      status: 'ACTIVE',
      emailVerified: false, // verification required
      createdAt: new Date().toISOString(),
      passwordHash: credentials.password, // plain text for mock only
    };

    users.push(newUser);
    saveStoredUsers(users);

    const session = createSession(stripPassword(newUser));

    return { success: true, data: session };
  }

  // ───── Sign In ─────

  async signIn(credentials: SignInCredentials): Promise<AuthResult<AuthSession>> {
    await delay(500);

    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase().trim()
    );

    if (!found) {
      return {
        success: false,
        error: {
          code: 'auth/user-not-found',
          message: 'No account found with this email address.',
          field: 'email',
        },
      };
    }

    if (found.passwordHash !== credentials.password) {
      return {
        success: false,
        error: {
          code: 'auth/wrong-password',
          message: 'Incorrect password. Please try again.',
          field: 'password',
        },
      };
    }

    if (found.status === 'SUSPENDED') {
      return {
        success: false,
        error: {
          code: 'auth/account-suspended',
          message: 'This account has been suspended. Please contact support.',
        },
      };
    }

    const session = createSession(stripPassword(found));
    return { success: true, data: session };
  }

  // ───── Sign Out ─────

  async signOut(): Promise<AuthResult> {
    await delay(200);
    clearSession();
    return { success: true };
  }

  // ───── Current User ─────

  async getCurrentUser(): Promise<AuthResult<User>> {
    await delay(200);

    const session = getStoredSession();
    if (!session) {
      return {
        success: false,
        error: { code: 'auth/not-authenticated', message: 'No active session found.' },
      };
    }

    // Re-validate user still exists in DB
    const users = getStoredUsers();
    const found = users.find((u) => u.id === session.user.id);
    if (!found) {
      clearSession();
      return {
        success: false,
        error: { code: 'auth/user-not-found', message: 'User account no longer exists.' },
      };
    }

    return { success: true, data: stripPassword(found) };
  }

  // ───── Forgot Password (request reset email) ─────

  async resetPassword(request: ResetPasswordRequest): Promise<AuthResult> {
    await delay(600);

    const users = getStoredUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === request.email.toLowerCase().trim()
    );

    // Always return success for security (don't leak account existence)
    if (!found) {
      return { success: true };
    }

    // In real implementation, send email with reset link containing token
    console.info(
      `[MockAuthService] Password reset email sent to ${request.email}. Token: ${generateToken()}`
    );

    return { success: true };
  }

  // ───── Confirm Reset Password ─────

  async confirmResetPassword(request: ResetPasswordConfirm): Promise<AuthResult> {
    await delay(500);

    // In mock: accept any token and reset first user's password as a demo.
    // In real implementation, validate the token and find the associated user.
    console.info(
      `[MockAuthService] Password reset confirmed with token: ${request.token}`
    );

    return { success: true };
  }

  // ───── Email Verification ─────

  async verifyEmail(token: string): Promise<AuthResult> {
    await delay(400);

    // In mock: mark current session user as verified
    const session = getStoredSession();
    if (!session) {
      return {
        success: false,
        error: { code: 'auth/not-authenticated', message: 'Please sign in first.' },
      };
    }

    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === session.user.id);
    if (idx >= 0) {
      users[idx].emailVerified = true;
      saveStoredUsers(users);
      // Update session
      session.user.emailVerified = true;
      saveSession(session);
    }

    return { success: true };
  }

  // ───── Resend Verification Email ─────

  async resendVerificationEmail(email: string): Promise<AuthResult> {
    await delay(400);

    console.info(
      `[MockAuthService] Verification email re-sent to ${email}. Token: ${generateToken()}`
    );

    return { success: true };
  }
}

// ──────────────────────────────────────────────
// Singleton Export
// ──────────────────────────────────────────────

export const authService: IAuthService = new MockAuthService();
