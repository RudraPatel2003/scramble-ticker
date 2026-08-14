import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Used by ShadCN; do not touch
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
