import { useTranslations } from "next-intl";

import { keeperPath } from "@/config";

import { ObjectLink } from "./ObjectLink";

type Props = {
  keeperName: string;
  keeperUsername: string;
};

export const ObjectLinks = ({ keeperName, keeperUsername }: Props) => {
  const t = useTranslations("Object");

  return (
    <div className="bg-ink border-ink mt-5.5 flex flex-col gap-px border">
      <ObjectLink
        href={keeperPath(keeperUsername)}
        title={t("LINK_SHELF_TITLE", { keeper: keeperName })}
        action={t("LINK_EVERYTHING_KEPT")}
      />
    </div>
  );
};
