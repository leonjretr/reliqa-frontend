import { QUERIES } from "@/config";
import { loadCatalogue } from "@/service/actions";
import { BrowseScreen } from "@/ui/components/modules/catalog";
import { getSearchParam } from "@/ui/utils";

const Page = async ({ searchParams }: PageProps<"/[locale]/browse">) => {
  const categorySlug = getSearchParam((await searchParams)[QUERIES.CATEGORY]);
  const catalogue = await loadCatalogue(categorySlug);

  return (
    <BrowseScreen
      objects={catalogue.objects}
      totalCount={catalogue.totalCount}
      category={catalogue.category}
    />
  );
};

export default Page;
