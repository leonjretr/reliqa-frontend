import { useTranslations } from "next-intl";

import { MonoLabel } from "@/ui/components/common/MonoLabel";

export const EmptyFeed = () => {
  const t = useTranslations("Feed");

  return (
    <div className="bg-night flex h-full w-full items-center justify-center px-6 text-center">
      <MonoLabel className="text-chalk/72 text-meta">{t("EMPTY_FEED")}</MonoLabel>
    </div>
  );
};
