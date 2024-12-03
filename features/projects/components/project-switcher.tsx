"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "../../../components/ui/select";
import ProjectAvatar from "./project-avatar";
import { useGetProjects } from "../api/use-get-projects";

export default function WorkspaceSwitcher() {
  const { open } = useCreateWorkspaceModal();
  const { isPending, projects } = useGetProjects();
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const onSelect = (workspaceId: string) => {
    router.push(`/workspaces/${workspaceId}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      <Select onValueChange={onSelect} value={workspaceId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {projects?.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <ProjectAvatar name={project.name} />
                <p className="text-sm">{project.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
