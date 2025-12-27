"use server";

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import LogOutButton from "./log-out";

const pages = [
  {
    title: "Agencies",
    href: "/",
  },
  {
    title: "Create Agency",
    href: "/create-agency",
  },
];



export default async function NavMenu() {
  return (
    <NavigationMenu className="flex justify-between max-w-full w-full border-b p-2 mb-2">
      <NavigationMenuList>
        {pages.map((page) => (
          <NavigationMenuItem key={page.href}>
            <NavigationMenuLink href={page.href}>{page.title}</NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <LogOutButton />
    </NavigationMenu>
  );
}
