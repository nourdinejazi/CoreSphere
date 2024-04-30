"use client";
import * as React from "react";
import { Check, ChevronsUpDown, Store } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command-for-modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { boutiques } from "@/data/jdata";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function NavCombo({ isCollapsed }: { isCollapsed?: boolean }) {
  const [open, setOpen] = React.useState(false);
  const params = useParams();
  const [id, setid] = React.useState(
    (params.boutiqueId as string) ? (params.boutiqueId as string) : ""
  );

  const router = useRouter();
  const { setTheme } = useTheme();
  const path = usePathname();

  React.useEffect(() => {
    if (id) {
      const route = path.split("/");
      route[1] = id;
      const newRoute = route.join("/");
      router.push(newRoute);
    }
    setTheme(id);
  }, [id]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex  w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
            isCollapsed &&
              "flex h-10 w-10 shrink-0 items-center justify-center p-0 "
          )}
          aria-label="Select Store"
        >
          <Store />
          <div
            className={cn(
              " m-2 flex items-center justify-between w-full gap-1 ",
              isCollapsed && "hidden"
            )}
          >
            {
              boutiques.find((boutique) => boutique.id == params.boutiqueId)
                ?.name
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[250px]  p-0", isCollapsed && "ml-2")}>
        <Command>
          <CommandInput placeholder="Search boutique..." />
          <CommandEmpty>No boutique found.</CommandEmpty>
          <CommandGroup>
            {boutiques.map((boutique) => (
              <CommandItem
                key={boutique.id}
                id={boutique.id}
                value={boutique.id}
                onSelect={(currentid) => {
                  setid(currentid);
                  setTheme(currentid);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    params.boutiqueId === boutique.id
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {boutique.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
