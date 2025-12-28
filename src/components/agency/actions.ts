"use server"

import { Agency } from "@/lib/admin-mgt-bff";
import { updateAgency } from "@/lib/admin-mgt-bff/api";
import { auth } from "@/lib/auth";
import { registerEmployee } from "@/lib/dashboard-employee-bff/api";
import { Session } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect, unauthorized } from "next/navigation";

export const updateAgencyAction = async (
  agency: Agency,
  session: Session | null
) => {
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

export const addEmployeeAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const currentAgency = formData.get("agencyId") as string;
  const employee = { email, firstName, lastName, currentAgency };

  try {
    await registerEmployee(employee);
    revalidatePath(`/agency/${currentAgency}`);
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Failed to add employee" };
  }
};
