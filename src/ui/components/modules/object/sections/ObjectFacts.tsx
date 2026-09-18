import { useTranslations } from "next-intl";

import type { APIObject } from "@/service/types";
import { Stat, StatGrid } from "@/ui/components/common/Stat";
import { formatYear } from "@/ui/utils";

type Props = {
  object: APIObject;
};

export const ObjectFacts = ({ object }: Props) => {
  const t = useTranslations("Object");
  const common = useTranslations("Common");
  const empty = common("EMPTY_VALUE");
  const facts = [
    { label: t("FACT_CATEGORY"), value: object.categories[0]?.name ?? empty },
    {
      label: t("FACT_INVENTED"),
      value: object.invented_at ? formatYear(object.invented_at) : empty,
    },
    { label: t("FACT_KEPT_SINCE"), value: formatYear(object.acquired_at ?? object.created_at) },
    { label: t("FACT_SOURCE"), value: object.source?.name ?? empty },
    { label: t("FACT_LOCATION"), value: object.location || empty },
    { label: t("FACT_PREVIOUS_OWNER"), value: object.previous_owner || empty },
  ];

  return (
    <StatGrid className="mt-3.25">
      {facts.map((fact) => (
        <Stat
          key={fact.label}
          label={fact.label}
          value={fact.value}
          className="py-2"
          valueClassName="text-fact"
        />
      ))}
    </StatGrid>
  );
};
