import { useQuery } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

export const useGetProject = () => {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = kyInstance.get(`${backendUrl}/api/v1/projects/`).json();

      return data;
    },
  });

  return { projects, isLoading };
};
