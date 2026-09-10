import { Profile } from '@/types';
import { mockCustomerProfile } from '@/services/mockData';
import { apiRequest } from '@/services/apiClient';

let localProfileState = { ...mockCustomerProfile };

export const customerProfileService = {
  async getProfile(): Promise<Profile> {
    return apiRequest(() => localProfileState);
  },

  async updateProfile(updatedData: Partial<Profile>): Promise<Profile> {
    return apiRequest(() => {
      localProfileState = {
        ...localProfileState,
        ...updatedData,
      };
      return localProfileState;
    });
  },
};
