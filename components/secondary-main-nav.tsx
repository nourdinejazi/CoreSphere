"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const SecondaryMainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      href:
        pathname.split("/").length > 0
          ? `/${pathname.split("/")[1]}/gestioncheques`
          : "/",
      label: "Liste des chèques",
      active: pathname.includes(`/gestioncheques`),
    },
    {
      href:
        pathname.split("/").length > 0
          ? `/${pathname.split("/")[1]}/gestioncheques/reglement`
          : "/",
      label: "Liste des règlements",
      active: pathname.includes(`/gestioncheques/reglement`),
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors text-primary underline ",
            route.active ? "font-semibold " : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default SecondaryMainNav;
