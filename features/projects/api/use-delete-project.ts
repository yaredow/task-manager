import { useMutation, useQueryClient } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const useDeleteProject = () => {
  const router = useRouter();
  const querClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: async (projectId: string) => {
      const response = await kyInstance.delete(
        `${backendUrl}/api/v1/projects/${projectId}/`,
        {
          credentials: "include",
        },
      );

      return await response.json();
    },
    onSuccess: () => {
      toast({
        description: "Project deleted successfully",
      });
      querClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/");
    },
  });
  return { deleteProject, isPending };
};
