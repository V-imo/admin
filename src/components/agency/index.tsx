import { TabsContent, TabsList, TabsTrigger, Tabs } from "../ui/tabs";
import AgencyInfo from "./components/info";
import AgencyEmployee from "./components/employee";

export default async function AgencyPage({
  params,
}: {
  params: { agencyId: string };
}) {
  const { agencyId } = await params;
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
        <AgencyEmployee agencyId={agencyId}/>
      </TabsContent>
    </Tabs>
  );
}
