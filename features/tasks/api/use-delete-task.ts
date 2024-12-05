import { useMutation, useQueryClient } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { toast } from "@/hooks/use-toast";
import { Task } from "../types";

export const useDeleteTask = () => {
  const querClient = useQueryClient();

  const { mutate: deleteTask, isPending } = useMutation({
    mutationFn: async (taskId: string) => {
      const data = await kyInstance
        .delete(`${backendUrl}/api/v1/tasks/${taskId}/`, {
          credentials: "include",
        })
        .json<Task>();

      return data;
    },
    onSuccess: (data) => {
      toast({
        description: "Task deleted successfully",
      });
      querClient.invalidateQueries({ queryKey: ["tasks"] });
      querClient.invalidateQueries({ queryKey: ["tasks", data.id] });
    },
  });
  return { deleteTask, isPending };
};
