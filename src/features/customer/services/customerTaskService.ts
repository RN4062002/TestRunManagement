import { Task, Category, Provider } from '@/types';
import { mockTasks, mockCategories, mockProviders } from '@/services/mockData';
import { apiRequest } from '@/services/apiClient';
import { TaskFilterOptions, CreateTaskFormData } from '../types/customer.types';

let localTasksState = [...mockTasks];

export const customerTaskService = {
  async getTasks(filters?: TaskFilterOptions): Promise<Task[]> {
    return apiRequest(() => {
      let filtered = [...localTasksState];

      if (filters?.status && filters.status !== 'ALL') {
        filtered = filtered.filter((t) => t.status === filters.status);
      }

      if (filters?.categoryId) {
        filtered = filtered.filter((t) => t.categoryId === filters.categoryId);
      }

      if (filters?.search) {
        const query = filters.search.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.description.toLowerCase().includes(query) ||
            t.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      if (filters?.sortBy === 'budget_high') {
        filtered.sort((a, b) => b.budget - a.budget);
      } else if (filters?.sortBy === 'budget_low') {
        filtered.sort((a, b) => a.budget - b.budget);
      } else {
        // default newest
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      return filtered;
    });
  },

  async getTaskById(taskId: string): Promise<Task | null> {
    return apiRequest(() => {
      return localTasksState.find((t) => t.id === taskId) || null;
    });
  },

  async getCategories(): Promise<Category[]> {
    return apiRequest(() => mockCategories);
  },

  async getRecommendedProviders(): Promise<Provider[]> {
    return apiRequest(() => mockProviders);
  },

  async createTask(data: CreateTaskFormData, customerId: string, customerName: string): Promise<Task> {
    return apiRequest(() => {
      const category = mockCategories.find((c) => c.id === data.categoryId);
      const newTask: Task = {
        id: `task_${Date.now()}`,
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        categoryName: category ? category.name : 'General Task',
        customerId,
        customerName,
        budget: Number(data.budget),
        status: 'OPEN',
        location: data.location,
        isRemote: data.isRemote,
        dueDate: data.dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        applicantsCount: 0,
        tags: data.tags
          ? data.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [category?.name || 'Task'],
      };

      localTasksState = [newTask, ...localTasksState];
      return newTask;
    });
  },

  async cancelTask(taskId: string): Promise<Task> {
    return apiRequest(() => {
      const index = localTasksState.findIndex((t) => t.id === taskId);
      if (index === -1) throw new Error('Task not found');
      localTasksState[index] = {
        ...localTasksState[index],
        status: 'CANCELLED',
        updatedAt: new Date().toISOString(),
      };
      return localTasksState[index];
    });
  },
};
