import { useMutation } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { UpdateProjectData } from "../schemas";
import { Project } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

type UseCreateProjectProps = {
  projectId: string;
};

export const useUpdateProject = ({ projectId }: UseCreateProjectProps) => {
  const router = useRouter();
  const { mutate: updateProject, isPending } = useMutation<
    Project,
    Error,
    UpdateProjectData
  >({
    mutationKey: ["project"],
    mutationFn: async (projectData) => {
      const formdata = new FormData();
      formdata.append("name", projectData.name);

      if (projectData.image) {
        formdata.append("image", projectData.image);
      }

      const data = await kyInstance
        .put(`${backendUrl}/api/v1/projects/${projectId}/`, {
          credentials: "include",
          body: formdata,
        })
        .json<Project>();

      return data;
    },
    onSuccess: (data) => {
      toast({
        description: "Project updated successfully",
      });
      router.push(`/projects/${data.id}`);
    },
    onError: () => {
      toast({
        variant: "destructive",
        description: "Something happened while updating the project",
      });
    },
  });
  return { updateProject, isPending };
};
