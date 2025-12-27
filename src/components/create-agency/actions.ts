import { Agency } from "@/lib/admin-mgt-bff";
import { createAgency } from "@/lib/admin-mgt-bff/api";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export const createAgencyAction = async (
  agency: Omit<Agency, "agencyId">,
  session: Session | null
) => {
  if (!session) {
    return redirect("/login");
  }
  try {
    await createAgency(agency, session);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create agency" };
  }
};
