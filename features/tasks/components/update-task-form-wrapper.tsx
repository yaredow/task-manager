"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import UpdateTaskForm from "./update-task-form";
import { useGetTask } from "../api/use-get-task";
import { useGetProjects } from "@/features/projects/api/use-get-projects";

type UpdateTaskFormWrapperProps = {
  taskId: string;
  onCancel: () => void;
};

export default function UpdateTaskFormWrapper({
  onCancel,
  taskId,
}: UpdateTaskFormWrapperProps) {
  const { projects, isPending: isProjectPending } = useGetProjects();
  const { task, isPending: isTaskPending } = useGetTask({ taskId });

  const projectsOptions = projects?.map((project) => ({
    id: project.id,
    name: project.name,
  }));

  const isLoading = isProjectPending || isTaskPending;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <UpdateTaskForm
      projectOptions={projectsOptions || []}
      onCancel={onCancel}
      task={task}
    />
  );
}
