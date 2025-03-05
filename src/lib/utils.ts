import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime24to12(time: string): string {
  const [hourStr, minutes, seconds] = time.split(":");
  console.log("🚀 ~ formatTime24to12 ~ seconds:", seconds)
  let hours = parseInt(hourStr, 10);

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; 

  return `${hours}:${minutes} ${period}`;
}
