import { useTranslations } from "next-intl";

import { Stat, StatGrid } from "@/ui/components/common/Stat";

type Props = {
  keptCount: number;
  since: string;
};

export const ShelfStats = ({ keptCount, since }: Props) => {
  const t = useTranslations("Profile");

  return (
    <StatGrid className="mb-5.5 grid-cols-2">
      <Stat label={t("STAT_KEPT")} value={keptCount} />
      <Stat label={t("STAT_SINCE")} value={since} />
    </StatGrid>
  );
};
