import { QUERIES } from "@/config";
import { loadCaptureOptions } from "@/service/actions";
import { getCurrentUser } from "@/service/api";
import { requireSession } from "@/service/session";
import { CaptureScreen } from "@/ui/components/modules/capture";
import { formatKeeperName, getSearchParam } from "@/ui/utils";

const Page = async ({ params, searchParams }: PageProps<"/[locale]/add">) => {
  const { locale } = await params;
  const categorySlug = getSearchParam((await searchParams)[QUERIES.CATEGORY]);
  await requireSession(locale);

  const [options, user] = await Promise.all([loadCaptureOptions(categorySlug), getCurrentUser()]);

  return (
    <CaptureScreen
      categories={options.categories}
      keeperName={user.success ? formatKeeperName(user) : undefined}
      initialCategory={options.initialCategory}
    />
  );
};

export default Page;
