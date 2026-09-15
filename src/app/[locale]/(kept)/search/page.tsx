import { getCategories } from "@/service";
import { SearchScreen } from "@/ui/components/modules/search";

type PageProps = {
  searchParams: Promise<{ query?: string }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { query } = await searchParams;
  const categories = await getCategories({ query });

  return <SearchScreen categories={categories.success ? categories.results : []} query={query} />;
};

export default Page;
