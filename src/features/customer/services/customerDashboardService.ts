import { CustomerDashboardSummary, DashboardActivity, DashboardNotification } from '../types/customer.types';
import { Task, Provider } from '@/types';
import { mockTasks, mockProviders } from '@/services/mockData';
import { apiRequest } from '@/services/apiClient';

// ──────────────────────────────────────────────
// Dashboard-specific mock data
// ──────────────────────────────────────────────

const dashboardActivities: DashboardActivity[] = [
  {
    id: 'act_01',
    type: 'proposal',
    title: 'New Proposal Received',
    description: 'David Chen submitted a proposal of $450 for your React Refactoring task.',
    timestamp: '2026-09-10T15:20:00Z',
    taskId: 'task_002',
    taskTitle: 'Custom React & Tailwind Component Library Refactoring',
    actorName: 'David Chen',
    actorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'act_02',
    type: 'status_update',
    title: 'Task In Progress',
    description: 'Alex Rivera started working on PAX Wardrobe Assembly and updated the status.',
    timestamp: '2026-09-09T14:20:00Z',
    taskId: 'task_001',
    taskTitle: 'Assemble IKEA PAX Wardrobe System & Wall Anchor',
    actorName: 'Alex Rivera',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'act_03',
    type: 'payment',
    title: 'Payment Released',
    description: 'Escrow payment of $220 was released to Maria Santos for Deep House Cleaning.',
    timestamp: '2026-09-05T17:35:00Z',
    taskId: 'task_003',
    taskTitle: 'Deep House Cleaning - 3 Bed, 2 Bath Residence',
    actorName: 'Maria Santos',
    actorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'act_04',
    type: 'rating',
    title: 'New 5-Star Review',
    description: 'Maria Santos left a 5-star review on your Deep House Cleaning task.',
    timestamp: '2026-09-05T18:00:00Z',
    taskId: 'task_003',
    taskTitle: 'Deep House Cleaning - 3 Bed, 2 Bath Residence',
    actorName: 'Maria Santos',
    actorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'act_05',
    type: 'task_created',
    title: 'Task Published',
    description: 'You published "Modern Brand Identity & Vector Logo Design" to the marketplace.',
    timestamp: '2026-09-10T11:00:00Z',
    taskId: 'task_004',
    taskTitle: 'Modern Brand Identity & Vector Logo Design',
  },
  {
    id: 'act_06',
    type: 'proposal',
    title: 'New Proposal Received',
    description: 'Jessica Park submitted a proposal of $280 for your Logo Design task.',
    timestamp: '2026-09-10T14:45:00Z',
    taskId: 'task_004',
    taskTitle: 'Modern Brand Identity & Vector Logo Design',
    actorName: 'Jessica Park',
  },
];

const dashboardNotifications: DashboardNotification[] = [
  {
    id: 'dn_01',
    title: '3 new proposals awaiting review',
    message: 'You have unreviewed proposals on "React Refactoring" and "Logo Design" tasks.',
    type: 'action',
    isRead: false,
    timestamp: '2026-09-10T16:00:00Z',
    link: '/customer/tasks',
  },
  {
    id: 'dn_02',
    title: 'Task milestone reached',
    message: 'Alex Rivera has completed 50% of the PAX Wardrobe Assembly task.',
    type: 'info',
    isRead: false,
    timestamp: '2026-09-10T10:30:00Z',
    link: '/customer/tasks',
  },
  {
    id: 'dn_03',
    title: 'Payment escrow confirmed',
    message: '$189 is held in escrow for PAX Wardrobe Assembly until task completion.',
    type: 'success',
    isRead: true,
    timestamp: '2026-09-08T10:35:00Z',
  },
  {
    id: 'dn_04',
    title: 'Draft task reminder',
    message: 'Your "Sprinkler Repair" task is still in draft. Publish it to receive proposals.',
    type: 'warning',
    isRead: false,
    timestamp: '2026-09-10T09:00:00Z',
    link: '/customer/tasks',
  },
  {
    id: 'dn_05',
    title: 'Deep House Cleaning completed',
    message: 'Maria Santos has completed your cleaning task. Please leave a review.',
    type: 'success',
    isRead: true,
    timestamp: '2026-09-05T17:30:00Z',
  },
];

// ──────────────────────────────────────────────
// Dashboard Service
// ──────────────────────────────────────────────

export const customerDashboardService = {
  async getSummary(): Promise<CustomerDashboardSummary> {
    return apiRequest(() => {
      const allTasks = [...mockTasks];

      const activeTasks = allTasks.filter(
        (t) => t.status === 'IN_PROGRESS'
      );
      const pendingTasks = allTasks.filter(
        (t) => t.status === 'OPEN'
      );
      const upcomingTasks = allTasks.filter(
        (t) => t.status === 'DRAFT'
      );
      const completedTasks = allTasks.filter(
        (t) => t.status === 'COMPLETED'
      );

      const totalSpent = completedTasks.reduce((sum, t) => sum + t.budget, 0) +
        activeTasks.reduce((sum, t) => sum + t.budget, 0);

      const avgTaskBudget =
        allTasks.length > 0
          ? Math.round(allTasks.reduce((sum, t) => sum + t.budget, 0) / allTasks.length)
          : 0;

      const openProposals = pendingTasks.reduce((sum, t) => sum + t.applicantsCount, 0) +
        activeTasks.reduce((sum, t) => sum + t.applicantsCount, 0);

      return {
        totalTasksPosted: allTasks.length,
        activeTasksCount: activeTasks.length,
        pendingTasksCount: pendingTasks.length,
        completedTasksCount: completedTasks.length,
        totalSpent,
        avgTaskBudget,
        openProposals,
        activeTasks,
        pendingTasks,
        upcomingTasks,
        completedTasks,
        recentActivity: dashboardActivities.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ),
        notifications: dashboardNotifications,
        recommendedProviders: mockProviders,
      };
    }, 350);
  },
};
