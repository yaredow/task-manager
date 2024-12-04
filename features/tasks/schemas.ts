import { z } from "zod";
import { TaskStatus } from "./types";

const TaskStatusSchema = z.enum([
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
]);

export const CreateTaskSchema = z.object({
  status: TaskStatusSchema.default(TaskStatus.TODO),
  project: z.string().cuid(),
  name: z
    .string()
    .min(1, "Task name is required")
    .max(100, "Task name is too long"),
  description: z.string().min(1, "Description is required"),
  due_date: z.coerce.date(),
  priority: z
    .number()
    .min(0, "Priority must be at least 0")
    .max(10, "Priority must be at most 10")
    .default(0),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type CreateTaskData = z.infer<typeof CreateTaskSchema>;
