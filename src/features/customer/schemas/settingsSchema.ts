import { z } from 'zod';

export const customerSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  marketingEmails: z.boolean().default(false),
  currency: z.string().default('USD'),
  twoFactorAuth: z.boolean().default(false),
});

export type CustomerSettingsSchemaType = z.infer<typeof customerSettingsSchema>;
