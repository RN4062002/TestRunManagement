import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { customerProfileService } from '../services/customerProfileService';
import { Profile } from '@/types';

export const CUSTOMER_PROFILE_QUERY_KEY = ['customer', 'profile'];

export function useCustomerProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: CUSTOMER_PROFILE_QUERY_KEY,
    queryFn: () => customerProfileService.getProfile(),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (updatedData: Partial<Profile>) =>
      customerProfileService.updateProfile(updatedData),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(CUSTOMER_PROFILE_QUERY_KEY, updatedProfile);
    },
  });

  return {
    ...profileQuery,
    updateProfile: updateProfileMutation.mutateAsync,
    isUpdating: updateProfileMutation.isPending,
  };
}
