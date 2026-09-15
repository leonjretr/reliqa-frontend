import { PAGES } from "@/config";
import { redirect } from "@/i18n";
import { getSession } from "@/service/session";
import { AuthCard } from "@/ui/components/modules/auth";

const Page = async ({ params }: PageProps<"/[locale]/login">) => {
  const { locale } = await params;
  const session = await getSession();

  if (session) {
    redirect({ href: PAGES.FEED, locale });
  }

  return <AuthCard />;
};

export default Page;
