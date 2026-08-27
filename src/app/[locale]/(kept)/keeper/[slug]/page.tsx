import { notFound } from "next/navigation";

import { getKeeper, KEEPERS } from "@/ui/components/modules/feed";
import { ProfileScreen } from "@/ui/components/modules/profile";

export const generateStaticParams = () => KEEPERS.map((keeper) => ({ slug: keeper.slug }));

const Page = async ({ params }: { params: Promise<{ locale: string; slug: string }> }) => {
  const { slug } = await params;
  const keeper = getKeeper(slug);

  if (!keeper) {
    notFound();
  }

  return <ProfileScreen keeper={keeper} />;
};

export default Page;
