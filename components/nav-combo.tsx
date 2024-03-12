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
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export function NavCombo() {
  const [open, setOpen] = React.useState(false);
  const [id, setid] = React.useState("");
  const params = useParams();
  const router = useRouter();
  const { setTheme } = useTheme();
  React.useEffect(() => {
    if (id) router.push(`/${id}/gestioncheques`);
  }, [id]);

  console.log(params);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {id ? (
            <div className="flex items-center justify-center gap-2">
              <Store /> {params.boutiqueId}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <Store /> {params.boutiqueId}
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
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
                  console.log(currentid);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    id === boutique.id ? "opacity-100" : "opacity-0"
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