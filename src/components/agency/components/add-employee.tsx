"use client";

import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon } from "lucide-react";
import { addEmployeeAction } from "../actions";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddEmployeeDialog({ agencyId }: { agencyId: string }) {
  const [open, setOpen] = useState(false);

  const action = async (_prevState: unknown, formData: FormData) => {
    try {
      const res=  await addEmployeeAction(formData);
      if(res.success) {
        toast.success("Employee added successfully");
        setOpen(false);
      } else {
        toast.error("Failed to add employee");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      return { error: "Failed to add employee" };
    }
  };

  const [, formAction, isPending] = useActionState(action, null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <PlusIcon className="w-4 h-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction}>
          <div className="flex flex-col gap-4">
            <input type="hidden" name="agencyId" value={agencyId} />
            <Input type="text" name="firstName" placeholder="First Name" />
            <Input type="text" name="lastName" placeholder="Last Name" />
            <Input type="email" name="email" placeholder="Email" />
            <Button variant="default" size="sm" type="submit" >
              {isPending ? "Adding..." : "Add Employee"}
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}