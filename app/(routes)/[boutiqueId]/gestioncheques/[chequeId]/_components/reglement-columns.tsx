"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";

import {
  CheckCheck,
  ChevronsUpDown,
  CircleAlert,
  CircleCheckBigIcon,
  MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Cheque, Reglement } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ParamsHook } from "@/hooks/use-parmas";
import { AlertUse } from "@/hooks/use-alerte";

export const ReglementColumns: ColumnDef<Reglement & { cheque: Cheque }>[] = [
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
    accessorKey: "cheque.codeBanque",
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
          <Badge variant={"default"}>{row.original.cheque.codeBanque}</Badge>
        </span>
      );
    },
  },

  {
    accessorKey: "cheque.nche",
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
      return <span>{row.original.cheque.nche}</span>;
    },
  },

  {
    accessorKey: "cheque.lib",
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
      return <span>{row.original.cheque.lib}</span>;
    },
  },

  {
    accessorKey: "cheque.montant",
    id: "montant",
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
      return <span className="">{row.original.cheque.montant}</span>;
    },
    enableGrouping: true,
  },

  {
    accessorKey: "cheque.date",
    id: "date",
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
      return <span>{row.original.cheque.date.toLocaleDateString()}</span>;
    },
    filterFn: (rows, id, filterValue) => {
      return (
        rows.original.cheque.date.setHours(0, 0, 0, 0) >=
          filterValue.from.setHours(0, 0, 0, 0) &&
        rows.original.cheque.date.setHours(0, 0, 0, 0) <=
          filterValue.to.setHours(0, 0, 0, 0)
      );
    },
  },
  {
    accessorKey: "cheque.ver",
    id: "ver",
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
    accessorKey: "cheque.statusPayement",
    id: "statusPatyement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Status
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <span>
          {row.original.cheque.statusPayement ? (
            <CircleCheckBigIcon className="text-green-500" size={20} />
          ) : (
            <CircleAlert className="text-yellow-500" size={20} />
          )}
        </span>
      );
    },
  },

  {
    accessorKey: "cheque.codeBoutique",
    id: "codeBoutique",
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
            {row.original.cheque.codeBoutique.toUpperCase()}
          </Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "cheque.payement",
    id: "payement",
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
      return <div>{row.original.cheque.payement}</div>;
    },
  },

  {
    accessorKey: "cheque.payement",
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
      return <div>{row.original.cheque.restapaye}</div>;
    },
  },

  {
    accessorKey: "montantPaye",
    id: "montantPaye",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Montant Payé
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div>-{row.original.montantPaye}</div>;
    },
  },

  {
    accessorKey: "method",
    id: "method",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Method
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          <Badge variant={"secondary"}>{row.original.method}</Badge>
        </div>
      );
    },
  },

  {
    accessorKey: "cheque.type",
    id: "type",
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
      return <div>{row.original.cheque.type}</div>;
    },
  },

  {
    accessorKey: "dateReglement",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Date Réglement
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.dateReglement.toLocaleString()}</span>;
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
              <DropdownMenuItem className="hover:text-primary  focus:outline-none">
                {row.original.cheque.statusPayement ? (
                  <span className="flex items-center justify-items-center  gap-2">
                    <span>Payé</span> <CheckCheck size={20} />
                  </span>
                ) : (
                  <Link
                    href={`/${params.boutiqueId}/gestioncheques/${row.original.cheque.id}/reglement`}
                  >
                    Réglement
                  </Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  alr.setOpen();
                  alr.setModule("Reglement");
                  alr.setCodeBoutique(params.boutiqueId as string);
                  alr.setId(row.original.id);
                }}
                className=" cursor-pointer"
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
