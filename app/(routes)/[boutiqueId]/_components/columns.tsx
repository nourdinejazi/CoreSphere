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

export const ChequeColumns: ColumnDef<Cheque>[] = [
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
      return <span>{row.original.date.toLocaleDateString()}</span>;
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
  {
    accessorKey: "ver",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Ver
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

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
      return <span>{row.original.dateBoutique.toLocaleString()}</span>;
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Date Création
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.createdAt.toLocaleString()}</span>;
    },
  },

  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Dérniére Modification
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.updatedAt.toLocaleString()}</span>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const params = ParamsHook();
      const alr = AlertUse();
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-white z-50 mb-3 shadow-lg p-4 rounded-xl  font-semibold"
              align="end"
            >
              <DropdownMenuItem className="hover:text-primary p-2 focus:outline-none">
                <Link
                  href={`/${params.boutiqueId}/gestioncheques/${row.original.id}`}
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:text-primary p-2 focus:outline-none">
                <Link
                  href={`/${params.boutiqueId}/gestioncheques/${row.original.id}/reglement`}
                >
                  Réglement
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:text-primary p-2 focus:outline-none cursor-pointer"
                onClick={() => {
                  alr.setOpen();
                  alr.setModule("Cheque");
                  alr.setCodeBoutique(params.boutiqueId as string);
                  alr.setId(row.original.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
