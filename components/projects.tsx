"use client";

import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export default function Projects() {
  const { open } = useCreateProjectModal();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <RiAddCircleFill
          onClick={() => open()}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
    </div>
  );
}
