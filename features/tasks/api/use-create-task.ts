import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backendUrl } from "@/lib/constants";
import { toast } from "@/hooks/use-toast";
import kyInstance from "@/lib/ky";

import { CreateTaskData } from "../schemas";
import { Task } from "../types";
import { format } from "date-fns";

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending } = useMutation<
    Task,
    Error,
    CreateTaskData
  >({
    mutationKey: ["task"],
    mutationFn: async (values) => {
      const finalValue = {
        ...values,
        due_date: values.due_date
          ? format(new Date(values.due_date), "yyyy-MM-dd")
          : null,
      };
      const data = await kyInstance
        .post(`${backendUrl}/api/v1/tasks/new/`, {
          credentials: "include",
          json: finalValue,
        })
        .json<Task>();

      return data;
    },
    onSuccess: () => {
      toast({
        description: "Task created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Something went wrong while creating task",
      });
    },
  });

  return { createTask, isPending };
};
