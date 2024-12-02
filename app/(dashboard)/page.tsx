import { validateAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const auth = await validateAuth();
  console.log(auth?.isAuthenticated);

  if (!auth?.isAuthenticated) {
    redirect("/sign-in");
  }
  return <div>Task App</div>;
}
