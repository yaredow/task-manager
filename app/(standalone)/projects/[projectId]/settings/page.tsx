import UpdateProjectForm from "@/features/projects/components/update-project-form";
import { getProject } from "@/features/projects/queries";
import { validateAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

type ProjectSettingPageProps = {
  params: {
    projectId: string;
  };
};

export default async function ProjectSettingPage({
  params,
}: ProjectSettingPageProps) {
  const auth = await validateAuth();

  if (!auth?.isAuthenticated) {
    redirect("/sign-in");
  }

  const initialValues = await getProject(params.projectId);

  return (
    <main className="lg:max-w-xl">
      <UpdateProjectForm initialValues={initialValues} />
    </main>
  );
}
