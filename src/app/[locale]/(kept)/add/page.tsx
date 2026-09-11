import { redirect } from "@/i18n";
import { getCategories, getCurrentUser } from "@/service";
import { getSession } from "@/service/session";
import { CaptureForm } from "@/ui/components/modules/capture";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const session = await getSession();

  if (!session) {
    redirect({ href: "/login", locale });
  }

  const [categories, user] = await Promise.all([getCategories(), getCurrentUser()]);
  const fullName = user.success ? `${user.first_name} ${user.last_name}`.trim() : "";
  const keeperName = fullName || (user.success ? user.username : "you");

  return (
    <CaptureForm
      categories={categories.success ? categories.results : []}
      keeperName={keeperName}
    />
  );
};

export default Page;
