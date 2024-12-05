"use client";

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
          {projects?.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex justify-start items-center gap-3 font-medium">
                <ProjectAvatar
                  name={project.name}
                  projectId={project.id}
                  size="sm"
                />
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
