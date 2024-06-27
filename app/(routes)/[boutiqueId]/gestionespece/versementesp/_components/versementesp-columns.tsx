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
import { MoreHorizontal } from "lucide-react";

import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { Banks, versementEsp } from "@prisma/client";
import { ParamsHook } from "@/hooks/use-parmas";
import { AlertUse } from "@/hooks/use-alerte";
import { Badge } from "@/components/ui/badge";

export const VersementEspColumns: ColumnDef<versementEsp & { bank: Banks }>[] =
  [
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
      accessorKey: "bank",
      id: "bank",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="text-start p-0"
          >
            Code Banque
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span>
            <Badge variant={"default"}>{row.original.bank.CODB}</Badge>
          </span>
        );
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
            Numero Bordereau
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <span>{row.original.num}</span>;
      },
    },

    {
      accessorKey: "dateRetrait",
      id: "dateRetrait",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className=" text-start p-0"
          >
            Date Retrait
            <ChevronsUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return (
          <span>
            {new Date(row.original.dateVersmentEsp).toLocaleDateString()}
          </span>
        );
      },
      filterFn: (rows, id, filterValue) => {
        return (
          rows.original.dateVersmentEsp.setHours(0, 0, 0, 0) >=
            filterValue.from.setHours(0, 0, 0, 0) &&
          rows.original.dateVersmentEsp.setHours(0, 0, 0, 0) <=
            filterValue.to.setHours(0, 0, 0, 0)
        );
      },
    },

    {
      accessorKey: "montant",
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
        return <span className="">{row.original.montant}</span>;
      },
      enableGrouping: true,
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
                <Button variant="ghost" className="h-8 w-8 p-0  ">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white z-50 mb-3 shadow-lg p-4 rounded-xl  font-semibold"
                align="end"
              >
                <Link
                  href={`/${params.boutiqueId}/gestionespece/retrait/${row.original.id}`}
                >
                  <DropdownMenuItem className="hover:text-primary p-2 cursor-pointer focus:outline-none">
                    Edit
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="hover:text-primary p-2 focus:outline-none cursor-pointer"
                  onClick={() => {
                    alr.setOpen();
                    alr.setModule("VersementEsp");
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
