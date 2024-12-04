import { getProjects } from "@/features/projects/queries";
import { Project } from "@/features/projects/types";
import { validateAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await validateAuth();

  if (!auth?.isAuthenticated) {
    redirect("/sign-in");
  }

  const project = await getProjects();

  if (project?.length === 0) {
    redirect("/projects/create");
  } else {
    redirect(`/projects/${project?.[0].id}`);
  }
}
