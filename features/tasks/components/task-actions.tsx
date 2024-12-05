import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";
import { useTaskId } from "../hooks/use-task-id";
import { useRouter } from "next/navigation";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

type TaskActionsProps = {
  id: string;
  projectId: string;
  children: React.ReactNode;
};

export default function TaskActions({
  id,
  projectId,
  children,
}: TaskActionsProps) {
  const { deleteTask, isPending } = useDeleteTask();
  const router = useRouter();

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Delete task",
    message: "Are you sure you want to delete this task?",
    variant: "destructive",
  });

  const onOpenTask = () => {
    router.push(`/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/projects/${projectId}`);
  };

  const handleDeletetask = async () => {
    const ok = await confirm();

    if (ok) {
      deleteTask(id);
    }
  };

  return (
    <div className="flex justify-end">
      <ConfirmationDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Task Detials
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {}}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <PencilIcon className="size-4 mr-2 stroke-2" />
            Edit Task
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onOpenProject}
            disabled={false}
            className="font-medium p-[10px]"
          >
            <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
            Open Project
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(Event: React.MouseEvent) => {
              Event.stopPropagation();
              handleDeletetask();
            }}
            disabled={false}
            className="text-amber-700 focus:text-amber-700 font-medium p-[10px]"
          >
            <TrashIcon className="size-4 mr-2 stroke-2" />
            Delete task
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
