import { Cheque } from "@prisma/client";
import { ControllerRenderProps } from "react-hook-form";
import { ChoisirColumns } from "./choisir-columns";
import { DataTable } from "./choisir-data-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

const ChoisirForm = ({
  field,
  data,
}: {
  field: ControllerRenderProps<
    {
      codeBanque: string;
      num: string;
      dateVersement: Date;
      cheque: Cheque[];
    },
    "cheque"
  >;
  data: Cheque[];
}) => {
  const [initialValues, setInitialValues] = useState<Cheque[]>([]);
  const [selectedRows, setSelectedRows] = useState<Cheque[]>([]);
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    setInitialValues(field.value);
  }, []);

  const handleClick = (id: string) => {
    setId(id);
  };

  return (
    <div>
      <Table>
        <TableCaption>Liste des chéques a versé</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">C.Banque</TableHead>
            <TableHead>Num Cheque</TableHead>
            <TableHead>Libélé</TableHead>
            <TableHead>Date échéance</TableHead>
            <TableHead className="text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {field.value.map(
            (cheque) => (
              console.log("aaa", cheque),
              (
                <TableRow key={cheque.id}>
                  <TableCell>
                    <Badge variant={"default"}>{cheque.codeBanque}</Badge>
                  </TableCell>
                  <TableCell>{cheque.nche}</TableCell>
                  <TableCell>{cheque.lib}</TableCell>
                  <TableCell>
                    {format(new Date(cheque.date), "PPP", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">{cheque.montant}</TableCell>
                  <TableCell className="flex justify-end">
                    <Trash
                      onClick={() => {
                        if (
                          initialValues.find((item) => item.id === cheque.id)
                        ) {
                          setInitialValues([
                            ...initialValues.filter(
                              (item) => item.id !== cheque.id
                            ),
                          ]);
                          field.onChange([
                            ...field.value.filter(
                              (item) => item.id !== cheque.id
                            ),
                          ]);
                        } else {
                          handleClick(cheque.id);
                        }
                      }}
                      className="size-4 cursor-pointer text-red-500"
                    />
                  </TableCell>
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>
      <DataTable
        initialValues={initialValues}
        field={field}
        data={data}
        unselectId={id}
        columns={ChoisirColumns}
      />
    </div>
  );
};

export default ChoisirForm;
