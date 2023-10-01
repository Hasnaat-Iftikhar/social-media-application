import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createResponse(
  error: boolean,
  data: string | object,
  status: number
): Response {
  const responseBody = JSON.stringify({ error, data });

  return new Response(responseBody, {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export function formatTimeDifference(timestamp: string): string {
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - new Date(timestamp).getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? `${days} day ago` : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
  } else {
    return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
  }
}
