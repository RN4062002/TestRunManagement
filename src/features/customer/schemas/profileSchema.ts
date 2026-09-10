import { z } from 'zod';

export const customerProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
  address: z.string().min(3, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code must be at least 5 digits'),
});

export type CustomerProfileSchemaType = z.infer<typeof customerProfileSchema>;
