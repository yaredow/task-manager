import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import ProjectStat from "@/features/projects/components/project-stat";
import ProjectSwitcher from "@/features/projects/components/project-switcher";
import { getProject } from "@/features/projects/queries";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { validateAuth } from "@/lib/auth";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

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
