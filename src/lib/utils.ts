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
