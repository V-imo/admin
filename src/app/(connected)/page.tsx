"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
