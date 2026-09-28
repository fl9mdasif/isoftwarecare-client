import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const categoryName = (c: unknown): string | undefined =>
  c && typeof c === "object" && "name" in c ? String((c as { name: string }).name) : undefined;

export const categoryId = (c: unknown): string | undefined =>
  c && typeof c === "object" && "_id" in c ? String((c as { _id: string })._id) : typeof c === "string" ? c : undefined;
