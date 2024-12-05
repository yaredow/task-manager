import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../types";

type UseGetTasksProps = {
  taskId: string;
};

export const useGetTask = ({ taskId }: UseGetTasksProps) => {
  const { data: task, isPending } = useQuery({
    queryKey: ["project", taskId],
    queryFn: async () => {
      const data = await kyInstance
        .get(`${backendUrl}/api/v1/tasks/${taskId}/`, {
          credentials: "include",
        })
        .json<Task>();

      return data;
    },
  });

  return { task, isPending };
};
