import { useMutation } from "@tanstack/react-query";

import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";

import { CreateProjectData } from "../schemas";
import { Project } from "../types";

export const useCreateProject = () => {
  const { mutate: createProject, isPending } = useMutation({
    mutationKey: ["project"],
    mutationFn: async (projectData: CreateProjectData) => {
      const formdata = new FormData();
      formdata.append("name", projectData.name);
      if (projectData.image) {
        formdata.append("image", projectData.image);
      }
      const data = await kyInstance
        .post(`${backendUrl}/api/v1/projects/new/`, {
          body: formdata,
        })
        .json<Project>();

      return data;
    },
  });
  return { createProject, isPending };
};
