import { CategoryColumn } from "./columns";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  return (
    <div>
      <h1>Dashboard Client</h1>
    </div>
  );
};

export default CategoryClient;
