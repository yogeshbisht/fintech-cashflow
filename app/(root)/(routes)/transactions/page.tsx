import { promises as fs } from "fs";
import path from "path";
import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { transactionSchema } from "../../../../dev-data/transactions/schema";

export const metadata: Metadata = {
  title: "Transactions",
  description: "Transaction Table",
};

// Simulate a database read for tasks.
async function getTransactions() {
  const data = await fs.readFile(
    path.join(process.cwd(), "dev-data/transactions/transactions.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(transactionSchema).parse(tasks);
}

export default async function TaskPage() {
  const transactions = await getTransactions();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
            <p className="text-muted-foreground">
              This table displays the list of transactions that has been made by you using the selected scenarios.
            </p>
          </div>
        </div>
        <DataTable data={transactions} columns={columns} />
      </div>
    </>
  );
}
