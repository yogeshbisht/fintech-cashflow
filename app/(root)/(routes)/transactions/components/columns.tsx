"use client";

import type { DataTableFeatures } from "@/components/data-table/features";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Transaction } from "@/dev-data/transactions/schema";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { DataTableRowActions } from "./row-actions";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<DataTableFeatures, Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-40">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div>{format(new Date(row.getValue("start_date")), "MM/dd/yyyy")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "description",
    filterFn: "includesString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-75 truncate">{row.getValue("description")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: "amount",
    accessorFn: (transaction) => Number(transaction.amount),
    sortFn: "basic",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="text-right"
      />
    ),
    cell: ({ row }) => (
      <div className="text-right">$&nbsp;{row.getValue("amount")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
