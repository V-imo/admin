"use server";

import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAgency } from "@/lib/admin-mgt-bff/api";
import UpdateForm from "./update-form";

export default async function AgencyInfo({ agencyId }: { agencyId: string }) {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const agency = await getAgency(agencyId, session);
  if (!agency) {
    return notFound();
  }
  return <UpdateForm agency={agency} />;
}
