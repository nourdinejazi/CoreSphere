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
import { MoreHorizontal, Store } from "lucide-react";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { Cheque } from "@prisma/client";
import { ParamsHook } from "@/hooks/use-parmas";
import { DeleteCheque } from "@/actions/cheque-actions/delete-cheque";
import { Badge } from "@/components/ui/badge";
import Alerte from "@/components/alerte";
import { AlertUse } from "@/hooks/use-alerte";

export const ChoisirColumns: ColumnDef<Cheque>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border bg-white  rounded-lg print:hidden"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

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
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Date échéance
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{new Date(row.original.date).toLocaleDateString()}</span>;
    },
    filterFn: (rows, id, filterValue) => {
      return (
        rows.original.date.setHours(0, 0, 0, 0) >=
          filterValue.from.setHours(0, 0, 0, 0) &&
        rows.original.date.setHours(0, 0, 0, 0) <=
          filterValue.to.setHours(0, 0, 0, 0)
      );
    },
  },
  //   {
  //     accessorKey: "ver",
  //     header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //           className=" text-start p-0"
  //         >
  //           Ver
  //           <ChevronsUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       );
  //     },
  //   },

  {
    accessorKey: "codeBoutique",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          CodBou
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <Badge className="" variant={"secondary"}>
            {row.original.codeBoutique.toUpperCase()}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "payement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Payé
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.payement}</div>;
    },
  },

  {
    accessorKey: "restapaye",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Rest à payé
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.restapaye}</div>;
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Type
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>{row.original.type}</div>;
    },
  },

  {
    accessorKey: "dateBoutique",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Date Boutique
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>{new Date(row.original.dateBoutique).toLocaleString()}</span>
      );
    },
  },
];
