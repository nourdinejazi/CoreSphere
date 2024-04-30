"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CornerRightDown, LogIn, MoreHorizontal, Store } from "lucide-react";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { Cheque } from "@prisma/client";
import { ParamsHook } from "@/hooks/use-parmas";
import { DeleteCheque } from "@/actions/cheque-actions/delete-cheque";
import { Badge } from "@/components/ui/badge";
import Alerte from "@/components/alerte";
import { AlertUse } from "@/hooks/use-alerte";
import { DateBanqueForm } from "./dateBanque-form";
import { Console } from "console";
type Pdata = {
  id: string;
  nche: string;
  lib: string;
  montant: number;
  codeBanque: string;
  date: Date;
  type: string | null;
  dateBanque: Date | null;
  banqueVersement: string;
  versementId: string;
  num: string;
  dateVersement: Date;
};

export const PversementColumns: ColumnDef<Pdata>[] = [
  {
    accessorKey: "codeBanque",
    id: "codeBanque",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start p-0"
        >
          CodeB
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          <Badge variant={"default"}>{row.original.codeBanque}</Badge>
        </span>
      );
    },
  },

  {
    accessorKey: "nche",
    id: "nche",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start p-0"
        >
          Nche
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.nche}</span>;
    },
  },

  {
    accessorKey: "num",
    id: "num",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start p-0"
        >
          Num Bordereaux
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.num}</span>;
    },
  },

  {
    accessorKey: "lib",
    id: "lib",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start p-0"
        >
          Lib
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.lib}</span>;
    },
  },

  {
    accessorKey: "montant",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Montant
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="">{row.original.montant}</span>;
    },
    enableGrouping: true,
  },

  {
    accessorKey: "dateVersement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Date vérsement
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.dateVersement.toLocaleDateString()}</span>;
    },
    filterFn: (rows, id, filterValue) => {
      return (
        rows.original.dateVersement.setHours(0, 0, 0, 0) >=
          filterValue.from.setHours(0, 0, 0, 0) &&
        rows.original.dateVersement.setHours(0, 0, 0, 0) <=
          filterValue.to.setHours(0, 0, 0, 0)
      );
    },
  },

  {
    accessorKey: "banqueVersement",
    id: "banqueVersement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start p-0"
        >
          Banque de vérsement
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          <Badge className="" variant={"secondary"}>
            {row.original.banqueVersement} <LogIn className="ml-1" size={15} />
          </Badge>
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "dateBanque",
    id: "dateBanque",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-start p-0"
        >
          Date Banque
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return !row.original.dateBanque ? (
        <DateBanqueForm id={row.original.id} />
      ) : (
        row.original.dateBanque.toLocaleDateString()
      );
    },
    filterFn: (row, id, value) => {
      if (value.includes("pointé") && row.getValue(id)) {
        return true;
      } else if (value.includes("npointé") && !row.getValue(id)) {
        return true;
      }
      return false;
    },
  },
];
