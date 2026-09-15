import { PAGES } from "@/config";
import { redirect } from "@/i18n";
import { getSession, loadFeedEntries } from "@/service";
import { StoryFeed } from "@/ui/components/modules/feed";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const session = await getSession();

  if (session) {
    const entries = await loadFeedEntries();
    return <StoryFeed initialEntries={entries} />;
  } else {
    redirect({ href: PAGES.LOGIN, locale });
  }
};

export default Page;
