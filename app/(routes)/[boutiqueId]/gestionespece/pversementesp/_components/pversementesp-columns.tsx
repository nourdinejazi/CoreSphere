"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

import { ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateBanqueForm } from "./dateBanque-form";

interface PversementespColumnsProps {
  banqueVersement: string;
  id: string;
  num: string;
  dateVersmentEsp: Date;
  montant: number;
  bankId: string;
  dateBanque: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export const PversementespColumns: ColumnDef<PversementespColumnsProps>[] = [
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
    accessorKey: "banqueVersement",
    id: "banqueVersement",
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
          <Badge variant={"default"}>{row.original.banqueVersement}</Badge>
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    accessorKey: "dateVersmentEsp",
    id: "dateVersmentEsp",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className=" text-start p-0"
        >
          Date Versementesp
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
      if (!row.original.dateBanque)
        return <DateBanqueForm initialData={null} id={row.original.id} />;
      else {
        const day = row.original.dateBanque?.getDate().toString();
        const month = (row.original.dateBanque?.getMonth() + 1).toString();
        const year = row.original.dateBanque?.getFullYear().toString();
        const initialData = { day, month, year };
        return (
          <DateBanqueForm initialData={initialData} id={row.original.id} />
        );
      }
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
