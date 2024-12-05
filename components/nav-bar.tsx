"use client";

import UserButton from "@/features/auth/components/user-button";
import MobileNavbar from "./mobile-navbar";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathName = usePathname();

  const routes = {
    "/": { title: "Home", description: "Welcome to your dashboard." },
    "/projects": {
      title: "Projects",
      description: "Track all your projects and progress here.",
    },
    "/tasks": {
      title: "Tasks",
      description: "Manage your tasks effectively and stay organized.",
    },
  };

  const { title, description } =
    routes[pathName as keyof typeof routes] || routes["/"];

  return (
    <nav className="lg:pl-[280px] pt-4 flex px-6 items-center justify-between">
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <MobileNavbar />
      <UserButton />
    </nav>
  );
}
