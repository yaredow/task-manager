"use client";

import { useGetProject } from "@/features/projects/api/use-get-projects";

export default function ProjectPage() {
  const { projects, isLoading } = useGetProject();

  return <main>{JSON.stringify(projects)}</main>;
}
