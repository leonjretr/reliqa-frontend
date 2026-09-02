import { redirect } from "@/i18n";
import { getSession } from "@/service";
import { StoryFeed } from "@/ui/components/modules/feed";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const session = await getSession();

  if (session) {
    return <StoryFeed />;
  } else {
    redirect({ href: "/login", locale });
  }
};

export default Page;
