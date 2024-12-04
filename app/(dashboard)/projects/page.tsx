import { validateAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProjectPage() {
  const auth = await validateAuth();

  if (!auth?.isAuthenticated) {
    redirect("/sign-in");
  }

  return <main>Projects</main>;
}
