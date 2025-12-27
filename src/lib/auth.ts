import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { isSessionExpired } from "./utils";
import { redirect } from "next/navigation";

export async function auth() {
  const session = await getServerSession(authOptions);

  if (!session || isSessionExpired(session)) {
    return redirect("/login");
  }
  return session;
}