import { clsx, type ClassValue } from "clsx"
import { Session } from "next-auth";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getClientHeaders(session: Session | null) {
  if (!session?.idToken) {
    throw new Error("No session found");
  }
  return { Authorization: session.idToken };
}

export function isSessionExpired(session: Session | null) {
  if(!session) {
    return true;
  }
  if (!session?.expires && new Date(session.expires) < new Date()) {
    return true;
  }
  return false;
}