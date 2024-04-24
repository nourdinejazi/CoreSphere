"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  ColumnFiltersState,
  useReactTable,
  VisibilityState,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import FilterInput from "@/components/filter_input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import { HandCoins, Menu } from "lucide-react";
import { DataTablePagination } from "@/components/data-table-pagination";
import { Cheque } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    filterFromLeafRows: true,
    state: {
      rowSelection,
      columnFilters,
      columnVisibility,
      sorting,
      globalFilter: globalFilter,
    },
  });

  const onDateChange = (newDateRange: DateRange | undefined) => {
    if (newDateRange?.from && newDateRange?.to) {
      table.getColumn("dateVersement")?.setFilterValue(newDateRange);
    }
    if (!newDateRange?.from && !newDateRange?.to) {
      table.getColumn("dateVersement")?.setFilterValue("");
    }
  };

  return (
    <div className=" pb-16 ">
      <div className="rounded-t-xl   bg-white pt-4 px-4 print:p-0 shadow-md">
        <div className=" no-print  text-[#969696] flex flex-col items-center justify-center  gap-2   ">
          <div className="flex gap-2 px-3  no-scroll-bar    items-center justify-start  w-full overflow-x-auto  ">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filtre global sur chéque"
                value={
                  (table.getColumn("cheque")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("cheque")?.setFilterValue(event.target.value)
                }
                className="max-w-sm text-black"
              />
            </div>

            <div className="flex items-center ">
              <Input
                placeholder="Code Banque"
                value={
                  (table.getColumn("codeBanque")?.getFilterValue() as string) ??
                  ""
                }
                onChange={(event) =>
                  table
                    .getColumn("codeBanque")
                    ?.setFilterValue(event.target.value)
                }
                className="max-w-sm text-black"
              />
            </div>

            <div className="flex items-center ">
              <Input
                placeholder="Numero Bordereau"
                value={
                  (table.getColumn("num")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("num")?.setFilterValue(event.target.value)
                }
                className="max-w-sm text-black"
              />
            </div>

            <DatePickerWithRange onDateChange={onDateChange} />
          </div>
        </div>

        <div className="bg-[#E9EEF0] print:bg-white space-y-4 rounded-t-xl p-4  ">
          <h1 className="text-xl font-medium">Liste des Vérsement</h1>
          <div className="text-sm flex items-center justify-start gap-2">
            <span className="font-semibold"> Total montant :</span>
            <span className="text-primary font-bold">
              {table.getFilteredRowModel().rows.reduce((total, current) => {
                return (
                  total +
                  (
                    current.original as { cheque: { montant: number }[] }
                  ).cheque.reduce((total, current) => {
                    return total + current.montant;
                  }, 0)
                );
              }, 0)}
            </span>
            <HandCoins size={17} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-auto print:hidden">
                  <Menu />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Table className=" ">
          <TableHeader className="bg-[#E9EEF0]  ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-primary " key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
