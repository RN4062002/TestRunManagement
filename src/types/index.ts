export type UserRole = 'CUSTOMER' | 'PROVIDER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
  updatedAt?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  emailVerified?: boolean;
}

// ──────────────────────────────────────────────
// Auth Types
// ──────────────────────────────────────────────

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresAt: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: UserRole;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordRequest {
  email: string;
}

export interface ResetPasswordConfirm {
  token: string;
  newPassword: string;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface AuthResult<T = void> {
  success: boolean;
  data?: T;
  error?: AuthError;
}

export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
  completedTasks: number;
  createdAt: string;
}

export type TaskStatus =
  | 'DRAFT'
  | 'OPEN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'EXPIRED';

export interface Task {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  categoryName: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  providerId?: string;
  providerName?: string;
  providerAvatar?: string;
  budget: number;
  status: TaskStatus;
  location: string;
  isRemote: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  applicantsCount: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Lucide icon name
  taskCount?: number;
}

export interface Provider {
  id: string;
  userId: string;
  name: string;
  avatarUrl?: string;
  headline: string;
  bio: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  skills: string[];
  completedTasksCount: number;
  verified: boolean;
  location: string;
  available: boolean;
}

export type PaymentStatus =
  | 'PENDING'
  | 'HELD_IN_ESCROW'
  | 'RELEASED'
  | 'REFUNDED'
  | 'FAILED';

export interface Payment {
  id: string;
  taskId: string;
  taskTitle: string;
  customerId: string;
  providerId?: string;
  amount: number;
  fee: number;
  totalAmount: number;
  status: PaymentStatus;
  paymentMethod: string;
  createdAt: string;
  transactionRef?: string;
}

export interface Rating {
  id: string;
  taskId: string;
  taskTitle: string;
  fromUserId: string;
  fromUserName: string;
  fromUserAvatar?: string;
  toUserId: string;
  toUserName: string;
  score: number; // 1-5
  comment: string;
  createdAt: string;
}

export type NotificationType =
  | 'TASK_UPDATE'
  | 'NEW_APPLICATION'
  | 'PAYMENT_RECEIVED'
  | 'RATING_LEFT'
  | 'SYSTEM';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  link?: string;
}
