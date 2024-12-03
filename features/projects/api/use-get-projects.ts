import { useQuery } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { Project } from "../types";

export const useGetProjects = () => {
  const { data: projects, isPending } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await kyInstance
        .get(`${backendUrl}/api/v1/projects/`)
        .json<Project[]>();

      return data;
    },
  });

  return { projects, isPending };
};
