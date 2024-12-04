import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function snakeCaseToTitleCase(str: string) {
  console.log({ str });

  return str.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
