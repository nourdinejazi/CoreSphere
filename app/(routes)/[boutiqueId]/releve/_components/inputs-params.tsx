"use client";
import { Check, ChevronsUpDown, FileInput } from "lucide-react";

import { releveSchema } from "@/schemas/cheque-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import vbanks from "@/data/vbanks.json";
import { DatePickerWithRange } from "./date-range";

export default function InputsParams() {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof releveSchema>>({
    resolver: zodResolver(releveSchema),
    defaultValues: {
      codeBanque: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });
  function onSubmit(data: z.infer<typeof releveSchema>) {
    console.log(data);
  }
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full items-start gap-6"
        >
          <fieldset className="grid gap-6 rounded-lg border p-4">
            <legend className="-ml-1 px-1 text-sm font-medium">
              Paramétres
            </legend>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="codeBanque"
                render={({ field }) => (
                  <FormItem className="flex flex-col max-w-[300px] ">
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
                              ? vbanks.find(
                                  (banque) => banque.CODB === field.value
                                )?.CODB
                              : "Select code banque"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] max-h-[300px] overflow-auto  p-0">
                        <Command>
                          <CommandInput placeholder="Search bank..." />
                          <CommandEmpty>No bank found.</CommandEmpty>
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
                        vbanks.find((banque) => banque.CODB === field.value)
                          ?.NOMB}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => {
                  return <DatePickerWithRange field={field} />;
                }}
              />
            </div>
          </fieldset>
          <Button
            className="flex items-center justify-center gap-2"
            type="submit"
          >
            Générer le relevé <FileInput size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
}
