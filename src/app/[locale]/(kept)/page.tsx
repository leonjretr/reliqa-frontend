import { loadFeedEntries } from "@/service/actions";
import { requireSession } from "@/service/guards";
import { ObjectFeed } from "@/ui/components/modules/feed";

const Page = async ({ params }: PageProps<"/[locale]">) => {
  const { locale } = await params;
  await requireSession(locale);
  const entries = await loadFeedEntries();

  return <ObjectFeed initialEntries={entries} />;
};

export default Page;
