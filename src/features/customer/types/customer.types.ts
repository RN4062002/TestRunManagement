import { TaskStatus, Task, Provider } from '@/types';

export interface TaskFilterOptions {
  status?: TaskStatus | 'ALL';
  categoryId?: string;
  search?: string;
  sortBy?: 'newest' | 'budget_high' | 'budget_low';
}

export interface DashboardActivity {
  id: string;
  type: 'proposal' | 'status_update' | 'payment' | 'rating' | 'task_created' | 'message';
  title: string;
  description: string;
  timestamp: string;
  taskId?: string;
  taskTitle?: string;
  actorName?: string;
  actorAvatar?: string;
}

export interface DashboardNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'action';
  isRead: boolean;
  timestamp: string;
  link?: string;
}

export interface CustomerDashboardSummary {
  totalTasksPosted: number;
  activeTasksCount: number;
  pendingTasksCount: number;
  completedTasksCount: number;
  totalSpent: number;
  avgTaskBudget: number;
  openProposals: number;
  activeTasks: Task[];
  pendingTasks: Task[];
  upcomingTasks: Task[];
  completedTasks: Task[];
  recentActivity: DashboardActivity[];
  notifications: DashboardNotification[];
  recommendedProviders: Provider[];
}

export interface CreateTaskFormData {
  title: string;
  description: string;
  categoryId: string;
  budget: number;
  location: string;
  isRemote: boolean;
  dueDate: string;
  tags?: string;
}
