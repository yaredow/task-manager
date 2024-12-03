import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { getProject } from "@/features/projects/queries";
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

  const initialValues = await getProject(params.projectId);

  if (!initialValues) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <ProjectAvatar name={initialValues.name} size="md" />
          <p className="text-lg font-bold">{initialValues.name}</p>
        </div>
        <div>
          <Button variant="secondary" size="sm" asChild>
            <Link href={`/projects/${initialValues.id}/settings`}>
              <PencilIcon className="siz-4 mr-2" />
              Edit project
            </Link>
          </Button>
        </div>
      </div>
      <TaskViewSwitcher />
    </div>
  );
}
