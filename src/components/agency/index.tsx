import { getAgency } from "@/lib/admin-mgt-bff/api";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { TabsContent, TabsList, TabsTrigger, Tabs } from "../ui/tabs";
import AgencyInfo from "./components/info";
import AgencyEmployee from "./components/employee";

export default async function AgencyPage({
  params,
}: {
  params: { agencyId: string };
}) {
  const { agencyId } = await params;
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  const agency = await getAgency(agencyId, session);
  if (!agency) {
    return notFound();
  }
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="employees">Employees</TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        <AgencyInfo agencyId={agencyId} />
      </TabsContent>
      <TabsContent
        value="employees"
        forceMount
        className="data-[state=inactive]:hidden"
      >
        <AgencyEmployee />
      </TabsContent>
    </Tabs>
  );
}
