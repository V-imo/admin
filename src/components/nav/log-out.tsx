"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="cursor-pointer text-black"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </Button>
  );
};