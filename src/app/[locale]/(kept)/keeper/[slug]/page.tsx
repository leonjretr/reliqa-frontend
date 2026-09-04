import { notFound } from "next/navigation";

import { getCurrentUser } from "@/service";
import { CURRENT_KEEPER_SLUG, getKeeper, getKeeperStories } from "@/ui/components/modules/feed";
import { ProfileScreen } from "@/ui/components/modules/profile";

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const user = await getCurrentUser();
  const isOwn = user.success && slug === user.username;

  if (isOwn) {
    const shelf = getKeeper(CURRENT_KEEPER_SLUG);

    if (!shelf) {
      notFound();
    }

    const fullName = `${user.first_name} ${user.last_name}`.trim();
    const keeper = {
      ...shelf,
      slug: user.username,
      name: fullName || user.username,
      avatar: user.avatar?.src,
      since: String(new Date(user.created_at).getFullYear()),
    };

    return <ProfileScreen keeper={keeper} stories={getKeeperStories(shelf.slug)} isOwn />;
  }

  const keeper = getKeeper(slug);

  if (!keeper) {
    notFound();
  }

  return <ProfileScreen keeper={keeper} stories={getKeeperStories(slug)} isOwn={false} />;
};

export default Page;
