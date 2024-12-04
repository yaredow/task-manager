import { Card, CardContent } from "@/components/ui/card";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { Loader2 } from "lucide-react";
import CreateTaskForm from "./create-task-form";

type CreateTaskFormWrapperProps = {
  onCancel: () => void;
};

export default function CreateTaskFormWrapper({
  onCancel,
}: CreateTaskFormWrapperProps) {
  const { projects, isPending } = useGetProjects();

  const projectsOptions = projects?.map((project) => ({
    id: project.id,
    name: project.name,
  }));

  if (isPending) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader2 className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <CreateTaskForm
      projectOptions={projectsOptions || []}
      onCancel={onCancel}
    />
  );
}
