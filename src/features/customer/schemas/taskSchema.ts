import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(5, 'Task title must be at least 5 characters long')
    .max(100, 'Task title must not exceed 100 characters'),
  description: z
    .string()
    .min(20, 'Please provide a detailed description (at least 20 characters)')
    .max(2000, 'Description must not exceed 2000 characters'),
  categoryId: z.string().min(1, 'Please select a task category'),
  budget: z
    .number({ invalid_type_error: 'Budget must be a number' })
    .min(10, 'Minimum task budget is $10')
    .max(10000, 'Maximum task budget is $10,000'),
  location: z.string().min(2, 'Please enter a location or city'),
  isRemote: z.boolean().default(false),
  dueDate: z.string().min(1, 'Please select a completion due date'),
  tags: z.string().optional(),
});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;
