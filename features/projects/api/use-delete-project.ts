import { useMutation } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type UseDeleteProjectProps = {
  projectId: string;
};

export const useDeleteProject = ({ projectId }: UseDeleteProjectProps) => {
  const router = useRouter();

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
      router.push("/");
    },
  });
  return { deleteProject, isPending };
};
