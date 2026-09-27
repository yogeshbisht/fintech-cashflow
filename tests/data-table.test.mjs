import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { test } from "node:test";
import ts from "typescript";

// Compile the actual TSX components without adding a test-only bundler.
const root = new URL("../", import.meta.url);
registerHooks({
  resolve(specifier, context, nextResolve) {
    const url = specifier.startsWith("@/")
      ? new URL(specifier.slice(2), root)
      : specifier.startsWith(".") && context.parentURL?.startsWith(root.href)
        ? new URL(specifier, context.parentURL)
        : undefined;
    if (url && !url.pathname.includes("/node_modules/")) {
      for (const suffix of ["", ".ts", ".tsx"]) {
        const path = fileURLToPath(url) + suffix;
        if (existsSync(path))
          return nextResolve(pathToFileURL(path).href, context);
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (
      url.startsWith(root.href) &&
      /\.tsx?$/.test(url) &&
      !url.includes("/node_modules/")
    ) {
      return {
        format: "module",
        shortCircuit: true,
        source: ts.transpileModule(readFileSync(new URL(url), "utf8"), {
          compilerOptions: {
            module: ts.ModuleKind.ESNext,
            jsx: ts.JsxEmit.ReactJSX,
          },
        }).outputText,
      };
    }
    return nextLoad(url, context);
  },
});

const { useTable } = await import("@tanstack/react-table");
const { createElement } = await import("react");
const { renderToStaticMarkup } = await import("react-dom/server");
const { features } = await import("../components/data-table/features.ts");
const { DataTable } = await import("../components/ui/data-table.tsx");
const { columns: transactionColumns } =
  await import("../app/(root)/(routes)/transactions/components/columns.tsx");
const { columns: dashboardColumns } =
  await import("../app/(root)/(routes)/dashboard/components/columns.tsx");

const data = Array.from({ length: 25 }, (_, index) => ({
  id: `transaction-${index}`,
  description: index % 2 === 0 ? "Coffee" : "Rent",
  amount: String(index === 0 ? 100 : index),
  start_date: "2026-09-01T00:00:00.000Z",
}));

function constructTable(options) {
  let table;
  function Fixture() {
    table = useTable(options);
    return null;
  }
  renderToStaticMarkup(createElement(Fixture));
  return table;
}

function transactions() {
  return constructTable({ features, columns: transactionColumns, data });
}

test("transaction amounts sort numerically in both directions", () => {
  const table = transactions();
  table.getColumn("amount").toggleSorting(false);
  assert.equal(table.getRowModel().rows[0].getValue("amount"), 1);
  table.getColumn("amount").toggleSorting(true);
  assert.equal(table.getRowModel().rows[0].getValue("amount"), 100);
});

test("filtering, pagination, selection, visibility, and facets work together", () => {
  const table = transactions();
  assert.equal(table.getRowModel().rows.length, 10);
  table.nextPage();
  assert.equal(table.getRowModel().rows[0].original.id, "transaction-10");
  table.setPageIndex(0);
  table.getColumn("description").setFilterValue("COFFEE");
  assert.equal(table.getFilteredRowModel().rows.length, 13);
  assert.equal(table.getPageCount(), 2);
  table.toggleAllPageRowsSelected(true);
  assert.equal(table.getFilteredSelectedRowModel().rows.length, 10);
  table.getRowModel().rows[0].toggleSelected(false);
  assert.equal(table.getIsSomePageRowsSelected(), true);
  table.getColumn("description").toggleVisibility(false);
  assert.equal(
    table.getVisibleLeafColumns().some((column) => column.id === "description"),
    false,
  );
  assert.equal(
    table.getColumn("description").getFacetedUniqueValues().get("Rent"),
    12,
  );
  table.resetColumnFilters();
  table.setPageSize(50);
  assert.equal(table.getRowModel().rows.length, 25);
});

test("dashboard filters its own name column", () => {
  const table = constructTable({
    features,
    columns: dashboardColumns,
    data: [
      {
        name: "Alice",
        position: "Engineer",
        office: "London",
        age: 30,
        start_date: "09/01/2026",
        salary: 90000,
      },
      {
        name: "Bob",
        position: "Analyst",
        office: "Paris",
        age: 25,
        start_date: "09/02/2026",
        salary: 80000,
      },
    ],
  });
  table.getColumn("name").setFilterValue("alice");
  assert.equal(table.getFilteredRowModel().rows.length, 1);
  assert.equal(table.getFilteredRowModel().rows[0].original.name, "Alice");
});

test("both table configurations render, including empty results", () => {
  const transactionHtml = renderToStaticMarkup(
    createElement(DataTable, {
      columns: transactionColumns,
      data,
      filterColumn: "description",
      filterPlaceholder: "Filter transactions...",
    }),
  );
  assert.match(transactionHtml, /Coffee/);
  assert.match(transactionHtml, /Filter transactions/);
  assert.doesNotMatch(transactionHtml, /<button[^>]*>\s*<button/);
  const dashboardHtml = renderToStaticMarkup(
    createElement(DataTable, {
      columns: dashboardColumns,
      data: [],
      filterColumn: "name",
      filterPlaceholder: "Filter names...",
    }),
  );
  assert.match(dashboardHtml, /No results/);
  assert.match(dashboardHtml, /Filter names/);
  assert.match(dashboardHtml, /Page 1 of<!-- --> <!-- -->1|Page 1 of 1/);
});
