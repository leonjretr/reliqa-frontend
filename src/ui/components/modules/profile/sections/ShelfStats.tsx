import { useTranslations } from "next-intl";

import { Stat, StatGrid } from "@/ui/components/common/Stat";

type Props = {
  keptCount: number;
  writtenCount: number;
  since: string;
};

export const ShelfStats = ({ keptCount, writtenCount, since }: Props) => {
  const t = useTranslations("Profile");

  return (
    <StatGrid className="mb-5.5">
      <Stat label={t("STAT_KEPT")} value={keptCount} />
      <Stat label={t("STAT_WRITTEN")} value={writtenCount} />
      <Stat label={t("STAT_SINCE")} value={since} />
    </StatGrid>
  );
};
