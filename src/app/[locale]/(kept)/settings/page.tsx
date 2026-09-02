import { notFound } from "next/navigation";

import { CURRENT_KEEPER_SLUG, getKeeper } from "@/ui/components/modules/feed";
import { SettingsScreen } from "@/ui/components/modules/profile";

const Page = () => {
  const keeper = getKeeper(CURRENT_KEEPER_SLUG);

  if (!keeper) {
    notFound();
  }

  return <SettingsScreen keeper={keeper} email="marta.ilves@reliqa.space" />;
};

export default Page;
