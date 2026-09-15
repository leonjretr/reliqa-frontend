import { QUERIES } from "@/config";
import { getCategory, getObjects, getObjectStories } from "@/service/api";
import { BrowseScreen, type BrowseObject } from "@/ui/components/modules/catalog";
import { getSearchParam } from "@/ui/utils";

const Page = async ({ searchParams }: PageProps<"/[locale]/browse">) => {
  const categorySlug = getSearchParam((await searchParams)[QUERIES.CATEGORY]);

  const [objects, category] = await Promise.all([
    getObjects({ categories: categorySlug }),
    categorySlug ? getCategory(categorySlug) : undefined,
  ]);

  const enrichedObjects: BrowseObject[] = objects.success
    ? await Promise.all(
        objects.results.map(async (object) => {
          const stories = await getObjectStories(object.id);
          return { ...object, stories_count: stories.success ? stories.count : 0 };
        }),
      )
    : [];

  return (
    <BrowseScreen
      objects={enrichedObjects}
      totalCount={objects.success ? objects.count : 0}
      category={category?.success ? category : undefined}
    />
  );
};

export default Page;
