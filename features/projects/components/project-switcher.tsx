"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useGetProjects } from "../api/use-get-projects";
import { useProjectId } from "../hooks/use-project-id";
import { ProjectAvatar } from "./project-avatar";

export default function ProjectSwitcher() {
  const router = useRouter();
  const projectId = useProjectId();
  const { projects } = useGetProjects();

  const onSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <Select onValueChange={onSelect} value={projectId}>
        <SelectTrigger className="w-full bg-neutral-200 font-medium p-1">
          <SelectValue placeholder="No workspace selected" />
        </SelectTrigger>
        <SelectContent>
          {projects?.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <ProjectAvatar name={workspace.name} size="sm" />
                <p className="text-sm">{workspace.name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
