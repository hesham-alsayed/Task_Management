import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, {
    message: "Title is required (minimum 3 characters)",
  }),

  epic_id: z.string().nullable().optional(),

  assignee_id: z.string().nullable().optional(),

  description: z.string().nullable().optional(),

  due_date: z
    .string()
    .nullable()
    .optional()
    .refine((value) => {
      if (!value) return true;

      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return selectedDate >= today;
    }, {
      message: "Due date cannot be in the past",
    }),

  status: z.string().optional(),

  project_id: z.string(),
});

export type NewTaskFormData = z.infer<typeof taskSchema>;