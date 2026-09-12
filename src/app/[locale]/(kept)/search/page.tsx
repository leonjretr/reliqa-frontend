import { getCategories } from "@/service";
import { SearchScreen } from "@/ui/components/modules/search";

const Page = async () => {
  const categories = await getCategories();

  return <SearchScreen categories={categories.success ? categories.results : []} />;
};

export default Page;
