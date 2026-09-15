import { notFound } from "next/navigation";

import { getCurrentUser, getUserByUsername, loadKeeperShelf } from "@/service";
import { ProfileScreen } from "@/ui/components/modules/profile";
import { formatKeeperName, formatYear } from "@/ui/utils";

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const currentUser = await getCurrentUser();
  const isOwn = currentUser.success && slug === currentUser.username;

  if (isOwn) {
    const { objects, stories } = await loadKeeperShelf(currentUser.id);
    const keeper = {
      name: formatKeeperName(currentUser),
      place: currentUser.settings.is_residence_visible ? currentUser.residence : "",
      bio: currentUser.bio,
      avatar: currentUser.avatar?.src ?? undefined,
      since: formatYear(currentUser.created_at),
    };

    return <ProfileScreen keeper={keeper} objects={objects} stories={stories} isOwn />;
  }

  const publicUser = await getUserByUsername(slug);

  if (!publicUser.success) {
    notFound();
  }

  const { objects, stories } = await loadKeeperShelf(publicUser.id);
  const keeper = {
    name: formatKeeperName(publicUser),
    place: publicUser.residence ?? "",
    bio: publicUser.bio,
    avatar: publicUser.avatar?.src ?? undefined,
    since: formatYear(publicUser.created_at),
  };

  return <ProfileScreen keeper={keeper} objects={objects} stories={stories} isOwn={false} />;
};

export default Page;
