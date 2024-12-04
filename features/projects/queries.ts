import { backendUrl } from "@/lib/constants";
import kyInstance from "@/lib/ky";
import { Project } from "./types";
import { cookies } from "next/headers";

export const getProjects = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_auth")?.value;

  try {
    const projects = await kyInstance
      .get(`${backendUrl}/api/v1/projects/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

export const getProject = async (projectId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("_auth")?.value;

  try {
    const project = await kyInstance
      .get(`${backendUrl}/api/v1/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json<Project>();

    if (!project) return null;

    return project;
  } catch (error) {
    console.error(error);
    return null;
  }
};
