import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerTaskService } from '../services/customerTaskService';
import { CreateTaskFormData } from '../types/customer.types';
import { CUSTOMER_TASKS_QUERY_KEY } from './useCustomerTasks';
import { useAuth } from '@/hooks/useAuth';

export function useCreateTask() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (formData: CreateTaskFormData) => {
      const customerId = user?.id || 'user_cust_101';
      const customerName = user?.name || 'Customer';
      return customerTaskService.createTask(formData, customerId, customerName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMER_TASKS_QUERY_KEY });
    },
  });
}
