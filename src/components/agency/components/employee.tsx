import {
  TableHead,
  TableHeader,
  Table,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { getEmployees } from "@/lib/dashboard-employee-bff/api";
import AddEmployeeDialog from "./add-employee";

export default async function AgencyEmployee({
  agencyId,
}: {
  agencyId: string;
}) {
  const employees = await getEmployees(agencyId);
  return (
    <div>
      {!employees ? (
        <>No employee yet</>
      ) : (
        <Table>
          <TableHeader>
            <TableHead>Name</TableHead>
            <TableHead>Mail</TableHead>
          </TableHeader>
          <TableBody>
            {employees?.map((employee) => (
              <TableRow key={employee.username}>
                <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
              </TableRow>
            ) )}
            <TableRow></TableRow>
          </TableBody>
        </Table>
      )}
      <AddEmployeeDialog agencyId={agencyId} />
    </div>
  );
}
