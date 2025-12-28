"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Agency } from "@/lib/admin-mgt-bff";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { updateAgencyAction } from "../actions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function UpdateAgencyForm(props: { agency: Agency }) {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [agency, setAgency] = useState<Agency>(props.agency);

  async function action() {
    setIsLoading(true);
    const result = await updateAgencyAction(agency, session);
    if (result.success) {
      toast.success("Agency updated successfully");
    } else {
      toast.error(result.error || "Failed to create agency");
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={action}>
      <Label>Name</Label>
      <Input
        type="text"
        name="name"
        placeholder="Name"
        value={agency.name}
        onChange={(e) => setAgency({ ...agency, name: e.target.value })}
        required
        className="w-[200px]"
      />
      <Label>Contact Mail</Label>
      <Input
        type="email"
        name="contactMail"
        placeholder="Contact Mail"
        value={agency.contactMail}
        onChange={(e) => setAgency({ ...agency, contactMail: e.target.value })}
        required
        className="w-[200px]"
      />
      <Label>Contact Phone</Label>
      <Input
        type="tel"
        name="contactPhone"
        placeholder="Contact Phone"
        value={agency.contactPhone}
        onChange={(e) => setAgency({ ...agency, contactPhone: e.target.value })}
        className="w-[200px]"
      />

      <Separator className="m-2 mt-5"/>

      <h2>Address</h2>
      <Label>Number</Label>
      <Input
        type="text"
        name="address.number"
        placeholder="Address Number"
        value={agency.address.number}
        onChange={(e) =>
          setAgency({
            ...agency,
            address: { ...agency.address, number: e.target.value },
          })
        }
        required
        className="w-[200px]"
      />
      <Label>Street</Label>
      <Input
        type="text"
        name="address.street"
        placeholder="Address Street"
        value={agency.address.street}
        onChange={(e) =>
          setAgency({
            ...agency,
            address: { ...agency.address, street: e.target.value },
          })
        }
        required
        className="w-[200px]"
      />
      <Label>City</Label>
      <Input
        type="text"
        name="address.city"
        placeholder="Address City"
        value={agency.address.city}
        onChange={(e) =>
          setAgency({
            ...agency,
            address: { ...agency.address, city: e.target.value },
          })
        }
        required
        className="w-[200px]"
      />
      <Label>Zip Code</Label>
      <Input
        type="text"
        name="address.zipCode"
        placeholder="Address Zip Code"
        value={agency.address.zipCode}
        onChange={(e) =>
          setAgency({
            ...agency,
            address: { ...agency.address, zipCode: e.target.value },
          })
        }
        required
        className="w-[200px]"
      />
      <Label>Country</Label>
      <Select
        name="address.country"
        value={`${agency.address.country}|${agency.timezone}`}
        onValueChange={(value) =>
          setAgency({
            ...agency,
            address: {
              ...agency.address,
              country: value.split("|")[0],
            },
            timezone: value.split("|")[1],
          })
        }
        required
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FRA|Europe/Paris">France</SelectItem>
          <SelectItem value="GBR|Europe/London">United Kingdom</SelectItem>
          <SelectItem value="BEL|Europe/Brussels">Belgium</SelectItem>
          <SelectItem value="DEU|Europe/Berlin">Germany</SelectItem>
          <SelectItem value="ITA|Europe/Rome">Italy</SelectItem>
          <SelectItem value="ESP|Europe/Madrid">Spain</SelectItem>
          <SelectItem value="POR|Europe/Lisbon">Portugal</SelectItem>
          <SelectItem value="NLD|Europe/Amsterdam">Netherlands</SelectItem>
          <SelectItem value="CHE|Europe/Zurich">Switzerland</SelectItem>
          <SelectItem value="AUT|Europe/Vienna">Austria</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? `Updating ${agency.name}...` : `Update ${agency.name}`}
      </Button>
    </form>
  );
}
