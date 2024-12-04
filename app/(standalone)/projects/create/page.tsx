import CreateProjectForm from "@/features/projects/components/create-project-form";
import { validateAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CreateProjectPage() {
  const auth = await validateAuth();

  if (!auth?.isAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <main className="w-full lg:max-w-xl">
      <CreateProjectForm />
    </main>
  );
}
