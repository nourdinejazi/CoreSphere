"use client";

import { Cheque, Versement } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, HandCoins, Sigma } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import fr from "date-fns/locale/fr";

const ViewCheques = ({ data }: { data: Versement & { cheque: Cheque[] } }) => {
  return (
    <Dialog>
      <DialogTrigger className="">
        <Eye />
      </DialogTrigger>
      <DialogContent className="w-auto max-w-full">
        <DialogHeader>
          <DialogTitle className="mb-2">Bordereau R.N°{data.num}</DialogTitle>
          <span className="text-sm flex gap-2">
            Total :{" "}
            <span className="font-semibold text-primary  flex items-center justify-center gap-1">
              {data.cheque
                .reduce((total, current) => {
                  return total + current.montant;
                }, 0)
                .toString()}{" "}
              <HandCoins size={14} />
            </span>
            <span>|</span> Nombre des chéques :{" "}
            <span className="font-semibold flex items-center justify-center gap-1 text-primary">
              {data.cheque.length} <Sigma size={14} />
            </span>
          </span>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="   rounded-xl ">
          <Table className="text-nowrap">
            <TableCaption>Liste des chéque du Bordereau </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>COP</TableHead>
                <TableHead className="w-[100px]">C.Banque</TableHead>
                <TableHead>Num Cheque</TableHead>
                <TableHead>Libélé</TableHead>
                <TableHead>Date échéance</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.cheque.map((cheque, _) => (
                <TableRow key={cheque.id}>
                  <TableCell>{_ + 1}</TableCell>
                  <TableCell>
                    <Badge variant={"default"}>{cheque.codeBanque}</Badge>
                  </TableCell>
                  <TableCell>{cheque.nche}</TableCell>
                  <TableCell>{cheque.lib}</TableCell>
                  <TableCell>
                    {format(cheque.date, "PPP", { locale: fr })}
                  </TableCell>
                  <TableCell className="text-right">{cheque.montant}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCheques;
