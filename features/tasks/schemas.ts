import { z } from "zod";

export const TaskStatus = z.enum([
  "BACKLOG",
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
]);

export const taskSchema = z.object({
  id: z.string().optional(), // Optional for new tasks
  status: TaskStatus.default("TODO"),
  project: z.string().uuid(), // Ensure it's a valid UUID
  name: z
    .string()
    .min(1, "Task name is required")
    .max(100, "Task name is too long"),
  description: z.string().min(1, "Description is required"),
  due_date: z.string().optional().nullable(), // Allow nullable for no due date
  priority: z
    .number()
    .min(0, "Priority must be at least 0")
    .max(10, "Priority must be at most 10")
    .default(0),
  created_at: z.string().optional(), // Populated by the backend
  updated_at: z.string().optional(), // Populated by the backend
});
