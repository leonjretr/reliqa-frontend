import { PAGES, QUERIES } from "@/config";
import { redirect } from "@/i18n";
import { getCategories, getCategory, getCurrentUser } from "@/service/api";
import { getSession } from "@/service/session";
import { CaptureForm } from "@/ui/components/modules/capture";
import { formatKeeperName, getSearchParam } from "@/ui/utils";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/add">) => {
  const { locale } = await params;
  const categorySlug = getSearchParam((await searchParams)[QUERIES.CATEGORY]);
  const session = await getSession();

  if (!session) {
    redirect({ href: PAGES.LOGIN, locale });
  }

  const [categories, user, category] = await Promise.all([
    getCategories(),
    getCurrentUser(),
    categorySlug ? getCategory(categorySlug) : undefined,
  ]);
  const keeperName = user.success ? formatKeeperName(user) : "you";

  const categoryList = categories.success ? categories.results : [];
  const initialCategory = category?.success ? category : undefined;
  if (initialCategory && !categoryList.some((item) => item.slug === initialCategory.slug)) {
    categoryList.push(initialCategory);
  }

  return (
    <CaptureForm
      categories={categoryList}
      keeperName={keeperName}
      initialCategory={initialCategory?.slug}
    />
  );
};

export default Page;
