import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerTaskService } from '../services/customerTaskService';
import { TaskFilterOptions } from '../types/customer.types';

export const CUSTOMER_TASKS_QUERY_KEY = ['customer', 'tasks'];
export const CUSTOMER_CATEGORIES_QUERY_KEY = ['customer', 'categories'];
export const RECOMMENDED_PROVIDERS_QUERY_KEY = ['customer', 'recommended-providers'];

export function useCustomerTasks(filters?: TaskFilterOptions) {
  return useQuery({
    queryKey: [...CUSTOMER_TASKS_QUERY_KEY, filters],
    queryFn: () => customerTaskService.getTasks(filters),
  });
}

export function useTaskCategories() {
  return useQuery({
    queryKey: CUSTOMER_CATEGORIES_QUERY_KEY,
    queryFn: () => customerTaskService.getCategories(),
  });
}

export function useRecommendedProviders() {
  return useQuery({
    queryKey: RECOMMENDED_PROVIDERS_QUERY_KEY,
    queryFn: () => customerTaskService.getRecommendedProviders(),
  });
}

export function useCancelTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) => customerTaskService.cancelTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_TASKS_QUERY_KEY });
    },
  });
}
