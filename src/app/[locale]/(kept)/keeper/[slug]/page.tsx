import { notFound } from "next/navigation";

import { loadKeeperShelf } from "@/service/actions";
import { getCurrentUser, getUserByUsername } from "@/service/api";
import { ProfileScreen } from "@/ui/components/modules/profile";
import { toKeeperProfile } from "@/ui/utils";

const Page = async ({ params }: PageProps<"/[locale]/keeper/[slug]">) => {
  const { slug } = await params;
  const currentUser = await getCurrentUser();
  const isOwn = currentUser.success && slug === currentUser.username;

  if (isOwn) {
    const { objects, stories } = await loadKeeperShelf(currentUser.id);
    return (
      <ProfileScreen
        keeper={toKeeperProfile(currentUser)}
        objects={objects}
        stories={stories}
        isOwn
      />
    );
  }

  const publicUser = await getUserByUsername(slug);

  if (!publicUser.success) {
    notFound();
  }

  const { objects, stories } = await loadKeeperShelf(publicUser.id);
  return (
    <ProfileScreen
      keeper={toKeeperProfile(publicUser)}
      objects={objects}
      stories={stories}
      isOwn={false}
    />
  );
};

export default Page;
