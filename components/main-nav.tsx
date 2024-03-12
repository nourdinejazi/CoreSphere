"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const MainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      href:
        pathname.split("/").length > 0
          ? `/${pathname.split("/")[1]}/gestioncheques`
          : "/",
      label: "Gestion des chèques",
      active: pathname.includes(`/gestioncheques`),
    },
  ];
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors ",
            route.active
              ? "font-semibold bg-secondary text-primary  p-2 rounded-[9999px] px-4 "
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
