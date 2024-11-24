import { createFileRoute } from "@tanstack/react-router";
import SignUpForm from "@/features/auth/components/sign-up-form";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUpForm />;
}
