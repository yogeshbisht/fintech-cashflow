import PageHeader from "@/components/ui/page-header";
import { CategoryColumn, columns } from "./components/columns";

import categoryData from "@/dev-data/category-data.json";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";

const DashboardPage = () => {
  const formattedCategories: CategoryColumn[] = categoryData.map(
    (category) => ({
      name: category.name,
      position: category.position,
      office: category.office,
      age: category.age,
      start_date: format(new Date(category.start_date), "MM/dd/yyyy"),
      salary: category.salary,
    })
  );

  return (
    <div className="relative">
      <PageHeader title="Category Data" />
      <DataTable searchKey="name" columns={columns} data={formattedCategories} />
    </div>
  );
};

export default DashboardPage;
