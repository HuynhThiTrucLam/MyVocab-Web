import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility functions will go here
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString()
}
