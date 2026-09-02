import { notFound } from "next/navigation";

import { redirect } from "@/i18n";
import { getCurrentUser } from "@/service";
import { CURRENT_KEEPER_SLUG, getKeeper } from "@/ui/components/modules/feed";
import { SettingsScreen } from "@/ui/components/modules/profile";

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const user = await getCurrentUser();

  if (!user.success) {
    redirect({ href: "/login", locale });
  }

  const keeper = getKeeper(CURRENT_KEEPER_SLUG);

  if (!keeper) {
    notFound();
  }

  return <SettingsScreen keeper={keeper} email={user.email} />;
};

export default Page;
