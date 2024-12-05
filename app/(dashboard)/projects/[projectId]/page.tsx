import { redirect } from "next/navigation";
import { PencilIcon } from "lucide-react";
import Link from "next/link";

import { validateAuth } from "@/lib/auth";

import ProjectSwitcher from "@/features/projects/components/project-switcher";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import ProjectStat from "@/features/projects/components/project-stat";
import { getProject } from "@/features/projects/queries";
import { Button } from "@/components/ui/button";

type ProjectIdPageProps = {
  params: {
    projectId: string;
  };
};

export default async function ProjectIdPage({ params }: ProjectIdPageProps) {
  const auth = await validateAuth();

  if (!auth?.isAuthenticated) {
    redirect("/sign-in");
  }

  const project = await getProject(params.projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex items-center justify-between">
        <ProjectSwitcher />

        <Button variant="secondary" size="sm" asChild>
          <Link href={`/projects/${project.id}/settings`}>
            <PencilIcon strokeWidth={1.5} size={20} className="siz-4 mr-2" />
            <span className="font-semibold text-sm">Edit project</span>
          </Link>
        </Button>
      </div>
      <ProjectStat />
      <TaskViewSwitcher />
    </div>
  );
}
