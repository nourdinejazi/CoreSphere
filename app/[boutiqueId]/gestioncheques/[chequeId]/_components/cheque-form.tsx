"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { Cheque } from "@prisma/client";

import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { cn } from "@/lib/utils";

import SmallSpinner from "@/components/small-spinner";
import { ChequeSchema } from "@/schemas/cheque-schemas";

interface SegmentsFormProps {
  initialData: Cheque | null;
}

import { banks } from "@/data/jdata";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { AddCheque } from "@/actions/cheque-actions/add-cheque";
import { UpdateCheque } from "@/actions/cheque-actions/update-cheque";

const SegmentsForm = ({ initialData }: SegmentsFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof ChequeSchema>>({
    resolver: zodResolver(ChequeSchema),
    defaultValues: initialData || {
      codeBanque: "",
      nche: "",
      lib: "",
      montant: 0,
      date: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ChequeSchema>) => {
    startTransition(() => {
      if (initialData) {
        UpdateCheque(
          values,
          params.segmentId as string,
          params.chequeId as string
        ).then((data) => {
          // if (data?.error) {
          //   toast.error(data.error);
          // }
          // if (data?.success) {
          //   toast.success(data.success);
          // }
        });
      } else {
        AddCheque(values, params.boutiqueId as string).then((data) => {
          // if (data?.error) {
          //   toast.error(data.error);
          // }
          // if (data?.success) {
          //   toast.success(data.success);
          // }
        });
      }
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" p-8 bg-white mt-8 rounded-xl shadow-md"
        >
          <div className="  flex items-start justify-center gap-5 p-4 flex-wrap   ">
            <FormField
              control={form.control}
              name="codeBanque"
              render={({ field }) => (
                <FormItem className="flex flex-col w-[300px]">
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
                            ? banks.find(
                                (banque) => banque.code === field.value
                              )?.code
                            : "Select language"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] max-h-[300px] overflow-auto  p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {banks.map((banque) => (
                            <CommandItem
                              value={banque.code}
                              key={banque.code}
                              onSelect={() => {
                                form.setValue("codeBanque", banque.code);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  banque.code === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {banque.code}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {field.value &&
                      banks.find((banque) => banque.code === field.value)?.name}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nche"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <FormLabel className="text-base">Num Chéque</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[400px]"
                      disabled={isPending}
                      placeholder=""
                      type="text"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lib"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <FormLabel className="text-base">libellé</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="w-[400px]"
                      disabled={isPending}
                      placeholder=""
                      type="text"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="montant"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <FormLabel className="text-base">Montant</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder=""
                      type="number"
                      min="0"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-2.5 ">
                  <FormLabel>Date.VAl</FormLabel>
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
          </div>

          <div className="w-full flex justify-center gap-5 sm:justfiy-center  mt-4 flex-wrap   ">
            <Button
              className="w-[150px] bg-[#E9ECEF] text-[#6C757D] hover:bg-[#E9ECEF] "
              type="reset"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="flex items-center justify-center gap-2"
            >
              {isPending && <SmallSpinner />}
              {initialData && !isPending && "Update Cheque"}
              {initialData && isPending && "Updating Cheque..."}
              {!initialData && !isPending && "Create Cheque"}
              {!initialData && isPending && "Creating Cheque..."}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SegmentsForm;