"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import vbanks from "@/data/vbanks.json";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import { ChevronsUpDown, Check, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { Cheque } from "@prisma/client";

const BourdForm = ({
  form,
}: {
  form: UseFormReturn<
    {
      codeBanque: string;
      num: string;
      dateVersement: Date;
      cheque: Cheque[];
    },
    any,
    undefined
  >;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      //  className="  flex items-start justify-center gap-5 p-4 flex-wrap   "
      className="grid grid-cols-2 gap-10  "
    >
      <FormField
        control={form.control}
        name="codeBanque"
        render={({ field }) => (
          <FormItem className="flex flex-col max-w-[400px] ">
            <FormLabel className="text-base">Code Banque</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      " justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? vbanks.find((banque) => banque.CODB === field.value)
                          ?.CODB
                      : "Select code banque"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] max-h-[300px] overflow-auto  p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandEmpty>No language found.</CommandEmpty>
                  <CommandGroup>
                    {vbanks.map((banque) => (
                      <CommandItem
                        value={banque.CODB}
                        key={banque.CODB}
                        onSelect={() => {
                          form.setValue("codeBanque", banque.CODB);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            banque.CODB === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {banque.CODB}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription className="pl-1">
              {field.value &&
                vbanks.find((banque) => banque.CODB === field.value)?.NOMB}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="dateVersement"
        render={({ field }) => (
          <FormItem className="flex flex-col pt-2.5 max-w-[400px]">
            <FormLabel>Date Versement</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      " pl-3  text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: fr })
                    ) : (
                      <span className="mx-2">Choisir une date</span>
                    )}
                    <div className="w-2"></div>
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 " />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value!}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="num"
        render={({ field }) => (
          <FormItem className="flex flex-col items-start justify-center  ">
            <FormLabel className="text-base">Num bordereau</FormLabel>
            <FormControl>
              <Input
                {...field}
                onBlur={(e) => {
                  if (e.target.value.length < 7) {
                    form.setValue("num", e.target.value.padStart(7, "0"));
                  }
                }}
                className={"max-w-[400px]"}
                placeholder="Numero de bordereau"
                type="text"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BourdForm;
