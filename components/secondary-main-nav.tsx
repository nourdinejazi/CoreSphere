"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AnimatedLink from "./animated-link";
const SecondaryMainNav = () => {
  const pathname = usePathname();

  const routes = [
    {
      href:
        pathname.split("/").length > 0
          ? `/${pathname.split("/")[1]}/gestioncheques`
          : "/",
      label: "Liste des chèques",
      active: pathname.split("/").length == 3,
    },
    {
      href:
        pathname.split("/").length > 0
          ? `/${pathname.split("/")[1]}/gestioncheques/reglement`
          : "/",
      label: "Liste des règlements",
      active: pathname.includes(`/gestioncheques/reglement`),
    },
    {
      href:
        pathname.split("/").length > 0
          ? `/${pathname.split("/")[1]}/gestioncheques/versement`
          : "/",
      label: "Liste des vérsements",
      active: pathname.includes(`/gestioncheques/versement`),
    },
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors text-primary  ",
            route.active && "font-bold  "
          )}
        >
          <AnimatedLink text={route.label} selected={route.active} />
        </Link>
      ))}
    </nav>
  );
};

export default SecondaryMainNav;
