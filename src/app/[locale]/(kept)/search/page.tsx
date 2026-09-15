import { QUERIES } from "@/config";
import { getCategories } from "@/service/api";
import { SearchScreen } from "@/ui/components/modules/search";
import { getSearchParam } from "@/ui/utils";

const Page = async ({ searchParams }: PageProps<"/[locale]/search">) => {
  const query = getSearchParam((await searchParams)[QUERIES.QUERY]);
  const categories = await getCategories({ query });

  return <SearchScreen categories={categories.success ? categories.results : []} query={query} />;
};

export default Page;
