import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import CreateProjectModal from "@/features/projects/components/create-project-modal";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex w-full h-full">
      <CreateProjectModal />
      <div className="fixed left-0 hidden top-0 lg:block lg:w-[264px] h-full overflow-y-auto"></div>
      <div className="lg:pl-[264px] w-full">
        <div className="mx-auto max-w-screen-2xl h-full">
          <main className="h-full py-8 px-6 flex flex-col">
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
