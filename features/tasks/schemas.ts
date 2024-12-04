import { z } from "zod";
import { TaskStatus } from "./types";

export const CreateTaskSchema = z.object({
  status: TaskStatus.TODO,
  project: z.string().cuid(),
  name: z
    .string()
    .min(1, "Task name is required")
    .max(100, "Task name is too long"),
  description: z.string().min(1, "Description is required"),
  due_date: z.string().optional().nullable(),
  priority: z
    .number()
    .min(0, "Priority must be at least 0")
    .max(10, "Priority must be at most 10")
    .default(0),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateTaskData = z.infer<typeof CreateTaskSchema>;
