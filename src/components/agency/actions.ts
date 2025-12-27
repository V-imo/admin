import { Agency } from "@/lib/admin-mgt-bff";
import {updateAgency} from "@/lib/admin-mgt-bff/api";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export const updateAgencyAction = async (agency: Agency, session: Session | null) => {
  if (!session) {
    return redirect("/login");
  }
  try {
    await updateAgency(agency, session);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update agency" };
  }
};