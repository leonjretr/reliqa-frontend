import { notFound } from "next/navigation";

import { loadKeeperPage } from "@/service/actions";
import { ProfileScreen } from "@/ui/components/modules/profile";
import { toKeeperProfile } from "@/ui/utils";

const Page = async ({ params }: PageProps<"/[locale]/keeper/[slug]">) => {
  const { slug } = await params;
  const keeper = await loadKeeperPage(slug);

  if (!keeper) {
    notFound();
  }

  return (
    <ProfileScreen
      keeper={toKeeperProfile(keeper.user)}
      objects={keeper.objects}
      stories={keeper.stories}
      isOwn={keeper.isOwn}
    />
  );
};

export default Page;
