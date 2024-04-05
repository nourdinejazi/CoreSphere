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

import { Cheque, Reglement } from "@prisma/client";

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
import { reglementSchema } from "@/schemas/cheque-schemas";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AddCheque } from "@/actions/cheque-actions/add-cheque";
import { UpdateCheque } from "@/actions/cheque-actions/update-cheque";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { AddReglement } from "@/actions/cheque-actions/reglement-actions/add-reglement";

interface ReglementFormProps {
  chequeReglement: Cheque | null;
  recentReglements: Array<Reglement & { cheque: Cheque }>;
}

const ReglementForm = ({
  chequeReglement,
  recentReglements,
}: ReglementFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof reglementSchema>>({
    resolver: zodResolver(reglementSchema),
    defaultValues: {
      method: undefined,
      montantPaye: 0,
      dateReglement: undefined,
    },
  });
  const onSubmit = async (values: z.infer<typeof reglementSchema>) => {
    startTransition(() => {
      toast.promise(
        () =>
          AddReglement(
            values,
            params.chequeId as string,
            params.boutiqueId as string
          ).then((data) => {
            if (data?.error) {
              return Promise.reject(data.error);
            }else {
             return Promise.resolve(data.success);
            }
          }),
        {
          loading: "Ajout en cours...",
          error: (err) => err,
          success: (data) => data,
        }
      );
    });

    router.push(`/${params.boutiqueId}/gestioncheques/reglement`);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" p-8 bg-white mt-8 rounded-xl shadow-md"
        >
          {chequeReglement && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">C.Banque</TableHead>
                  <TableHead>Num Cheque</TableHead>
                  <TableHead>Libélé</TableHead>
                  <TableHead>Date échéance</TableHead>
                  <TableHead>Code Boutique</TableHead>
                  <TableHead>Payé</TableHead>
                  <TableHead> Rest à payé</TableHead>
                  <TableHead className="text-right">Montant</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-secondary" key={chequeReglement.id}>
                  <TableCell>
                    <Badge variant={"default"}>
                      {chequeReglement.codeBanque}
                    </Badge>
                  </TableCell>
                  <TableCell>{chequeReglement.nche}</TableCell>
                  <TableCell>{chequeReglement.lib}</TableCell>
                  <TableCell>
                    {format(chequeReglement.date, "PPP", { locale: fr })}
                  </TableCell>
                  <TableCell>
                    <Badge variant={"outline"}>
                      {chequeReglement.codeBoutique}
                    </Badge>
                  </TableCell>
                  <TableCell>{chequeReglement.payement}</TableCell>
                  <TableCell>{chequeReglement.restapaye}</TableCell>
                  <TableCell className="text-right">
                    {chequeReglement.montant}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}

          <div
            //  className="  flex items-start justify-center gap-5 p-4 flex-wrap   "
            className="grid grid-cols-2 gap-10  border-t pt-8 "
          >
            <FormField
              control={form.control}
              name="dateReglement"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-2.5 max-w-[400px]">
                  <FormLabel>Date Reglement</FormLabel>
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
              name="montantPaye"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-center  ">
                  <FormLabel className="text-base">Montant Payé</FormLabel>
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

            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-2.5 max-w-[400px]">
                  <FormLabel>Method</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ESPECE">Espéce</SelectItem>
                      <SelectItem value="CHEQUE">Chéque</SelectItem>
                      <SelectItem value="OR">Or</SelectItem>
                      <SelectItem value="AVOIR">Avoir</SelectItem>
                      <SelectItem value="AUTRE">Autre</SelectItem>
                    </SelectContent>
                  </Select>

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
              disabled={isPending}
              type="submit"
              className="flex items-center justify-center gap-2"
            >
              {isPending && <SmallSpinner />}
              <span>Valider le reglement</span>
            </Button>
          </div>
        </form>
      </Form>
      <div className="p-8 bg-white mt-8 rounded-xl shadow-md">
        <Table>
          <TableCaption>
            Liste des règlements concernant ce chèque.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">C.Banque</TableHead>
              <TableHead>Num Cheque</TableHead>
              <TableHead>Libélé</TableHead>
              <TableHead>Date échéance</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead>Payé</TableHead>
              <TableHead> Rest à payé</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Montant Payé</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentReglements.map((reglement) => (
              <TableRow key={reglement.id}>
                <TableCell>
                  <Badge variant={"default"}>
                    {reglement.cheque.codeBanque}
                  </Badge>
                </TableCell>
                <TableCell>{reglement.cheque.nche}</TableCell>
                <TableCell>{reglement.cheque.lib}</TableCell>
                <TableCell>
                  {format(reglement.cheque.date, "PPP", { locale: fr })}
                </TableCell>
                <TableCell>{reglement.cheque.montant}</TableCell>
                <TableCell>{reglement.cheque.payement}</TableCell>
                <TableCell>{reglement.cheque.restapaye}</TableCell>
                <TableCell>{reglement.method}</TableCell>
                <TableCell>-{reglement.montantPaye}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReglementForm;
