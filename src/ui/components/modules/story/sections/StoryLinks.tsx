import { useTranslations } from "next-intl";

import { keeperPath, thingPath } from "@/config";

import { StoryLink } from "./StoryLink";

type Props = {
  keeperName: string;
  keeperUsername: string;
  objectId: string;
  objectName: string;
};

export const StoryLinks = ({ keeperName, keeperUsername, objectId, objectName }: Props) => {
  const t = useTranslations("Story");

  return (
    <div className="bg-ink border-ink mt-5.5 flex flex-col gap-px border">
      <StoryLink
        href={keeperPath(keeperUsername)}
        title={t("LINK_SHELF_TITLE", { keeper: keeperName })}
        action={t("LINK_EVERYTHING_KEPT")}
      />
      <StoryLink href={thingPath(objectId)} title={objectName} action={t("LINK_EVERYONE_KEPT")} />
    </div>
  );
};
