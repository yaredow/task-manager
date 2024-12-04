import { useMutation, useQueryClient } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { CreateProjectData } from "../schemas";
import { Project } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const useCreateProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: createProject, isPending } = useMutation<
    Project,
    Error,
    CreateProjectData
  >({
    mutationKey: ["project"],
    mutationFn: async (projectData) => {
      const formdata = new FormData();
      formdata.append("name", projectData.name);
      if (projectData.image) {
        formdata.append("image", projectData.image);
      }

      const data = await kyInstance
        .post(`${backendUrl}/api/v1/projects/new/`, {
          credentials: "include",
          body: formdata,
        })
        .json<Project>();

      return data;
    },
    onSuccess: (data) => {
      toast({
        description: "Project created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push(`/projects/${data.id}`);
    },
  });
  return { createProject, isPending };
};
