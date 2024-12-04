"use client";

import { RiAddCircleFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { cn } from "@/lib/utils";

export default function Projects() {
  const { open } = useCreateProjectModal();
  const pathName = usePathname();
  const { projects, isPending } = useGetProjects();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-neutral-500">Projects</p>
        <RiAddCircleFill
          onClick={() => open()}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>

      {projects?.map((project) => {
        const href = `/projects/${project.id}`;
        const isActive = pathName === href;

        return (
          <Link href={href} key={project.id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary",
              )}
            >
              <ProjectAvatar name={project.name} size="sm" />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
