"use client";

import * as React from "react";
import { Store } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command-for-modal";
import { Badge } from "./ui/badge";
import { boutiques } from "@/data/jdata";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const { setTheme } = useTheme();
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Boutiques">
            {boutiques.map((boutique) => (
              <CommandItem
                value={boutique.id}
                onSelect={(value) => {
                  setTheme(value);
                  router.push(`/${value}/gestioncheques`);
                  setOpen(false);
                }}
                disabled={false}
                key={boutique.id}
              >
                <span className="flex items-center justify-start gap-2  w-[100px] mr-2 ">
                  <Store />
                  <Badge className="" variant={"secondary"}>
                    {boutique.id}
                  </Badge>
                </span>
                <span className="">{boutique.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  );
}
