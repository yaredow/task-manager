import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";
import { Project } from "./types";

export const getProjects = async () => {
  try {
    const projects = await kyInstance
      .get(`${backendUrl}/api/v1/projects/`)
      .json<Project[]>();

    if (!projects) {
      return null;
    }

    return projects;
  } catch (error) {
    console.error(error);
    return null;
  }
};
