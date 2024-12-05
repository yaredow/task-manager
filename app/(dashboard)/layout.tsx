import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/nav-bar";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import CreateProjectModal from "@/features/projects/components/create-project-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex w-full h-full">
      <CreateProjectModal />
      <CreateTaskModal />
      <div className="w-full">
        <div className="mx-auto max-w-screen-2xl h-full">
          <Navbar />
          <main className="h-full py-6 px-6 flex flex-col">
            <SidebarProvider>
              <AppSidebar />
              {children}
            </SidebarProvider>
          </main>
        </div>
      </div>
    </div>
  );
}
