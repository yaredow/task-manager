"use client";

import {
  BookCheckIcon,
  ChevronDown,
  Home,
  Minus,
  Plus,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import DottedSeparator from "./dotted-separator";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { NavProjects } from "./nav-projects";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My Tasks",
    url: "/tasks",
    icon: BookCheckIcon,
  },

  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="">
                  <Image
                    src="/images/logo.svg"
                    alt="logo"
                    width={140}
                    height={70}
                  />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <DottedSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <DottedSeparator />
        <NavProjects />
      </SidebarContent>
    </Sidebar>
  );
}
