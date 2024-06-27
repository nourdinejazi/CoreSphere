"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useRef, useState, useTransition } from "react";
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

import vbanks from "@/data/vbanks.json";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Check, ChevronsUpDown, MoveLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import { cn } from "@/lib/utils";
import SmallSpinner from "@/components/small-spinner";
import { RetraitSchema } from "@/schemas/espece-schemas";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PathSlash } from "@/components/path-slash";
import Link from "next/link";
import { toast } from "sonner";
import { AddRetrait } from "@/actions/espece-action/retrait/add-retrait";
import { UpdateRetrait } from "@/actions/espece-action/retrait/update-retrait";
import { Badge } from "@/components/ui/badge";

interface RetraitFormProps {
  initialData: any;
  lastRetrait: any;
  recentRetraits: any;
}

const RetraitForm = ({
  initialData,
  lastRetrait,
  recentRetraits,
}: RetraitFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [checkPending, startCheck] = useTransition();
  const ncheRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [ncheChecked, setNcheChecked] = useState(true);
  const [validateCheck, setValidateCheck] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof RetraitSchema>>({
    resolver: zodResolver(RetraitSchema),
    defaultValues: initialData ||
      lastRetrait || {
        codeBanque: "",
        num: "",
        montant: 0,
        dateRetrait: undefined,
      },
  });

  const onSubmit = async (values: z.infer<typeof RetraitSchema>) => {
    startTransition(() => {
      if (initialData) {
        toast.promise(
          () =>
            UpdateRetrait(
              values,
              params.boutiqueId as string,
              params.retraitId as string
            ).then((data) => {
              if (data?.error) {
                return Promise.reject(data.error);
              } else {
                return Promise.resolve(data.success);
              }
            }),
          {
            loading: "Mise à jour en cours...",
            error: (err) => err,
            success: (data) => data,
          }
        );
      } else {
        toast.promise(
          () =>
            AddRetrait(values, params.boutiqueId as string).then((data) => {
              if (data?.error) {
                return Promise.reject(data.error);
              } else {
                return Promise.resolve(data.success);
              }
            }),
          {
            loading: "Ajout en cours...",
            error: (err) => err,
            success: (data) => data,
          }
        );
      }
    });

    console.log(values);
  };

  return (
    <div className="w-full ">
      <div className="  m-4  no-print flex items-center justify-between   ">
        <PathSlash />
        <Link href={`/${params.boutiqueId}/gestionespece/retrait`}>
          <Button className="">
            <MoveLeft size={20} />
          </Button>
        </Link>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" p-8  bg-white   rounded-xl shadow-md"
        >
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
                            ? vbanks.find(
                                (banque) => banque.CODB === field.value
                              )?.CODB
                            : "Select code banque"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] max-h-[300px] overflow-auto  p-0">
                      <Command>
                        <CommandInput placeholder="Search Bank..." />
                        <CommandEmpty>No Bank found.</CommandEmpty>
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
            <FormField
              control={form.control}
              name="num"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <FormLabel className="text-base">Num Bourdereaux</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={(e) => {
                        if (e.target.value.length < 7) {
                          field.onChange(e.target.value.padStart(7, "0"));
                        }
                      }}
                      disabled={isPending}
                      placeholder=""
                      className="max-w-[400px]"
                      type="text"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateRetrait"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-2.5 max-w-[400px]">
                  <FormLabel>Date Retrait</FormLabel>
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
              name="montant"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <FormLabel className="text-base">Montant</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="max-w-[400px]"
                      disabled={isPending}
                      placeholder=""
                      type="number"
                      step="0.001"
                      min="0"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex justify-center gap-5 sm:justfiy-center  mt-10 flex-wrap   ">
            <Button
              className="w-[150px] bg-[#E9ECEF] text-[#6C757D] hover:bg-[#E9ECEF] "
              type="reset"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending || !ncheChecked}
              type="submit"
              className="flex items-center justify-center gap-2"
            >
              {isPending && <SmallSpinner />}
              {initialData && !isPending && "Update Retrait"}
              {initialData && isPending && "Updating Retrait..."}
              {!initialData && !isPending && "Create Retrait"}
              {!initialData && isPending && "Creating Retrait..."}
            </Button>
          </div>
        </form>
      </Form>
      <div className="p-8 bg-white mt-8 rounded-xl shadow-md">
        <Table>
          <TableCaption>Liste des 10 chéques récents</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">C.Banque</TableHead>
              <TableHead>Num Bourdereaux</TableHead>
              <TableHead>Date Retrait</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRetraits.map((retrait: any) => (
              <TableRow key={retrait.id}>
                <TableCell>
                  <Badge variant={"default"}>{retrait.codeBanque}</Badge>
                </TableCell>
                <TableCell>{retrait.num}</TableCell>
                <TableCell>
                  {format(retrait.dateRetrait, "PPP", { locale: fr })}
                </TableCell>
                <TableCell className="text-right">{retrait.montant}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RetraitForm;
