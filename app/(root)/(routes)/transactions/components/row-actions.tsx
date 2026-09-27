"use client";

import { RxDotsHorizontal } from "react-icons/rx";
import { type Row, type RowData } from "@tanstack/react-table";

import type { DataTableFeatures } from "@/components/data-table/features";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableRowActionsProps<TData extends RowData> {
  row: Row<DataTableFeatures, TData>;
}

export function DataTableRowActions<TData extends RowData>({
  row,
}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-open:bg-muted"
          />
        }
      >
        <RxDotsHorizontal className="h-4 w-4" />
        <span className="sr-only">Open menu for row {row.id}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
