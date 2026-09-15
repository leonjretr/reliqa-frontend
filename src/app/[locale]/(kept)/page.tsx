import { loadFeedEntries } from "@/service/actions";
import { requireSession } from "@/service/session";
import { StoryFeed } from "@/ui/components/modules/feed";

const Page = async ({ params }: PageProps<"/[locale]">) => {
  const { locale } = await params;
  await requireSession(locale);
  const entries = await loadFeedEntries();

  return <StoryFeed initialEntries={entries} />;
};

export default Page;
