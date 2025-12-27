"use server";

import { getAgencies } from "@/lib/admin-mgt-bff/api";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "../ui/button";

export default async function Agencies() {
  const session = await auth();

  const agencies = await getAgencies(session);

  if (!agencies) {
    return notFound();
  }
  return (
    <div>
      <h1>Agencies</h1>
      <div className="flex flex-wrap gap-4">
        {agencies.map((agency) => (
          <Link key={agency.agencyId} href={`/agency/${agency.agencyId}`}>
            <Button variant="outline">
              {agency.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
