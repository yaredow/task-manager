import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";

import { backendUrl } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";

import { Task } from "../types";
import { UpdateTaskData } from "../schemas";

type UseCreateProjectProps = {
  taskId: string;
};

export const useUpdateTask = ({ taskId }: UseCreateProjectProps) => {
  const queryClient = useQueryClient();

  const { mutate: editTask, isPending } = useMutation<
    Task,
    Error,
    UpdateTaskData
  >({
    mutationFn: async (values) => {
      const finalValue = {
        ...values,
        due_date: values.due_date
          ? format(new Date(values.due_date), "yyyy-MM-dd")
          : null,
      };

      const data = await kyInstance
        .put(`${backendUrl}/api/v1/tasks/${taskId}/`, {
          credentials: "include",
          json: finalValue,
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
