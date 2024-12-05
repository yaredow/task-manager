import { useMutation, useQueryClient } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";

import { Task } from "../types";
import { UpdateTaskData } from "../schemas";

type UseCreateProjectProps = {
  projectId: string;
};

export const useUpdateTask = ({ projectId }: UseCreateProjectProps) => {
  const queryClient = useQueryClient();

  const { mutate: editTask, isPending } = useMutation<
    Task,
    Error,
    UpdateTaskData
  >({
    mutationFn: async (projectData) => {
      const data = await kyInstance
        .put(`${backendUrl}/api/v1/projects/${projectId}/`, {
          credentials: "include",
          json: projectData,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .json<Task>();

      return data;
    },
    onSuccess: (data) => {
      toast({
        description: "Task updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["tasks", data.id] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Something happened while updating the task",
      });
    },
  });
  return { editTask, isPending };
};
