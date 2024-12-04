import { useQuery } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";
import { Task } from "../types";

export const useGetTasks = () => {
  const { data: tasks, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await kyInstance
        .get(`${backendUrl}/api/v1/tasks/`, {
          credentials: "include",
        })
        .json<Task[]>();

      return data;
    },
  });

  return { tasks, isPending };
};
