import { redirect } from "@/i18n";
import { getCategories, getCategory, getCurrentUser } from "@/service";
import { getSession } from "@/service/session";
import { CaptureForm } from "@/ui/components/modules/capture";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

const Page = async ({ params, searchParams }: PageProps) => {
  const { locale } = await params;
  const { category: categorySlug } = await searchParams;
  const session = await getSession();

  if (!session) {
    redirect({ href: "/login", locale });
  }

  const [categories, user, category] = await Promise.all([
    getCategories(),
    getCurrentUser(),
    categorySlug ? getCategory(categorySlug) : undefined,
  ]);
  const fullName = user.success ? `${user.first_name} ${user.last_name}`.trim() : "";
  const keeperName = fullName || (user.success ? user.username : "you");

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
