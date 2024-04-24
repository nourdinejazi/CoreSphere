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

import { Cheque, Versement } from "@prisma/client";

import dynamic from "next/dynamic";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  CircleCheckBig,
} from "lucide-react";

import { cn } from "@/lib/utils";
import SmallSpinner from "@/components/small-spinner";
import { ChequeSchema, versementSchema } from "@/schemas/cheque-schemas";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import BourdForm from "../_components/bourd-form";

import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import ChoisirForm from "../_components/choisir-form";
import axios from "axios";
import Ld from "@/components/loader";
import { AddBourd } from "@/actions/bourd-actions/add-bourd";
import { UpdateBourd } from "@/actions/bourd-actions/update-bourd";

interface VersementFormProps {
  initialData: (Versement & { cheque: Cheque[] }) | null;
}

const VersementForm = ({ initialData }: VersementFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [completed, setCompleted] = useState([false, false]);
  const [selected, setSelected] = useState("bourd");
  const [chequesData, setChequesData] = useState<Cheque[]>([]);
  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof versementSchema>>({
    resolver: zodResolver(versementSchema),
    defaultValues: initialData || {
      codeBanque: "",
      num: "",
      dateVersement: undefined,
      cheque: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof versementSchema>) => {
    values.cheque = values.cheque.map((cheque) => cheque.id);
    startTransition(() => {
      if (initialData) {
        toast.promise(
          () =>
            UpdateBourd(
              values,
              params.boutiqueId as string,
              params.versementId as string
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
            AddBourd(values, params.boutiqueId as string).then((data) => {
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

    router.push(`/${params.boutiqueId}/gestioncheques/versement`);
  };

  const handleNext = async () => {
    form
      .trigger(["codeBanque", "num", "dateVersement"])
      .then(async (isValid) => {
        startTransition(async () => {
          if (isValid) {
            console.log(form.getValues("dateVersement").setHours(0, 0, 0, 0));
            // console.log(
            //   new Date(form.getValues("dateVersement").setHours(0, 0, 0, 0))
            // );
            const res = await axios.get(
              `/api/chequevc/${form
                .getValues("dateVersement")
                .setHours(0, 0, 0, 0)}`
            );
            setChequesData(res.data);
            setSelected("choisir");
            setCompleted([true, false]);
          } else {
            setCompleted([false, false]);
          }
        });
      });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" p-8 bg-white mt-8 rounded-xl shadow-md"
        >
          <Tabs defaultValue={selected} value={selected}>
            <TabsList className="relative flex items-center justify-center mb-8 px-4 bg-[#E9EEF0] text-white h-[100px] rounded-xl">
              <div className="h-[50px] flex items-center justify-between  relative  w-[50%]">
                <Separator className=" absolute z-10 inset-x-0 top-1/2 w-[90%] bg-primary  m-auto h-[1px]" />

                <TabLabel
                  index={1}
                  completed={completed[0]}
                  value={"bourd"}
                  selected={selected}
                  label="1. Remplir le bordereau"
                />

                <TabLabel
                  index={2}
                  completed={completed[1]}
                  value={"choisir"}
                  selected={selected}
                  label="2. Choisir les chèques"
                />
              </div>
            </TabsList>
            <TabsContent className=" " value="bourd">
              <BourdForm form={form} />
              <div className="w-full flex justify-center gap-5 sm:justfiy-center   mt-10 flex-wrap   ">
                <Button
                  disabled={isPending}
                  onClick={() => handleNext()}
                  type="button"
                  className="flex items-center h-[40px] min-w-[150px] justify-center gap-2"
                >
                  {isPending ? (
                    <span className="flex items-center justify-center gap-1">
                      <SmallSpinner />
                      Chargement des Chèques...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      Suivant <ChevronRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
              </div>
            </TabsContent>
            <TabsContent className=" " value="choisir">
              <FormField
                control={form.control}
                name="cheque"
                render={({ field }) => (
                  <FormItem className="    rounded-xl  ">
                    <ChoisirForm data={chequesData} field={field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end gap-5 sm:justfiy-center   mt-10 flex-wrap   ">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="flex items-center h-[40px] w-auto justify-center gap-2"
                >
                  {isPending && <SmallSpinner />}
                  {initialData && !isPending && "Update Cheque"}
                  {initialData && isPending && "Updating Cheque..."}
                  {!initialData && !isPending && "Create bordereaux "}
                  {!initialData && isPending && "Creating bordereaux..."}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
};

export default VersementForm;

const TabLabel = ({
  selected,
  label,
  value,
  index,
  completed,
}: {
  index: number;
  completed: boolean | undefined;
  selected: string;
  label: string;
  value: string;
}) => {
  return (
    <div
      className={cn(
        "  z-20 flex relative font-[600] items-center justify-center gap-2 bg-[#E9EEF0] border border-primary  text-primary   rounded-lg md:h-[50px]    h-[30px]   px-3",
        selected === value && "bg-white text-primary "
      )}
    >
      {completed && (
        <CircleCheckBig
          size={17}
          className="absolute text-primary -top-3 -right-5"
        />
      )}
      <span className="md:hidden">{index}</span>
      <small className="hidden md:block ">{label}</small>
    </div>
  );
};
