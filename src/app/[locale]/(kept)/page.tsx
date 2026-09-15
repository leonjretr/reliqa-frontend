import { PAGES } from "@/config";
import { redirect } from "@/i18n";
import { loadFeedEntries } from "@/service/actions";
import { getSession } from "@/service/session";
import { StoryFeed } from "@/ui/components/modules/feed";

const Page = async ({ params }: PageProps<"/[locale]">) => {
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
