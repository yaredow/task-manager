import { useMutation, useQueryClient } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type UseDeleteProjectProps = {
  projectId: string;
};

export const useDeleteProject = ({ projectId }: UseDeleteProjectProps) => {
  const router = useRouter();
  const querClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationKey: ["project"],
    mutationFn: async () => {
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
      querClient.invalidateQueries({ queryKey: ["project", projectId] });
      router.push("/");
    },
  });
  return { deleteProject, isPending };
};
