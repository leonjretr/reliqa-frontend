import { notFound } from "next/navigation";

import { getCurrentUser, getUserByUsername, loadKeeperShelf } from "@/service";
import { ProfileScreen } from "@/ui/components/modules/profile";

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const currentUser = await getCurrentUser();
  const isOwn = currentUser.success && slug === currentUser.username;

  if (isOwn) {
    const { objects, stories } = await loadKeeperShelf(currentUser.id);
    const fullName = `${currentUser.first_name} ${currentUser.last_name}`.trim();
    const keeper = {
      name: fullName || currentUser.username,
      place: currentUser.residence,
      bio: currentUser.bio,
      avatar: currentUser.avatar?.src ?? undefined,
      since: String(new Date(currentUser.created_at).getFullYear()),
    };

    return <ProfileScreen keeper={keeper} objects={objects} stories={stories} isOwn />;
  }

  const publicUser = await getUserByUsername(slug);

  if (!publicUser.success) {
    notFound();
  }

  const { objects, stories } = await loadKeeperShelf(publicUser.id);
  const fullName = `${publicUser.first_name} ${publicUser.last_name}`.trim();
  const keeper = {
    name: fullName || publicUser.username,
    place: publicUser.residence,
    bio: publicUser.bio,
    avatar: publicUser.avatar?.src ?? undefined,
    since: String(new Date(publicUser.created_at).getFullYear()),
  };

  return <ProfileScreen keeper={keeper} objects={objects} stories={stories} isOwn={false} />;
};

export default Page;
