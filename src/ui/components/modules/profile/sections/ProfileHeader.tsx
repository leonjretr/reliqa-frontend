import { useTranslations } from "next-intl";

import { META_SEPARATOR, PAGES } from "@/config";
import { Link } from "@/i18n";
import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { SettingsIcon } from "@/ui/components/common/icons";
import { KeeperAvatar } from "@/ui/components/common/KeeperAvatar";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import type { KeeperProfile } from "@/ui/types";

const AVATAR_SIZE = 74;

type Props = {
  keeper: KeeperProfile;
  isOwn: boolean;
};

export const ProfileHeader = ({ keeper, isOwn }: Props) => {
  const t = useTranslations("Profile");
  const common = useTranslations("Common");

  return (
    <header className="torn-edge bg-plum text-blush relative flex flex-none items-end gap-3.5 px-5 pt-6.5 pb-5.5">
      <KeeperAvatar name={keeper.name} src={keeper.avatar} size={AVATAR_SIZE} />
      <div className="min-w-0 flex-1 pb-0.5">
        <MonoLabel className="text-blush/75 mb-1.5">
          {common("KEEPER_SINCE", { year: keeper.since })}
          {keeper.place ? `${META_SEPARATOR}${keeper.place}` : ""}
        </MonoLabel>
        <div className="text-heading-lg leading-heading tracking-snug font-bold break-words">
          {keeper.name}
        </div>
      </div>
      {isOwn && (
        <Link
          href={PAGES.SETTINGS}
          aria-label={t("LABEL_SETTINGS")}
          className="border-blush/30 flex size-8.5 flex-none items-center justify-center self-start rounded-full border text-inherit no-underline"
        >
          <SettingsIcon className="size-4.25" />
        </Link>
      )}
      <GrainOverlay />
    </header>
  );
};
