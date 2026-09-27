"use client";

import type { DataTableFeatures } from "./features";

import { RxCross2 } from "react-icons/rx";
import { type ReactTable, type RowData } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./view-options";

interface DataTableToolbarProps<TData extends RowData> {
  table: ReactTable<DataTableFeatures, TData>;
  filterColumn?: string;
  filterPlaceholder?: string;
}

export function DataTableToolbar<TData extends RowData>({
  table,
  filterColumn,
  filterPlaceholder = "Filter rows...",
}: DataTableToolbarProps<TData>) {
  const column = table
    .getAllLeafColumns()
    .find((column) => column.id === filterColumn);
  const isFiltered = table.state.columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {column && (
          <Input
            placeholder={filterPlaceholder}
            aria-label={filterPlaceholder}
            value={(column?.getFilterValue() as string) ?? ""}
            onChange={(event) => column?.setFilterValue(event.target.value)}
            className="h-8 w-37.5 lg:w-62.5"
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
