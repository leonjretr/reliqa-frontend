import { getCategory, getObjects, getObjectStories } from "@/service";
import { BrowseScreen, type BrowseObject } from "@/ui/components/modules/catalog";

type PageProps = {
  searchParams: Promise<{ category?: string }>;
};

const Page = async ({ searchParams }: PageProps) => {
  const { category: categorySlug } = await searchParams;

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
