import { useTranslations } from "next-intl";

import { APP_NAME, keeperPath, META_SEPARATOR } from "@/config";
import type { APICurrentUser } from "@/service/types";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { ScrollBody } from "@/ui/components/common/ScrollBody";
import { ScreenHeader } from "@/ui/components/modules/navigation";
import { formatYear } from "@/ui/utils";

import { SettingsForm, SignOutForm } from "./forms";

type Props = {
  user: APICurrentUser;
};

export const SettingsScreen = ({ user }: Props) => {
  const t = useTranslations("Settings");
  const common = useTranslations("Common");

  return (
    <div className="bg-chalk relative flex h-full w-full flex-col overflow-hidden">
      <ScreenHeader
        section={t("SECTION_SETTINGS")}
        back={{ href: keeperPath(user.username), label: t("LINK_SHELF") }}
      />
      <ScrollBody className="px-4.5 pt-3.5 pb-6">
        <SettingsForm user={user} />
        <SignOutForm />
        <p className="text-ink-faint font-kept-mono text-fine leading-note mt-3.5 text-center tracking-wider lowercase">
          {common("KEEPER_SINCE", { year: formatYear(user.created_at) })}
          {META_SEPARATOR}
          {APP_NAME}
        </p>
      </ScrollBody>
      <GrainOverlay />
    </div>
  );
};
