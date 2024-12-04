import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";
import { useQuery } from "@tanstack/react-query";
import { Project } from "../types";

type UseGetProjectProps = {
  projectId: string;
};

export const useGetProject = ({ projectId }: UseGetProjectProps) => {
  const { data: project, isPending } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const data = await kyInstance
        .delete(`${backendUrl}/api/v1/projects/${projectId}/`, {
          credentials: "include",
        })
        .json<Project>();

      return data;
    },
  });

  return { project, isPending };
};
