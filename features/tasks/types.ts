export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export type Task = {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: number;
  due_date?: string;
  project: string;
  createdAt: string;
  updatedAt: string;
  owner: string;
};
