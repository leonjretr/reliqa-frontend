import { useTranslations } from "next-intl";

import { GrainOverlay } from "@/ui/components/common/GrainOverlay";
import { MonoLabel } from "@/ui/components/common/MonoLabel";
import { ScreenHeader } from "@/ui/components/modules/navigation";

export const MarketplaceScreen = () => {
  const t = useTranslations("Marketplace");

  return (
    <div className="relative flex h-full flex-col">
      <ScreenHeader section={t("SECTION_MARKETPLACE")} right={t("STATUS_SOON")} />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-4.5 text-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <span className="border-oxblood absolute inset-0 animate-ping rounded-full border opacity-40" />
          <span className="border-hair absolute inset-3 rounded-full border" />
          <span className="bg-oxblood text-chalk flex h-14 w-14 animate-pulse items-center justify-center rounded-full">
            <MonoLabel as="span" className="text-chalk text-micro">
              {t("BADGE_WIP")}
            </MonoLabel>
          </span>
        </div>
        <h1 className="text-heading leading-headline tracking-heading mt-7 font-bold">
          {t("TITLE_MARKETPLACE")}
        </h1>
        <p className="text-ink-3 text-reading leading-reading max-w-lede mt-3">
          {t("BODY_MARKETPLACE")}
        </p>
        <MonoLabel className="mt-6 animate-pulse">{t("HINT_BUILDING")}</MonoLabel>
      </div>
      <GrainOverlay />
    </div>
  );
};
