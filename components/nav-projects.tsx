"use client";

import {
  Folder,
  Forward,
  MoreHorizontal,
  PencilIcon,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

export function NavProjects() {
  const { deleteProject, isPending } = useDeleteProject();
  const { open } = useCreateProjectModal();
  const { isMobile } = useSidebar();
  const { projects } = useGetProjects();
  const projectId = useProjectId();
  const router = useRouter();

  const [ConfirmationDialog, confirm] = useConfirm({
    title: "Delete project",
    message: "Are you sure you want to delete this project?",
    variant: "destructive",
  });

  const handleConfirm = async () => {
    const ok = await confirm();

    if (ok) {
      deleteProject(projectId);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <ConfirmationDialog />
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarGroupAction title="Add Project" onClick={open}>
        <Plus /> <span className="sr-only">Add Project</span>
      </SidebarGroupAction>

      <SidebarMenu>
        {projects?.map((project) => (
          <SidebarMenuItem key={project.name}>
            <SidebarMenuButton asChild>
              <ProjectAvatar
                name={project.name}
                projectId={project.id}
                size="sm"
              />
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  onClick={(Event: React.MouseEvent) => {
                    Event.stopPropagation();
                    router.push(`/projects/${project.id}/settings`);
                  }}
                >
                  <PencilIcon className="text-muted-foreground" />
                  <span>Edit Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground" />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={isPending}
                  onClick={async (Event: React.MouseEvent) => {
                    Event.stopPropagation();
                    handleConfirm();
                  }}
                >
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {/* <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroup>
  );
}
