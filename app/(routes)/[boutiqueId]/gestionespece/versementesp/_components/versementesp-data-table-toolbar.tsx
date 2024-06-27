"use client";

import { Table } from "@tanstack/react-table";

import vbanks from "@/data/vbanks.json";

import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { CircleIcon, StopwatchIcon } from "@radix-ui/react-icons";
import { HandCoins, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableFacetedFilter } from "./versementesp-data-table-facetfilter";
interface VersementEspToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function VersementEspToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: VersementEspToolbarProps<TData>) {
  const [minMax, setMinMax] = useState(["", ""]);

  const onMinChange = (min: string) => {
    setMinMax((prev) => [min, prev[1]]);
  };

  const onMaxChange = (max: string) => {
    setMinMax((prev) => [prev[0], max]);
  };

  const onDateChange = (newDateRange: DateRange | undefined) => {
    if (newDateRange?.from && newDateRange?.to) {
      table.getColumn("dateVersement")?.setFilterValue(newDateRange);
    }
    if (!newDateRange?.from && !newDateRange?.to) {
      table.getColumn("dateVersement")?.setFilterValue("");
    }
  };

  useEffect(() => {
    table.getColumn("montant")?.setFilterValue(minMax);
    // table.getColumn("montant")?.set
  }, [minMax]);

  return (
    <div className=" ">
      <div className="  no-print  text-[#969696] flex flex-col items-center justify-center  gap-2   ">
        <div className="flex gap-2 px-3  no-scroll-bar    items-center justify-start  w-full flex-wrap ">
          <DatePickerWithRange onDateChange={onDateChange} />
          <DataTableFacetedFilter
            column={table.getColumn("bank")}
            title="Banque de versement"
            options={vbanks.map((bank) => ({
              label: bank.CODB,
              value: bank.CODB,
            }))}
          />

          <DataTableFacetedFilter
            column={table.getColumn("dateBanque")}
            title="Status"
            options={[
              {
                label: "Pointé",
                value: "pointé",
                icon: CircleIcon,
              },
              { label: "Non pointé", value: "npointé", icon: StopwatchIcon },
            ]}
          />
          <div className="flex items-center ">
            <Input
              placeholder="Global Filter"
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-sm text-black"
              type="text"
            />
          </div>

          <div className="flex items-center py-4">
            <Input
              placeholder="Num Bordereaux"
              value={(table.getColumn("num")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("num")?.setFilterValue(event.target.value)
              }
              className="max-w-sm text-black"
            />
          </div>

          <div className="flex items-center py-4">
            <Input
              placeholder="Libellé"
              value={(table.getColumn("lib")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("lib")?.setFilterValue(event.target.value)
              }
              className="max-w-sm text-black"
            />
          </div>

          <div className="flex items-center gap-2 py-4">
            <Input
              placeholder="min"
              value={minMax[0]}
              onChange={(event) => onMinChange(event.target.value)}
              className="max-w-sm text-black"
              min="0"
              type="number"
            />
            <Input
              placeholder="max"
              value={minMax[1]}
              onChange={(event) => onMaxChange(event.target.value)}
              className="max-w-sm text-black"
              type="number"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#E9EEF0]   print:bg-white space-y-4 rounded-t-xl p-4  ">
        <h1 className="text-xl font-medium">Pointage vérsement chéque</h1>
        <div className="text-sm flex items-center justify-start gap-2">
          <span className="font-semibold"> Total montant :</span>
          <span className="text-primary font-bold">
            {table
              .getFilteredRowModel()
              .rows.reduce(
                (total, row) => total + Number(row.getValue("montant")),
                0
              )}
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
    </div>
  );
}
